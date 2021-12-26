import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getData } from './api';
import { ToDoList } from './components/ToDoList';
import { UpdateItem } from './components/UpdateItem';
import { casesOfCovids } from './state/atoms';
import { Covid } from './types';

const endpoint = (
  'https://api.coronavirus.data.gov.uk/v1/data?' +
  'filters=areaType=nation;areaName=england&' +
  'structure={"date":"date","newCases":"newCasesByPublishDate"}'
);

function App() {
  // const [covidCases, setCovidCases] = useState<Covid[]>([])
  const [ allCases, setAllCases] = useRecoilState(casesOfCovids)

  useEffect(() => {
    const main = async () => {
      const result = await getData(endpoint);
      setAllCases(result.data)
    }
    main()
  },[])

  return (
    <div className="App">
      {allCases.length > 0 && allCases.map((entry, index) => {
        // eslint-disable-next-line no-lone-blocks
        { while(index<20)
          return(
        <div key={index}>{index} date: {entry.date} , number of cases: {entry.newCases}</div>   
          )
        }
      }) }
      {/* <ToDoList />
      <UpdateItem /> */}
    </div>
  );
}

export default App;
