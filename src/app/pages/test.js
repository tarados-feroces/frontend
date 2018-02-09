'use strict';


const source = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);

const context = {title : "Hello world!"};
const html = template(context);

const title = document.createElement('div');
title.innerHTML = html;

document.body.appendChild(title);
