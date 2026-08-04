// ==UserScript==
// @name         ta bort bekräftelser
// @namespace    bokborsen
// @version      1.0
// @match        https://www.bokborsen.se/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.confirm = function() {
        return true;
    };
})();
