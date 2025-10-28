// Enkel klient för att testa rounds endpoint
const http = require("http");

// Funktion för att skicka GET request till rounds/:d
function testRoundsEndpoint(maxRounds) {
  const options = {
    hostname: "localhost",
    port: 3000,
    path: `/rounds/${maxRounds}`,
    method: "GET",
  };
}

// Testa med olika värden
console.log("Testar rounds endpoint...");
testRoundsEndpoint(10); // Kommer att returnera 9
testRoundsEndpoint(5); // Kommer att returnera 4
testRoundsEndpoint(20); // Kommer att returnera 19

// Alternativt med fetch (mer modernt, kräver Node.js 18+)
async function testWithFetch(maxRounds) {
  try {
    const response = await fetch(`http://localhost:3000/rounds/${maxRounds}`);
    const text = await response.text();
    console.log(`Fetch response för maxRounds=${maxRounds}: ${text}`);
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}

// Uncomment denna del om du vill använda fetch istället
// console.log('\nTestar med fetch...');
// testWithFetch(15);
// testWithFetch(8);
