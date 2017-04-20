class View {

    constructor(Mustache) {
        this.Mustache = Mustache;
    }

    render(data) {
        const template = document.getElementById('template').innerHTML;

        this.Mustache.parse(template);

        const rendered = this.Mustache.render(template, {data: data});
        document.getElementById('target').innerHTML = rendered;
    }
}
