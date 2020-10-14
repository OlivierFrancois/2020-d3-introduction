window.onload = async function () {
    
    'use strict';

    //Le code du projet sera inséré ici
    let source = './data/small-data.tsv';

    // Chargement des données
    let data = await d3.tsv(source);
    
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
    .classed('list-group-item', true)
    //Ajout du contenu texte de cet élément
    .text( (data) => data.Name);

    document.querySelector("#btn-larger-data").addEventListener('click', async () => {
        source = './data/large-data.tsv';
        data = await d3.tsv(source);

        // Association des données chargées à des div virtuelles
        // Le enter, update et exit sont chargés à cette étape
        let selection = container.selectAll('div').data(data)

        
        selection.enter() // La selection enter comporte les nouveaux éléments devant être générés
        .append('div') // On ajoute un div dans le dom pour chacun de ces éléments
        .merge(selection) // Sans cela, la modificiation du texte ne concerne que les nouveaux éléments
        .text( (data) => data.Name)

        // Si dans le bloc d'au dessus on ne fait pas de merge, il faut décommenter ceci
        // Pour actualiser toute la liste
        //selection.text( (data) => data.Name )
    })
}