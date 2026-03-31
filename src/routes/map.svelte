<script>
  import { MapLibre, Marker, NavigationControl, ScaleControl } from 'svelte-maplibre-gl';
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
 <NavigationControl />
  <ScaleControl />
</MapLibre>

</div>