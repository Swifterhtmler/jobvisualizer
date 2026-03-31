
<script>
  import UnemploymentMap from "./unemploymentMap.svelte";
  import { MapLibre } from 'svelte-maplibre-gl';
  import MapLayerUnit from "./mapLayerUnit.svelte";



 let karttaValinta = $state("UnemploymentMap");


  let palkka = $state(3000);


  function updateKarttaValinta() {
    karttaValinta = "UnemploymentMap";
    // console.log("karttavalinta", {karttaValinta});
  }

  

</script>


<svelte:head>
  <title>Ammattomaatti</title>
</svelte:head>

<div class="header">
<h1>Ammattomaatti</h1>
<div class="subNavBar">
  <div class="subSubNavSection" >
    <p>Työttömyys <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a></p>
    <p style="margin-left: 1rem;">Alakohtaiset erot <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a></p>

  </div>
</div>
</div>



<div class="mainPageUnit">
  <div class="filtersPage">
  <div class="labelInput">
     <input bind:value={palkka} type="range" min="0" max="20000" class="slider" id="palkka">
     <label for="palkka">Palkka</label>
     <label for="palkka" style="margin-left: 1rem;">{palkka}</label>
  </div>
  <div class="labelInput">
  </div>
  
  <div class="buttondivUnit">
  <button onclick={updateKarttaValinta}>Työttömyyskartta</button>
  </div>
  </div>
  <div class="mapPageUnit">
    <!-- <UnemploymentMap/> -->
    {#if karttaValinta === "UnemploymentMap"}
      <UnemploymentMap />
    {:else if karttaValinta === "something"}
      <!--Fill this later on-->
    {/if}   
  <!-- <MapLayerUnit /> -->
</div>
</div>

<div class="copyrightUnit"></div>




<style>

h1 {
    font-size: 3.2em;
    color: rgb(50, 120, 112);
    margin-left: 15px; 
}

button {
    background-color: rgb(50, 120, 112);
    color: white;
    border: none;
    padding: 6px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-top: 1em;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.header {
    width: 100%; 
    height: 86px;
    display: flex;
    justify-content: left;
    align-items: center;
    border-radius: 10px;
    background-color: rgb(220, 228, 235);
}

.subNavBar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: right;
    align-items: center;
    background-color: rgb(210, 225, 230);
    border-radius: 10px;
    padding: 2px;
    margin-left: 1em;
    margin-right: 1em;
}

.subSubNavSection {
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: rgb(200, 220, 225);
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 0.5em;
}

.filtersPage {
    width: 18em;
    height: 80vh;
    margin-top: 1.0em;
    border: 1px black solid;
    border-radius: 10px;
    background-color: rgb(220, 228, 235);
    display: flex;
    align-items: center;
    flex-direction: column;
}

.mapPageUnit {
    flex-grow: 1;
    height: 80vh;
    margin-top: 1.0em;
    border: 1px black solid;
    border-radius: 10px;
    /* background-color: rgb(220, 228, 235); */
}

.mainPageUnit {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: flex-start;
    gap: 1rem;
}

.buttondivUnit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(230, 232, 250);
    padding: 10px;
    width: 100%;
}

.copyrightUnit {
    width: 100%;
    height: 70px;
    margin-top: 1.0em;
    border-radius: 10px;
    background-color: rgb(220, 228, 235);
}

.labelInput {
    display: flex;
    flex-direction: row;
    gap: 3px;
    background-color: rgb(230, 235, 250);
    padding: 5px;
    margin-top: 10px;
    border-radius: 5px;
    width: 100%;
}


@media (max-width: 600px) {
    .header {
        flex-direction: column;
        height: auto;
        padding: 10px;
    }

    .subNavBar {
        flex-direction: column;
        height: auto;
        padding: 10px;
        width: 95%;
    }

    .subSubNavSection {
        margin-bottom: 0.5em;
    }


    .mainPageUnit {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: flex-start;
    gap: 1rem;
}

.mapPageUnit {
    flex-grow: 1;
    min-width: 100%;
    height: 80vh;
    margin-top: 1.0em;
    border: 1px black solid;
    border-radius: 10px;
    background-color: rgb(220, 228, 235);
}

.filtersPage {
    width: 100%;
    height: 80vh;
    margin-top: 1.0em;
    border: 1px black solid;
    border-radius: 10px;
    background-color: rgb(220, 228, 235);
}


}



</style>



