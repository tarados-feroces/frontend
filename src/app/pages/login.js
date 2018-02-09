'use strict';


const regToValidateLogin = /^([a-z0-9_])+$/i;

const inputs_blocks = [...document.getElementsByClassName('login-block__input-block')];

document.getElementsByClassName("login-block__login-button")[0].addEventListener("click", () => {
    if (inputs[0].value.search(regToValidateLogin) !== -1 && inputs[1].value.search(regToValidateLogin) !== -1) {
        document.location.href = "authorized.html";
    }
});

const validation = inputBlock => {

    let input = inputBlock.getElementsByTagName("input")[0];
    let error = inputBlock.getElementsByClassName("error")[0];

    input.addEventListener('blur', () => {
        input.value.search(regToValidateLogin) === -1 ? error.style.display = "block" : error.style.display = "";
    });

    input.addEventListener('focus', () => {
        if (error.style.display === "block") {
            error.style.display = "";
        }
    });
};

inputs_blocks.forEach((item) => {
    validation(item);
});