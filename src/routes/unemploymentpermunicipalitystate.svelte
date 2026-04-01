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
              values: ["KU020","KU005","KU009","KU010","KU016","KU018","KU019","KU035","KU043","KU046","KU047","KU049","KU050","KU051","KU052","KU060","KU061","KU062","KU065","KU069","KU071","KU072","KU074","KU075","KU076","KU077","KU078","KU079","KU081","KU082","KU086","KU090","KU091","KU092","KU097","KU098","KU102","KU103","KU105","KU106","KU108","KU109","KU111","KU139","KU140","KU142","KU143","KU145","KU146","KU148","KU149","KU151","KU152","KU153","KU165","KU167","KU169","KU170","KU171","KU172","KU176","KU177","KU178","KU179","KU181","KU182","KU186","KU199","KU202","KU204","KU205","KU208","KU211","KU213","KU214","KU216","KU217","KU218","KU224","KU226","KU230","KU231","KU232","KU233","KU235","KU236","KU239","KU240","KU241","KU244","KU245","KU249","KU250","KU256","KU257","KU260","KU261","KU263","KU265","KU271","KU272","KU273","KU275","KU276","KU280","KU284","KU285","KU286","KU287","KU288","KU290","KU291","KU295","KU297","KU300","KU301","KU304","KU305","KU309","KU312","KU316","KU317","KU318","KU320","KU322","KU398","KU399","KU400","KU402","KU403","KU405","KU407","KU408","KU410","KU416","KU417","KU418","KU420","KU421","KU422","KU423","KU425","KU426","KU430","KU433","KU434","KU435","KU436","KU438","KU440","KU441","KU444","KU445","KU475","KU478","KU480","KU481","KU483","KU484","KU489","KU491","KU494","KU495","KU498","KU499","KU500","KU503","KU504","KU505","KU507","KU508","KU529","KU531","KU535","KU536","KU538","KU541","KU543","KU545","KU560","KU561","KU562","KU563","KU564","KU576","KU577","KU578","KU580","KU581","KU583","KU584","KU592","KU593","KU595","KU598","KU599","KU601","KU604","KU607","KU608","KU609","KU611","KU614","KU615","KU616","KU619","KU620","KU623","KU624","KU625","KU626","KU630","KU631","KU635","KU636","KU638","KU678","KU680","KU681","KU683","KU684","KU686","KU687","KU689","KU691","KU694","KU697","KU698","KU700","KU702","KU704","KU707","KU710","KU729","KU732","KU734","KU736","KU738","KU739","KU740","KU742","KU743","KU746","KU747","KU748","KU749","KU751","KU753","KU755","KU758","KU759","KU761","KU762","KU765","KU766","KU768","KU771","KU777","KU778","KU781","KU783","KU785","KU790","KU791","KU831","KU832","KU833","KU834","KU837","KU844","KU845","KU846","KU848","KU849","KU850","KU851","KU853","KU854","KU857","KU858","KU859","KU886","KU887","KU889","KU890","KU892","KU893","KU895","KU905","KU908","KU915","KU918","KU921","KU922","KU924","KU925","KU927","KU931","KU934","KU935","KU936","KU941","KU946","KU976","KU977","KU980","KU981","KU989","KU992"]
            }
          },
          {
            code: 'Kuukausi',
            selection: { filter: 'item', values: ['2026M02'] }
          },
          {
            code: 'Tiedot',
            selection: { filter: 'item', values: ['TYOTOSUUS'] }
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
    const natcode = code.replace('KU', '');
    result[natcode] = values[idx];
  }

  return result;
}


  let hoveredFeature: maplibregl.MapGeoJSONFeature | undefined = $state.raw();
  let lnglat = $state.raw(new maplibregl.LngLat(0, 0));
  let geoData: any = $state(null);
  let dataMonth = $state('2026M02');
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      const [geo, employmentData] = await Promise.all([
        fetch('/data/kunnat.geojson').then(r => r.json()),
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