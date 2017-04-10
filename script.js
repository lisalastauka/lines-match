const textType = /text.*/;
const reader = new FileReader();
const match = new Match();
const view = new View();

const processFiles = function processFiles(result) {
    const [input, patterns] = result.map(elem => elem.split('\n'));

    let data = {
        intersection : match.intersection(input, patterns),
        partial : match.partial(input, patterns),
        similar : match.similar(input, patterns)
    };

    view.renderResult (data);
};

const readFiles = function readFiles(data, callback) {
    let fileRead = [];
    function read(files) {
        if (files.length > 0) {
            let item = files.shift();
            reader.onloadend = function (loadEvent) {
                fileRead.push(loadEvent.target.result);
                read(files);
            };
            reader.readAsText(item);
        } else {
            callback(fileRead);
        }
    }
    read(data);
};

const getFiles = function getFiles() {
    const files = view.getInputFiles();
    if (files.some(el=> !el)){
        view.displayMessage('required');
    } else
    if (files.every(el => el.type.match(textType))) {
        readFiles(files, processFiles);
    } else {
        view.displayMessage('wrongType');
    }

};

view.renderView();
