'use strict';


let regToValidateLogin = /^([a-z0-9_])+$/i;

document.getElementsByClassName("loginButton")[0].addEventListener("click", () => {
    let inputs = [document.getElementsByClassName("loginLoginInput")[0], document.getElementsByClassName("passwordLoginInput")[0]];

    alert(inputs[0].value.search(regToValidateLogin) !== -1 ? "ok" : "wrong login");
    alert(inputs[1].value.search(regToValidateLogin) !== -1 ? "ok" : "wrong password");

    if (inputs[0].value.search(regToValidateLogin) !== -1 && inputs[1].value.search(regToValidateLogin) !== -1) {
        document.location.href = 'authorized.html';
    }
});


