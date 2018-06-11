// ==UserScript==
// @name         AniList Random Button
// @namespace    https://github.com/Allthemighty/AniList-Random
// @updateURL    https://github.com/Allthemighty/AniList-Random/raw/master/randomButton.user.js
// @version      1.2.0
// @description  Get a random button on your Anilist lists. To quickly get a random anime or manga. *Note, select the desired category, otherwise it will select from all.
// @author       Allthemighty
// @match        https://anilist.co/user/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant        GM_addStyle
// ==/UserScript==

if (/user/.test(window.location.href)) {
    waitForKeyElements("div.content.container", actionFunction);
} else {
    return;
}

function actionFunction(jNode) {
    setTimeout(function() {
        var base_node = document.getElementsByClassName("nav container")[0].lastChild,
            r_button = document.createElement("button"),
            items = document.getElementsByClassName("entry row");
        r_button.innerHTML = "Surprise me";
        r_button.style.padding = "5px";
        r_button.style.marginLeft = "10px";
        r_button.style.marginRight = "10px";
        r_button.style.borderRadius = "6px";
        r_button.style.textDecoration = "none";
        r_button.style.cursor = "pointer";
        r_button.style.border = "none";
        r_button.style.fontWeight = "bold";
        r_button.style.backgroundColor = "#9FADBD";
        r_button.style.color = "#FFFFFF";
        r_button.style.display = "inline-block";
        r_button.id = "r_button";
        r_button.onclick = function() {
            if (/mangalist/.test(window.location.href) || /animelist/.test(window.location.href)) {
                window.open(items[Math.floor(Math.random() * items.length)].childNodes[2].firstChild.href)
            } else {
                if (confirm("It doesn't look like you are on a list. Do you want to go to the anime list?")) {
                    var nav = document.getElementById("r_button").parentElement.children[1].href;
                    window.location.href = nav;
                } else {
                    if (confirm("Do you want to go to the manga list then?")) {
                        nav = document.getElementById("r_button").parentElement.children[2].href;
                        window.location.href = nav;
                    } else {
                        return;
                    }
                }

            }
        }
        base_node.parentNode.insertBefore(r_button, base_node.nextSibling);
    }, 500);
}
