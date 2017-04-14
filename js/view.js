class View {

    render(data) {
        const template = document.getElementById('template').innerHTML;
        Mustache.parse(template);
        const rendered = Mustache.render(template, {data: data});
        document.getElementById('target').innerHTML = rendered;
    }
}
