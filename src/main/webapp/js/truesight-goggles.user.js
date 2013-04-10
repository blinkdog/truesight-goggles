// truesight-goggles.user.js
// Copyright 2013 Patrick Meade

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// ==UserScript==
// @name           truesight-goggles
// @version        0.1
// @namespace      http://pages.cs.wisc.edu/~meade/greasemonkey/
// @description    Enhance your experience on Paizo's website
// @match          http://paizo.com/*
// @match          http://*.paizo.com/*
// @match          https://paizo.com/*
// @match          https://*.paizo.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// ==/UserScript==

$(document).ready(function() {
    $('body').append('<div id="truesight-goggles"><p>All your Pathfinder are belong to us!</p></div>');
});

// end of script
