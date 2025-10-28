export function result(d, matches) {
  resultH2.innerText = `Round no ${d}: `;

  for (let j = 0; j < matches.length; j++) {
    results.innerHTML += `${matches[j][0].name} <strong> vs </strong> ${matches[j][1].name}<br>`;
  }
}
