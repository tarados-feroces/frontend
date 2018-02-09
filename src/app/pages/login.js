'use strict';


const regToValidateLogin = /^([a-z0-9_])+$/i;

const inputs = [document.getElementsByClassName("loginLoginInput")[0], document.getElementsByClassName("passwordLoginInput")[0]];
const errors = document.getElementsByClassName("error");

document.getElementsByClassName("loginButton")[0].addEventListener("click", () => {
    if (inputs[0].value.search(regToValidateLogin) !== -1 && inputs[1].value.search(regToValidateLogin) !== -1) {
        document.location.href = "authorized.html";
    }
});

inputs[0].onfocus = () => {
    if (errors[0].style.display === "block") {
        errors[0].style.display = "none";
    }
};

inputs[0].onblur = () => {
    inputs[0].value.search(regToValidateLogin) === -1 ? errors[0].style.display = "block" : errors[0].style.display = "none";
};

inputs[1].onfocus = () => {
    if (errors[1].style.display === "block") {
        errors[1].style.display = "none";
    }
};

inputs[1].onblur = () => {
    inputs[1].value.search(regToValidateLogin) === -1 ? errors[1].style.display = "block" : errors[1].style.display = "none";
};




