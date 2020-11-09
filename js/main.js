window.onload = async function () {
    //------------ Démarage de la page ------------//
    'use strict';

    //Le code du projet sera inséré ici
    let source = './data/small-data.tsv';

    // Chargement des données
    let data = await d3.tsv(source);
    let container = d3.select('#container');

    // En-tête du tableau
    let thead = container.append('thead').classed('thead-dark', true).append('tr');

    // Corps du tableau
    let tbody = container.append('tbody');
    // .data(data) permet de créer autant de tr qu'il y a de ligne dans le tableau data
    let lines = tbody.selectAll('tr').data(data)
    .enter().append('tr');
    

    let cells = lines.selectAll('td')
    // Prend la data contenue dans le tr et en extrait les valeurs
    // pour faire autant de td qu'il y a de couples clés/valeurs
    .data( (dataTr) => Object.values(dataTr) )
    .enter().append('td')
    .text(d => d);

    // Contenu du thead (doit être après la déclaration des lines pour être cliquable)
    thead.selectAll('th').data(data.columns)
    .enter().append('th')
    .text(d => d)
    .on('click', function (d, i, elts) {
        // console.log(this)
        lines.sort(function (a, b) {
            return (d === 'No' || d === 'ID') ? d3.ascending(+a[d], +b[d]) : d3.ascending(a[d], b[d]);
        });
    });

    //------------ Boutons ------------//

    let dataFlag = 1;
    const switchData = document.querySelector("#switch-data")
    switchData.addEventListener('click', async () => {
        if (dataFlag == 1) {
            switchData.innerText = "Charger Large Data";
            dataFlag = 2;
            source = './data/small-data.tsv';
        } else {
            dataFlag = 1;
            source = './data/large-data.tsv';
            switchData.innerText = "Charger Small Data";
        }

        data = await d3.tsv(source);

        let tlines = tbody.selectAll('tr').data(data);
        
        tlines.exit().remove();
        tlines = tlines.enter().append('tr').merge(tlines);
        
        let tcells = tlines.selectAll('td').data((d) => Object.values(d))
        .enter().append('td')
        .text((d) => d);
    })
}
