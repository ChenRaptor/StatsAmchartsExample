export default (array1,array2) => {
    let duos = [];

    for (let k = 0; k < array1.length; k++) {
        duos.push(array1[k]+"_"+array2[k])
    }

    return countOccurences(duos)
}


// Function qui compte le nombre de répétition d'un tableau
function countOccurences(tab){
    var result = {};
    tab.forEach(function(elem){
        if(elem in result){
            result[elem] = ++result[elem];
        }
        else{
            result[elem] = 1;
        }
    });
    return result;
}