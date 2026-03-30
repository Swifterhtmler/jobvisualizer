
<script>

</script>


<svelte:head>
  <title>Ammattomaatti</title>
</svelte:head>

<div class="header">
<h1>Ammattomaatti</h1>
<div class="subNavBar">
  <div class="subSubNavSection" >
    <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
  </div>
</div>
</div>


<div class="filtersPage">

</div>






<style>


h1 {
    font-size: 3.2em;
    color: rgb(80, 80, 80);
    margin-left: 15px; 
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
    width: 23em;
    height: 100px;
    margin-top: 1.0em;
    border: 1px black solid;
    border-radius: 10px;
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
}



</style>



