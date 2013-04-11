// truesight-goggles.user.js
// Copyright 2013 Patrick Meade
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
// ==UserScript==
// @name            truesight-goggles
// @version         0.2
// @updateURL       https://github.com/blinkdog/truesight-goggles/raw/master/src/main/webapp/js/truesight-goggles.user.js
// @namespace       http://pages.cs.wisc.edu/~meade/greasemonkey/
// @description     Enhance your experience on Paizo's website
// @match           http://paizo.com/*
// @match           http://*.paizo.com/*
// @match           https://paizo.com/*
// @match           https://*.paizo.com/*
// @require         http://code.jquery.com/jquery-1.9.1.min.js
// @require         http://code.jquery.com/ui/1.10.2/jquery-ui.js
// @require         https://userscripts.org/scripts/source/145813.user.js
// @resource        jQueryUiCss http://code.jquery.com/ui/1.10.2/themes/overcast/jquery-ui.css
// @grant           GM_getResourceText
// ==/UserScript==
//---------------------------------------------------------------------------

/**
 * Reposition the Truesight Goggles icon. It will be placed half it's own
 * width and height from the lower left corner of the current window.
 */
var reposition = function() {
    var tg = $("#truesight-goggles");
    var tgi = $("#truesight-goggles-img");
    var win = $(window);
    tg.offset({
        left: window.scrollX + (tgi.width() * 0.5),
        top: window.scrollY + win.height() - (tgi.height() * 1.5)
    });
}

//---------------------------------------------------------------------------
// Lights, Camera, Action!
//---------------------------------------------------------------------------
$(document).ready(function() {
    // give the owl some style
    GM_addStyle([
        "#truesight-goggles { display:inline-block; opacity:0.5; }",
        "#truesight-goggles:hover { display:inline-block; opacity:1.0; }"
    ].join(""));
    var jQueryUiCss = GM_getResourceText("jQueryUiCss");
    GM_addStyle(jQueryUiCss);
    // create the owl
    $('body').append([
        '<div id="truesight-goggles">',
            '<img id="truesight-goggles-img" src="http://paizo.com/image/avatar/owl.jpg"/>',
        '</div>',
        '<div id="truesight-goggles-dialog">',
            '<p>All your Pathfinder are belong to us!</p>',
        '</div>'
    ].join(""));
    // resize the owl
    $("#truesight-goggles-img").width(
        ($("#truesight-goggles-img").width() / 2)
    );
    // position the owl
    reposition();
    // reposition the owl when necessary
    $(window).scroll(reposition);
    $(window).resize(reposition);
    // tell the owl to pop up a friendly dialog when clicked
    $("#truesight-goggles-img").click(function() {
        $("#truesight-goggles-dialog").dialog();
    });
});

//---------------------------------------------------------------------------
// end of script
