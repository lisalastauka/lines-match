class Modes {

    constructor(title, mode, {input, patterns}) {
        const modStrategy = Modes[mode];

        this.title = title;
        this.value = modStrategy(input, patterns);
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

    static similar(input,pattern) {
        return input.filter(
                el =>  pattern.some( exp => Modes._levenstein(el, exp) <= 1)
        );
    }

    static _levenstein(word, term) {
        const l = new Levenshtein(word, term);
        return l.distance;
    }

}