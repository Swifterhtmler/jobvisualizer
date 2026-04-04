<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';

  import {
    MapLibre,
    GeoJSONSource,
    FillLayer,
    LineLayer,
    FeatureState,
    Popup
  } from 'svelte-maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  // import { get } from 'svelte/store';
    import { getLatestDataMonth, formatMonthLabel } from '$lib/utils/dataMonth';
    const dataMonth = getLatestDataMonth(); // '2026M02'

  async function fetchEmploymentData(): Promise<Record<string, number>> {
    const res = await fetch(
      'https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyonv/statfin_tyonv_pxt_12tf.px',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: [
            {
              code: 'Alue',
              selection: {
                filter: 'item',
                values: ['MK01','MK02','MK04','MK05','MK06','MK07','MK08','MK09','MK10','MK11','MK12','MK13','MK14','MK15','MK16','MK17','MK18','MK19','MK21']
              }
            },
            {
              code: 'Kuukausi',
              selection: {
                filter: 'item',
                values: [dataMonth]
              }
            },
            {
              code: 'Tiedot',
              selection: {
                filter: 'item',
                values: ['TYOTOSUUS']
              }
            }
          ],
          response: { format: 'json-stat2' }
        })
      }
    );



    const data = await res.json();

    const regions = data.dimension.Alue.category.index;
    const values = data.value;

    const result: Record<string, number> = {};
    for (const [code, idx] of Object.entries(regions) as [string, number][]) {
      const natcode = code.replace('MK', '');
      result[natcode] = values[idx];
    }

    return result;
  }

  let hoveredFeature: maplibregl.MapGeoJSONFeature | undefined = $state.raw();
  let lnglat = $state.raw(new maplibregl.LngLat(0, 0));
  let geoData: any = $state(null);
  // let dataMonth = $state('2026M02');
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      const [geo, employmentData] = await Promise.all([
        fetch('/data/maakunnat.geojson').then(r => r.json()),
        fetchEmploymentData()
      ]);

      geoData = {
        ...geo,
        features: geo.features.map((f: any) => ({
          ...f,
          properties: {
            ...f.properties,
            unemployment: employmentData[f.properties.NATCODE] ?? null,
          }
        }))
      };
    } catch (err) {
      console.error('Load failed:', err);
      error = 'Datan lataus epäonnistui.';
    }
  });

  const colorExpression: any = [
    'case',
    ['==', ['get', 'unemployment'], null],
    '#cccccc',
    [
      'interpolate', ['linear'],
      ['get', 'unemployment'],
      2,  '#00897B',
      8,  '#80CBC4',
      12, '#FFCCBC',
      16, '#EF6C5B',
      20, '#B71C1C',
    ]
  ];
</script>



<div class="map-container">
  {#if error}
    <div class="loading">{error}</div>
  {:else if geoData}
    <MapLibre
      class="h-[100%] min-h-[100%] w-full"
      style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      zoom={4.5}
      center={{ lng: 26, lat: 65 }}
    >

   <!--color overlay to show the states/provinces on top of the base macp layer-->

      <GeoJSONSource data={geoData}>
        <FillLayer
          paint={{
            'fill-color': colorExpression,
            'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.9,
              0.7
            ]
          }}
          onmousemove={(ev) => {
            hoveredFeature = ev.features?.[0];
            lnglat = ev.lngLat;
          }}
          onmouseleave={() => (hoveredFeature = undefined)}
        />
        <LineLayer
          paint={{
            'line-color': '#ffffff',
            'line-width': 1,
            'line-opacity': 0.8
          }}
        />

        <!---Unemployment percentage per province-->
        {#if hoveredFeature}
          <FeatureState id={hoveredFeature.id} state={{ hover: true }} />
          <Popup {lnglat} closeButton={false}>
            <div class="popup">
              <strong>{hoveredFeature.properties.NAMEFIN}</strong>
              {#if hoveredFeature.properties.unemployment !== null}
                <p>Työttömyys: <b>{hoveredFeature.properties.unemployment}%</b></p>
              {:else}
                <p>Ei dataa</p>
              {/if}
            </div>
          </Popup>
        {/if}
      </GeoJSONSource>
    </MapLibre>

    <div class="data-source">
      Lähde: Tilastokeskus / TEM, {dataMonth.replace('M', '/')}
    </div>
  {:else}
    <div class="loading">Ladataan...</div>
  {/if}

  <div class="legend">
    <div class="legend-title">Työttömyys %</div>
    {#each [
      { color: '#00897B', label: '< 8%' },
      { color: '#80CBC4', label: '8–12%' },
      { color: '#FFCCBC', label: '12–16%' },
      { color: '#EF6C5B', label: '16–20%' },
      { color: '#B71C1C', label: '> 20%' },
      { color: '#cccccc', label: 'Ei dataa' },
    ] as item}
      <div class="legend-row">
        <span class="legend-swatch" style="background:{item.color}"></span>
        {item.label}
      </div>
    {/each}
  </div>
</div>

<style>
  .map-container {
    position: relative;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  }

  .loading {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
  }

  .legend {
    position: absolute;
    bottom: 28px;
    right: 12px;
    background: white;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 0.8rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    z-index: 10;
  }

  .legend-title {
    font-weight: bold;
    margin-bottom: 6px;
  }

  .legend-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 3px;
  }

  .legend-swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .data-source {
    position: absolute;
    bottom: 8px;
    left: 12px;
    font-size: 0.7rem;
    color: #666;
    z-index: 10;
  }

  .popup strong {
    font-size: 0.95rem;
    display: block;
  }

  .popup p {
    margin: 4px 0 0;
    font-size: 0.85rem;
  }
</style>


<!--the library used is svelte-mablibre-gl that is svelte 5 runes compatible not ordinary maplibre-->
<!--the fetchdata function / api is ai generate if it fails replace with mockdata to fix--->
<!--for help check https://svelte-maplibre-gl.mierune.dev/examples/hover-styles-->