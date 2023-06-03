const express = require('express');

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function getFactors(num) {
  const factors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

const app = express();
const port = 3000;

app.get('/number', (req, res) => {
  res.send('Go to /number/:num to check if :num is prime or composite');
});

app.get('/number/:num', (req, res) => {
  const num = parseInt(req.params.num);
  if (isNaN(num)) {
    res.status(400).send('Invalid number');
  } else if (num === 1) {
    res.send('The number 1 is neither prime nor composite');
  } else if (num < 0) {
    res.send('The number is negative');
  } else {
    const isNumPrime = isPrime(num);
    const factors = getFactors(num);
    const result = `The number ${num} is ${isNumPrime ? 'prime' : 'composite'}`;
    res.send(`${result}\nFactors: ${factors.join(', ')}`);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
