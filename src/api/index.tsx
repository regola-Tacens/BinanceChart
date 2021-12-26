import axios from "axios";

// const endpoint = (
//   'https://api.coronavirus.data.gov.uk/v1/data?' +
//   'filters=areaType=nation;areaName=england&' +
//   'structure={"date":"date","newCases":"newCasesByPublishDate"}'
// );


export const getData = async ( url: string ) => {

  const { data, status, statusText } = await axios.get(url, { timeout: 10000 });

  if ( status >= 400 )
      throw new Error(statusText);

  return data

};  // getData

// const main = async () => {

// const result = await getData(endpoint);

// console.log(result);

// };  // main


// main().catch(err => {
// console.error(err);
// process.exitCode = 1;
// });