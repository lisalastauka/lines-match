const match = new Match();
class FileMatch {
    compareFiles(result) {
        const [input, patterns] = result.map(elem => elem.split('\n'));

        return {
            intersection: match.intersection(input, patterns),
            partial: match.partial(input, patterns),
            similar: match.similar(input, patterns)
        };


    };
}