import type { PageLoad } from './$types';
import response1 from '../json/response1.json'
import response2 from '../json/response2.json'
import response3 from '../json/response3.json'
import response4 from '../json/response4.json'
import response5 from '../json/response5.json'
import response6 from '../json/response6.json'
import response7 from '../json/response7.json'
import response8 from '../json/response8.json'
import response9 from '../json/response9.json'
import response10 from '../json/response10.json'
import response11 from '../json/response11.json'
import response12 from '../json/response12.json'
import response13 from '../json/response13.json'
import response14 from '../json/response14.json'
import response15 from '../json/response15.json'
import response16 from '../json/response16.json'
import response17 from '../json/response17.json'
import nutrientCodes from '../json/nutrientCodes.json'
import targetData from '../json/targetData.json'

const responseArr = [response1, response2, response3, response4, response5, response6, response7, response8, response9, response10,
  response11, response12, response13, response14, response15, response16, response17,
]
const nutrientResponse = responseArr[Math.floor(Math.random() * responseArr.length)]



const nameArr = nutrientResponse.foods[0].food_name.split('')
let title = ''
title = nameArr[0].toUpperCase() + nameArr.slice(1).join('')
const nutCodes = nutrientCodes
 
export const load = (({ params }) => {
  return {
    nutrientResponse, title, nutCodes, targetData
  };
}) satisfies PageLoad;