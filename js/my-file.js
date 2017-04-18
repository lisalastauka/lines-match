class MyFile {
    constructor(file) {
        this.file = file;
        return this.readFile();
    }

    static strings(file) {
            const elem = file.split('\n');
            return  elem.filter(str => str.trim() !== '')
    }
    readFile() {
        return new Promise((resolve, reject) => {
            const textType = /text.*/;
            if (!this.file || !this.file.type.match(textType)) {
                reject('invalid input')
            }

            const reader = new FileReader();
            reader.onloadend = (loadEvent) => {
                resolve(loadEvent.target.result);
            };
            reader.readAsText(this.file);
        });
    }
}