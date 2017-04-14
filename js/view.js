class View {

    renderResult (data) {
        var template = document.getElementById('template').innerHTML;
        Mustache.parse(template);
        var rendered = Mustache.render(template, {data: data});
        document.getElementById('target').innerHTML = rendered;
    }
}
