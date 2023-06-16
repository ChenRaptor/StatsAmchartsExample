import fs from 'fs'
import path from 'path'


// Définir la fonction pour transformer un fichier CSV en un tableau JS
function csvToArray(csv) {
    // Séparer les lignes du fichier CSV en utilisant le caractère de retour à la ligne
    var lines = csv.split("\n");
    // Initialiser un tableau vide pour stocker les données du tableau JS
    var array = [];
    // Parcourir toutes les lignes du fichier CSV
    for (var i = 0; i < lines.length; i++) {
      // Séparer chaque ligne en utilisant la virgule comme séparateur de valeur
      var values = lines[i].split(",");
      // Ajouter chaque ligne sous la forme d'un tableau d'éléments à notre tableau JS
      values = values.map((item) => {
        let tab = item.split('"'), val = '';
        tab[1] ? val = tab[0] + tab[1] : val = tab[0];
        tab = val.split('\r');
        if (tab[1]) return tab[0] + tab[1];
        return tab[0];
      });

      array.push(values);
    }
    // Retourner le tableau JS
    array.pop();
    return array;
}

const jsonPath = path.join(process.cwd(), 'data/' , 'data.csv');
const csv = fs.readFileSync(jsonPath, 'utf8');

export default (req, res) => {

    console.log(csv);
  
    // Transformer le fichier CSV en un tableau JS
    var array = csvToArray(csv);
    
    // Afficher le tableau JS dans la console
    console.log(array);

    res.json(array);

}