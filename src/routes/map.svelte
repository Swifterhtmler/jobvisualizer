<script lang="ts">
  import { MapLibre, Marker, NavigationControl, ScaleControl, FillLayer, LineLayer, GeoJSONSource, FeatureState, Popup } from 'svelte-maplibre-gl';
  import maplibregl from 'maplibre-gl';
  
  
  let hoveredFeature: maplibregl.MapGeoJSONFeature | undefined = $state.raw();
  let lnglat = $state.raw(new maplibregl.LngLat(0, 0));
</script>

<div class="map" style="height: 100%; width: 100%; border-radius: 10px; overflow: hidden;"> 
<!-- <MapLibre class="h-[100%]" style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json" />-->

<MapLibre
 zoom={4.8}
  center={[26, 63.8]}
  class="h-[100%]"
  style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
>
 <!-- <Marker lnglat={[141.692222, 42.775]} /> -->
 
 <!--Navigation controls and scale controls-->
 
 <NavigationControl />
 <ScaleControl />


 <!--fill layer and lines-->

   <GeoJSONSource data="/data/maakunnat.geojson">
    <FillLayer
      paint={{
        'fill-color': '#00ff55',
        // Change the opacity for the hovered feature
        'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.4, 0.1]
      }}
      onmousemove={(ev) => {
        // Listen to mousemove events to track the hovered feature
        hoveredFeature = ev.features?.[0];
        lnglat = ev.lngLat; // cursor location
      }}
      onmouseleave={() => (hoveredFeature = undefined)}
    />
    <LineLayer
      paint={{
        'line-color': '#00ff55',
        // Change the opacity for the hovered feature
        'line-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.3],
        'line-width': 1
      }}
    />
    {#if hoveredFeature}
      <!-- Set the hover state on the source for the hovered feature -->
      <FeatureState id={hoveredFeature.id} state={{ hover: true }} />
      <Popup {lnglat} closeButton={false}>{hoveredFeature.properties.NAMEFIN}</Popup>
    {/if}
  </GeoJSONSource>










</MapLibre>

</div>