// ==UserScript==
// @name         Lägsta pris som standard
// @namespace    bokborsen
// @version      1.2
// @description  Sätter lägsta pris som standard men respekterar egna val
// @match        https://www.bokborsen.se/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const url = new URL(window.location.href);

    // Om användaren redan valt en sortering: rör inte den
    if (url.searchParams.has('_s') || url.searchParams.has('_d')) {
        return;
    }

    // Om ingen sortering finns: välj lägsta pris
    url.searchParams.set('_s', 'price');
    url.searchParams.set('_d', 'asc');

    window.location.replace(url.toString());
})();
