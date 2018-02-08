'use strict';


const regToValidateLogin = /^([a-z0-9_])+$/i;

const inputs = [document.getElementsByClassName("loginLoginInput")[0], document.getElementsByClassName("passwordLoginInput")[0]];
const errors = document.getElementsByClassName("error");

document.getElementsByClassName("loginButton")[0].addEventListener("click", () => {
    if (inputs[0].value.search(regToValidateLogin) !== -1 && inputs[1].value.search(regToValidateLogin) !== -1) {
        document.location.href = "authorized.html";
    }
});

inputs.forEach((item, i) => {
    item.onblur = () => {
        item.value.search(regToValidateLogin) === -1 ? errors[i].style.display = "block" : errors[i].style.display = "";
    };

    item.onfocus = () => {
        if (errors[i].style.display === "block") {
            errors[i].style.display = "";
        }
    };
});
