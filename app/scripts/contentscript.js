'use strict';

window.addEventListener( "message", function( event ) {

	var data = event.data;
	if( data.origin === 'maspik' ){

		var wrapper = $( '.maspik-' + data.index );
		var originalContent = wrapper.parents( '.maspikTarget' );
		originalContent.removeClass( 'maspikTarget' );
		wrapper.remove();

	}
}, true );


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
			iframe.src = chrome.extension.getURL( 'pages/overlay.html?filter=' + filter + '&index=' + index );

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

$( checkForWidgets );
