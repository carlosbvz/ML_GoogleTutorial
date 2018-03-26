function euc(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    return Math.sqrt( a*a + b*b );
}

var KNN = {
    fit(trainData) {
        this.trainData = trainData;
    },
    predict(testData) {
        var predictions = [];
        testData.forEach((row, index) => {
            predictions.push({
                x: testData[index].x,
                y: testData[index].y,
                label: this.closest(row)
            })
        });
        return predictions;
    },
    closest(row) {
        var bestDistance = euc(row, this.trainData[0]);
        var bestIndex = 0;
        for (var i = 0; i < this.trainData.length; i++) {
            var dist = euc(row, this.trainData[i])
            if (dist < bestDistance) {
                bestDistance = dist;
                bestIndex = i;
            }
        }
        // console.log(row)
        // console.log(this.trainData[bestIndex])
        // console.log('===================')
        return this.trainData[bestIndex].label;
    }
};


// Ejecuta el algoritmo KNN cuando se da click al button Entrenar
$('#calculateData').on('click', function(e){

    // Almacena datos para utilizar luego
    KNN.fit( data.getTrainData() );
    var predictions = KNN.predict( data.getTestData());
    // update chart and table with a silly animation
    updateUI(predictions)
});

var updateUIOps = [];

function updateUI(predictions) {
    // Update accuracy
    var accuray = calculateAccuraty(data.getTestData(), predictions);
    $('#accuracy').text('Exactitud: ' + accuray + '%');
    predictions.forEach( (prediction, index) => {
        updateUIOps.push(setTimeout(() => {
            var index = prediction.label;
            scatterChartData.datasets[index].data.push(prediction);
            window.myScatter.update();

            $($('table')[2]).find('tbody').append(`
                <tr> 
                    <td> ${prediction.x} </td>
                    <td> ${prediction.y}</td>
                    <td> ${prediction.label}</td>
                </tr>
            `)
        }, (200 * index)));
    })
}

function calculateAccuraty( testData, predictedData) {

    var asserts = 0;
    testData.forEach( (item, index) => {
        if (testData[index].label === predictedData[index].label) asserts++;
    });
    return (asserts * 100) / testData.length;
}