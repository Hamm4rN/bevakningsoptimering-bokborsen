// ==UserScript==
// @name         Studentapan - Pris minus 64
// @namespace    studentapan
// @version      1.3
// @description  Visar originalpris minus 64 och färgar priserna
// @match        https://www.studentapan.se/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const avdrag = 64;

    function ändraPriser() {

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        const noder = [];

        while (walker.nextNode()) {
            noder.push(walker.currentNode);
        }

        noder.forEach(node => {

            const el = node.parentElement;

            if (!el || el.dataset.prisFixat)
                return;

            let text = node.nodeValue;

            const regex = /(\d[\d\s]*)\s*kr/g;

            if (!regex.test(text))
                return;

            regex.lastIndex = 0;

            const nytt = text.replace(regex, (match, belopp) => {

                const original = parseInt(
                    belopp.replace(/\s/g, "")
                );

                const nyttPris = Math.max(original - avdrag, 0);

                return `
                    <span style="color:red;font-weight:bold;">
                        ${original}
                    </span>
                    - 64 =
                    <span style="color:green;font-weight:bold;">
                        ${nyttPris}
                    </span>
                `;
            });

            if (nytt !== text) {
                const span = document.createElement("span");
                span.innerHTML = nytt;

                node.parentNode.replaceChild(span, node);
                span.dataset.prisFixat = "1";
            }

        });
    }

    ändraPriser();

    new MutationObserver(() => {
        setTimeout(ändraPriser, 500);
    }).observe(document.body, {
        childList: true,
        subtree: true
    });

})();
