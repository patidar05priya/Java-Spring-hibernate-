/*
//===========================================================================
// Custom Controls class definitions (Optimize setting for SmartClient)
//
// All the controls to be build should follow the nomenclature
// format to be followed is
// <TabId><SubTabId><ControlId><ActionType>
// Abbreviations for various tabs are given in their specific templates/script files.
// Abbreviations to be used in nomenclature for Controls are
//      - Control type Window - Win
//      - Control type ModalWindow - MWin
//      - Control type DynamicForm - DyF
//      - Control type Img - Img
//      - Control type Slider - Sldr
//      - Control type HTMLPane - HP
//      - Control type HTMLFlow - HF
//      - Control type ImgButton - ImgBtn
//      - Control type ToolImgButton - TImgBtn
//      - Control type HLayout - HL
//      - Control type TabSet - TS
//      - Control type Tab - Tab
//      - Control type ToolHLayout - THL
//      - Control type VLayout - VL
//      - Control type VStack - VS
//      - Control type SectionStack - SecStk
//      - Control type LayoutSpacer - LySp
//      - Control type Label - Lbl
//      - Control type ListGrid - LG
//      - Control type ActionableListGrid - ALG
//      - Control type Menu - Mnu
//      - Control type MenuButton - MBtn
//      - Control type DetailViewer - DtlVwr
//      - Control type TreeGrid - TG
//      - Control type FilterBuilder - FltrBldr
//      - Control type PortletControl - PrltCtrl
//      - Control type PortletControlColumn - PrltCtrlCol
//      - Control type PortletControlLayout - PrltCtrlLy
//===========================================================================
*/

isc.defineClass("CustomWindow", "Window").addMethods({
    showCloseButton:false,
    showMinimizeButton:false,
    showMaximizeButton:false,
    animateMinimize:true,
    minimizeAcceleration: "SmoothStartEnd",
    membersMargin: 5,
    layoutLeftMargin: 5,
    showFooter:false,
    canDragReposition:false,
    autoSize:false,
    showStatusBar:false,
    width: "100%",
    height: "100%",
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomModalWindow", "CustomWindow").addMethods({
    dragAppearance:"outline",
    dragOpacity:30,
    showCloseButton:true,
    dismissOnEscape: true,
    autoSize:true, canDragResize: true,
    width: "50%", height: "50%",
    autoCenter: true,
    autoDraw: false,
    isModal: true,
    showModalMask: true
});

isc.defineClass("CustomDynamicForm", "DynamicForm").addMethods({
    numCols: 2,
    errorOrientation: "right",
    requiredTitlePrefix: "<b>",
    requiredTitleSuffix: "<font color='#ff0000'>*</font>: </b>",
    padding: 0,
    width: "100%",
    height: "100%",
    edgeSize:5,
    showEdges: false,
    wrapItemTitles: false,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    overflow: "visible",
    errorsPreamble:"",
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomHSlider", "Slider").addMethods({
    vertical: false,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomHTMLPane", "HTMLPane").addMethods({
    width: "100%",
    height: "100%",
    overflow:"auto",
    contentsType:"page",
    edgeSize:5,
    redrawOnResize: true, /* Once the contents are drawn draw them again, its slow but required*/
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomHTMLFlow", "HTMLFlow").addMethods({
    width: "100%",
    height: "100%",
    vPolicy: "fill",
    overflow:"auto",
    edgeSize:5,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomImgButton", "ImgButton").addProperties({
    size:24,
    hoverWidth: 100,
    showRollOver: false,
    showHover:true,
    showDown: false,
    showFocused: false,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomToolImgButton", "CustomImgButton").addProperties({
    size:16
});

isc.defineClass("CustomHLayout", "HLayout").addMethods({
    width: "100%",
    height: "100%",
    membersMargin: 5,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    edgeSize:5,
    showEdges: false,
    layoutMargin: 0,
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomVLayout", "VLayout").addMethods({
    width: "100%",
    height: "100%",
    membersMargin: 5,
    edgeSize:5,
    showEdges: false,
    layoutMargin: 0,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("OverallHLayout", "CustomHLayout").addMethods({
    membersMargin: 0
});

isc.defineClass("OverallVLayout", "CustomVLayout").addMethods({
    membersMargin: 0
});

isc.defineClass("ToolHLayout", "CustomVLayout").addMethods({
    /*showResizeBar: true,*/
    defaultLayoutAlign: "center",
    membersMargin: 15,
    layoutMargin: 0,
    width: 160
});

isc.defineClass("ActionHLayout", "CustomHLayout").addMethods({
    defaultLayoutAlign: "center",
    bbackgroundColor: "#BCD8FD",
    membersMargin: 5,
    layoutMargin: 0,
    layoutLeftMargin: 5,
    height: 25
});

isc.defineClass("CustomVStack", "VStack").addMethods({
    width: "100%",
    height: "100%",
    membersMargin: 5,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomSectionStack", "SectionStack").addMethods({
    width: "100%",
    height: "100%",
    overflow:"h-fill",
    membersMargin: 2,
    canResizeSections: false,
    defaultResizeBars: "none",
    layoutMargin: 0,
    animateSections: false,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showEdges:false,
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomLayoutSpacer", "LayoutSpacer").addMethods({
    width: "10%",
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomLabel", "Label").addProperties({
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    height: 3, align: "center", valign: "center",
    showEdges:false,
    edgeSize:10
});

isc.defineClass("CustomImg", "Img").addProperties({
    layoutAlign:"center",
    showRollOver: false,
    showDown: false,
    showFocused: false,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomAdvImg", "CustomImg").addProperties({
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    width: 275, height: 205
});

isc.defineClass("CustomTabSet", "TabSet").addProperties({
    destroyPanes:false,
    useKeys: true,
    showKeys: true,
    layoutMargin:0,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw:false
});

isc.defineClass("CustomListGrid", "ListGrid").addProperties({
    bodyProperties: { canSelectText:true },
    dataProperties: {useClientFiltering: true},
    alternateRecordStyles:true,
    wrapCells:true,
    cellHeight:40,
    edgeSize:5,
    showEdges:false,
    width: "100%",
    height: "100%",
    showSortArrow: "field",
    selectionType: "single",
    singleCellValueProperty: "singleCellValue",
    emptyMessage:"<b>No Data Available</b>",
    loadingDataMessage: "Loading Data....",//getGridLoadingMsg(),
    loadingMessage: "...",
    expansionFieldImageWidth: 7,
    expansionFieldImageHeight: 9,
    /*vPolicy: "scroll",*/
    overflow:"auto",
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    leaveScrollbarGap:false,
    showRollOver: false,
    /*showHover: true,*/
    canAutoFitFields : false,
    showHeaderMenuButton: true,
    showHeaderContextMenu: true,
    /*canHover: true,*/
    canReorderFields: false,
    canSort: true,
    canPickFields: false,
    canFreezeFields: false,
    canGroupBy: true,
    showShadow:false,
    autoDraw:false
});

isc.defineClass("ActionableListGrid", "CustomListGrid").addProperties({
    /*showHover: true,*/
    showFilterEditor : true,
    canAutoFitFields : true,
    canReorderFields: true,
    canSort: true,
    canPickFields: true,
    emptyMessage:"<b>No Data Available</b>",
    canFreezeFields: false,
    canGroupBy: true
});

isc.defineClass("WHeaderListGrid", "CustomListGrid").addProperties({
    showHeader:false,
    emptyMessage:"<b>No Data Available</b>",
    fixedRecordHeights:false
});

isc.defineClass("RecCompListGrid", "CustomListGrid").addProperties({
        recordComponentPoolingMode: "data",
        showRecordComponents: true,
        emptyMessage:"<b>No Data Available</b>",
        showRecordComponentsByCell: true
});

isc.defineClass("ActionableListGrid", "CustomListGrid").addProperties({
    canReorderFields: true,
    canSort: true,
    canPickFields: true,
    emptyMessage:"<b>No Data Available</b>",
    canFreezeFields: true,
    canGroupBy: true
});

isc.defineClass("CustomMenu", "Menu").addProperties({
    showAnimationEffect: "slide",
    showAnimationEffect:true,
    cellHeight1: 15,
    shadowDepth: 10,
    showShadow: false,
    useKeys: true,
    showKeys: true,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    autoDraw: false
});

isc.defineClass("CustomButton", "Button").addProperties({
    iconSize: 16,
    height: 20,
    width: 100,
    showIcon: false,
    iconOrientation: "left",
    showSelectedIcon: true,
    /*autoFit: true,*/
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    autoDraw: false
});

isc.defineClass("CustomMenuButton", "MenuButton").addProperties({
    width: 60,
    wrap: false,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw: false
});

isc.defineClass("CustomToolStrip", "ToolStrip").addProperties({
    height:10,
    membersMargin: 0,
    width: "100%",
    height: "100%",
    layoutAlign:"center",
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    autoDraw: false
});

isc.defineClass("CustomDetailViewer", "DetailViewer").addProperties({
    width: "100%",
    height: "100%",
    emptyMessage:"<b>No Data Available</b>",
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    edgeSize:5,
    showEdges: false,
    autoDraw: false
});

isc.defineClass("CustomTreeGrid", "TreeGrid").addProperties({
    bodyStyleName:"normal",
    alternateRecordStyles:true,
    showHeader:true,
    leaveScrollbarGap:false,
    cellHeight:35,
    headerHeight:30,
    width: "100%",
    height: "100%",
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    autoDraw: false
});

isc.defineClass("CustomFilterBuilder", "FilterBuilder").addProperties({
    width: "100%",
    height: "100%",
    membersMargin: 5,
    redrawOnResize: false, /* Once the contents are drawn no need to redraw them */
    showShadow:false,
    animateMembers: true,
    autoDraw: false
});
