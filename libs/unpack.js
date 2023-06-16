
// function unpack
export default (array,attribut) => {
    const index = array[0].findIndex((item) => item === attribut);
    return array.map((item) => item[index]).slice(1);
}