const fs = require('fs');

cli_string = process.argv[2]

fs.readFile('./example.txt', 'utf-8', (err, file) => {
    if (err) {
        console.log(err)
    }
    const exists = file.includes(cli_string)
    console.log(exists)
})

/*

PS C:\> node main.js NODE.JS
false

PS C:\> node main.js Node.js

true
*/

