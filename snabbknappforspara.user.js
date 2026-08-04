// ==UserScript==
// @name         snabbknapp för Spara
// @namespace    bokborsen
// @version      1.0
// @match        https://www.bokborsen.se/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('keydown', function(e) {

        // Alt + S
        if (e.altKey && e.key.toLowerCase() === 's') {
            e.preventDefault();

            const knapp = [...document.querySelectorAll('button, input[type="submit"], a')]
                .find(el => el.innerText.includes('Spara') || el.value?.includes('Spara'));

            if (knapp) {
                knapp.click();
            }
        }

    });
})();
