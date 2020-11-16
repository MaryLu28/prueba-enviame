// Get Range
const start = process.argv.slice(2)[0];
const end = process.argv.slice(2)[1];

// Create primes list in the range
function getPrimes() {
  var primes = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

// Know if a number is prime
function isPrime(number) {
  if (number == 1) {
    return false;
  }

  if (number == 2) {
    return true;
  }

  for (let i = 2; i < number; i++) {
    if (number % i == 0) {
      return false;
    }
  }
  return true;
}

// Print the answer
console.log(
  `Los numeros primos en el rango del ${start} al ${end} son:`,
  getPrimes()
);
