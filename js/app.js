const textType = /text.*/;
const parser = new Parser();
const view = new View();
const fileMatch = new FileMatch();

class App {

    compareFiles(files) {
        return parser.getFiles(files).then(
            parsedFiles => {
                return fileMatch.compareFiles(parsedFiles);
            }
        ).then(data => {
            view.render({mode: data});
        });
    }

}