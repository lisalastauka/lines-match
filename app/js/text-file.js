class TextFile {

    constructor(file) {
        this.file = file;
    }

    getStrings() {
            const elements = this.file.split('\n');
            const trimmedElements = elements.map(string => string.trim());
            return trimmedElements.filter(string => !!string);
    }

    static readFile(file) {
        const textType = /text.*/;

        if (!file || !file.type.match(textType)) {
            return Promise.reject('invalid input');
        }

        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onloadend = (loadEvent) => {
                const newFile = new TextFile(loadEvent.target.result);

                resolve(newFile);
            };

            reader.readAsText(file);
        });
    }

}
