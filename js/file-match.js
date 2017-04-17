class FileMatch {
    compareFiles(result) {
        const [input, patterns] = result.map(elem => {
            elem = elem.split('\n');
            return  elem.filter(str => str.trim() !== '')
        });
        const match = new Match();
        return match.getMatch(input, patterns);
    };
}