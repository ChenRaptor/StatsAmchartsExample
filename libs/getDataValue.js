// Cette fonction transforme les donnée récupéré et génére des données utilisables pour les différente unité du graphique 

export default (dataGraph) => {

    let dataValue = {
        number: {},
        percent: {},
        numberTotal: 0,
        dataGraph,
      }, properties = [];

      for(const property in dataGraph[0]) {
        if (property !== "index") {
          properties.push(property)
        }
      }
      
      for (let i = 0; i < dataGraph.length; i++) {
          properties.forEach(property => {
            dataValue.number[property] ??= 0; 
            // Ceci est l'opérateur de coalescence nulle qui est doublé d'une affectation
            // En JS on ne peut pas faire " 1 + undefined " cela renvoie NaN
            // Pour contrer cela on peut utilisé ??= qui affecte 0 à l'élement si celui est null ou undefined
            dataValue.dataGraph[i]["number_"+property] ??= 0
            dataValue.number[property] += dataGraph[i][property];
            dataValue.dataGraph[i]["number_"+property] = dataGraph[i][property];
          });
      }
      
      for (let k = 0; k < properties.length; k++) {
        dataValue.numberTotal += dataValue.number[properties[k]];
      }

      properties.forEach(property => {
        dataValue.percent[property] = dataValue.number[property]/dataValue.numberTotal;
      })


      for (let i = 0; i < dataGraph.length; i++) {
        properties.forEach(property => {
          dataValue.percent[property] ??= 0;
          dataValue.dataGraph[i]["percent_"+property] ??= 0
          dataValue.percent[property] = dataValue.number[property]/dataValue.numberTotal;
          dataValue.dataGraph[i]["percent_"+property] = dataGraph[i][property]/dataValue.numberTotal;
        });
      }

      for (let i = 0; i < dataGraph.length; i++) {
        properties.forEach(property => {
            dataValue.dataGraph[i].numberTotal ??= 0
            dataValue.dataGraph[i].numberTotal += dataGraph[i][property]
        })
        // Les attributs représente ici les catégories, 100% reprénsente l'ensemble des élement de cette catégorie
        properties.forEach(property => {
          dataValue.dataGraph[i]["percent_by_attributs_"+property] ??= 0;
          dataValue.dataGraph[i]["percent_by_attributs_"+property] = dataGraph[i][property]/dataValue.dataGraph[i].numberTotal;
        });
      }

      // Les occurrences, 100% représente l'ensemble des éléments d'une série tel que l'ensemble des garçons sur toutes les catégories.
      for (let i = 0; i < dataGraph.length; i++) {

        properties.forEach(property => {
          dataValue.dataGraph[i]["percent_by_occurences_"+property] ??= 0;
          dataValue.dataGraph[i]["percent_by_occurences_"+property] = dataGraph[i][property]/dataValue.number[property];
        });

      }
    
      dataValue.properties = properties;
      console.log(dataValue);
      return dataValue;
}
