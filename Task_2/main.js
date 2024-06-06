const express = require('express');

const app = express();
const instructions = 'Go to /number/:num to check if :num is/isn’t a palindrome';

app.get('/', (req, res) => {
    res.send(instructions);
});

app.get('/number/', (req, res) => {
    res.send(instructions);
});

app.get(`/number/:num`, (req, res) => {
    const num = parseInt(req.params.num)

    if (isNaN(num)) {
        res.send("This is not a number")
    }

    if (num < 0) {
        res.send("The number is negative")
    }

    if (checkPalindrome(num)) {
        res.send(`${num} is a palindrome`)
    }
    else {
        res.send(`${num} isn't a palindrome`)
    }

    function checkPalindrome(n) {
        let stringNum = n.toString()
        let reversNum = stringNum.split('').reverse().join('')
        if (stringNum === reversNum) {
            return true
        }
        
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
});