import axios from "axios";


export const getData = async ( url: string ) => {

  const { data, status, statusText } = await axios.get(url, { timeout: 10000 });

  if ( status >= 400 )
      throw new Error(statusText);

  return data

};  