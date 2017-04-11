class Match {

    intersection(input, pattern) {
        return input.filter(
                el => pattern.includes(el)
        )
    }

    partial(input, pattern) {
        return input.filter(
                el => pattern.some( exp => el.includes(exp))
        )
    }

    static levenstein(word, term) {
        const l = new Levenshtein(word, term);
        return l.distance
    }

    similar(input, pattern) {
        return input.filter(
                el =>  pattern.some( exp => Match.levenstein(el, exp) <= 1)
        )
    }
}