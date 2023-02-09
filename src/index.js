import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(countryName, DEBOUNCE_DELAY));

function countryName(e) {
  let name = '';
  name = e.target.value.trim();
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (name.length === 0)
    Notiflix.Notify.info('You must write smth to search country');
  API.fetchCountries(name)
    .then(arr => {
      if (arr.length === 1) {
        renderInfo(arr);
      } else if (arr.length > 1 && arr.length <= 10) {
        renderList(arr);
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(message => {
      Notiflix.Notify.failure(`${message}`);
    });
}

function renderList(arr) {
  // const murkup = arr
  //   .map(el => {
  //     const { flags, name } = el;
  //     return `<li>
  //       <img src="${flags.svg}" alt="${flags.alt}" width="50">
  //       <h2>${name.official}</h2>
  //     </li>`;
  //   })
  //   .join('');
  const murkup = arr.reduce((acc, el) => {
    const { flags, name } = el;
    return (
      `<li>
          <img src="${flags.svg}" alt="${flags.alt}" width="50">
          <h2>${name.official}</h2>
        </li>` + acc
    );
  }, '');
  countryList.innerHTML = murkup;
}

function renderInfo(arr) {
  const [{ capital, flags, name, languages, population }] = arr;
  const murkup = `<div>
        <img src="${flags.svg}" alt="${flags.alt}" width="50">
        <h2>${name.official}</h2>
      </div>
      <h3><b>Capital</b>: ${capital.join('')}</h3>
      <h4><b>Population</b>: ${population}</h4>
      <h4><b>Languages</b>: ${Object.values(languages).join(', ')}</h4>
    </div>`;
  countryInfo.innerHTML = murkup;
}
