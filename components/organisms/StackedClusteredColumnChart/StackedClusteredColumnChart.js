import { useEffect, useState } from "react";
import getDataValue from "../../../libs/getDataValue";
import style from "./StackedClusteredColumnChart.module.css"

const StackedClusteredColumnChart = ({name,dataGraph}) => {

    const [unit, setUnit] = useState('number');
    const [dataValue, setDataValue] = useState();

    const handlerUnit = async (selectedValue) => {
      setUnit(selectedValue);
    }
    

    const makeChart = () => {

            let root = '';
              
            var myTheme = am5.Theme.new(root);

            myTheme.rule("Label").setAll({
                fill: am5.color(0xFFFFFF),
                fontSize: "0.9em"
            })

            am5.ready(function() {

                // Créer le chemin vers la div qui va contenir le graph
                root = am5.Root.new('StackedClusteredColumnChart-' + name);
                root._logo.dispose();
                root.setThemes([ am5themes_Animated.new(root), myTheme]);
                

                // Paramétre le graphique
                var chart = root.container.children.push(am5xy.XYChart.new(root, {
                  panX: false,
                  panY: false,
                  wheelX: "panX",
                  wheelY: "zoomX",
                  layout: root.verticalLayout
                }));
                
                
                // Paramètre la légende
                var legend = chart.children.push(am5.Legend.new(root, {
                  centerX: am5.p50,
                  x: am5.p50
                }));
                
                var data = dataValue;
                
                // Paramètre l'axe des x
                var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
                  categoryField: "index",
                  renderer: am5xy.AxisRendererX.new(root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9
                  }),
                  tooltip: am5.Tooltip.new(root, {})
                }));
                
                xAxis.data.setAll(data);
                
                // Paramètre l'axe des y
                var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                  min: 0,
                  renderer: am5xy.AxisRendererY.new(root, {})
                }));
                
                
                // Function pour mettre en place les séries de données sous forme de colonne stacked
                function makeSeries(name, fieldName) {
                  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
                    stacked: true,
                    name: name,
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: fieldName,
                    categoryXField: "index"
                  }));
                
                  series.columns.template.setAll({
                    tooltipText: "Matière principale favorite: {categoryX}.\nMatière secondaire favorite: {name}.\nNombre d'étudiants: {valueY}",
                    width: am5.percent(90),
                    tooltipY: am5.percent(10)
                  });
                  series.data.setAll(data);
          
                  series.appear();
                
                  series.bullets.push(function () {
                    return am5.Bullet.new(root, {
                      locationY: 0.5,
                      sprite: am5.Label.new(root, {
                        text: "{valueY}",
                        //fill: root.interfaceColors.get("alternativeText"),
                        centerY: am5.percent(50),
                        centerX: am5.percent(50),
                        populateText: true
                      })
                    });
                  });
                
                  legend.data.push(series);
                }
                
                makeSeries("Informatique", "Informatique");
                makeSeries("SVT", "SVT");
                makeSeries("eps", "eps");
                makeSeries("arts plastiques", "arts plastiques");
                makeSeries("langues vivantes", "langues vivantes");
                makeSeries("philosophie", "philosophie");
                makeSeries("technologie", "technologie");
                makeSeries("sciences-physique/chimie", "sciences-physique/chimie");
                makeSeries("Mathématiques", "Mathématiques");
                
                chart.appear(1000, 100);
                
                });
              
      
              return () => {root.dispose()}
        }

        // fonction qui transforme les donnée en donnée compréhensible par le graphique
        const handlerData = () => {
            if (dataGraph) {
              let tab = []
              let stackDatas = [];
              let tab2 = [];
              for (const property in dataGraph) {
                tab.push(...property.split('_'))
                tab = [...new Set(tab)].sort();
              }
              for(const property in dataGraph) {
                  let duos = property.split('_');
                  if (!tab2.includes(duos[0])) {
                    let stackData = {
                      index: duos[0],
                    }
                    for (let i = 0; i < tab.length; i++) {
  
                      if (duos[0] !== tab[i]) {
  
                        stackData[tab[i]] = null;
  
                        for(const property in dataGraph) {
                          let second = property.split(duos[0] + '_')[1];
                          stackData[second] = dataGraph[property];
                        }
  
                      }
                    }
                    console.log('z:',stackData)
                    stackDatas.push(stackData);
                    tab2.push(duos[0])
                  }

              }
              setDataValue(stackDatas)

            }
          } 
      
        useEffect(() => {
            handlerData();
        },[dataGraph])

        useEffect(() => {
            if (dataValue) {
                makeChart()
            }
        },[dataValue])
    
    return (
      <div className={style.StackedClusteredColumnChart}>
        <h2 className={style.title}>Y a-t-il une corrélation entre la matière principale favorite et la matière secondaire favorite?</h2>
        <div style={{width: '90%', height: '500px'}} id={'StackedClusteredColumnChart-' + name}></div>
        <div className={style.comment}>
          <p>
          On peut constater que pour l'informatique comme matière principale favorite, on a un plus grand attrait comme seconde matière favorite sur les matières scientifique tel que les mathématiques et la technologie.
          On constate aussi que pour l'EPS qui n'est pas une matière scientifique, ni littéraire, on a un plus grand attrait comme seconde matière favorite sur les matières scientifique, mais aussi sur les arts plastiques. 
          </p>
          <p>
          On peut ainsi constater des duos de matière qui s'apprécie bien :
          Mathématique - EPS (9 étudiants)
          Informatique - Technologie (8 étudiants)
          Informatique - Mathématique (8 étudiants)
          </p>
          <p>
          On peut donc dire qu'il y a corrélation entre certaines matières telles que l'informatique et la technologie qui se font tous 2 avec un ordinateur, le fait d'aimer les appareils numériques tels que les ordinateurs pourrait être le facteur caché de cette corrélation. Pour les mathématiques et l'informatique, ce sont des matière très liés, tous 2 demande de résoudre des problèmes cela est sans doute le facteur caché de cette corrélation. Pour l'EPS et les mathématiques, les deux nous entraînent, cérébralement, musculairement, mais aussi psychiquement. Un facteur de corrélation pourrait être le développement personnel.
          </p>
        </div>
      </div>
    );
}

export default StackedClusteredColumnChart;