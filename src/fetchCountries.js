const URL = 'https://restcountries.com/v3.1';

// function fetchCountries(name) {
//   return fetch(
//     `${URL}/name/${name}?fields=name,capital,population,flags,languages`
//   ).then(res => {
//     if (!res.ok) {
//       throw new Error('Oops, there is no country with that name.');
//     }
//     return res.json();
//   });
// }

// export default { fetchCountries };

export default class API {
  fetchCountries(name) {
    return fetch(
      `${URL}/name/${name}?fields=name,capital,population,flags,languages`
    ).then(res => {
      if (!res.ok) {
        throw new Error('Oops, there is no country with that name.');
      }
      return res.json();
    });
  }
}
