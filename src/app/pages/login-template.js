'use strict';

const source = document.getElementById("login-template").innerHTML;
const template = Handlebars.compile(source);

// const context = {title : "Hello world!"};
const html = template({});

let div = document.createElement("div");

div.classList.add("login-block");

div.innerHTML = html;

document.body.appendChild(div);