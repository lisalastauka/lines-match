class App {

    constructor(view) {
        this.view = view;
    }

    findPatterns(id) {
        const form = document.getElementById(id);

        const readFile = (fieldName) =>{
            return TextFile.readFile(form[fieldName].files[0])
        };

        const inputPromise = readFile('input');
        const patternsPromise = readFile('patterns');

        return Promise.all([inputPromise, patternsPromise])
            .then(([input, patterns]) => {
                const matchInput = {
                    input: input.getStrings(),
                    patterns: patterns.getStrings(),
                };

                return this.getModes(matchInput);
            })
            .then((modes) => {
                this.renderModes(modes);
            })
            .catch(error => {
                this.renderError(error);
            })
    }

    getModes(matchInput) {
        return [
            new Modes('Intersection', 'intersection', matchInput),
            new Modes('Partial', 'partial', matchInput),
            new Modes('Similar', 'similar', matchInput),
        ];
    }

    renderModes(modes) {
        const forTemplate = modes.map(({title, value}) => {
            return {modeName: title, modeValue: value};
        });

        this.view.render({modes: forTemplate});
    }

    renderError(error) {
        this.view.render({message: error});
    }

}

const view = new View(Mustache);
const app = new App(view);
