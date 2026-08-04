// ==UserScript==
// @name         Färgmarkera skick
// @namespace    bokborsen
// @version      6.0
// @match        https://www.bokborsen.se/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const färger = {
        "Nära nyskick": ["#d8ffd8", "#007a00"],
        "Mycket gott skick": ["#fff7b2", "#8a6d00"],
        "Gott skick": ["#ffd8a8", "#b35a00"],
        "Hyggligt skick": ["#ffc7c7", "#b00000"],
        "Dåligt skick": ["#000000", "#ffffff"],
        "Nyskick": ["#cfe8ff", "#0057b8"]
    };

    // Längre uttryck först
    const regex = /(Nära nyskick|Mycket gott skick|Hyggligt skick|Dåligt skick|Gott skick|Nyskick)/g;

    function markera() {

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    if (!node.nodeValue.trim())
                        return NodeFilter.FILTER_REJECT;

                    if (node.parentElement.closest("[data-skick-markerad]"))
                        return NodeFilter.FILTER_REJECT;

                    if (!regex.test(node.nodeValue))
                        return NodeFilter.FILTER_REJECT;

                    regex.lastIndex = 0;

                    return NodeFilter.FILTER_ACCEPT;
                }
            }
        );

        const noder = [];

        while (walker.nextNode()) {
            noder.push(walker.currentNode);
        }

        noder.forEach(node => {

            let text = node.nodeValue;

            const span = document.createElement("span");

            span.innerHTML = text.replace(regex, match => {

                regex.lastIndex = 0;

                const f = färger[match];

                return `<span style="
                    background:${f[0]};
                    color:${f[1]};
                    font-weight:bold;
                    padding:2px 4px;
                    border-radius:3px;
                ">${match}</span>`;
            });

            span.dataset.skickMarkerad = "1";

            node.parentNode.replaceChild(span, node);
        });
    }

    markera();

    let väntar = false;

    new MutationObserver(() => {

        if (väntar) return;

        väntar = true;

        setTimeout(() => {
            markera();
            väntar = false;
        }, 1000);

    }).observe(document.body, {
        childList: true,
        subtree: true
    });

})();
