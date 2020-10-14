window.onload = function () {
    'use strict';

    //Le code du projet sera inséré ici
    let source = './data/small-data.tsv';

    // Chargement des données
    d3.tsv(source).then(function (data, error) {
        if (error) throw error;

        let container = d3.select('#container');
        
        container.classed('striped', true)

        container
        //Selection virtuelle des elements
        .selectAll('div')
        //Affectation des données
        .data(data)
        //Accès aux nouvelles données à afficher
        .enter()
        //Création d'un nouvel élément du dom
        .append('div')
        //Ajout du contenu texte de cet élément
        .text( (data) => data.Name)

    });
};