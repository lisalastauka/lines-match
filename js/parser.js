const reader1 = new FileReader();
const reader2 = new FileReader();

class Parser {
    getFiles(form) {
        const {input, pattern} = form;
        return this.validateFiles([input, pattern].map(x => x.files[0]));
    }

    validateFiles(files) {
        if (files.some(el => !el)) {
            throw new Error('Both files required');
        }
        if (files.some(el => !el.type.match(textType))) {
            throw new Error('Only text files supported');
        }

        return this.readFiles(files);
    }

    // readFiles(data) {
    //     return new Promise(function (resolve, reject) {
    //         let input;
    //         let patterns;
    //         reader1.onloadend = function (loadEvent) {
    //             input = loadEvent.target.result;
    //         };
    //         reader2.onloadend = function (loadEvent) {
    //             patterns = loadEvent.target.result;
    //             if (input && patterns) {
    //                 resolve([input, patterns]);
    //             }
    //             else reject(() => {
    //                     throw new Error()
    //                 }
    //             )
    //         };
    //         reader1.readAsText(data[0]);
    //         reader2.readAsText(data[1]);
    //     })
    //
    // }

    readFiles(data) {
        return new Promise(function (resolve) {
            reader1.onloadend = function (loadEvent) {
               const input = loadEvent.target.result;
               if(input) {
                   console.log(input);
                    resolve(input)
                }
            };
            reader1.readAsText(data[0]);
        }).then((input)=>{
            reader2.onloadend = function (loadEvent) {
                console.log(input, loadEvent.target.result)
                return({input, patterns : loadEvent.target.result}) ;
            };
            reader2.readAsText(data[1]);
        }).then(({input, patterns}) =>{
            if (input && patterns) {
                console.log(input, patterns);
                return([input, patterns]);
            }
        }).catch(function (err) {
            throw new Error(err);
        })


    }

}