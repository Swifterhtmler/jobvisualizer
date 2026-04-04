<script lang="ts">
  import { onMount } from 'svelte';
  import { CircleLayer, MapLibre, GeoJSONSource, SymbolLayer, Popup } from 'svelte-maplibre-gl';
  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { getLatestDataMonth, formatMonthLabel } from '$lib/utils/dataMonth';

   const dataMonth = getLatestDataMonth(); // '2026M02'

  // Maakunta centroids [lng, lat]
  const maakuntaCentroids: Record<string, { coords: [number, number]; name: string }> = {
    '01': { coords: [25.0, 60.3],  name: 'Uusimaa' },
    '02': { coords: [22.3, 60.8],  name: 'Varsinais-Suomi' },
    '04': { coords: [22.5, 61.5],  name: 'Satakunta' },
    '05': { coords: [24.5, 60.9],  name: 'Kanta-Häme' },
    '06': { coords: [23.8, 61.7],  name: 'Pirkanmaa' },
    '07': { coords: [25.7, 61.1],  name: 'Päijät-Häme' },
    '08': { coords: [27.2, 60.9],  name: 'Kymenlaakso' },
    '09': { coords: [28.2, 61.1],  name: 'Etelä-Karjala' },
    '10': { coords: [27.5, 61.9],  name: 'Etelä-Savo' },
    '11': { coords: [27.5, 63.1],  name: 'Pohjois-Savo' },
    '12': { coords: [29.8, 62.8],  name: 'Pohjois-Karjala' },
    '13': { coords: [25.7, 62.3],  name: 'Keski-Suomi' },
    '14': { coords: [23.0, 62.8],  name: 'Etelä-Pohjanmaa' },
    '15': { coords: [22.0, 63.1],  name: 'Pohjanmaa' },
    '16': { coords: [24.0, 63.7],  name: 'Keski-Pohjanmaa' },
    '17': { coords: [26.5, 65.0],  name: 'Pohjois-Pohjanmaa' },
    '18': { coords: [28.5, 64.3],  name: 'Kainuu' },
    '19': { coords: [27.0, 67.5],  name: 'Lappi' },
    '21': { coords: [20.0, 60.2],  name: 'Ahvenanmaa' },
  };

  async function fetchVacancyData(): Promise<Record<string, number>> {
    const res = await fetch(
      'https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/tyonv/statfin_tyonv_pxt_12tv.px',
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
              code: 'Työnantajan sektori',
              selection: { filter: 'item', values: ['05'] }
              // 1-7
            },
            {
              code: 'Kuukausi',
              selection: { filter: 'item', values: [dataMonth] }
            },
            {
              code: 'Tiedot',
              selection: { filter: 'item', values: ['AVPAIKATLOPUSSA'] }
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
      result[natcode] = values[idx as number];
    }
    return result;
  }

  let geoData: any = $state(null);
  let hoveredFeature: any = $state(null);
  let lnglat = $state.raw(new maplibregl.LngLat(0, 0));
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      const vacancies = await fetchVacancyData();

      // Build GeoJSON point features from centroids + vacancy data
      geoData = {
        type: 'FeatureCollection',
        features: Object.entries(maakuntaCentroids).map(([code, { coords, name }]) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coords
          },
          properties: {
            name,
            vacancies: vacancies[code] ?? 0,
            code
          }
        }))
      };
    } catch (err) {
      console.error('Load failed:', err);
      error = 'Datan lataus epäonnistui.';
    }
  });
</script>

<div class="map-wrapper">
  {#if error}
    <div class="loading">{error}</div>
  {:else if geoData}
    <MapLibre
      class="h-[100%] w-full"
      style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      zoom={4.5}
      center={{ lng: 26, lat: 65 }}
    >
      <GeoJSONSource data={geoData}>
        <!-- Colored circle sized by vacancy count -->
        <CircleLayer
          paint={{
            'circle-color': [
              'interpolate', ['linear'], ['get', 'vacancies'],
              0,    '#80CBC4',
              2000, '#00897B',
              5000, '#EF6C5B',
              10000,'#B71C1C'
            ],
            'circle-radius': [
              'interpolate', ['linear'], ['get', 'vacancies'],
              0,     8,
              1000,  16,
              5000,  28,
              12000, 44
            ],
            'circle-opacity': 0.85,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#ffffff'
          }}
          onmousemove={(ev) => {
            hoveredFeature = ev.features?.[0];
            lnglat = ev.lngLat;
          }}
          onmouseleave={() => hoveredFeature = null}
        />

        <!-- Label inside circle -->
        <SymbolLayer
          layout={{
            'text-field': ['get', 'vacancies'],
            'text-size': 11,
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          }}
          paint={{
            'text-color': '#ffffff',
          }}
        />

        {#if hoveredFeature}
          <Popup {lnglat} closeButton={false}>
            <div class="popup">
              <strong>{hoveredFeature.properties.name}</strong>
              <p>Avoimia työpaikkoja: <b>{hoveredFeature.properties.vacancies.toLocaleString('fi-FI')}</b></p>
            </div>
          </Popup>
        {/if}
      </GeoJSONSource>
    </MapLibre>

    <div class="data-source">
      Lähde: Tilastokeskus / TEM, {formatMonthLabel(dataMonth)}
    </div>
  {:else}
    <div class="loading">Ladataan...</div>
  {/if}

  <div class="legend">
    <div class="legend-title">Avoimia työpaikkoja</div>
    {#each [
      { color: '#80CBC4', label: '< 1 000' },
      { color: '#00897B', label: '1 000–5 000' },
      { color: '#EF6C5B', label: '5 000–10 000' },
      { color: '#B71C1C', label: '> 10 000' },
    ] as item}
      <div class="legend-row">
        <span class="legend-swatch" style="background:{item.color}"></span>
        {item.label}
      </div>
    {/each}
  </div>
</div>

<style>
  .map-wrapper {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    height: 100%;
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
    border-radius: 50%;
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