import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import nutrientCodes from '../../json/nutrientCodes.json'
import targetData from '../../json/targetData.json'
import response1 from '../../json/response1.json'
import response2 from '../../json/response2.json'
import response3 from '../../json/response3.json'
import response4 from '../../json/response4.json'
import response5 from '../../json/response5.json'
import response6 from '../../json/response6.json'
import response7 from '../../json/response7.json'
import response8 from '../../json/response8.json'
import response9 from '../../json/response9.json'
import response10 from '../../json/response10.json'
import response11 from '../../json/response11.json'
import response12 from '../../json/response12.json'
import response13 from '../../json/response13.json'
import response14 from '../../json/response14.json'
import response15 from '../../json/response15.json'
import response16 from '../../json/response16.json'
import response17 from '../../json/response17.json'

let formWord
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    formWord = data.get('searchWord');
  }
} satisfies Actions;


export const load = (async ({ fetch, url }) => {

//   const responseArr = [response1, response2, response3, response4, response5, response6, response7, response8, response9, response10,
//     response11, response12, response13, response14, response15, response16, response17,
//   ]
// const nutrientResponse = responseArr[Math.floor(Math.random() * responseArr.length)]
// // const nutrientResponse = responseArr[8]

  let params = new URLSearchParams(url.search);
  let search = params.get("searchWord")

  const searchWord = search
  let word = searchWord ? searchWord : formWord ? formWord : 'eggs'

  const NutrientResponse = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-agent": "Nutri-Find /0.1 +http://adb.nutri-find.com",
      "x-app-id": "76d6d0d7",
      "x-app-key": "d42baed76ad9da8fac74fb6b7ed9905d",
      "x-remote-user-id": "0"
    },
    body: JSON.stringify(
      {
        "query": word,
      }
    )
  });


  const nutrientResponse = await NutrientResponse.json();


  
  let error
  let title = ''

  if (nutrientResponse.message) {
    error = nutrientResponse.message
  } else {
    const nameArr = nutrientResponse.foods[0].food_name.split('')
    title = nameArr[0].toUpperCase() + nameArr.slice(1).join('')
    // console.log(title)
  }
  const nutCodes = nutrientCodes

  return {
    nutrientResponse, title, nutCodes, targetData
  };
}) satisfies PageServerLoad;