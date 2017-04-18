const view = new View();

class App {

    findPatterns(form) {
        const input = new MyFile(form['input'].files[0]);
        const patterns = new MyFile(form['patterns'].files[0]);

        return Promise.all([input, patterns])
            .then(([input, patterns]) =>
                Match.getMatch(MyFile.strings(input), MyFile.strings(patterns))
            )
            .then((data) =>
                view.render({mode: data})
            )
            .catch(err => {
                view.render({message: err})
            });
    }
}