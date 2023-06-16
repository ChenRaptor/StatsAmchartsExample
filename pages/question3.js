import Link from "next/link";
import { useEffect, useState } from "react";
import DonutChart from "../components/organisms/DonutChart/DonutChart";
import calcul3 from "../libs/calcul3";
import unpack from '../libs/unpack'


export default function Index() {
  
  const [data,setData] = useState();
  const [dataGraph,setDataGraph] = useState();

  const dataGetter = async () => {
    const response = await fetch(`./api/dataGetter`);
    const result = await response.json();
    setData(result);
    return result;
  }

  useEffect(() => {
    console.log(dataGetter());
  },[])

  useEffect(() => {
    if (data) {
      const discipline1_unpacked = unpack(data,'Discipline-favorite');
      const discipline2_unpacked = unpack(data,'Seconde-discipline-favorite');
      const sport_unpacked = unpack(data,'sport');
      const genre_unpacked = unpack(data,'genre');
      setDataGraph(calcul3(discipline1_unpacked,discipline2_unpacked,sport_unpacked));
      console.log(dataGraph)
    }
  },[data])

  return (
    <div id="app">
      <article>
        <DonutChart dataGraph={dataGraph}/>
      </article>
      <Link href="/question4"><button className="next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></button></Link>
      <Link href="/question2"><button className="prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button></Link>
    </div>
  )
}