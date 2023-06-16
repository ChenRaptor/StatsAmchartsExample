import Link from "next/link";
import { useEffect, useState } from "react";
import ClusteredColumnChart from "../components/organisms/ClusteredColumnChart/ClusteredColumnChart";
import calcul from '../libs/calcul'
import unpack from '../libs/unpack'


export default function Index() {
  
  const [data,setData] = useState();
  const [dataGraph,setDataGraph] = useState({});

  const dataGetter = async () => {
    const response = await fetch(`./api/dataGetter`);
    const result = await response.json();
    setData(result);
    return result;
  }

    // useEffect est un hook au même titre que useState, celui ci permet de lancer du code coté client.
    // [data] <=> Si cette variable change le code est relancé.
    // [] <=> Le code se lance uniquement au démarage.
    // undefined <=>  Le code se lance en continue.
    // Dès qu'il récupére dataGraph il lance le code
  useEffect(() => {
    console.log(dataGetter());
  },[])

  useEffect(() => {
    if (data) {
      const discipline1_unpacked = unpack(data,'Discipline-favorite');
      const genre_unpacked = unpack(data,'genre');
      setDataGraph((dataGraph.genreFavoriteMatter = calcul(discipline1_unpacked,genre_unpacked),dataGraph));
    }
  },[data])

  return (
    <div id="app">
      <article>
        <ClusteredColumnChart dataGraph={dataGraph?.genreFavoriteMatter} name='genreFavoriteMatter'/>
      </article>
      <Link href="/question2"><button className="next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></button></Link>
      <Link href="/"><button className="prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button></Link>
    
    </div>
  )
}