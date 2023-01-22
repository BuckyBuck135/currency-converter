// DOM constants
const input = document.getElementById("input")
const buttonEl = document.getElementById("button-el")
const hkdEl = document.getElementById("hkd-el")
const audEl = document.getElementById("aud-el")
const myrEl = document.getElementById("myr-el")

    
//FX rates as of 18/11/22
const eurHkdRate = 8.1249329;
const eurAudRate = 1.5439439;
const eurMyrRate = 4.7195319;


//Variables for conversions
let inputValue = 0

let euroToHkd = 0
let euroToAud = 0
let euroToMyr = 0

let hkdToEur = 0
let audToEur = 0
let myrToEur  = 0

//Upon clicking the "convert" button
buttonEl.addEventListener("click", function(event) {
    event.preventDefault() //prevents the form from submitting itself
    inputValue = input.valueAsNumber // using .value returns a string (we will then need Number() to convert to a number), whereas using .valueAsNumber reurns a number
    convert();
    render(hkdEl, "EUR", "HKD", euroToHkd, hkdToEur);
    render(audEl, "EUR", "AUD", euroToAud, audToEur);
    render(myrEl, "EUR", "MYR", euroToMyr, myrToEur);
})

function getFXRate(inputValue, FXRate) {
    return (inputValue * FXRate).toFixed(3)
}   
     
function convert() {    
    euroToHkd = getFXRate(inputValue, eurHkdRate)
    euroToAud = getFXRate(inputValue, eurAudRate)
    euroToMyr = getFXRate(inputValue, eurMyrRate)

    hkdToEur =  getFXRate(inputValue, 1 / eurHkdRate)
    audToEur =  getFXRate(inputValue, 1 / eurAudRate)
    myrToEur =  getFXRate(inputValue, 1 / eurMyrRate)
}

function render(el, firstCurrency, secondCurrency, euroToCurrency, currencyToEuro) {
    el.innerHTML = `
        <span class="currency-color">${inputValue}</span> ${firstCurrency} = <span class="currency-color">${euroToCurrency}</span> ${secondCurrency} <br>
        ---<br>
        <span class="currency-color">${inputValue}</span> ${secondCurrency} = <span class="currency-color">${currencyToEuro}</span> ${firstCurrency}
        `
}

//// Color picker localStorage ////

const colorThemes = document.querySelectorAll('[name="theme"]');

// store theme
function storeTheme(theme) {
  localStorage.setItem("theme", theme);
};

// set theme when visitor returns
function setTheme() {
  const activeTheme = localStorage.getItem("theme");
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
  // fallback for no :has() support
  document.documentElement.className = activeTheme;
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener("click", () => {
    storeTheme(themeOption.id);
    // fallback for no :has() support
    document.documentElement.className = themeOption.id;
  });
});

document.onload = setTheme();
