import { TabiiDropdown } from './tabii-dropdown.js';
import { getQuote, getImage, getAscii } from './api.js';

window.customElements.define('tabii-dropdown', TabiiDropdown);

document.addEventListener("DOMContentLoaded", function (event) {
    getQuote()
        .then(response => {
            const blockquote = document.getElementById("cat-quote");
            blockquote.innerHTML = response.text;
        });
});

const generateButton = document.getElementById("generate-button");

generateButton.addEventListener("click", function (event) {
    if (!!window.selected && window.selected != -1) {
        getImage(window.breeds[window.selected].id)
            .then(function (data) {
                const output = document.getElementById("output-img");

                getAscii(data).then(data2 => {
                    
                    // console.log(data2);
                    output.innerHTML = data2;
                });
            });
    }
})