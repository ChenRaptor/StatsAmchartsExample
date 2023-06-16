export default (primarySubjects,secondarySubjects,sport) => {

    var subjects = [...new Set(primarySubjects)];
    var subjectData = []

    for (var i = 0; i < subjects.length; i++) {
        let object = {
            "category": subjects[i],
        }
        subjectData.push(object)
    }

    let totalValue = 0;

    for (var i = 0; i < primarySubjects.length; i++) {
        var primary = primarySubjects[i]

        var object = subjectData[subjects.findIndex((element) => element === primary)];

        object.value ??= 0;
        object.value += Number(sport[i]);
        totalValue += Number(sport[i]);
    

    }

    for (var i = 0; i < subjects.length; i++) {

        var object = subjectData[i];

        object.percent ??= 0;
        object.percent = Math.floor((object.value/totalValue)*100)/100;

    }
    console.log(subjectData)
    return subjectData;
}