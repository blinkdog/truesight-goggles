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
// @version         0.3
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
// @resource        jQueryUiCss         http://code.jquery.com/ui/1.10.2/themes/overcast/jquery-ui.min.css
// @resource        jQueryUiThemeCss    http://code.jquery.com/ui/1.10.2/themes/overcast/jquery.ui.theme.css
// @resource        juiAnimatedOverlay  http://code.jquery.com/ui/1.10.2/themes/overcast/images/animated-overlay.gif
// @resource        juiBgInsetSoft      http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_inset-soft_50_c9c9c9_1x100.png
// @resource        juiBgGlass35        http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_glass_35_dddddd_1x400.png
// @resource        juiBgGlass60        http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_glass_60_eeeeee_1x400.png
// @resource        juiBgGlass100       http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_glass_100_f8f8f8_1x400.png
// @resource        juiBgInsetHard      http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_inset-hard_75_999999_1x100.png
// @resource        juiBgFlat55ee       http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_flat_55_eeeeee_40x100.png
// @resource        juiBgFlat55c0       http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_flat_55_c0402a_40x100.png
// @resource        juiIcons99          http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-icons_999999_256x240.png
// @resource        juiIcons70          http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-icons_70b2e1_256x240.png
// @resource        juiIcons33          http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-icons_3383bb_256x240.png
// @resource        juiIcons45          http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-icons_454545_256x240.png
// @resource        juiIconsfb          http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-icons_fbc856_256x240.png
// @resource        juiBgFlat0ee        http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_flat_0_eeeeee_40x100.png
// @resource        juiBgFlat0aa        http://code.jquery.com/ui/1.10.2/themes/overcast/images/ui-bg_flat_0_aaaaaa_40x100.png
// @grant           GM_getResourceText
// ==/UserScript==
//---------------------------------------------------------------------------

/**
 * Load the jQuery UI CSS and associated image resources.
 * @see http://stackoverflow.com/questions/11528541/why-doesnt-my-jquery-ui-script-execute-in-greasemonkey-it-runs-in-the-firebug
 */
var loadjQueryUi = function() {
    var juiAnimatedOverlay = GM_getResourceURL("juiAnimatedOverlay");
    var juiBgInsetSoft = GM_getResourceURL("juiBgInsetSoft");
    var juiBgGlass35 = GM_getResourceURL("juiBgGlass35");
    var juiBgGlass60 = GM_getResourceURL("juiBgGlass60");
    var juiBgGlass100 = GM_getResourceURL("juiBgGlass100");
    var juiBgInsetHard = GM_getResourceURL("juiBgInsetHard");
    var juiBgFlat55ee = GM_getResourceURL("juiBgFlat55ee");
    var juiBgFlat55c0 = GM_getResourceURL("juiBgFlat55c0");
    var juiIcons99 = GM_getResourceURL("juiIcons99");
    var juiIcons70 = GM_getResourceURL("juiIcons70");
    var juiIcons33 = GM_getResourceURL("juiIcons33");
    var juiIcons45 = GM_getResourceURL("juiIcons45");
    var juiIconsfb = GM_getResourceURL("juiIconsfb");
    var juiBgFlat0ee = GM_getResourceURL("juiBgFlat0ee");
    var juiBgFlat0aa = GM_getResourceURL("juiBgFlat0aa");

    var rewriteCss = function(css) {
        css = css.replace(/images\/animated-overlay\.gif/g, juiAnimatedOverlay);
        css = css.replace(/images\/ui-bg_inset-soft_50_c9c9c9_1x100\.png/g, juiBgInsetSoft);
        css = css.replace(/images\/ui-bg_glass_35_dddddd_1x400\.png/g, juiBgGlass35);
        css = css.replace(/images\/ui-bg_glass_60_eeeeee_1x400\.png/g, juiBgGlass60);
        css = css.replace(/images\/ui-bg_glass_100_f8f8f8_1x400\.png/g, juiBgGlass100);
        css = css.replace(/images\/ui-bg_inset-hard_75_999999_1x100\.png/g, juiBgInsetHard);
        css = css.replace(/images\/ui-bg_flat_55_eeeeee_40x100\.png/g, juiBgFlat55ee);
        css = css.replace(/images\/ui-bg_flat_55_c0402a_40x100\.png/g, juiBgFlat55c0);
        css = css.replace(/images\/ui-icons_999999_256x240\.png/g, juiIcons99);
        css = css.replace(/images\/ui-icons_70b2e1_256x240\.png/g, juiIcons70);
        css = css.replace(/images\/ui-icons_3383bb_256x240\.png/g, juiIcons33);
        css = css.replace(/images\/ui-icons_454545_256x240\.png/g, juiIcons45);
        css = css.replace(/images\/ui-icons_fbc856_256x240\.png/g, juiIconsfb);
        css = css.replace(/images\/ui-bg_flat_0_eeeeee_40x100\.png/g, juiBgFlat0ee);
        css = css.replace(/images\/ui-bg_flat_0_aaaaaa_40x100\.png/g, juiBgFlat0aa);
        return css;
    }

    GM_addStyle(rewriteCss(GM_getResourceText("jQueryUiCss")));
    GM_addStyle(rewriteCss(GM_getResourceText("jQueryUiThemeCss")));
}

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
    // get our jQuery UI on!
    loadjQueryUi();
    // give the owl some style
    GM_addStyle([
        "#truesight-goggles { display:inline-block; opacity:0.5; }",
        "#truesight-goggles:hover { display:inline-block; opacity:1.0; }",
        "#truesight-goggles-dialog { display:none; }",
    ].join(""));
    // create the owl
    $('body').append([
        '<div id="truesight-goggles">',
            '<img id="truesight-goggles-img" src="http://paizo.com/image/avatar/owl.jpg"/>',
        '</div>',
        '<div id="truesight-goggles-dialog" title="another_mage\'s Truesight Goggles">',
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
