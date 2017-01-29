<%@ taglib prefix='c' uri='http://java.sun.com/jstl/core_rt' %>
<%
	String context = request.getContextPath();
%>
<HTML>
<HEAD>
<SCRIPT>var isomorphicDir="../isomorphic/";</SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Core.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Foundation.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Containers.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Grids.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_Forms.js></SCRIPT>
<SCRIPT SRC=../isomorphic/system/modules/ISC_DataBinding.js></SCRIPT>
<SCRIPT SRC=../isomorphic/skins/GoGreen/load_skin.js></SCRIPT>
<SCRIPT SRC=scripts/generated/Users/UsersDataSource.js></SCRIPT>

</HEAD>
 <body>
        <script>
		isc.Img.create({
             src:"GoGreen-logo.gif",
             ID:"CompanyLogoImage",
             autoDraw:false,
             width: (Page.getScreenWidth() * 25)/100,
             layoutAlign: "left"
             });

            isc.SectionStack.create
			({
				ID: "UsersCustomCreateFormSectionStack",
				visibilityMode: "multiple",
				autoDraw:false,
				width: "100%",
				overflow: "visible",
				border:"0",
				sections:
				[
					{
						title: "User Registration",
						expanded: true,
						showHeader : true,
						autoDraw:false,
						canCollapse: false,
						membersMargin: 2,
						showEdges : false,
						items:
						[
							isc.DynamicForm.create
							({
								ID: "UsersCustomCreateForm",
								width: "100%",
								autoDraw:false,
								requiredTitlePrefix: "<font color='brown'><b>",
								requiredTitleSuffix: " : </b></font>",
								showTitlesWithErrorMessages: false,
								showErrorText: false,
								errorOrientation: "left",
								numCols: 6,
								dataSource:"UsersDataSource",
								fields: [
									{type:'RowSpacer'},
									{name:"userid",type:"hidden",title:"userid",primaryKey:true,showIf: "false"},
									{
										title:"User Name",
										name:"username",
										required:true,
										type:"text",
										length:30
									},
									{name: "password", title: "Password", required: true, type: "password", length: 20},
									{name: "confirmpassword", title: "Confirm Password",type: "password" , required: true, wrapTitle: false,
									 length: 20, validators: [{
										 type: "matchesField",
										 otherField: "password",
										 errorMessage: "Passwords do not match"
									 }]
									},
									{
										title:"First Name",
										name:"firstname",
										required:true,
										type:"text",
										length:30
									},
									{
										title:"Last Name",
										name:"lastname",
										required:true,
										type:"text",
										length:30
									},
									{
										title:"City",
										name:"city",
										required:false,
										type:"text",
										length:16
									},
									{
										title:"State",
										name:"state",
										required:false,
										type:"text",
										length:20,
										setValue:function(newValue){},
										dataPath:"/state/authorityid"
									},
									{
										name:"zip",
										type:"int",
										title:"Zip",
										keyPressFilter:"[0-9]",
										length:5
									},
									{
										title:"Country",
										name:"country",
										required:false,
										type:"text",
										length:20,
										setValue:function(newValue){},
										dataPath:"/country/authorityid"
									},
									{
										title:"Cell Phone",
										name:"telephone",
										required:false,
										type:"text",
										length:12
									},
									{
										title:"Email",
										name:"email",
										required:false,
										type:"text",
										length:50,
										required:true,
										validators:[
											{type:"regexp",
											 expression:"^([a-zA-Z0-9_.\\-+])+@(([a-zA-Z0-9\\-])+\\.)+[a-zA-Z0-9]{2,4}$"}
										]
									},
									{type:'RowSpacer'},
									{type:'RowSpacer'},

									{name: "createButton", title: "Register", type: "button", width:100,endRow: false,
											click:function() 
											{
												UsersCustomCreateForm.getItem('userid').clearValue();
												UsersCustomCreateForm.addProperties({saveOperationType:"add"});
												UsersCustomCreateForm.submit();
												
											}
									},
									{name:"ResetButton",type:"button",title:"Reset",startRow:true,rowSpan:2,width:100,endRow: false, startRow: false,
										click:function() {
											resetUsers = true;
											UsersCustomCreateForm.clearValues();
											resetUsers = false;
										}
									},
									{
										name:"info",
										startRow:true,
										endRow:true,
										canEdit:false,
										showTitle: false,
										defaultValue: "Note: Duly filled registration form shall be approved by administrator. Please contact administrator further...",
										type:"text",
										colSpan: 6,
										width: "100%"
									}
								]
							})
						]
					}
				]
			});

isc.VLayout.create({
ID:"HeaderVLayout",
autoDraw:true,
height: "100%",
width: "100%",
members:[ isc.HLayout.create({
				    height:"6%",
					backgroundColor:"#024731",
					membersMargin: 2,
                                        layoutTopMargin: 0,
					members:[CompanyLogoImage]
				}),isc.HLayout.create({
				    height:"5%"
				  }),UsersCustomCreateFormSectionStack,	isc.HLayout.create({
			    height:"5%",
					autoDraw: false,
			    backgroundColor:"#024731"
		   })]
});

        </script>
</BODY>

</HTML>