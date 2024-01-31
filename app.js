const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};
let selectelements = document.querySelectorAll('select');
let button = document.querySelector('button');
let input = document.querySelector('.searchbar input');
let baseurl = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';
let output = document.querySelector('.output p');
let exchange = document.querySelector('.exchange');
let countryimages = document.querySelectorAll('img')

for (let select of selectelements) {
  for (countrycurrency in countryList) {
    let option = document.createElement('option');
    option.innerText = countrycurrency;
    if ((select.name === 'From' && countrycurrency === 'USD') || (select.name === 'To' && countrycurrency === 'INR')) {
      option.selected = 'selected';
    }
    option.value = countrycurrency;
    select.append(option);
  }

  select.addEventListener('change', (e) => {
    let element = e.target;
    let countrycode = countryList[element.value]
    element.parentElement.querySelector('img').src = `https://flagsapi.com/${countrycode}/flat/48.png`

  })
}
   

function show() {
  let rate , value;
   if(input.value) value = parseFloat(input.value);
   else {
    input.value = '1';
      value = 1;
   }
  fetch(`${baseurl}${selectelements[0].value.toLowerCase()}/${selectelements[1].value.toLowerCase()}.json`)
    .then((res) => res.json())
    .then(a => {
      rate = parseFloat(a[selectelements[1].value.toLowerCase()]);
      output.innerHTML = `${input.value} ${selectelements[0].value.toLowerCase()}  =  ${(value * rate).toFixed(2)} ${selectelements[1].value.toLowerCase()}`;
    });


}
button.addEventListener('click', show);

function doexchange(){

  let temp = selectelements[0].value;
  selectelements[0].value = selectelements[1].value;
  selectelements[1].value = temp;
  countryimages[0].src =  `https://flagsapi.com/${countryList[selectelements[0].value]}/flat/48.png`;
  countryimages[1].src =  `https://flagsapi.com/${countryList[selectelements[1].value]}/flat/48.png`

}

exchange.addEventListener('click' , doexchange);