window.onload = async function () {
    
    'use strict';

    //Le code du projet sera inséré ici
    let source = './data/small-data.tsv';

    // Chargement des données
    let data = await d3.tsv(source);
    let container = d3.select('#container');

    // En-tête du tableau
    let thead = container.append('thead').classed('thead-dark', true).append('tr');

    // On peut enter car on ne fait qu'ajouter des choses
    thead.selectAll('th').data(data.columns).enter().append('th').text((d) => d);

    // Corps du tableau
    let tbody = container.append('tbody');
    let tr = tbody.selectAll('tr').data(data).enter().append('tr');
    
    let td = tr
    .selectAll('td')
    .data( (dataTr) => Object.values(dataTr) )
    .enter()
    .append('td')
    .text(d => d);

    //tr.selectAll('td').text( (data) => data.Name).append('td');

    document.querySelector("#btn-larger-data").addEventListener('click', async () => {
        data = await d3.tsv('./data/large-data.tsv')
        
        let tbody = container.append('tbody');
        let tr = tbody.selectAll('tr').data(data).enter().append('tr');
        
        let td = tr
        .selectAll('td')
        .data( (dataTr) => Object.values(dataTr) )
        .enter()
        .append('td')
        .text(d => d);
    })
}