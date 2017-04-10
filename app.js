const textType = /text.*/;
const reader = new FileReader();
const match = new Match();
const view = new View();

class App {
    constructor () {
        return view.renderView(this.getFiles);
    }
    static processFiles(result) {
        const [input, patterns] = result.map(elem => elem.split('\n'));

        let data = {
            intersection : match.intersection(input, patterns),
            partial : match.partial(input, patterns),
            similar : match.similar(input, patterns)
        };

        view.renderResult (data);
    };

    getFiles() {
        const files = view.getInputFiles();
        if (files.some(el=> !el)){
            view.displayMessage('required');
        } else
        if (files.every(el => el.type.match(textType))) {
            App.readFiles(files, App.processFiles);
        } else {
            view.displayMessage('wrongType');
        }
    };

    static readFiles(data, callback) {
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

}