function makeJSONStr (json, indent) {
    return isc.JSON.encode (json, {prettyPrint: indent,skipInternalProperties :true});
}


isc.defineClass("PartsListGrid","ListGrid").addProperties({
	cellHeight:24, 
	imageSize:16,
    showEdges:true, 
	border:"0px", 
	bodyStyleName:"normal",
    alternateRecordStyles:true, 
	showHeader:false, 
	leaveScrollbarGap:false,
    emptyMessage:"<br><br>Drag &amp; drop parts here",
    trackerImage:{src:"[SKIN]actions/prev.png", width:24, height:24}
});