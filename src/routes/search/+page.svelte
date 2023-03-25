<script lang="ts">
  import type { PageData } from "./$types";
  import { afterNavigate } from "$app/navigation";
  import Chart from "chart.js/auto";
  import nutrientDict from "../../json/nutrientDict.json";
  export let data: PageData;

    // ---------- Build state object
    let stateObj = {
      productNutrients: [],
      chartCarbs: 0,
      chartProtein: 0,
      chartFat: 0,
    };

    if (data.nutrientResponse.foods) {
        // Add any high-dose nutrients for product
        data.nutrientResponse.foods[0].full_nutrients.filter((item) => {
          const _id = item.attr_id;
          if (data.nutCodes[_id]) {
            const perc = (item.value / data.nutCodes[_id].limit) * 100;
            if (perc > 9) {
              stateObj.productNutrients.push(data.nutCodes[_id].name);
            }
          }
        });

        // Set true/false flags
        if (
          data.nutrientResponse.foods[0].nf_protein > 9 ||
          data.nutrientResponse.foods[0].nf_protein >
            data.nutrientResponse.foods[0].nf_total_carbohydrate * 0.2
        ) {
          stateObj.protein = true;
        }
        if (
          data.nutrientResponse.foods[0].nf_total_fat > 8 ||
          data.nutrientResponse.foods[0].nf_total_fat >
            data.nutrientResponse.foods[0].nf_protein
        ) {
          stateObj.fat = true;
        }
        if (data.nutrientResponse.foods[0].nf_dietary_fiber > 2) {
          stateObj.fiber = true;
        }
        if (
          (data.nutrientResponse.foods[0].nf_sugars /
            data.nutrientResponse.foods[0].nf_total_carbohydrate) *
            100 >
          40
        ) {
          stateObj.sugar = true;
        }
        if (
          data.nutrientResponse.foods[0].nf_total_carbohydrate >
          data.nutrientResponse.foods[0].nf_protein * 3
        ) {
          stateObj.carbs = true;
        }

        // Add data for pie chart
        stateObj.chartCarbs =
          data.nutrientResponse.foods[0].nf_total_carbohydrate * 4;
        stateObj.chartProtein = data.nutrientResponse.foods[0].nf_protein * 4;
        stateObj.chartFat = data.nutrientResponse.foods[0].nf_total_fat * 9;
    

          // Build pie chart
          afterNavigate(() => {
            /** @type {HTMLElement | null} */
            const ctx = document.getElementById("myChart");
            new Chart(ctx, {
              type: "pie",
              data: {
                labels: ["Carbs", "Protein", "Fat"],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [
                      stateObj.chartCarbs,
                      stateObj.chartProtein,
                      stateObj.chartFat,
                    ],
                    borderWidth: 1,
                  },
                ],
              },
            });
          });
      }

    // Modal message components
    let show = false;
    let modalTitle;
    let modalMessage;

    // Show and load modal
    function toggleShow(str) {
      if (str === "close") {
        show = false;
      } else {
        show = true;
      }
      modalTitle = str.nutrient;
      modalMessage = nutrientDict[str.nutrient];
    }


</script>

<!-- ------------------ HTML Begin --------------------- -->

{#if data.error}
  <section>
    <div class="section-item flex">
      <div>
        <h3>{data.error}. Try again!</h3>
      </div>
    </div>
  </section>
{:else}
  <section>
    <div class="section-item">
      <h2>{data.title}</h2>
      <p class="intro">
        {#if stateObj.protein && stateObj.fat}
          Good amount of protein and some fat.
        {:else if stateObj.protein}
          Good amount of protein.
        {:else if stateObj.fat}
          Has a lot of fat.
        {/if}

        {#if stateObj.fiber}
          Good amount of fiber.
        {/if}
        {#if stateObj.sugar}
          Its has some sugar.
        {/if}

        {#if stateObj.productNutrients.length > 0}
          It has these nutrients/minerals:
          {#each stateObj.productNutrients as nutrient}
            <a href="#" on:keydown on:click={() => toggleShow({ nutrient })}>{nutrient}</a
            >{", "}
          {/each}
        {/if}
      </p>
      {#if show}
        <div id="myModal" class="modal">

          <div class="modal-content">
            <span on:keydown on:click={() => toggleShow("close")} class="close"
              >&times;</span
            >
            <h4><strong> {modalTitle} </strong></h4>
            <p>{modalMessage}</p>
          </div>
        </div>
      {/if}
    </div>
    <div
      on:keydown
      on:click={() => toggleShow("close")}
      class="section-item flex border"
    >
      <div class="border2">
        <h2>Calories chart</h2>
        <div class="chartArea">
          <canvas id="myChart" />
        </div>

        <div>
          <h2>Avg Daily</h2>
          <ul>
            {#each data.targetData as data, i}
              <li>
                {data.name}
                <ul><li>{data.value}</li></ul>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <div class="border2">
        <h2>Basics</h2>
        <ul>
          <li>Serving Qty: {data.nutrientResponse.foods[0].serving_qty}</li>
          <li>Serving Unit: {data.nutrientResponse.foods[0].serving_unit}</li>
          <li>
            Serving weight: {data.nutrientResponse.foods[0]
              .serving_weight_grams} g
          </li>
          <hr />
          <li>Calories: {data.nutrientResponse.foods[0].nf_calories}</li>
          {#if stateObj.carbs}
            <li>
              <strong
                >Total Carbs: {data.nutrientResponse.foods[0]
                  .nf_total_carbohydrate} g</strong
              >
            </li>
          {:else}
            <li>
              Total Carbs: {data.nutrientResponse.foods[0]
                .nf_total_carbohydrate} g
            </li>
          {/if}

          {#if stateObj.fat}
            <li>
              <strong
                >Total Fat: {data.nutrientResponse.foods[0].nf_total_fat} g</strong
              >
            </li>
          {:else}
            <li>Total Fat: {data.nutrientResponse.foods[0].nf_total_fat} g</li>
          {/if}

          {#if stateObj.protein}
            <li>
              <strong
                >Protein: {data.nutrientResponse.foods[0].nf_protein} g</strong
              >
            </li>
          {:else}
            <li>Protein: {data.nutrientResponse.foods[0].nf_protein} g</li>
          {/if}

          {#if stateObj.fiber}
            <li>
              <strong
                >Fiber: {data.nutrientResponse.foods[0].nf_dietary_fiber} g</strong
              >
            </li>
          {:else}
            <li>Fiber: {data.nutrientResponse.foods[0].nf_dietary_fiber} g</li>
          {/if}
          <hr />
          <li>Sodium: {data.nutrientResponse.foods[0].nf_sodium} mg</li>

          {#if (data.nutrientResponse.foods[0].nf_sugars / data.nutrientResponse.foods[0].nf_total_carbohydrate) * 100 > 40}
            <li>
              <strong
                >Sugars: {data.nutrientResponse.foods[0].nf_sugars} g</strong
              >
            </li>
          {:else}
            <li>Sugars: {data.nutrientResponse.foods[0].nf_sugars} g</li>
          {/if}

          <li>
            Saturated Fat: {data.nutrientResponse.foods[0].nf_saturated_fat} g
          </li>
          <li>Potassium: {data.nutrientResponse.foods[0].nf_potassium} mg</li>
          <li>
            Cholesterol: {data.nutrientResponse.foods[0].nf_cholesterol} g
          </li>
        </ul>
        <img src={data.nutrientResponse.foods[0].photo.thumb} alt="" />
      </div>

      <div class="border2">
        <h2>Nutrients</h2>
        <ul>
          {#each data.nutrientResponse.foods[0].full_nutrients as nutrient}
            {#if data.nutCodes[nutrient.attr_id]}
              {#if ((nutrient.value / data.nutCodes[nutrient.attr_id].limit) * 100).toFixed() > 10}
                <li>
                  <strong>
                    {data.nutCodes[nutrient.attr_id].name} ({nutrient.value}
                    {#if data.nutCodes[nutrient.attr_id].limit !== 100}
                      / {data.nutCodes[nutrient.attr_id].limit}
                      {data.nutCodes[nutrient.attr_id].weight})
                      {(
                        (nutrient.value /
                          data.nutCodes[nutrient.attr_id].limit) *
                        100
                      ).toFixed()}%
                    {:else}{data.nutCodes[nutrient.attr_id].weight}){/if}
                  </strong>
                </li>
              {:else}
                <li>
                  {data.nutCodes[nutrient.attr_id].name} ({nutrient.value}
                  {#if data.nutCodes[nutrient.attr_id].limit !== 100}
                    / {data.nutCodes[nutrient.attr_id].limit}
                    {data.nutCodes[nutrient.attr_id].weight})
                    {(
                      (nutrient.value / data.nutCodes[nutrient.attr_id].limit) *
                      100
                    ).toFixed()}%
                  {:else}{data.nutCodes[nutrient.attr_id].weight}){/if}
                </li>
              {/if}
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  </section>
{/if}

<style>
  /* * {
    border: 1px solid blue;
  } */

  h2 {
    margin: 1rem 0 0 0;
  }

  h4 {
    margin: 0 0 0 0;
  }

  p {
    margin: 0.1rem 0 1rem 0;
  }

  img {
    border-radius: 1rem;
    margin-top: 1.5rem;
  }

  ul {
    margin: 0.3rem 0 0 0;
  }

  li {
  }

  .intro {
    padding: 0 1rem 0 0;
  }

  hr {
    width: 60%;
    margin-left: 0;
  }

  /* ---------------- Section -------------- */

  section {
    margin: 0 0 0 3rem;
  }

  .flex {
    display: flex;
    gap: 1rem;
    padding: 0 1rem 1rem 0;
  }

  .flex div {
    min-width: 24%;
  }

  .flex:last-child {
    min-width: 25%;
  }

  .flex div:last-of-type {
    width: 100%;
  }

  .flex div:nth-child(1) {
    margin-right: -1.5rem;
    margin-right: 0;
  }

  .chartArea {
    width: 230px;
    height: 230px;
    padding-right: 1rem;
    padding-bottom: 0;
    margin-bottom: 0;
  }

  .border {
    border: 1px solid #333;
    border-radius: 1rem;
    margin: 0.5rem 2rem 2rem -1rem;
    padding: 0 1rem 1rem 1rem;
    color: #333;
    background-color: #d2e5ce;
  }

  .border2 {
    border: 1px solid #333;
    border-radius: 1rem;
    color: #333;
    background-color: white;
    margin: 1rem 0 0 0;
    padding: 0 1rem 1rem 1rem;
  }

  strong {
    color: darkblue;
    background-color: #eee;
  }

  .modal strong {
    background-color: #eee;
  }


  @media (max-width: 1100px) {
    .flex {
      flex-direction: column;
    }

    
    .flex div {
      width: 90%;
    }

    .flex div:last-of-type {
      width: 90%;
    }
  }
</style>
