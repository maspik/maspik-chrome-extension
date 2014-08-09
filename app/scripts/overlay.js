function closeWindow(){

	window.top.postMessage( { origin : 'maspik', message :'close', index : frameIndex }, '*' );
}

$( "#header" ).fitText( 1, { minFontSize:'6px', maxFontSize : '15px' } );

$( '#closeButton' ).click(closeWindow );


