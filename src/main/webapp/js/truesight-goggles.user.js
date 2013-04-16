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
// @version         0.5
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

var linkUnderlineStyles = [
    "a:link { text-decoration: underline !important; }",
    "a:visited { text-decoration: underline !important; }",
    "a:active { text-decoration: underline !important; }",
    "a:hover { text-decoration: underline !important; }"
];

//---------------------------------------------------------------------------

var tsgConfig = {};

//---------------------------------------------------------------------------

var applyConfiguration = function() {
    doLinkUnderline(tsgConfig.checkLinkUnderline);
    doProcessPosts();
}

var collateAnchorTags = function(splitHtml) {
    var result = new Array();
    var index = 0;
    while(index < splitHtml.length) {
        if(isTag(splitHtml[index])) {
            if(isAnchor(splitHtml[index])) {
                result.push([
                    splitHtml[index],
                    splitHtml[index+1],
                    splitHtml[index+2]
                ].join(""));
                index += 3;
                continue;
            }
        }
        result.push(splitHtml[index]);
        index++;
    }
    return result;
}

var doLinkAutolink = function(element) {
    var index = 0;
    for(index=0; index<element.splitHTML.length; index++) {
        if(isTag(element.splitHTML[index]) === false) {
            element.splitHTML[index] = element.splitHTML[index].replace(
                /([A-Za-z]+\:\/\/[^<]+)/gm,
                '<a href="$1" target="_blank">$1</a>');
        }
    }
}

var doLinkUnderline = function(underline) {
    if(underline) {
        linkUnderlineStyles.forEach(function(element, index, array) {
            GM_addStyle(element);
        });
    } else {
        $("style").each(function(index, element) {
            if(linkUnderlineStyles.indexOf(element.innerHTML) != -1) {
                $(this).remove();
            }
        });
    }
}

var doProcessPosts = function() {
    $(".post itemscope").each(function(index, element) {
        if(false) {
            // remove the post instead of working with it
        }
        else {
            // reload the original text of the post
            element.innerHTML = element.savedInnerHTML;
            // split the HTML into tags and text
            element.splitHTML = splitHtml(element.innerHTML);
            // collate anchor tags into a single array element
            element.splitHTML = collateAnchorTags(element.splitHTML);
            // automatically linkify naked URLs
            if(tsgConfig.checkLinkAutolink) { doLinkAutolink(element); }
//            // visually mark something
//            $(this).after("<hr/>");
            // recombine the split html
            element.innerHTML = element.splitHTML.join("");
        }
    });
}

var isAnchor = function(text) {
    return (text[1] === 'a' || text[1] === 'A');
}

var isTag = function(text) {
    return (text[0] === '<');
}

var loadConfiguration = function() {
    // load the configuration from storage
    tsgConfig.checkLinkAutolink = (GM_getValue("checkLinkAutolink", "false") === "true");
    tsgConfig.checkLinkUnderline = (GM_getValue("checkLinkUnderline", "false") === "true");
    // update the dialog box
    $("#checkLinkAutolink")[0].checked = tsgConfig.checkLinkAutolink;
    $("#checkLinkUnderline")[0].checked = tsgConfig.checkLinkUnderline;
}

var loadPostText = function() {
    $(".post itemscope").each(function(index, element) {
        element.innerHTML = element.savedInnerHTML;
    });
}

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

var saveConfiguration = function() {
    GM_setValue("checkLinkAutolink", tsgConfig.checkLinkAutolink);
    GM_setValue("checkLinkUnderline", tsgConfig.checkLinkUnderline);
}

var savePostText = function() {
    $(".post itemscope").each(function(index, element) {
        element.savedInnerHTML = element.innerHTML;
    });
}

var splitHtml = function(innerHtml) {
    var result = new Array();
    var index = 0;
    while(index < innerHtml.length) {
        var nextLeft = innerHtml.indexOf("<", index);
        if(nextLeft === -1) {
            var last = innerHtml.substring(index);
            result.push(last);
            index = innerHtml.length;
        } else {
            var nextRight = innerHtml.indexOf(">", nextLeft+1);
            if(nextRight === -1) {
                throw "Unmatched < in innerHtml";
            } else {
                var before = innerHtml.substring(index, nextLeft);
                var tag = innerHtml.substring(nextLeft, nextRight+1);
                if(before.length > 0) { result.push(before); }
                result.push(tag);
                index = nextRight+1;
            }
        }
    }
    return result;
}

//---------------------------------------------------------------------------
// Lights, Camera, Action!
//---------------------------------------------------------------------------
$(document).ready(function() {
    // get our jQuery UI on!
    loadjQueryUi();
    // give the owl some style
    GM_addStyle([
        "#truesight-goggles { opacity:0.5; }",
        "#truesight-goggles:hover { opacity:1.0; }",
        "#truesight-goggles-dialog { display:none; }",
    ].join(""));
    // create the owl
    $('body').append([
'<div id="truesight-goggles">',
    '<img id="truesight-goggles-img" src="https://paizo.com/image/avatar/owl.jpg"/>',
'</div>',
'<div id="truesight-goggles-dialog" title="another_mage\'s Truesight Goggles">',
    '<div id="truesight-goggles-tabs">',
        '<ul>',
            '<li><a href="#tab-display">Display</a></li>',
            '<li><a href="#tab-posts">Posts</a></li>',
            '<li><a href="#tab-about">About</a></li>',
        '</ul>',
        '<div id="tab-display">',
            '<input id="checkLinkUnderline" type="checkbox"/> Underline All Links<br/>',
        '</div>',
        '<div id="tab-posts">',
            '<input id="checkLinkAutolink" type="checkbox"/> Hyperlink URLs<br/>',
        '</div>',
        '<div id="tab-about">',
            '<p><a href="https://paizo.com/people/anotherMage">another_mage</a>\'s Truesight Goggles<br/>License: <a href="http://www.gnu.org/licenses/agpl.html">AGPL v3+</a>&nbsp;Source: <a href="https://github.com/blinkdog/truesight-goggles">GitHub</a></p>',
            '<p>Thanks to:</p>',
            '<p><a href="https://paizo.com/people/Cheapy">Cheapy</a></p>',
        '</div>',
    '</div>',
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
        $("#truesight-goggles-tabs").tabs();
        $("#truesight-goggles-dialog").dialog();
    });
    // tell the Hyperlink URLs checkbox how to act
    $("#checkLinkAutolink").click(function() {
        tsgConfig.checkLinkAutolink = $("#checkLinkAutolink")[0].checked;
        saveConfiguration();
        doProcessPosts();
    });
    // tell the Underline All Links checkbox how to act
    $("#checkLinkUnderline").click(function() {
        tsgConfig.checkLinkUnderline = $("#checkLinkUnderline")[0].checked;
        saveConfiguration();
        doLinkUnderline(tsgConfig.checkLinkUnderline);
    });
    // save post text, if any
    savePostText();
    // load and apply the configuration
    loadConfiguration();
    applyConfiguration();
});

//debugger;
//---------------------------------------------------------------------------
// end of script
