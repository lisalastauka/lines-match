class Match {

    static getMatch(input, pattern) {
        return {
            intersection: Match.intersection(input, pattern),
            partial: Match.partial(input, pattern),
            similar: Match.similar(input, pattern)
        };
    }

    static intersection(input, pattern) {
        return input.filter(
                el => pattern.includes(el)
        );
    }

    static partial(input,pattern) {
        return input.filter(
                el => pattern.some( exp => el.includes(exp))
        );
    }

    static levenstein(word, term) {
        const l = new Levenshtein(word, term);
        return l.distance;
    }

    static similar(input,pattern) {
        return input.filter(
                el =>  pattern.some( exp => Match.levenstein(el, exp) <= 1)
        );
    }

}