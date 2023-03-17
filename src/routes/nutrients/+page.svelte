<script lang="ts">
  import type { PageData } from "./$types";
  import nutrientDict from '../../json/nutrientDict.json'
  import nutrientList from '../../json/nutrientList.json'

  export let data: PageData;
</script>

<section>
  <h2>Nutrients</h2>
  <div class="section-item">
    {#each nutrientList as nutrient}
    <h3 id={nutrient}>{nutrient}</h3>
    <p>{nutrientDict[nutrient]}</p>
    {/each}

  </div>
</section>

<style>
  /* * {
    border: 1px solid blue;
  } */


  h2 {
    margin: 1rem 0 0 0;
  }


  p {
    margin: 0 0 .3rem 0;
  }


  /* ---------------- Section -------------- */

  section {
    margin: 0 0 3rem 3rem;
  }

  h3 {
    margin: 1rem 0 0 0;
  }
  .section-item {
    padding: 0 6rem 0 0;
  }
</style>
