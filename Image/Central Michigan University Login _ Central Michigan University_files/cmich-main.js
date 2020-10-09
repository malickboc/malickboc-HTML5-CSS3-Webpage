
if (typeof getParameterByName == "undefined")
{
	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

if (typeof endsWith == "undefined")
{
	String.prototype.endsWith = function(suffix) {
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}



if (typeof getInternetExplorerVersion == "undefined")
{
	function getInternetExplorerVersion() {
	    var rv = -1; // Return value assumes failure.
	    if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		    rv = parseFloat(RegExp.$1);
	    }
	    return rv;
	}
}
if (typeof getCookie == "undefined") {
    function getCookie(w) {
        cName = "";
        pCOOKIES = new Array();
        pCOOKIES = document.cookie.split('; ');
        for (bb = 0; bb < pCOOKIES.length; bb++) {
            NmeVal = new Array();
            NmeVal = pCOOKIES[bb].split('=');
            if (NmeVal[0] == w) {
                cName = unescape(NmeVal[1]);
            }
        }
        return cName;
    }
}
if (typeof setCookie == "undefined") {

    function setCookie(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/.test(sKey)) { return; }
        var sExpires = "";
        if (vEnd) {
            switch (typeof vEnd) {
                case "number": sExpires = "; max-age=" + vEnd; break;
                case "string": sExpires = "; expires=" + vEnd; break;
                case "object": if (vEnd.hasOwnProperty("toGMTString")) { sExpires = "; expires=" + vEnd.toGMTString(); } break;
            }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    }
}

if (typeof nameWithoutDomain == "undefined")
{
		function nameWithoutDomain( userName )
		{
			if ( typeof userName != "undefined" && userName.length > 0 )
			{
				var slashPosition = userName.indexOf( '\\' );
				if ( slashPosition != -1 && slashPosition < userName.length - 1 )
				{
					var start = slashPosition + 1;
					return userName.substring( start );
				}
				else
				{
					return userName;
				}
			}
			else
			{
				return userName;
			}
		}
}

$(document).ready(function () {
	
	var debugCSS = getParameterByName("debugcss");
	if (debugCSS.length > 0) 
	{
		$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', '//cdn.cmich.edu/css/sp2013/cmichMasterPage/debug.min.css') );
	}
	var debugJS = getParameterByName("debugjs");
	if (debugJS.length > 0) 
	{
		$.getScript("//cdn.cmich.edu/js/sp2013/universal/cmich-jsdebug.js");
	}
	var debug = getParameterByName("debug");
		
	if (debug.length > 0) 
	{
		var cmichDebug = cmichDebug || {};
		cmichDebug.DebugInformation = function () 
		{
			var self = this;
			self.UserAgent = navigator.userAgent;
			self.WindowWidth = $(window).width();
			self.WindowHeight = $(window).height();
			
			self.ServerName = cmichServerName;
			if (typeof cmichSessionId != "undefined")
			{
				self.SessionId = cmichSessionId;
			} else {
				self.SessionId = "";
			}
			self.DisplayData = function () {
				var debugContent = "User Agent: " + self.UserAgent + "<br />";
				debugContent += "Viewport Width: " + self.WindowWidth + "<br />";
				debugContent += "Viewport Height: " + self.WindowHeight + "<br />";
				debugContent += "Server Name: " + self.ServerName + "<br />";
				if (self.SessionId.length != 0) {
					debugContent += "CMich Session Id: " + self.SessionId + "<br />";
				}
				debugContent += "<a href='javascript:window.location.reload(true)'>Force Reload Page</a>";
				return debugContent;
			};
		};
		
		var debugInformation = new cmichDebug.DebugInformation();
		var helperWindow = $("<div class='modal fade' id='cmich-debugModal' tabindex='-1' role='dialog' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'> <a  href='#' class='close' data-dismiss='modal' aria-hidden='true'>×</a> <h3>Debug Information</h3> </div><div class='modal-body'>" + debugInformation.DisplayData() + "</div></div></div></div>");

	
		$("form").prepend(helperWindow);
		var debugModal = $("#cmich-debugModal");
		debugModal.modal("show");
		
		$( window ).resize(function() {
			debugInformation.WindowWidth = $(window).width();
			debugInformation.WindowHeight = $(window).height();
			debugBody.html(debugInformation.DisplayData());
		});
		
	}
	if (typeof $().popover == 'function')
	{
		var popovers = $(document).find(".cmich-PopOver");
		if (popovers.length > 0) {
			 popovers.popover();
		}
	}
	$(document).on('keydown','.cmich-NumbersOnly', function (e) {
	    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
	       
		    (event.keyCode == 65 && event.ctrlKey === true) ||
		
		    (event.keyCode == 88 && event.ctrlKey === true) ||
	      
		    (event.keyCode >= 35 && event.keyCode <= 39)) {
		return;
	    }
	    else {
		if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
		    event.preventDefault();
		}
	    }
	});	
	
	$(document).on('keydown','.cmich-NumbersOnlyDecimal', function (e) {
	    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
	       
		    (event.keyCode == 65 && event.ctrlKey === true) ||
		
		    (event.keyCode == 88 && event.ctrlKey === true) ||
	      
		    (event.keyCode >= 35 && event.keyCode <= 39)) {
		return;
	    }
	    else {
			if (event.keyCode == 190)
			{ 
				if (this.value.indexOf(".") == -1)
				{
					return;
				} else {
					event.preventDefault();
				}
			} else {
				if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
					event.preventDefault();
				}
			}
		}
	});	

	//Academic Profile Pages on CMich
	$('.accordion').find('.in').siblings('.panelHeading').addClass('goldPanelHeading').find('i').removeClass('icon-cmich-plus-circle').addClass('icon-cmich-minus-circle');
	$('.panelHeadingAnchor').click(function(){
		if($(this).parent().parent().hasClass('goldPanelHeading')){
			$(this).parent().parent().removeClass('goldPanelHeading').find('i').removeClass('icon-cmich-minus-circle').addClass('icon-cmich-plus-circle');
		}
		else {
			$('.accordion').find('.panelHeading').removeClass('goldPanelHeading').find('i.icon-cmich-minus-circle').removeClass('icon-cmich-minus-circle').addClass('icon-cmich-plus-circle');
			$(this).parent().parent().addClass('goldPanelHeading').find('i').removeClass('icon-cmich-plus-circle').addClass('icon-cmich-minus-circle');
		}
	});
	
	//A to Z Page on Go	
	$('.btnAToZ ').click(function(){
		$('.aToZNavigation').find('a').removeClass('active');
		$(this).addClass('active');
	});
	
	//All collapsable navs
	$(".navbar-toggle").click(function () {
		if ($(this).attr("aria-expanded") == "false")
		{
			$(this).attr("aria-expanded", "true");
		}
		else
		{
			$(this).attr("aria-expanded", "false");
		}
	});
	
});