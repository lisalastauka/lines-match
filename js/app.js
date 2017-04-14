const textType = /text.*/;
const reader = new FileReader();
const match = new Match();
const view = new View();

class App {

    getFiles (form) {
        let {input, pattern} = form;
        App.validateFiles([input, pattern].map(x=>x.files[0]));
    };

    static validateFiles(files) {
        if (files.some(el=> !el)){
            view.renderResult ({message : 'Both files required'});
        } else
        if (files.every(el => el.type.match(textType))) {
            App.readFiles(files);
        } else {
            view.renderResult ({message : 'Only text files supported!'});
        }
    };

    static readFiles(data) {
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
                App.processFiles(fileRead);
            }
        }
        read(data);
    };

    static processFiles(result) {
        const [input, patterns] = result.map(elem => elem.split('\n'));

        let data = {
            intersection : match.intersection(input, patterns),
            partial : match.partial(input, patterns),
            similar : match.similar(input, patterns)
        };

        view.renderResult ({mode : data});
    };

}