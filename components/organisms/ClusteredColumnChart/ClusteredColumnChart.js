import { useEffect, useState } from "react";
import getDataValue from "../../../libs/getDataValue";
// importation css propre a ce composant
import style from './ClusteredColumnChart.module.css'

// React utilise énormément la déstructuration d'objet ou de tableau.

// Création du composant ClusteredColumnChart
const ClusteredColumnChart = ({name,dataGraph}) => {

    // React utilise des hooks qui permettent la gestion des composants, le hook useState sert a créer une variable qui dynamise le composant
    // En effet dès que l'on lui affecte une nouvelle valeur le composant s'autohydrate. On change sa valeur avec sa méthode setter (ici setUnit()).
    // Si on utilise pas son setter et que l'on affecte juste la variable, elle sera changé mais le composant pas réhydraté.
    const [unit, setUnit] = useState('number');
    const [dataValue, setDataValue] = useState();

    // fonction de changement de l'unité
    const handlerUnit = async (selectedValue) => {
      setUnit(selectedValue);
    }


    // Fonction de création du graphique
    const makeChart = (dataValue) => {
      let dataGraphValid = dataValue.dataGraph;

      let root = '';

        var myTheme = am5.Theme.new(root);

        // Edit un nouveau théme pour le graph
        // Les label comme ce de plotly sont donc de couleur blanche et 0.9em de font-size
        myTheme.rule("Label").setAll({
            fill: am5.color(0xFFFFFF),
            fontSize: "0.9em"
        })
                    
        // On utilise cette fonction pour éviter les erreurs, dès fois le graphique peu mal se chargé
        am5.ready(function() {

            // Créer le chemin vers la div qui va contenir le graph
            root = am5.Root.new('ClusteredColumnChart-' + name);
            // Fait disparaitre le logo Amcharts5
            root._logo.dispose();
            // Affecte mon theme crée au dessus
            root.setThemes([ am5themes_Animated.new(root), myTheme]);
            
            // Paramétre le graphique
            var chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "panX",
                wheelY: "zoomX",
                layout: root.verticalLayout
            }));
            
            // Paramétre le légend ( elle sont cliquables )
            var legend = chart.children.push(
                am5.Legend.new(root, {
                  centerX: am5.p50,
                  x: am5.p50
                })
            );
            
            // Paramétre l'axe x
            var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                categoryField: "index",
                renderer: am5xy.AxisRendererX.new(root, {
                  cellStartLocation: 0.1,
                  cellEndLocation: 0.9
                }),
                tooltip: am5.Tooltip.new(root, {})
            }));
            
            // Affecte à l'axe x les différentes catégories
            //console.log(dataGraphValid) Si vous souhaitez voir comme les données sont.
            xAxis.data.setAll(dataGraphValid);
            
            // Paramétre l'axe y
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
              renderer: am5xy.AxisRendererY.new(root, {})
            }));

            // Function pour mettre en place les séries de données sous forme de colonne
            function makeSeries(name, fieldName) {
              var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "index"
              }));
            
              series.columns.template.setAll({
                tooltipText: "['bold']{name}['/'],\n{categoryX}:{valueY}",
                width: am5.percent(90),
                tooltipY: 0
              });
            
              series.data.setAll(dataGraphValid);
        
              series.appear();
            
              series.bullets.push(function () {
                return am5.Bullet.new(root, {
                  locationY: 0,
                  sprite: am5.Label.new(root, {
                    text: "{valueY}",
                    centerY: 0,
                    centerX: am5.p50,
                    populateText: true  // Rend le texte évaluable et non littéral "{valueY}" => 84 et pas "{valueY}" => "{valueY}"
                  })
                });
              });
            
              legend.data.push(series);
            }
            
            // Lancement de la fonction pour les garcons et les filles en prenant en compte l'unité choisi;
            makeSeries("Garçon", unit+"_"+dataValue.properties[0]);
            makeSeries("Fille", unit+"_"+dataValue.properties[1]);

            // Faire apparaitre le graphique
            chart.appear(1000, 100);
            
        });

        // Dépose le graphique sur le DOM 
        return () => {root.dispose()}
    }

    // Récupére les donnée et empéche le graphique de se créer une seconde fois
    const handlerData = () => {
      if (dataGraph) {
        let dataValueZ = getDataValue(dataGraph);
        setDataValue(dataValueZ);
      }
    } 

    // useEffect est un hook au même titre que useState, celui ci permet de lancer du code coté client.
    // [dataGraph] <=> Si cette variable change le code est relancé.
    // [] <=> Le code se lance uniquement au démarage.
    // undefined <=>  Le code se lance en continue.
    // Dès qu'il récupére dataGraph il lance le code
    useEffect(() => {
      handlerData();
    },[dataGraph])


    useEffect(() => {
      if (dataValue) {
        makeChart(dataValue);
      }
    },[dataValue])


    // détruit l'ancienne root du graphique
    useEffect(() => {
      console.log(unit);
      if (dataValue) {
        am5.array.each(am5.registry.rootElements, function(root) {
          if (root.dom.id == 'ClusteredColumnChart-' + name) {
            root.dispose();
          }
        });
        makeChart(dataValue);
      }
      
    },[unit])





    // Renvoie ce JSX qui sera compilé en HTML par réact
    return (
      <div className={style.ClusteredColumnChart}>
        <h2 className={style.title}>Est-ce que les matières favorites ont un lien avec le genre de la personne?</h2>
      <div style={{width: '90%', height: '500px'}} id={'ClusteredColumnChart-' + name}></div>

      <div className={style.unit}>
        <label htmlFor="unit_selector">Sélectionne l'unité:</label>
        <select onChange={(e) => handlerUnit(e.target.value)} name="unit_selector" id="unit_selector">
            <option value="number">Number</option>
            <option value="percent">Percent</option>
            <option value="percent_by_attributs">Percent by Attributs</option>
            <option value="percent_by_occurences">Percent by Occurences</option>
        </select>
      </div>

      <div className={style.comment}>
        <p>
        On peut constater que les garçons ont un attrait plus poussée pour l'EPS, l'informatique et la technologie que les filles.
        <br/>
        Les filles et les garçons aiment tout autant les mathématiques.
        <br/>
        Les filles, quant à elle, aiment beaucoup les matières comme les arts plastiques et les langues vivantes.
        <br/>
        Les filles aiment aussi davantage la SVT que les garçons.

        </p>
      </div>

      </div>
    );
}

// export le composant
export default ClusteredColumnChart;