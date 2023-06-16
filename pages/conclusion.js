import Link from "next/link";


export default function Index() {

  return (
    <div id="app">
    <article id="conclusion">
        <h1 style={{fontSize: "50px"}}>Pour conclure</h1>
        <p>
        En résumé, on peut constater que les garçons ont un attrait plus prononcé pour l'EPS, l'informatique et la technologie que les filles, 
        alors que les filles apprécient davantage les matières comme les arts plastiques et les langues vivantes. 
        </p>
        <p>
        Il y a des corrélations positives entre certaines matières telles que l'informatique et la technologie, les mathématiques et l'informatique, l'EPS et les mathématiques. 
        </p>
        <p>
        Il y a également une corrélation positive entre l'affection pour l'EPS et la pratique de sport.
        </p>
        <p>
        Il y a une affection générale pour la science-fiction chez les étudiants, mais il y a des exceptions, notamment pour les combinaisons d'étudiants qui aiment l'informatique et les langues vivantes ou les langues vivantes et les mathématiques.
        </p>
      </article>
      <Link href="/question4"><button className="prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button></Link>
    </div>
  )
}
