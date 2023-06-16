export default (array1,array2) => {
    let ref = {};
    let set1 = [...new Set(array1)];
    let set2 = [...new Set(array2)];

    for (let k = 0; k < set1.length; k++) {
      ref[set1[k]] = {
        [set2[0]]: 0,
        [set2[1]]: 0
      }
    }

    for (let i = 0; i < array1.length; i++) {
      if (array2[i] === set2[0]) ref[array1[i]][set2[0]]++
      if (array2[i] === set2[1]) ref[array1[i]][set2[1]]++
    }

    let refValid = []

    for (const property in ref) {
        ref[property].index = property;
        refValid.push(ref[property]);
    }
    ref = refValid;
    
    return ref;
}