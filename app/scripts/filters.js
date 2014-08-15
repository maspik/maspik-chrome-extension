var optionsLink = chrome.extension.getURL( "options.html" );


var filters = {
	"outbrain": {
		reason : "<p>this content has been provided by Israeli company, <a target='_blank'\
		            href='" + optionsLink + "#outbrain'\
			        >Outbrain</a>.</p>"
	},
	"taboola" : {
		reason : "<p>this content has been provided by Israeli company, <a target='_blank'\
		            href='" + optionsLink + "#taboola'\
			        >Taboola</a>.</p>"
	},
	"fiverr" : {
		url: "fiverr.com",
		reason: "<p><a target='_blank'\
		            href='" + optionsLink + "#fiverr'>Fiverr</a>\
					is an Israeli company.</p>"
	}
};