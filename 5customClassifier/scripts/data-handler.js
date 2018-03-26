
// Goblal variables containing all data (Points + labels)
var data = {
    setData(data) {
        this.allData = data;
    },
    getAll() {
        return this.allData;
    },
    getSet(setNum) {
        switch (setNum) {
            case 0:
                return this.allData.slice(0, 40);
                break;
            case 1:
                return this.allData.slice(50, 90);
                break;
            case 2:
                return this.allData.slice(40, 50).concat(this.allData.slice(90, 100))
                break;
        
            default:
                break;
        }
    },
    getTrainData() {
        return this.getSet(0).concat(this.getSet(1));
    },
    getTestData() {
        return this.getSet(2);
    }
};
data.setData( getData() );

/**
 * Creates an array of random data where first 50 are under
 * identity fn and the rest 50 above it
 */
function getData() {
    var data = [];
    data = data.concat(aboveLine(50)).concat(belowLine(50));
    return data;
};
/**
 * Returns an array with the labels for the generated data.
 * 0 means first set of data - red
 * 1 means second set of data - blue
 */
function getLabels() {
    var labels = [];
    for (var i = 0; i < 100; i++) {
        if (i <= 49 ) labels.push(0);
        else labels.push(1);
    }
    return labels;
};

// Updates all global variables
function updateData() {
    data.setData( getData() );
    labels = getLabels();
};