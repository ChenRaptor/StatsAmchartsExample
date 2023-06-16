import { useEffect, useState } from "react";
// importation css propre a ce composant
import style from "./BubbleChart.module.css"

// Création du composant BubbleChart
const BubbleChart = ({name,dataGraph}) => {

    // React utilise des hooks qui permettent la gestion des composants, le hook useState sert a créer une variable qui dynamise le composant
    // En effet dès que l'on lui affecte une nouvelle valeur le composant s'autohydrate. On change sa valeur avec sa méthode setter (ici setUnit()).
    // Si on utilise pas son setter et que l'on affecte juste la variable, elle sera changé mais le composant pas réhydraté.

    const [dataValue, setDataValue] = useState();
    
    // Fonction de création du graphique
    const makeChart = () => {

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
          root = am5.Root.new('BubbleChart');
          // Fait disparaitre le logo Amcharts5
          root._logo.dispose();
          // Affecte mon theme crée au dessus
          root.setThemes([ am5themes_Animated.new(root), myTheme]);

          let seriesArray = [];
          var data = dataGraph
  
          // Paramétre le graphique
          var chart = root.container.children.push(am5xy.XYChart.new(root, {
              panX: false,
              panY: false,
              wheelY: "zoomXY",
              pinchZoomX:true,
              pinchZoomY:true,
              layout: root.verticalLayout,
              cursor: am5xy.XYCursor.new(root, {}),
              maskBullets: false
            }));
            
            chart.get("colors").set("step", 2);
  
          // Paramétre le légend ( elle sont cliquables )
          var legend = chart.children.push(am5.Legend.new(root, {
              centerX: am5.percent(50),
              x: am5.percent(50),
              marginTop: 15,
              marginBottom: 15,
          }));
  
          // Paramétre l'axe x
          var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
              categoryField: "index",
              renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
              //tooltip: am5.Tooltip.new(root, {})
          }));

          // Affecte à l'axe x les différentes catégories
          //console.log(dataGraphValid) Si vous souhaitez voir comme les données sont.
          xAxis.data.setAll(data);
          
          // Paramétre l'axe y
          var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
              max: 5,
              min: 0,
              //centerY: am5.percent(-20),
              dy: 50,
              scale: 0.8,
              renderer: am5xy.AxisRendererY.new(root, {}),
              tooltip: am5.Tooltip.new(root, {})
          }));

  
          // Function pour mettre en place les séries de données sous forme de colonne
          function makeSeries(name,id) {
              var series0 = chart.series.push(am5xy.LineSeries.new(root, {
              calculateAggregates: true,
              xAxis: xAxis,
              yAxis: yAxis,
              maskBullets: false,
              valueYField: name+"_Note",
              name: name,
              locationX: 0.1 + (id/(data.length - 1))*0.8,  // Etale les bulle sur X dans leur caatégorie pour éviter les superpositions (tooltip)
              categoryXField: "index",
              valueField: name+"_Radius",
              tooltip: am5.Tooltip.new(root, {
                labelText: "[bold]{categoryX} - {name}[/]\nNombre d'étudiants: {value}.\nAttrait pour la science fiction: {valueY}",
              })
            }));

            series0.strokes.template.set("visible", false);
            
            var circleTemplate = am5.Template.new({});
            series0.bullets.push(function() {
              var graphics = am5.Circle.new(root, {
                fill: series0.get("fill"),
              }, circleTemplate);
              return am5.Bullet.new(root, {
                sprite: graphics,
                locationX: 0.1 + (id/(data.length - 1))*0.8, // Etale les bulle sur X dans leur caatégorie pour éviter les superpositions (circle)
              });
            });

            // Créer un état
            circleTemplate.states.create("transparent", { opacity: 0.15 });

            // Ajoute des événements à l'élément physique
            circleTemplate.events.on("pointerover", handleOver);
            circleTemplate.events.on("pointerout", handleOut);

            // Gestion de la taille du cercle
            series0.set("heatRules", [{
              target: circleTemplate,
              min: 5,
              max: 20,
              dataField: "value",
              key: "radius"
            }]);
  
              // Ajout des données
              seriesArray.push(series0);
              legend.data.push(series0);
              series0.data.setAll(data);
              series0.appear(1000);
  
          }

          // function de callback de l'évenement
          // sur hover met les autre élement en opacité plus faible
          function handleOver(e) {
            var target = e.target;
            seriesArray.forEach((series) => {
              am5.array.each(series.dataItems, function(dataItem) {
                if (dataItem.bullets) {
                  var bullet = dataItem.bullets[0];
                  if (bullet) {
                    var sprite = bullet.get("sprite");
                    if (sprite && sprite != target) {
                      sprite.states.applyAnimate("transparent");
                    }
                  }
                }
              })
            })
          }
          // function inverse de celle précédente
          function handleOut(e) {
            seriesArray.forEach((series) => {
              am5.array.each(series.dataItems, function(dataItem) {
                if (dataItem.bullets) {
                  var bullet = dataItem.bullets[0];
                  if (bullet) {
                    var sprite = bullet.get("sprite");
                    if (sprite) {
                      sprite.states.applyAnimate("default");
                    }
                  }
                }
              })
            })
          }


          data.forEach((item,id) => {
            makeSeries(item.index,id)
          })
  
          
          chart.set("cursor", am5xy.XYCursor.new(root, {
              xAxis: xAxis,
              yAxis: yAxis,
              behavior: "zoomXY",
              snapToSeries: seriesArray
            }));
  
          chart.appear(1000, 100);
   
      }); 
  
        return () => {root.dispose()}
    }

    const handlerData = () => {
      if(dataGraph) {
        setDataValue(true)
      }
    } 
  
    useEffect(() => {
        handlerData();
    },[dataGraph])

    useEffect(() => {
        dataValue && makeChart()
    },[dataValue])
    
    return (
        <div className={style.BubbleChart}>
        <h2 className={style.title}>Est-ce qu’il y a corrélation entre aimer les films de science-fiction et aimer les disciplines scientifiques (Maths/Info/SVT/Physique) ?</h2>
        <div style={{width: '90%', height: '500px'}} id={'BubbleChart'}></div>
        <div className={style.comment}>
        <p>
        On peut constater que les points se sont réparti vers le haut du graphique ce qui démontre que l'affection que les étudiant porte à la science-fiction est à peu près homogène, les étudiants de cet échantillon aime bien la science-fiction. 
        </p>
        <p>
        On peut néanmoins constater des point en dessous de l'avis général, en effet les points "Informatique Langues-vivantes" et "Langues-vivantes Mathématique", le point commun de ces bulles les langues-vivantes qui semble avoir une corrélation négative avec le fait d'aimer la science-fiction.
        </p>
        </div>
        </div>
    );
}

export default BubbleChart;