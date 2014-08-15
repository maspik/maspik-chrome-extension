'use strict';

var overlayContent = "<head>\
	                     <title></title>\
\
	                     <link rel='stylesheet' type='text/css' href='{{STYLE_SHEET}}'/>\
\
						<script>var frameIndex = {{INDEX}};\
						</script>\
\
	                     <script src='{{JQUERY_URL}}'></script>\
	                     \
	                     <script src='{{FIT_TEXT_URL}}'></script>\
\
                     </head>\
                     \
                     <div id='overlayPanel'>\
	                     <div id='header'>\
		                     <h1>Maspik</h1>\
		                     <div id='closePositioner'>\
			                     <button id='closeButton'>x</button>\
		                     </div>\
\
	                     </div>\
	                     <p>This content supports the occupation of Palestine as:</p>\
\
	                    {{REASON}}\
	                    \
	                     <img class='peace' border='0' src='{{PEACE_URL}}'/>\
\
	                     <script src='{{OVERLAY_JS_URL}}'></script>\
                     </div>";


var overlayStyleSheet = chrome.extension.getURL( "styles/overlay.css" );
var jqueryUrl = chrome.extension.getURL( "scripts/libs/jquery-2.1.1.min.js" );
var fitTextUrl = chrome.extension.getURL( "scripts/libs/jquery.fittext.js" );
var peaceUrl = chrome.extension.getURL( "images/peace.svg" );
var overlayJSUrl = chrome.extension.getURL( "scripts/overlay.js" );

window.addEventListener( "message", function( event ) {

	var data = event.data;
	if( data.origin === 'maspik' ){

		var wrapper = $( '.maspik-' + data.index );
		var originalContent = wrapper.parents( '.maspikTarget' );
		originalContent.removeClass( 'maspikTarget' );
		wrapper.remove();

	}
}, true );

function checkContent(){

	checkForWidgets();
	checkSite();
}



function checkSite(){

	var site = document.location.host;

	if( site.match( filters[ "fiverr" ].url ) ){

		findAndObscure( $( 'body' ), "fiverr" );
	}

}

function checkForWidgets() {

	var widgets = $( "[id^='outbrain_widget']" );
	var filter = "outbrain";
	findAndObscure( widgets, filter );

	widgets = $( "[id^='trc_wrapper']" );
	filter = "taboola";
	findAndObscure( widgets, filter );

	widgets = $( "[data-dfp^='Desktop_Taboola_Widget']" );
	filter = "taboola";
	findAndObscure( widgets, filter );
}


function findAndObscure( widgets, filter ) {

	widgets.each( function( index ) {

		var target = $( this );
		var totalHeight = getTotalHeight( target );
		target.addClass( 'maspikTarget' );

		if ( totalHeight ) {

			var wrapper = $( '<div></div>' );
			wrapper.addClass( 'maspik-wrapper' );
			wrapper.addClass( 'maspik-' + index );
			target.prepend( wrapper );

			var iframe = document.createElement( "iframe" );
			iframe.width = target.outerWidth();
			iframe.height = totalHeight;
			iframe.scrolling = "no";
			iframe.setAttribute( "frameBorder", "0" );
			iframe.setAttribute( "allowtransparency", "true" );

			var frameContent = overlayContent.replace( /{{REASON}}/, filters[ filter ].reason );
			frameContent = frameContent.replace( /{{STYLE_SHEET}}/, overlayStyleSheet );
			frameContent = frameContent.replace( /{{JQUERY_URL}}/, jqueryUrl );
			frameContent = frameContent.replace( /{{FIT_TEXT_URL}}/, fitTextUrl );
			frameContent = frameContent.replace( /{{PEACE_URL}}/, peaceUrl );
			frameContent = frameContent.replace( /{{OVERLAY_JS_URL}}/, overlayJSUrl );
			frameContent = frameContent.replace( /{{INDEX}}/, index );
			iframe.srcdoc = frameContent;

			$( iframe ).appendTo( wrapper );
		}
	} );
}



function getTotalHeight( target ) {

	var totalHeight;
	if ( !target.outerHeight() ) {

		var children = target.children();
		if ( children.length ) {

			children.each( function( index ) {

				var child = $( this );
				totalHeight = !totalHeight || totalHeight
					< child.outerHeight() ? child.outerHeight() : totalHeight;
			} );
		}
		else {

			totalHeight = 0;
		}
	}
	else {

		totalHeight = target.outerHeight();
	}

	return totalHeight;
}

$( checkContent );
