'use strict';


const regToValidateLogin = /^([a-z0-9_])+$/i;

const inputs = [...document.getElementsByClassName('login__input')];
const inputs_blocks = [...document.getElementsByClassName('login-block__input-block')];
const errors = document.getElementsByClassName("error");

document.getElementsByClassName("loginButton")[0].addEventListener("click", () => {
    if (inputs[0].value.search(regToValidateLogin) !== -1 && inputs[1].value.search(regToValidateLogin) !== -1) {
        document.location.href = "authorized.html";
    }
});

const validation = (input) => {
    console.log(input.getElementsByTagName("input")[0]);
    input.getElementsByTagName("input")[0].addEventListener('blur', () => {
        input.getElementsByTagName("input")[0].value.search(regToValidateLogin) === -1 ? input.getElementsByTagName("error")[0].style.display = "block" : input.getElementsByTagName("error")[0].style.display = "";
    });

    input.getElementsByTagName("input")[0].onfocus = () => {
        if (input.getElementsByTagName("error")[0].style.display === "block") {
            input.getElementsByTagName("error")[0].style.display = "";
        }
    };
};

inputs_blocks.forEach((item) => {
    validation(item);
});