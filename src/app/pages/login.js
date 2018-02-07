'use strict';


const regToValidateLogin = /^([a-z0-9_])+$/i;

document.getElementsByClassName("loginButton")[0].addEventListener("click", () => {
    let inputs = [document.getElementsByClassName("loginLoginInput")[0], document.getElementsByClassName("passwordLoginInput")[0]];
    let errors = document.getElementsByClassName("error");

    inputs[0].value.search(regToValidateLogin) === -1 ? errors[0].style.display = "block" : errors[0].style.display = "none";

    inputs[1].value.search(regToValidateLogin) === -1 ? errors[1].style.display = "block" : errors[1].style.display = "none";

    if (inputs[0].value.search(regToValidateLogin) !== -1 && inputs[1].value.search(regToValidateLogin) !== -1) {
        document.location.href = "authorized.html";
    }
});
