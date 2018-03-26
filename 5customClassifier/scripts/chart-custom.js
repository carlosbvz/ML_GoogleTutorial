var color = Chart.helpers.color;
// Creates the chart
var scatterChartData = {
    datasets: [
        {
            label: 'Datos de Entrenamiento - Tipo 0',
            borderColor: window.chartColors.red,
            backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
            data: data.getSet(0)
        },
        {
            label: 'Datos de Entrenamiento - Tipo 1',
            borderColor: window.chartColors.blue,
            backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
            data: data.getSet(1)
        },
        {
            label: 'Datos de Prueba',
            data: data.getSet(2)
        }
    ]
};

window.onload = function () {
    // Appends chart to DOM
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myScatter = new Chart.Scatter(ctx, {
        data: scatterChartData,
        options: {
            title: {
                display: true,
                text: 'Datos '
            }
        }
    });
    updateTables();
};

function updateTables() {
    var $tables = $('table');
    // Updates TrainingData table
    var trainingData = data.getTrainData();
    updateTable($tables[0], trainingData);
    var testingData = data.getSet(2);
    updateTable($tables[1], testingData);
    // Clear predictions table
    $($tables[2]).find('tbody').html('');
};
function updateTable(table, data) {
    $(table).find('tbody').html('');
    data.forEach(data => {
        $(table).find('tbody').append(`
            <tr> 
                <td> ${data.x} </td>
                <td> ${data.y}</td>
                <td> ${data.label}</td>
            </tr>
        `)
    });
}

// Binds event to re-generate random data
document.getElementById('randomizeData').addEventListener('click', function () {

    // (Re) Feeds the 'data' global variable
    updateData();
    // Updates chart datasets (training Data)
    scatterChartData.datasets[0].data = data.getSet(0);
    scatterChartData.datasets[1].data = data.getSet(1);
    // Updates testing data
    scatterChartData.datasets[2].data = data.getSet(2);
    // Pushes new data into chart
    window.myScatter.update();
    updateTables();
    $('#accuracy').text('');
    updateUIOps.forEach( op => {
        clearTimeout(op);
    })
});
