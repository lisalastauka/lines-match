const message = {
    required: 'Both files required',
    noMatch: 'No match!',
    wrongType : 'Only text files supported!'
};

class View {

    getInputFiles() {
        return [document.getElementById('input').files[0], document.getElementById('pattern').files[0]];
    }

    displayMessage (messageType) {
        document.getElementById('displayArea').innerHTML = message[messageType];
    }

    renderView () {
        document.getElementById('submit').addEventListener('click', getFiles);
    }

    renderResult (data) {
        document.getElementById('result').innerHTML = `
        <h3>Mode 1</h3>
        <div id = "mode1"></div>
        <h3>Mode 2</h3>
        <div id = "mode2"></div>
        <h3>Mode 3</h3>
        <div id = "mode3"></div>
        `
        document.getElementById('mode1').innerHTML = data.intersection;
        document.getElementById('mode2').innerHTML = data.partial;
        document.getElementById('mode3').innerHTML = data.similar;
    }
}
