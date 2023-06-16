export default (primarySubjects,secondarySubjects,note) => {
    // Initialise les variables
    var data = []
    var subjects = [...new Set(primarySubjects)];
    var subjectData = []

    for (var i = 0; i < subjects.length; i++) {
        let object = {
            "index": subjects[i],
        }

        /*
        for (var k = 0; k < subjects.length; k++) {
            if (subjects[i] !== subjects[k]) {
                object[subjects[k]+"_Radius"] = 0
                object[subjects[k]+"_Note"] = 0
            }
        }
        */

        subjectData.push(object)
    }

    

    for (var i = 0; i < primarySubjects.length; i++) {
        var primary = primarySubjects[i]

        var secondary = secondarySubjects[i]

        // Obtient l'objet à modifié en fonction de la matière favorite
        var object = subjectData[subjects.findIndex((element) => element === primary)]; 

        object[secondary+"_Radius"] ??= 0;
        object[secondary+"_Radius"] += 1

        object[secondary+"_Note"] ??= 0;
        object[secondary+"_Note"] += Number(note[i])

    }

    for (var i = 0; i < subjects.length; i++) {

        var object = subjectData[i];

        for (var k = 0; k < subjects.length; k++) {
            
            if (object[subjects[k]+"_Radius"]) {
                let coef = object[subjects[k]+"_Radius"];
                object[subjects[k]+"_Note"] = Math.floor( (object[subjects[k]+"_Note"] / coef)*100 )/100 // Raporte a 2 décimal
            }
        }
    }



    return subjectData;
}