const textType = /text.*/;
const reader = new Reader();
const view = new View();
const fileMatch = new FileMatch();

class App {

    compareFiles(data) {
        const files = App.getFiles(data);
        if (!App.validateFiles(files)) {
            view.render({message: 'invalid input'});
            return;
        }
        return reader.readFiles(files)
            .then(parsedFiles =>
                fileMatch.compareFiles(parsedFiles)
            )
            .then(data =>
                view.render({mode: data})
            )
            .catch(err =>
                view.render({message: err})
            );
    }

    static validateFiles(files) {
        return !(files.some(el => !el || !el.type.match(textType)));
    }

    static getFiles(form) {
        const {input, pattern} = form;
        return [input, pattern].map(x => x.files[0]);
    }
}