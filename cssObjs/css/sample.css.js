//create a bucket to attache the global style objects to... will be loaded later
var main = main || {};
main.cssBucket = main.cssBucket || {};

//wrap it... so I can use variables like 'filename'
(function(undefined,PaulIrish){
	
	//Create the admin styles array
	main.cssBucket.globalStyles = [];
	
	//Mark the filename
	var filename = 'global.css.js -> ';
	
	/*==================== Global Values ==================*/
	main.cssBucket.globalStyles.push({		
		cssVariables: {
			docWidth:'880px',
			padLrg:'40px',
			padMed:'20px',
			padSml:'10px',
			docShadow:'#C0B99F',
			borderDark:'#908C71',
			medFont:'#614B29',
			burgandy:'#612C29',
			objColorFunction:'#C22B23',
			objColorStyle:'#176E76',
			objColorVariable:'#1C972B'
		}
	});
	
	/*====================  Layout  ==================*/
	main.cssBucket.globalStyles.push({		
		cssDescription: filename + 'global.layout',
		'body' : { color: '$medFont', font_family:'Arial', position:'relative', background:'url(images/thatch.jpg)', padding:'0', margin:'0', text_align:'center'},
		'body a' : {color : '$medFont', text_decoration:'none'},
		'pre' : {white_space:'pre-line'},
		'body a.link' : {text_decoration:'underline'},
		'h1.logo' : {position:'absolute', width:'100%', height:'500px', top:'77px', background:'url(images/logo.png) center 0 no-repeat'},
		'h1.logo span' : {display:'none'},
		'#sortable-limit' : {width:'100%',overflow:'hidden'},
		'#page-content-container' : {position:'relative', width:'100%'},
		'#page-content-wrapper' : {position:'relative', width:'10000000px'},
		'.page-content-outer' : {'float':'left', padding_right:'800px', padding_bottom:'100px'},
		'.page-content' : {box_shadow:'0px 1px 3px $borderDark', border:'1px solid $borderDark', background:'url(images/slate.png)',filter:'0 !important', rounded_corners:'5px', padding:'$padMed $padMed $padMed $padMed', width:'$docWidth'},
		'.page-content h1' : {padding:'0', margin:'0px', color:'$burgandy', font_weight:'bold', text_align:'left'},
		'.page-content h2' : {font_size:'24px', padding:'0', margin:'0px', color:'$burgandy', font_weight:'normal'},
		'#global-holder-wrapper-inner' : {position:'relative', width:'925px', margin_right:'auto', margin_left:'auto', text_align:'right'},
		'#global-holder' : {box_shadow:'0px 1px 3px $borderDark', top:'5px', position:'relative', border:'1px solid $borderDark', background:'url(images/slate.png)', filter:'0 !important', rounded_corners:'5px', height:'35px', padding:'$padSml $padMed', margin_left:'84px'},
		'#global-holder-wrapper' : {margin_bottom:'60px', border_bottom: '1px solid #614C41', border_top: '1px solid #F1DCD1', z_index:'3000', width:'100%', position:'relative', top:'-5px', background:'url(images/pattern.jpg) bottom left repeat-x', height:'10px', padding:'$padSml 0'},
		'.section' : {text_align:'left', margin_bottom:'$padSml', border:'1px solid $borderDark', box_shadow:'0px 1px 5px $docShadow', padding:'$padLrg', background:'#fff', rounded_corners:'5px'},
		'.section p.summary' : {display:'none'}
	});
	
	/*====================  Layout  ==================*/
	main.cssBucket.globalStyles.push({		
		cssDescription: filename + 'global.preStyles',
		'pre' : {white_space:'pre-wrap'}
	});
	
	/*====================  Link Icon Styles ==================*/
	main.cssBucket.globalStyles.push({	
		cssDescription: filename + 'global.linkicons',
		'#link-icon-holder' : {position:'absolute', left:'0', top:'4px'},
		'.link-icon' : {height:'61px', width:'61px', display:'inline-block', cursor:'pointer',opacity:'0.80', filter:'Alpha(opacity=80)'},
		'.link-icon span' : {display:'none'},
		'a.twitter' : {background:'url(images/linkicons.png) -130px top', filter : '0 !important',
			subs : {
				':hover' : {background:'url(images/linkicons.png) -195px top', filter:'0 !important'}
			}
		},
		'a.facebook' : {background:'url(images/linkicons.png) 0 top',
			subs : {
				':hover' : {background:'url(images/linkicons.png) -65px top'}
			}
		},
	});
	
	/*====================  Main Menu  ==================*/
	main.cssBucket.globalStyles.push({		
		cssDescription: filename + 'global.menu',
		'#page-menu' : {border_top: '2px solid #222', z_index:'2900', width:'100%', position:'relative', background:'url(images/leather.jpg)', padding:'$padSml 0 $padMed 0',
			subs: {
				' ul' : {list_style:'none', margin:'0', padding:'0'},
				' li' : {list_style:'none', display:'inline'},
				' li span.outer' : {background:'url(images/slate.png)', filter:'0 !important'},
				' a' : {text_decoration:'none', color:'$burgandy', font_weight:'normal'},
				' li:hover' : {cursor:'pointer',
					subs : {
						' span.inner': {background:'#fff'},
						' span.inner a': {color:'#311B00'},
						' span.outer': {background:'url(images/slatelight.png)', filter:'0 !important'},
					}
				},
				' li.selected' : {cursor:'pointer',
					subs : {
						' span.inner': {background:'$burgandy'},
						' span.inner a': {color:'#fff'},
					}
				},
				' span' : {inner_shadow:'1px 1px 3px #000', display:'inline-block', padding:'5px $padSml', margin:'0 7px', border_radius:'10px'},
				' span.inner' : {background:'#DFDBBE'},
				' span.outer' : {border:'1px solid #422D11'}
			}
		}
	});
	
	
	/*====================  Sortables Styling  ==================*/
	main.cssBucket.globalStyles.push({		
		cssDescription: filename + 'global.sortables',
		'#sortable1' : {width:'100%'},
		'.sortable-linked' : {list_style:'none', padding:'0', margin:'0',height:'50px'},
		'.sortable-linked li' : {font_size:'14px', display:'inline-block', padding:'0', margin:'0 2px 0 2px',
			subs : {
				':hover' : {cursor:'move'},
				' span.outer': {border:'1px solid #555', position:'relative', display:'inline-block', text_align:'center', padding:'0 8px 0 0', width:'99px', height:'30px', background:'url(images/slatedark.png)', filter:'0 !important', rounded_corners:'5px'},
				':hover span.outer' : {color:'$shit', background:'url(images/slatedarkest.png)'},
				' span.handle': {cursor:'pointer', display:'inline-block', height:'30px',top:'0px', width:'16px', position:'absolute', right:'4px',
					subs : {
						'.function' : {background:'$objColorFunction url(images/ribbon.png) center bottom no-repeat'},
						'.style' : {background:'$objColorStyle url(images/ribbon.png) center bottom no-repeat'},
						'.variable' : {background:'$objColorVariable url(images/ribbon.png) center bottom no-repeat'}
					}
				},
				
				' span.text': {display:'inline-block'},
				' div.code': {display:'none', position:'absolute', top:'100%', right:'0', padding:'$padMed'},
				' a' : {text_decoration:'none', color:'#fff', display:'inline-block', padding_top:'6px'}
			}
		},
		'.ui-state-highlight' : {padding:'0', margin:'0 2px 0 2px', width:'90px', height:'10px', background:'url(images/slate.png)', filter:'0 !important', border:'1px dotted #444', rounded_corners:'5px'},
		'.page-content' : {position:'relative'},
		'.page-content .page-holder' : {position:'absolute', width:'800px', right:'$padMed', top:'18px', text_align:'right'}
	});
	
	
})();
	
	