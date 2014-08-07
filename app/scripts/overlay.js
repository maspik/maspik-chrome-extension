function getUrlParameter( param ) {

	var pageURL = window.location.search.substring( 1 );
	var URLVariables = pageURL.split( '&' );
	for ( var i = 0; i < URLVariables.length; i++ ) {

		var parameterName = URLVariables[ i ].split( '=' );
		if ( parameterName[ 0 ] === param ) {

			return parameterName[ 1 ];
		}
	}
	return '';
}

function closeWindow(){

	window.top.postMessage( { origin : 'maspik', message :'close', index : getUrlParameter( 'index' ) }, '*' );
}

var filter = getUrlParameter( 'filter' );

$( "#header" ).fitText( 1, { minFontSize:'6px', maxFontSize : '15px' } );

$( '#reason' ).append( filters[ filter ].reason );

$( '#closeButton' ).click(closeWindow );


