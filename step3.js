const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.kill(1);
        }
        console.log(data);
    })
}

function webCat(URL) {
    let getURL = axios.get(URL);
    getURL
        .then(data => console.log(data.data))
        .catch(err => console.log(err));
}

function writeFile(path, data) {
    fs.writeFile(path, data, 'utf8', function(err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`Successfully wrote to ${path}!`);
    })
}


if (process.argv[2] == '--out') {
    writeFile(process.argv[3], process.argv[4])
}
else if (process.argv[2].startsWith('http')) {
    webCat(process.argv[2])
}
else {
    cat(process.argv[2])
}
