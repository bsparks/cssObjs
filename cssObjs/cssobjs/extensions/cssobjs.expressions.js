(function($, undefined) {
	
	//Expressions Extension
	//Adds functions to evaluate mathematical expressions
	
	/*=============== Private Utility Functions ================*/
	var utils = {};
	
	/*=============== use $.cssObjsAPI to add variable functions ================*/
	$.cssObjsAPI.addVariables({	
		
		/**
		 *Evaluates mathematical expressions and preserves units in a simple fasion
		 *NOTE: this is a quick and dirty implementation to efficiently cover large use cases
		 *You cannot utilize more than one type of units (it will only pull the last one)
		 *	expr('20px + 50') => '70px'
		 *	expr('30em + (5em-2)*5') => '15em'
		 *	expr('40% / 2') => '20%'
		*/
		expr : function (params) {
			var units='';
			params = params.replace(/px|\%|em/ig,function(m){units = m; return '';});
			return eval(params + ";") + units;
		}
			
	});
	

})(jQuery);