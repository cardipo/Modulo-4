'use strict';

const calculator = require('./calculator');

const { substract, mul, div } = calculator;

const resultSum = calculator.sum(5, 3);

const resultSubstract = substract(5, 3);

console.log(`resultSum: ${resultSum}`);
console.log(`resultSubstract: ${resultSubstract}`);


mul(3, 4).then((resultMul) => {
  console.log('resultMul', resultMul);
}).catch((err) => {
  console.error('errorMul', err);
});

async function startDiv() {
  try {
    const resultDiv = await div(6, 2);
    console.log(`resultDivAsync: ${resultDiv}`);
  } catch (err) {
    console.error('error resultDivAsync', err);
  }
}

startDiv();

// treat div as promise
div(4, 2).then((resultDiv) => {
  console.log(`resultDiv ${resultDiv}`);
}).catch((err) => {
  console.error('resultDiv error', err);
});
