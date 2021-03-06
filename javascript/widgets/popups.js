/*
	WebPlotDigitizer - http://arohatgi.info/WebPlotDigitizer

	Copyright 2010-2014 Ankit Rohatgi <ankitrohatgi@hotmail.com>

	This file is part of WebPlotDigitizer.

    WebPlotDigitizer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WebPlotDigitizer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WebPlotDigitizer.  If not, see <http://www.gnu.org/licenses/>.


*/

// Handle popup windows
var wpd = wpd || {};
wpd.popup = (function () {

    function show(popupid) {
        // Dim lights :)
        var shadowDiv = document.getElementById('shadow');
        shadowDiv.style.visibility = "visible";

        var pWindow = document.getElementById(popupid);
        var screenWidth = parseInt(window.innerWidth);
        var screenHeight = parseInt(window.innerHeight);
        var pWidth = parseInt(pWindow.offsetWidth);
        var pHeight = parseInt(pWindow.offsetHeight);
        var xPos = (screenWidth - pWidth)/2;
        var yPos = (screenHeight - pHeight)/2;
        yPos = yPos > 60 ? 60 : yPos;
        pWindow.style.left = xPos + 'px';
        pWindow.style.top = yPos + 'px';
        pWindow.style.visibility = "visible";
    }

    function close(popupid) {

        var shadowDiv = document.getElementById('shadow');
        shadowDiv.style.visibility = "hidden";

        var pWindow = document.getElementById(popupid);
        pWindow.style.visibility = "hidden";
    }

    return {
        show: show,
        close: close
    };

})();

wpd.busyNote = (function () {
    var noteDiv, isVisible = false;
    
    function show() {
        if(isVisible) {
            return;
        }
        if(noteDiv == null) {
            noteDiv = document.createElement('div');
            noteDiv.id = 'wait';
            noteDiv.innerHTML = '<p align="center">Processing...</p>';
        }
        document.body.appendChild(noteDiv);
        isVisible = true;
    }

    function close() {
        if (noteDiv != null && isVisible === true) {
            document.body.removeChild(noteDiv);
            isVisible = false;
        }
    }

    return {
        show: show,
        close: close
    };
})();

wpd.messagePopup = (function () {
    var close_callback;

    function show(title, msg, callback) {
        wpd.popup.show('messagePopup');
        document.getElementById('message-popup-heading').innerHTML = title;
        document.getElementById('message-popup-text').innerHTML = msg;
        close_callback = callback;
    }

    function close() {
        wpd.popup.close('messagePopup');
        if(close_callback != null) {
            close_callback();
        }
    }

    return {
        show: show,
        close: close
    };
})();

wpd.okCancelPopup = (function () {
    var okCallback, cancelCallback;

    function show(title, msg, ok_callback, cancel_callback) {
        wpd.popup.show('okCancelPopup');
        document.getElementById('ok-cancel-popup-heading').innerHTML = title;
        document.getElementById('ok-cancel-popup-text').innerHTML = msg;
        okCallback = ok_callback;
        cancelCallback = cancel_callback;
    }

    function ok() {
        wpd.popup.close('okCancelPopup');
        okCallback();
    }

    function cancel() {
        wpd.popup.close('okCancelPopup');
        cancelCallback();
    }

    return {
        show: show,
        ok: ok,
        cancel: cancel
    };
})();

wpd.unsupported = function () {
    wpd.messagePopup.show("Unsupported Feature!", "This feature has not been implemented in the current version. This may be available in a future release.");
};

