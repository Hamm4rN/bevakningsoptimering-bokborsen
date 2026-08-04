// ==UserScript==
// @name         Markera mina annonser
// @namespace    bokborsen
// @version      1.3
// @match        https://www.bokborsen.se/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const minaNamn = [
        "Hammar Böcker Handelsbolag",
        "LOWE"
    ];

    function markera() {

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        while (walker.nextNode()) {

            const node = walker.currentNode;

            if (minaNamn.some(namn => node.nodeValue.includes(namn))) {

                const el = node.parentElement;

                if (!el || el.dataset.markerad)
                    continue;

                el.dataset.markerad = "1";

                el.style.background = "#b8ffb8";
                el.style.color = "#006600";
                el.style.fontWeight = "bold";
                el.style.padding = "2px 4px";
                el.style.borderRadius = "4px";
                el.style.border = "2px solid #008000";
            }
        }
    }

    markera();

    new MutationObserver(markera).observe(document.body, {
        childList: true,
        subtree: true
    });

})();
