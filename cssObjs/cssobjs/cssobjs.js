/* 
 * CSS OBJECTS - cssObjs.js  v1.0
 * A more objective approach to CSS using JavaScript!
 * 
 * -Injects css styles using a json structured css objects
 * -Allows for dynamic styling via use of variables and functions to create CSS
 * -Allows for localization of CSS by providing a container's selector
 * -API for creating extensions for diagnostics and CSS libraries for both attributes and values
 * 
 * Requires jQuery
 * http://cssObjs.com
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.gnu.org/licenses/gpl-2.0.html
 * 
 * ======== INITIALIZATION ========
 * 
 * var demoObj = $.cssObjs(name,[cssObjects, options]);
 * 		-(name) : A name given to this grouping of CSS Objects
 * 		-(cssObjects) : below are possible objects the cssObjs plugin will accept
 * 			style 				=>	 'p' : {font_weight:'bold', background:'#444'}
 * 			global function  	=>	 cssFunction : {"rounded_corners" : function(params){return string;}}
 * 			private function 	=>	 cssFunctionPrivate : {"rounded_corners" : function(params){return string;}}
 * 			description 		=>	 cssDescription : 'text value'
 * 			global variables  	=>	 cssVariable : {'red':'#0000FF'}
 * 			private variables 	=>	 cssVariablePrivate : {'blue':'#0000FF'}
 * 		-(options)
 * 			autoAdd : true or false (if true a style tag will be appended immediatly in the document head)
 * 			localize : selector that will determine that the styles will localize only within that selector
 * 
 * 
 * ======== METHODS ========	
 * 
 * demoObj.addCSSObjects(cssObjects)	add and integrate new css objects
 * 		-(cssObjects) : See above "cssObjects"			
 * demoObj.injectStyles()				process styles and append to document head
 * demoObj.localize(selector)			forces styles to only apply to a selector (if already in head.. will be stripped/reprocessed/re-added)
 * 		-(selector) : A common element selector examples
 * 			localize to a class			=>	'.thisclass', 
 * 			localize to an a element	=>	'p',
 * 			localize to an id			=>  '#results-area'
 * demoObj.clearCSS()					clears ALL css objects including cssObjects, cssVariablesPrivate, cssFunctionsPrivate 
 * 
 * 
 * ======== DEBUGGING METHODS ========	
 * 
 * demoObj.summary()   			*todo*		prints statistics on your cssObjects, functions used, globals used
 * demoObj.locate(selector)		*todo*		returns the cssDescription within the object associated with that style
 * 		-(selector) : a selector that has a style registered to it in the cssObjects
 * 
 * 
 * ======== EXTENSIONS API ========
 * $.cssObjsAPI is the global object created to access the API Methods
 * 
 * $.cssObjsAPI.addFunctions (functions)
 * 		-(functions) : OBJECT with functions as attributes will be added to global functions
 * 			 					=>	"rounded_corners" : function(params){return string;}
 * $.cssObjsAPI.addVariables (variables)
 * 		-(variables) : OBJECT with variables names as attributes and variable values as values will be added to global variables
 * 			a global value		=>	primaryColor : '#990033'
 * 			a global function	=>  expr : function (params) {
 *										var units='';
 *										params = params.replace(/px|\%|em/ig,function(m){units = m; return '';});
 *										return eval(params + ";") + units;
 *									}	
 * $.cssObjsAPI.addDiagnostics (diagnostics)
 * 		-(diagnostics) : OBJECT with function names as attributes and functions accepting an API object as values		
 * $.cssObjsAPI.runDiagnostic (name)
 * 		-(name) : Run the diagnostic 'name' while giving it access to the API object
 * 
 */

(function($, undefined) {
	
	
	/*====================== Extensions API ======================*/

	$.cssObjsAPI = {
		addFunctions: function(extension) {
			$.extend(cssFunctionsGlobal,extension);	
		},
		addVariables: function(variables) {
			$.extend(cssVariablesGlobal,variables);	
		},
		addDiagnostics : function (diagnostics) {
			$.extend(cssDiagnostics,diagnostics);
		},
		runDiagnostic : function (name) {
			//API object exposes globals and style objects
			//NOTE: styles is an array of these : {name:'',styles:style objects}
			var apiObj = {
				cssVariablesGlobal : cssVariablesGlobal,
				cssFunctionsGlobal : cssFunctionsGlobal,
				styles : allCSSObjects  
			};
			cssDiagnostics[name].apply({},[apiObj]);
		}
	};
	
	
	/*====================== Global Variables ======================*/
	
	//keep the globals for all cssObjs instantiations
	var cssVariablesGlobal = {};
	//keep the css functions / mixins for all cssObjs instantiations
	var cssFunctionsGlobal = {};
	//diagnostics are passed all cssObjects as parameters
	var cssDiagnostics = {};
	//all style objects
	var allCSSObjects = [];
	
	//a seed value and seed value getter used by all instantiations as a primitive id system
	var seed = 0;
	var getNewSeed = function(){
		seed++;
		return seed;
	};//end:function
	
	//allow each instantiation to the global values
	var addVariablesGlobal = function (variables) {
		$.extend(cssVariablesGlobal,variables);
	};//end:function
	
	//allow each instantiation to add to the global function
	var addFunctionsGlobal = function (funkies) {
		$.extend(cssFunctionsGlobal,funkies);
	};//end:function
	
    //Main factory style implementation. Returns configured object.
	$.cssObjs = function(groupName,cssObjects,options){
		
		//first populate the global collection with a reference to the cssObjects being passed in
		allCSSObjects.push({name:groupName,styles:cssObjects});
		
		//global object reference
		var cssObjsRef = this;
		
		//localize this CSS object to a selector
		var localize = "";
		
		//store the groupname within this object
		cssObjsRef.groupName = groupName;
		
		/*================= private variables ==================*/
		
		//Collection of all style objects
		var cssObjects = cssObjects || [];
		//Options object to build using defaults and user submitted
		var options = options || {};
		
		//Private css variables
		var cssVariables = {};
		
		//Private css functions
		var cssFunctions = {};
		
		//Default options
		var defaultOptions = {
			autoStart : false,
			localize : ''
		};
		
		//Create the defaults for this instance based on the original defaults and user submitted
		var defaults = $.extend({},defaultOptions,options);
		
		//Add private variables
		var addVariables = function (variables) {
			$.extend(cssVariables,variables);
		};//end:function
		
		//Add private functions
		var addFunctions = function (funkies) {
			$.extend(cssFuntions,funkies);
		};//end:function
		
		/*================= public functions ==================*/
		
		//Change the localization selector for this cssobjs
		cssObjsRef.localize = function (local,render) {
			//change the options localize variable
			defaults.localize = local;
			//remove any current style tags
			$("#cssObjs-" + cssObjsRef.groupName).remove();
			
			var render = render || true;
			if(render) {
				this.injectStyles();	
			}
		};//end:function
		
		//Add a style object or array of style objects
		cssObjsRef.addCSSObjects = function (obj) {
			if(obj.constructor.toString().indexOf('Array') != -1){
 				//an array
				for(var i = 0; i<obj.length; i++){
					this.addCSSObjects(obj[i]);	
				}	
			} else {
				//an object
				cssObjects.push(obj); 
			}	
		};//end:function
		
		//Clear all current styles
		cssObjsRef.clearCSS = function (obj){
			cssObjects = [];
			$('#cssObjs-' + cssObjsRef.groupName).remove();
			if(obj){
				cssObjects.push(obj);
			} 	
		};//end:function
		
		//Public function to inject styles
		cssObjsRef.injectStyles = function (){
			var timer = new Date();
			var start = timer.getTime();
			cssObjsRef.groupName = cssObjsRef.groupName || getNewSeed();
			if ($('#cssObjs-' + cssObjsRef.groupName).length == 0) {
				$('<style id="cssObjs-' + cssObjsRef.groupName + '">' + buildStyles(cssObjects, name) + '</style>').appendTo($('head'));
			}
			var timerStop = new Date();
			//console.log(timerStop.getTime()-start + " milliseconds");
		};//end:function
		

		/*================= private functions ==================*/
		
		//Gets the object name
		var getObjName = function(obj){
			var tmp = obj.toString();
			return tmp.substring(tmp.indexOf(' ')+1,tmp.indexOf('('));
		};//end:function
		
		//Main recursive function to create style string
		var buildStyles = function (objectArray,name,pName,level){
			
			var level = level || 0;
			var local = "";
			
			//if we are at the root level, localize
			if (level==0){
				local = localize;
			}
			
			var name = name || "cssjs";
			var pName = pName || "";
			
			var styleString = "";
			
			for(var j=0; j < objectArray.length; j++){
				var thisObj = objectArray[j];
				
				for(var thisProp in thisObj){
	
					var thisSelector = defaults.localize + " " + (pName || '') + (thisProp || '');
					
					if (thisProp != 'cssDescription' && thisProp != 'cssVariables' && thisProp != 'cssVariablesPrivate' && thisProp != 'cssFunctions' && thisProp != 'cssFunctionsPrivate'){
						styleString = styleString + "  " + thisSelector + " {"; 	
						
						var subString = "";
						
						for(var cssStyle in thisObj[thisProp]){
					
							if(cssStyle != 'subs' && !cssFunctions[cssStyle] && !cssFunctionsGlobal[cssStyle]){
								styleString = styleString + cssStyle.replace(/_/g,'-') + ":" + css(thisObj[thisProp][cssStyle]) + "; ";	
							} else if (cssStyle == 'subs') {
								subString = subString + buildStyles([thisObj[thisProp][cssStyle]],'', thisSelector,level +1) + " ";	
							} else {
								
								var passOn = thisObj[thisProp][cssStyle];
								
								//replace globals if passed as a string
								if(typeof passOn == "string"){
									if(passOn.indexOf('$') != -1){
										passOn = parseStyle(prepareForParse(passOn));
									}	
								}
								
								if(cssFunctions[cssStyle]){
									styleString = styleString + cssFunctions[cssStyle](passOn);	
								} else {
									styleString = styleString + cssFunctionsGlobal[cssStyle](passOn);
								}
							}
							
						}
						
						styleString = styleString + "}\n " + subString;
							
					} else {
						
						//for convenience, check attributes for passing in descriptions, variables, and functions within on CSS obj
						switch (thisProp) {
							case 'cssDescription':
								styleString = styleString + "\n \n /*"+thisObj[thisProp]+"*/ \n";
								break;
							case 'cssVariablesPrivate':
								addVariables(thisObj[thisProp]);
								break;
							case 'cssVariables':
								addVariablesGlobal(thisObj[thisProp]);
								break;
							case 'cssFunctionsPrivate':
								addFunctions(thisObj[thisProp]);
								break;
							case 'cssFunctions':
								addFunctionsGlobal(thisObj[thisProp]);
								break;
						}
					}
				} 	
			}
			
			return styleString;
			
		};//end:function
		
		//Replace with variables
		var variableReplace = function (thisToken) {
			thisToken = cssVariables[thisToken.replace('$','')] ? cssVariables[thisToken.replace('$','')] : (cssVariablesGlobal[thisToken.replace('$','')] ? cssVariablesGlobal[thisToken.replace('$','')] : thisToken);
			return thisToken
		};//end:function
		
		//Clean expression by seperating grammer by one single space
		var prepareForParse = function (expression) {
			expression = expression
				.replace(/\$/g,' $')					//give variables some room
				.replace(/\+|\-|\*|\^|\%|\!\/|,/g,		//give operators some room
					function(m){return ' ' + m + ' ';})					
				.replace(/\$\s+/g, '$') 				//unify $ variables
				.replace(/\s{2,}/g, ' ')				//shrink wrap white space
				.replace(/\(\s{0,}/g, '( ')				//close up right of (
				.replace(/\s+\(/g, ' (')				//close up left of (
				.replace(/\)\s{0,}/g, ') ')				//close up left of )
				.replace(/\s{0,}\)/g, ' )')     		//close up right of )
				.replace(/^\s+|\s+$/g, ''); 			//trim outsides
			
			return expression;
		};//end:function
		
		//Recursive call to parse nested functions and replace variable values
		var parseStyle = function (expression){
			
			//all grammer is now splittable by a space
			var tokens = expression.split(' ');
			
			//this collects all items within a function call
			var chunk =[];
			
			//this is an array of compiled items
			var compiled = [];
			
			//a flag and storage for function that we are currently inside
			var daFunk = null;
			
			//tracks open and close for functions and parenths
			var level = 0;
			
			//grammer check
			for (var i=0; i<tokens.length; i++){
				if(tokens[i].match(/\$[A-Z]{1,}\(/i)){ 			//function open
					if(!daFunk){
						daFunk = tokens[i].replace(/\$|\(/g,'');
					} else {
						chunk.push(tokens[i]);
					}
					level++;			
				} else if (tokens[i].match(/\$[A-Z]{1,}/i)){ 	//variable
					if(daFunk){
						chunk.push(variableReplace(tokens[i]));	
					} else {
						compiled.push(variableReplace(tokens[i]));
					}
				} else if (tokens[i] == "("){ 					//open
					if(daFunk){
						chunk.push(tokens[i]);	
					} else {
						compiled.push(tokens[i]);
					}
					level++;
				} else if (tokens[i]==")"){						//close
					level--;
					//if we are still within the outer function
					if(level > 0){
						if(daFunk){
							chunk.push(tokens[i]);	
						} else {
							compiled.push(tokens[i]);
						}	
					} else if (daFunk) {
						
						try {
							if(cssVariablesGlobal[daFunk]) {
								compiled.push(cssVariablesGlobal[daFunk](parseStyle(chunk.join(' '))));
							} else {
								compiled.push(cssVariables[daFunk](parseStyle(chunk.join(' '))));
							}	
						} catch(err) {}
						
						daFunk = null;
						chunk = [];
						
					} else {
						compiled.push(tokens[i]);
					}
				} else if (tokens[i].match(/\(/)) {				//open
					if(daFunk){
						chunk.push(tokens[i]);	
					} else {
						compiled.push(tokens[i]);
					}
					level++;
				} else {										//literal	
					if(daFunk){
						chunk.push(tokens[i]);	
					} else {
						compiled.push(tokens[i]);
					}
				}
			
			}
			
			var finished = compiled.join(' ');
			
			//lastly any [A-Z] - [A-Z] combinations should be squeezed eg: "no - repeat" => "no-repeat"
			finished = finished.replace(/[A-Z]\s\-\s[A-Z]/gi,function(m){return m.replace(/\s/g,'');});
			return finished;
			
		};//end:function
		
		//Turn the string into valid css and evaluate any functions / global variables
		//Doing this quick if/else avoids unecessary processing
		var css = function(cssObj) {
			if($.type(cssObj) === "string") {
                            if(cssObj.indexOf('$') == -1) {
				return cssObj;
			    } else {
				return parseStyle(prepareForParse(cssObj));
                            }
			} else {
                            return cssObj;
                        }	
		};//end:function
		
		
		/*================= initialization logic ==================*/
		
		//Check defaults to check if it should start upon initialization
		if(defaults.autoStart){
			cssObjsRef.groupName = cssObjsRef.groupName || getNewSeed();
			if ($('#cssObjs-' + cssObjsRef.groupName).length==0) {
				$('<style id="cssObjs-' + cssObjsRef.groupName + '">' + buildStyles(cssObjects, cssObjsRef.groupName) + '</style>').appendTo($('head'));
			}
		}
		
		//return the object reference
		return cssObjsRef;
			
	};//end:function
	
})(jQuery);