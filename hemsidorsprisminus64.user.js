// ==UserScript==
// @name         Hemsidors pris minus 64 kr
// @namespace    hammarn
// @version      1.1
// @description  Visar originalpris -64 = nytt pris på flera boksidor
// @match        https://www.studentapan.se/*
// @match        https://www.adlibris.com/*
// @match        https://www.akademibokhandeln.se/*
// @match        https://www.bokus.com/*
// @match        https://campusbokhandeln.se/*
// @match        https://www.campusbokhandeln.se/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const AVDRAG = 64;

    function markeraPriser() {

        document.querySelectorAll("*").forEach(el => {

            if (el.dataset.minus64 === "1") return;

            if (el.children.length > 0) return;

            const text = el.textContent.trim();
            // Hoppa över överstrukna priser
            // Hoppa över överstrukna priser
            const style = window.getComputedStyle(el);
            
            if (
                style.textDecoration.includes("line-through") ||
                style.textDecorationLine.includes("line-through") ||
                el.closest("s") ||
                el.closest("del")
            ) {
                return;
            }
            
            // Hoppa över priser inom parentes
            if (/\(\s*\d[\d\s]*\s*kr\s*\)/.test(text)) {
                return;
            }

            const match = text.match(/^(\d[\d\s]*)\s*kr$/);

            if (!match) return;

            const original = parseInt(match[1].replace(/\s/g, ""));

            if (isNaN(original)) return;

            const nytt = Math.max(0, original - AVDRAG);

            el.innerHTML = `
                <span style="color:#d40000;font-weight:bold;">${original}</span>
                <span style="color:#000000;font-weight:bold;"> - ${AVDRAG} = </span>
                <span style="color:#008000;font-weight:bold;">${nytt}</span>
            `;

            el.dataset.minus64 = "1";
        });
    }

    markeraPriser();

    new MutationObserver(() => {
        clearTimeout(window.minus64Timer);
        window.minus64Timer = setTimeout(markeraPriser, 400);
    }).observe(document.body, {
        childList: true,
        subtree: true
    });

})();
