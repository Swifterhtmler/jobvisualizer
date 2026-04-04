<script>
  import { onMount } from 'svelte';
  import { MapLibre, GeoJSONSource, FillLayer, LineLayer, Popup } from 'svelte-maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';


  // --- Mock unemployment data ---
  const unemploymentKunnat = {
    '091': 8.2, '049': 5.1, '092': 6.3, '837': 12.4, '853': 15.5,
    '564': 13.1, '179': 9.8, '398': 17.6, '405': 14.2, '297': 11.0,
  };

  const unemploymentMaakunnat = {
    '01': 7.8, '02': 10.2, '04': 11.5, '05': 9.1, '06': 10.8,
    '07': 9.4, '08': 11.2, '09': 13.1, '10': 12.8, '11': 11.9,
    '12': 13.5, '13': 9.6, '14': 10.3, '15': 9.7, '16': 8.9,
    '17': 11.1, '18': 13.8, '19': 5.7, '21': 2.5,
  };

  // --- UI state (SAFE for $state) ---
  let view = $state('maakunnat');
  let selectedRegion = $state(null);

  // --- DATA (NOT $state!) ---
  let kunnatData = null;
  let maakunnatData = null;

  // --- Load GeoJSON ---
  onMount(async () => {
    try {
      const [k, m] = await Promise.all([
        fetch('/data/kunnat.geojson').then(r => {
          if (!r.ok) throw new Error('kunnat failed');
          return r.json();
        }),
        fetch('/data/maakunnat.geojson').then(r => {
          if (!r.ok) throw new Error('maakunnat failed');
          return r.json();
        })
      ]);

      kunnatData = k;
      maakunnatData = m;
    } catch (err) {
      console.error('GeoJSON load failed:', err);
    }
  });

  // --- Enrich ---
  function enrichGeoJSON(geojson, dataMap) {
    return {
      ...geojson,
      features: geojson.features.map(f => ({
        ...f,
        properties: {
          ...f.properties,
          unemployment: dataMap[f.properties.NATCODE] ?? null,
        }
      }))
    };
  }

  // --- Derived (RUNES SAFE) ---
  let kunnat = $derived(() =>
    kunnatData ? enrichGeoJSON(kunnatData, unemploymentKunnat) : null
  );

  let maakunnat = $derived(() =>
    maakunnatData ? enrichGeoJSON(maakunnatData, unemploymentMaakunnat) : null
  );

  let activeData = $derived(() =>
    view === 'kunnat' ? kunnat : maakunnat
  );

  // --- Colors ---
  const colorExpression = [
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

  function handleClick(e) {
    const f = e.features?.[0];
    if (!f) return;

    selectedRegion = {
      name: f.properties.NAMEFIN,
      value: f.properties.unemployment,
      lngLat: e.lngLat
    };
  }
</script>

<div class="map-wrapper">
  <div class="controls">
    <button
      class:active={view === 'maakunnat'}
      onclick={() => { view = 'maakunnat'; selectedRegion = null; }}
    >
      Maakunnat
    </button>

    <button
      class:active={view === 'kunnat'}
      onclick={() => { view = 'kunnat'; selectedRegion = null; }}
    >
      Kunnat
    </button>
  </div>

  <div class="map">
    <MapLibre
      style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      center={[26, 65]}
      zoom={4.8}
    >
      {#if activeData}
        <GeoJSONSource id="regions" data={activeData}>
          <FillLayer
            paint={{
              'fill-color': colorExpression,
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.95,
                0.75
              ]
            }}
            manageHoverState
            on:click={handleClick}
          />

          <LineLayer
            paint={{
              'line-color': '#ffffff',
              'line-width': view === 'kunnat' ? 0.4 : 1,
              'line-opacity': 0.8,
            }}
          />
        </GeoJSONSource>
      {/if}

      {#if selectedRegion}
        <Popup
          lngLat={selectedRegion.lngLat}
          on:close={() => selectedRegion = null}
        >
          <div class="popup">
            <strong>{selectedRegion.name}</strong>
            {#if selectedRegion.value !== null}
              <p>Työttömyys: <b>{selectedRegion.value}%</b></p>
            {:else}
              <p>Ei dataa</p>
            {/if}
          </div>
        </Popup>
      {/if}
    </MapLibre>
  </div>

  <div class="legend">
    <div class="legend-title">Työttömyys %</div>
    <div class="legend-scale">
      <div><span style="background:#00897B"></span> &lt;8%</div>
      <div><span style="background:#80CBC4"></span> 8–12%</div>
      <div><span style="background:#FFCCBC"></span> 12–16%</div>
      <div><span style="background:#EF6C5B"></span> 16–20%</div>
      <div><span style="background:#B71C1C"></span> &gt;20%</div>
      <div><span style="background:#ccc"></span> Ei dataa</div>
    </div>
  </div>
</div>

<style>
  .map-wrapper {
    position: relative;
    width: 100%;
    height: 500px;
    border-radius: 10px;
    overflow: hidden;
  }

  .map {
    height: 100%;
    width: 100%;
  }

  .controls {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 10;
    display: flex;
    gap: 8px;
  }

  .controls button {
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-size: 0.85rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }

  .controls button.active {
    background: #00897B;
    color: white;
  }

  .legend {
    position: absolute;
    bottom: 20px;
    right: 12px;
    background: white;
    padding: 10px;
    border-radius: 8px;
    font-size: 0.8rem;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }

  .legend-scale div {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .legend-scale span {
    width: 14px;
    height: 14px;
    display: inline-block;
  }
</style>