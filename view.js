const message = {
    required: 'Both files required',
    noMatch: 'No match!',
    wrongType : 'Only text files supported!'
};
const timeOut = 5000;

class View {

    getInputFiles() {
        return Array.from(document.querySelectorAll('input[type=file]')).map(x=>x.files[0])
    }

    displayMessage (messageType) {
        let messageNode = document.getElementsByClassName('message');
        if (messageNode.length){
            messageNode[0].innerHTML = message[messageType]
        } else {
            let div = document.createElement('div');
            div.className = 'message';
            div.innerHTML = message[messageType];
            document.body.appendChild(div);
            setTimeout(function() {
                div.parentNode.removeChild(div)
            }, timeOut)
        }
    }

    static clearMessage () {
        let messageNode = document.getElementsByClassName('message');
        if (messageNode.length){
            messageNode[0].innerHTML = ''
        }
    }

    renderView (callback) {
        document.getElementById('submit').addEventListener('click', callback)
    }

    renderResult (data) {
        View.clearMessage();
        let ol = document.createElement('ol');
        for (let mode in data) {
            let li = document.createElement('li');
            li.innerHTML = data[mode];
            ol.appendChild(li)
        }
        let resultNode = document.getElementsByClassName('resultContainer');
        if (resultNode.length){
            resultNode[0].remove()
        }
        let container =  document.createElement('div');
        container.className = 'resultContainer';
        container.appendChild(ol);
        document.body.appendChild(container)

    }
}
