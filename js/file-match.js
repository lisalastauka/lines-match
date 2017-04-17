class FileMatch {
    compareFiles(result) {
        const [input, patterns] = result.map(elem => elem.split('\n'));
        const match = new Match();
        return match.getMatch(input, patterns);
    };
}