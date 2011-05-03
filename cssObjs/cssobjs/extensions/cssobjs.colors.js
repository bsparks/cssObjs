(function($, undefined) {
	
	//Colors Extension
	//Adds functions to modify hex value colors
	
	/*=============== Private Utility Functions ================*/
	var utils = {
		hexMap : {
			'0':0,'1':1,'2':2,'3':3,
			'4':4,'5':5,'6':6,'7':7,
			'8':8,'9':9,'A':10,'B':11,
			'C':12,'D':13,'E':14,'F':15
		},
		decMap : {
			'0':'0','1':'1','2':'2','3':'3',
			'4':'4','5':'5','6':'6','7':'7',
			'8':'8','9':'9','10':'A','11':'B',
			'12':'C','13':'D','14':'E','15':'F'
		},
		hexToDec : function (hex) {
			return parseInt(this.hexMap[hex.substr(0,1)]) * 16 + parseInt(this.hexMap[hex.substr(1,1)]);
		},
		decToHex : function (dec) {
			var h1 = Math.floor(dec/16);
			var h2 = dec - h1 * 16;
			
			return this.decMap[h1] + this.decMap[h2];
			
		},
		toRGB : function (hexValue) {
			hexValue = hexValue.replace(/#/g,'');
			
			if(hexValue.length < 6){
				hexValue = hexValue.substr(0,1) + hexValue.substr(0,1) 
					+ hexValue.substr(0,2) + hexValue.substr(0,2)
					+ hexValue.substr(0,3) + hexValue.substr(0,3);
			}
			
			var r = this.hexToDec(hexValue.substr(0,2));
			var g = this.hexToDec(hexValue.substr(2,2));
			var b = this.hexToDec(hexValue.substr(4,2));
			
			return {r:r, g:g, b:b};
		},
		toHEX : function (rgb) {
			r = this.decToHex(rgb.r);
			g = this.decToHex(rgb.g);
			b = this.decToHex(rgb.b);
			return "#" + r + g + b;
		}
	};
	
	/*=============== use $.cssObjsAPI to add variable functions ================*/
	$.cssObjsAPI.addVariables({	
		
		//invert a color
		invert : function (hexValue) {
			var color = utils.toRGB(hexValue);
			color.r = 255-color.r;
			color.g = 255-color.g;
			color.b = 255-color.b;
			return utils.toHEX(color);	
		},
		
		//chnage the luminosity of color 0-100%
		luminosity : function (params) {
			
			var params = params.split(',');
			var hexValue = params[0];
			var percentage = 100;
			if(params[1]){
				percentage = parseInt(params[1]);	
			}
		
			var color = utils.toRGB(hexValue);
			var highest = Math.max(color.r,color.g,color.b);
			var lowest = Math.min(color.r,color.g,color.b);
			
			var delta = Math.round((255 - (highest - lowest)) * (percentage/100),0);
			
			color.r = color.r + delta - lowest;
			color.g = color.g + delta - lowest;
			color.b = color.b + delta - lowest;

			return utils.toHEX(color);
		},
		
		//chnage the saturation of color 0-100%
		saturation : function (hexValue,percentage) {
			
			var percentage = percentage || 100;
			
			var color = utils.toRGB(hexValue);
			var highest = Math.max(color.r,color.g,color.b);
			var lowest = Math.min(color.r,color.g,color.b);
			
			var deltaUp = 255-highest;
			var deltaDown = lowest;
			
			color.r = Math.max(color.r + delta,255);
			color.g = Math.max(color.g + delta,255);
			color.b = Math.max(color.b + delta,255);

			return utils.toHEX(color);
		}
			
	});
	

})(jQuery);