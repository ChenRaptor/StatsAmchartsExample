import { useEffect, useState } from "react";
import style from "./DonutChart.module.css"

const DonutChart = ({name,dataGraph}) => {

    const [dataValue, setDataValue] = useState();


    const makeChart = () => {

        let root = '';
              
        var myTheme = am5.Theme.new(root);

        myTheme.rule("Label").setAll({
            fill: am5.color(0xFFFFFF),
            fontSize: "0.9em"
        })

        am5.ready(function() {
            root = am5.Root.new("DonutChart");
            root._logo.dispose();
            root.setThemes([ am5themes_Animated.new(root), myTheme]);
            
            var chart = root.container.children.push(am5percent.PieChart.new(root, {
              layout: root.verticalLayout,
              innerRadius: am5.percent(50), // Valeur de la longueur radiale du donut 50%
            }));
            
            var series = chart.series.push(am5percent.PieSeries.new(root, {
              valueField: "value",
              categoryField: "category",
              alignLabels: false, // Les trait ne sont pas aligné.
              tooltip: am5.Tooltip.new(root, {  // Indicateur sur hover element
                labelText: "[bold]{category}[/]\nNombre d'heure pratiqué: {value}.",
              })
            }));
            
            
            series.labels.template.setAll({
              centerX: 0,
              alignLabels: true,
              radius: 20,
              fill: am5.color(0xffffff),
              stroke: am5.color(0xffffff),
              fontSize: 12,
              
            });

            // Plugin qui permet de grouper les éléments qui ont une valeur faible dans une catégorie "Other"
            var grouper = am5plugins_sliceGrouper.SliceGrouper.new(root, {
              series: series,
              clickBehavior: "break"
            });

            // Paramètre les lignes liant les labels au graphiques
            series.ticks.template.setAll({
              fill: am5.color(0xffffff),
              stroke: am5.color(0xffffff)
            });
            
            series.data.setAll(dataGraph);
            
            // Paramètre la legende
            var legend = chart.children.push(am5.Legend.new(root, {
              centerX: am5.percent(50),
              x: am5.percent(50),
              marginTop: 15,
              marginBottom: 15,
            }));
            
            legend.data.setAll(series.dataItems);
            
            series.appear(1000, 100);
            
        }); 
        return () => {root.dispose()}
    }

    const handlerData = () => {
      dataGraph && setDataValue(true)
    } 
  
    useEffect(() => {
        handlerData();
    },[dataGraph])

    useEffect(() => {
        dataValue && makeChart()
    },[dataValue])
    
    return (
        <div className={style.DonutChart}>
        <h2 className={style.title}>Est-ce que les personnes qui ont EPS en matière favorite font beaucoup de sport ?</h2>
        <div style={{width: '90%', height: '500px'}} id={'DonutChart'}></div>
        <div className={style.comment}>
        <p>
        D'après le graphique numéro 1, il y a 17 étudiants sur 72 qui ont pour matière favorite l'EPS. Cela représente 23.6 %.<br/>
        Or ici, nous pouvons constater qu'à eux seuls, il représente quasiment 40 % de toutes les heures de sport pratiqué sur l'ensemble des 72 étudiants.<br/>
        En moyenne un étudiant qui a pour matière favorite l'EPS fait 1.6 fois plus de sport que les autres étudiants.<br/>
        Donc nous pouvons en conclure qu'il y a bien une corrélation positive entre aimer l'EPS et faire plus de sport.
        </p>
        </div>
        </div>
    );
}

export default DonutChart;