isc.HLayout.create({
   ID:'headerSection', 
   width: '100%',
   height: '5%',
   autoDraw:false,
   members: 
   [
    isc.Label.create({
	    contents: 'Reports Explorer',
	    align: 'center',
	    overflow: 'hidden',
	    height: '5%'
    })    
  ]
});

isc.HTMLPane.create
({
	ID:'htmlpane',
	autoDraw:false,
	styleName:'exampleTextBlock',
	contents:'<div><h3>To view reports click on the items shown in the left pane</h3></div><br/><div align="center"><img src="images/report.jpg" height="207" width="244"></div>',
	contentsType:'page'
});

isc.TabSet.create
({
	ID: "topTabSet",
	top:85,
	autoDraw:false,
	height: "100%",
	width: "100%",
	tabs: 
	[
		{
			title:"View Reports",
			pane:isc.HLayout.create
			({
				members:
				[
					htmlpane
				]
			})	
		}
	]
});

var reportNewData = [];
try
{
	reportNewData = ReportMetaData;
}catch(e){}	
	
	
isc.HLayout.create({
     ID:'ReportSection',
     width: '100%',
     height: '100%',
     autoDraw:false,
     members: 
     [
       isc.VLayout.create({
           width: '25%',
           members:
		    [
				
				isc.ListGrid.create({
					ID: "repoList",
					autoDraw:false,
					showSortArrow:"none",
					fields:[
						 {name:"title", title:"Reports"}
					],
					data:reportNewData,
					cellClick: function (record, rowNum, colNum) {
						if (topTabSet.getTab(record.title) == null)
							{	
								addViewReportTab(record);
							}
					}
				})
			],
			overflow: 'hidden',
            showResizeBar: true,
            border: '1px solid'
       }), 
       isc.VLayout.create({
            width: '75%',
			members: 
	        [
				 topTabSet
            ]
        })
    ]
});

isc.SectionStack.create({
ID:"ReportSectionStack",
autoDraw:false,
overflow: "visible",
membersMargin: 0,
layoutTopMargin: 0,
sections:[{title:"Report",canCollapse:false, showHeader:true, expanded:true, resizeable:false, hidden:false, items:[ReportSection]}]})


function addViewReportTab(record){
	var title= record.title
	topTabSet.addTab({
		title: title,
		ID:title,
		canClose: true,
		autoDraw:false,	
		pane:isc.HLayout.create
		({
			autoDraw:false,
			members:
			[
				isc.HTMLPane.create
				({
					autoDraw:false,
					styleName:'exampleTextBlock',
					contentsURL:record.url,
					contentsType:'page'
				})
			]
		})
	});			
	topTabSet.selectTab(title);
}

	
