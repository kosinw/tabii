const key = 'AR2vMrfrmQO2X3sJTirFWz';

export async function getBreeds(limit) {
    const response = await fetch(`https://api.thecatapi.com/v1/breeds?limit=${limit}`);
    const data = await response.json();
    return data;
}

export async function getQuote() {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts/random`);
    const data = await response.json();
    return data;
}

export async function getImage(code) {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${code}&limit=1`);
    const data = await response.json();
    return data[0].url;
}

export async function getAscii(url) {
    const response = await fetch(`https://process.filestackapi.com/${key}/ascii=b:black,f:black,s:100,r:true,c:true/${url}`);
    const data = await response.text();
    return data;
}