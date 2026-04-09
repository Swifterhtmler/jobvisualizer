<script>
  import UnemploymentMap from "./unemploymentMap.svelte";
  import UnemploymentPerMunicipalityState from "./unemploymentpermunicipalitystate.svelte";
  import { MapLibre } from 'svelte-maplibre-gl';
  import MapLayerUnit from "./mapLayerUnit.svelte";
  import PublicJobs from "./publicJobs.svelte";
  import PrivateJobs from "./privateJobs.svelte";
  import HealthServiceUnit from "./healthserviceunit.svelte";
  import Municipalityjobs from "./municipalityjobs.svelte";
  import Governmentjobs from "./governmentjobs.svelte";
  import PrivateIndividual from "./privateIndividual.svelte";

 // global variables with state
  import { jobtitledata } from '$lib/stores/jobSelection.svelte';
  
  import Alljobs from "./sectorJobs.svelte/alljobs.svelte";

 let karttaValinta = $state("UnemploymentMap");

 let activeGroup = $state("tyottomyys"); 

  let palkka = $state(3000);


  function updateKarttaValinta() {
    karttaValinta = "UnemploymentMap";
    // console.log("karttavalinta", {karttaValinta});
  }

  function updateKarttaValintaKunnittain() {
    karttaValinta = "UnemploymentPerMunicipalityState";
    // console.log("karttavalinta", {karttaValinta});
  }

  


</script>


<svelte:head>
  <title>Ammattomaatti - Työpaikat &amp; Työttömyys Suomessa</title>
  <meta name="description" content="Ammattomaatti näyttää avoimet työpaikat, työttömyysasteet ja työnhakutiedot Suomessa interaktiivisen kartan avulla. Tutki työmarkkinoita maakunnittain ja kunnittain." />
</svelte:head>

<div class="header">
<div>
  <h1>Ammattomaatti</h1>
  <p class="tagline">Suomalainen työpaikka- ja työttömyystietojen visualisointityökalu</p>
</div>
<div class="subNavBar">
    <!-- <div class="nameandinputfield"> -->
  <!-- <p style="margin-top: 1rem;">Työttömyys</p> -->
  <!-- <div class="select">  -->
  <select onchange={(event) => karttaValinta = event.target.value}>
    <option value="UnemploymentMap">Työttömyys maakunnittain</option>
    <option value="UnemploymentPerMunicipalityState">Työttömyys kunnittain</option>
  </select>
  <!-- </div> -->
<!-- </div> -->
    <!-- <p style="margin-left: 1rem;">Alakohtaiset erot <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a></p>
      -->
    <select onchange={(event) => karttaValinta = event.target.value}>
    <option value="PublicJobs">Kaikki työt</option>
    <option value="PrivateJobs">Yksityiset työt</option>
    <option value="HealthServiceUnit">Hyvinvointialue työt</option>
    <option value="Municipalityjobs">Kunnalliset työt</option>
    <option value="Governmentjobs">Valtion työt</option>
    <option value="PrivateIndividual">Yksityishenkilöt, kotitaloudet</option>
    </select>
</div>
</div>



<div class="mainPageUnit">
  <div class="filtersPage">    
    <p style="margin-top: 10px;">Avoimet työpaikat</p>
<div class="filtersubUnitSub">   

  

  <!-- <div class="labelInput">
  </div> -->

  <!-- <div class="buttondivUnit">
    <button onclick={something}>Osa-aika työt</button>
    <button onclick={something}>Koko aikatyöt</button>
    <button onclick={something}>Julkisen sektorin työt</button>
    <button onclick={something}>Yksityisen sektorin työt</button>
  </div> -->



  <!-- <div class="nameandinputfield">
  <p style="margin-top: 1rem;">Työaika</p>
  <div class="select">
    <select onchange={() => karttaValinta = 'Alljobs'} bind:value={jobtitledata.textthree}>
    <option value="SSS">Kaikki</option>
      <option value="2">Osa-aika työt</option>
      <option value="1">Koko aikatyöt</option>
    </select>
  </div>
</div> -->

<div class="nameandinputfield">
  <p style="margin-top: 1rem;">Ammattiryhmä</p>
  <div class="select">
  <select onchange={() => karttaValinta = 'Alljobs'} bind:value={jobtitledata.text}>
  <!-- <option value="SSS">Kaikki Yhteensä</option> -->
  <option value="11">Johtajat, ylimmät virkamiehet ja järjestöjen jt</option>
  <option value="12">Hallintojohtajat ja kaupalliset johtajat</option>
  <option value="13">Tuotantotoiminnan, yhteiskunnan peruspalvelujen jt</option>
  <option value="14">Hotelli-, ravintola-, kaupan, muiden palvelujen jt</option>
  <option value="21">Luonnontieteiden ja tekniikan erityisasiantuntijat</option>
  <option value="22">Terveydenhuollon erityisasiantuntijat</option>
  <option value="23">Opettajat ja muut opetusalan erityisasiantuntijat</option>
  <option value="24">Liike-elämän ja hallinnon erityisasiantuntijat</option>
  <option value="25">Tieto- ja viestintäteknologian erityisasiantuntijat</option>
  <option value="26">Lainopilliset, sosiaalialan ja kulttuurialan er.</option>
  <option value="31">Luonnontieteiden ja tekniikan asiantuntijat</option>
  <option value="32">Terveydenhuollon asiantuntijat</option>
  <option value="33">Liike-elämän ja hallinnon asiantuntijat</option>
  <option value="34">Lakiavustajat ja sosiaali- ja kulttuurialan a.</option>
  <option value="35">Informaatio- ja tietoliikenneteknologian a.</option>
  <option value="41">Toimistotyöntekijät</option>
  <option value="42">Asiakaspalvelutyöntekijät</option>
  <option value="43">Laskennan ja varastoinnin toimistotyöntekijät</option>
  <option value="44">Muut toimisto- ja asiakaspalvelutyöntekijät</option>
  <option value="51">Palvelutyöntekijät</option>
  <option value="52">Myyjät, kauppiaat ym.</option>
  <option value="53">Hoivapalvelun ja terveydenhuollon työntekijät</option>
  <option value="54">Suojelu- ja vartiointityöntekijät</option>
  <option value="61">Maanviljelijät ja eläintenkasvattajat ym.</option>
  <option value="62">Metsä- ja kalatalouden työntekijät</option>
  <option value="71">Rakennustyöntekijät ym. (pl. sähköasentajat)</option>
  <option value="72">Konepaja- ja valimotyöntt, asentajat ja korjaajat</option>
  <option value="73">Käsityötuotevalmistajat, hienomek., painoalan tt</option>
  <option value="74">Sähkö- ja elektroniikka-alan työntekijät</option>
  <option value="75">Elintarv.-,puutyö- ,vaatetus-, jalkinealan valm.tt</option>
  <option value="81">Prosessityöntekijät</option>
  <option value="82">Teollisuustuotteiden kokoonpanijat</option>
  <option value="83">Kuljetustyöntekijät</option>
  <option value="91">Siivoojat, kotiapulaiset ja muut puhdistustt</option>
  <option value="92">Maa-, metsä- ja kalatalouden avustavat työntekijät</option>
  <option value="93">Teollisuuden ja rakentamisen avustavat työntekijät</option>
  <option value="94">Avustavat keittiö- ja ruokatyöntekijät</option>
  <option value="95">Katumyyjät, kengänkiillottajat ym.</option>
  <option value="96">Katujen puhtaanapidon ja jätehuollon työntekijät</option>
  <option value="01">Upseerit</option>
  <option value="02">Aliupseerit</option>
  <option value="03">Sotilasammattihenkilöstö</option>
  <option value="X0">Yrittäjät</option>
  <option value="X1">Opiskelijat</option>
  <option value="X2">Ei ammattia</option>
  <option value="X3">Ammattia vaihtavat</option>
  <option value="X4">Vastavalmistuneet</option>
  <option value="X5">Valmennukset</option>
  <option value="X6">Koulutukset, muu kuin ammatillinen</option>
  <option value="X9">Määrittelemättömät ja poistetut luokat</option>
</select>
  </div>
</div>


<div class="nameandinputfield">
  <p style="margin-top: 1rem;">Työnantaja ammattiryhmällä</p>
  <div class="select">
    <select bind:value={jobtitledata.texttwo} onchange={() => karttaValinta = 'Alljobs'}>
      <option value="SSS">Yhteensä</option>
      <option value="01">Valtio</option>
      <option value="02">Kunta</option>
      <option value="03">Yksityinen työnant., yhteisö pl.yr</option>
      <option value="04">Yritys</option>
      <option value="05">Yksityishenkilö, kotitalous</option>
      <option value="06">Kuntayhtymä, kuntainliitto</option>
      <option value="07">Hyvinvointialue</option>
      <option value="X">Tuntematon</option>
    </select>
  </div>
</div>

<!-- <div class="nameandinputfield">
  <p style="margin-top: 1rem;">Työnantaja</p>
  <div class="select">
    <select onchange={(event) => karttaValinta = event.target.value}>
      <option value="PublicJobs">Kaikki työt</option>
      <option value="PrivateJobs">Yksityiset työt</option>
      <option value="HealthServiceUnit">Hyvinvointialue työt</option>
      <option value="Municipalityjobs">Kunnalliset työt</option>
      <option value="Governmentjobs">Valtion työt</option>
      <option value="PrivateIndividual">Yksityishenkilöt, kotitaloudet</option>
    </select>
  </div>
</div> -->
  
  <!-- <div class="buttondivUnit">
  <button onclick={updateKarttaValinta}>Työttömyys maakunnittain</button>
  </div>
  <div class="buttondivUnit">
  <button onclick={updateKarttaValintaKunnittain}>Työttömyys kunnittain</button>
  </div> -->
   <!-- <div class="nameandinputfield">
  <p style="margin-top: 1rem;">Työttömyys</p>
  <div class="select"> 
  <select bind:value={karttaValinta}>
    <option value="UnemploymentMap">Työttömyys maakunnittain</option>
    <option value="UnemploymentPerMunicipalityState">Työttömyys kunnittain</option>
  </select>
  </div>
</div> -->

</div>
</div>

  <div class="mapPageUnit">
    {#if karttaValinta === "UnemploymentMap"}
      <UnemploymentMap />
    {:else if karttaValinta === "UnemploymentPerMunicipalityState"}
      <UnemploymentPerMunicipalityState />
    {:else if karttaValinta === "PublicJobs"}
      <PublicJobs />
    {:else if karttaValinta === "PrivateJobs"}
      <PrivateJobs />
    {:else if karttaValinta === "HealthServiceUnit"}
      <HealthServiceUnit />
    {:else if karttaValinta === "Municipalityjobs"}
      <Municipalityjobs /> 
    {:else if karttaValinta === "Governmentjobs"}
      <Governmentjobs />
    {:else if karttaValinta === "PrivateIndividual"}
      <PrivateIndividual />  
    {:else if karttaValinta === "Alljobs"}
     <Alljobs />  
    {/if}
    <!-- <MapLayerUnit /> -->
  </div>


</div>

<div class="copyrightUnit">
  <p style="padding: 10px; margin: 0;">
    <a href="/privacy-policy" style="color: rgb(50, 120, 112); text-decoration: none;">
      Tietosuojakäytäntö
    </a>
  </p>
</div>




<style>

h1 {
    font-size: 3.2em;
    color: rgb(50, 120, 112);
    margin-left: 15px; 
}

.tagline {
    font-size: 1rem;
    color: rgb(100, 100, 100);
    margin-left: 15px;
    margin-top: -10px;
    margin-bottom: 0;
    font-weight: 400;
}

/* button {
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
} */

.header {
    width: 100%; 
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background-color: rgb(220, 228, 235);
    flex-wrap: wrap;
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
    gap: 10px;

}

/* .subSubNavSection {
    display: flex;
    justify-content: left;
    align-items: center;
    background-color: rgb(200, 220, 225);
    border-radius: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 0.5em;
} */

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

p {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; 
    font-weight: 580;
    color: rgb(80, 120, 112);
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

.filtersubUnitSub {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    gap: 0.7rem;
    width: 90%;
    margin-top: 10px;
}



.nameandinputfield {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    background-color: rgb(230, 232, 250);
    width: 100%;
    border-radius: 5px;
}


/* .buttondivUnit {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    background-color: rgb(230, 232, 250);
    padding: 10px;
    width: 100%;
    border-radius: 5px;
} */



.filters {
    display: flex;
    flex-direction: column;
    gap: 3px;
    background-color: rgb(230, 235, 250);
    padding: 10px;
    border-radius: 5px;
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
    gap: 2px;
    background-color: rgb(230, 235, 250);
    padding: 5px;
    margin-top: 10px;
    border-radius: 5px;
    width: 100%;
    overflow-x: hidden;
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

    /* .subSubNavSection {
        margin-bottom: 0.5em;
    } */


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


.select {
    display: flex;
    flex-direction: column;
    gap: 3px;
    background-color: rgb(230, 235, 250);
    padding: 10px;
    border-radius: 5px;
    width: 100%;
}

select {
    all: unset;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #cec8c8;
    background-color: rgb(50, 120, 112);
    color: #fff;
    text-align: center;
    cursor: pointer;
}

select:hover {
    background-color: rgb(30, 90, 80);
    color: #fff;
}




</style>



