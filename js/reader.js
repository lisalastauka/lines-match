class Reader {

    static read(data) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = (loadEvent) => {
                resolve(loadEvent.target.result) ;
            };
            reader.readAsText(data);
        });
    }

    readFiles(data) {
        const files = data.map((el,i)=>
            Reader.read(data[i])
        );
        return Promise.all(files);
    }

}