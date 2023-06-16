import Link from "next/link";
import { useEffect, useState } from "react";
import BubbleChart from "../components/organisms/BubbleChart/BubbleChart";
import calcul from '../libs/calcul'
import calcul2 from "../libs/calcul2";
import calcul4 from "../libs/calcul4";
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
      const science_fiction_unpacked = unpack(data,'Science-fiction');
      let dataadzffegr = calcul4(discipline1_unpacked,discipline2_unpacked,science_fiction_unpacked);
      setDataGraph(dataadzffegr)
      console.log(dataadzffegr)
    }
  },[data])

  return (
    <div id="app">
      <article>
        <BubbleChart dataGraph={dataGraph} name='asop'/>
      </article>
      <Link href="/question3"><button className="prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button></Link>
      <Link href="/conclusion"><button className="next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg></button></Link>
    </div>
  )
}