reportDashboardContent();	
function reportDashboardContent(){
			
	isc.defineClass("SimplePortlet", "Window").addMethods({
		
		autoDraw:false,
		showShadow:false,

		// enable predefined component animation
		animateMinimize:true,

		// Window is draggable with "outline" appearance by default.
		// "target" is the solid appearance.
		dragAppearance:"outline",
		canDrop:true,
		
		// customize the appearance and order of the controls in the window header
		// (could do this in load_skin.js instead)
		//headerMembers:["minimizeButton", "headerLabel", "closeButton"],
		 //headerControls : ["headerLabel","chartZoomer"],
		// show either a shadow, or translucency, when dragging a portlet
		// (could do both at the same time, but these are not visually compatible effects)
		//showDragShadow:true,
		dragOpacity:30,
		
		// these settings enable the portlet to autosize its height only to fit its contents
		// (since width is determined from the containing layout, not the portlet contents)
		vPolicy:"none",
		overflow:"visible",
		bodyProperties:{overflow:"visible"}
	});

	isc.defineClass("SimplePortalColumn", "VStack").addMethods({

		// leave some space between portlets
		membersMargin:10,

		// enable predefined component animation
		animateMembers:true,
		animateMemberTime:550,

		// enable drop handling
		canAcceptDrop:true,
		
		// change appearance of drag placeholder and drop indicator
		dropLineThickness:4,
		dropLineProperties:{backgroundColor:"aqua"},
		showDragPlaceHolder:true,
		placeHolderProperties:{border:"2px solid #8289A6"}
	});
	isc.defineClass("SimplePortalLayout", "HLayout").addMethods({
		membersMargin:6,
		initWidget : function () {
			this.Super("initWidget", arguments);
		}
	});

} 
			