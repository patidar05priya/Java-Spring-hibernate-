	jQuery.widget( "custom.catcomplete", jQuery.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
			var that = this,
			currentCategory = "";

			jQuery.each( items, function( index, item ) {
			if ( item.category != currentCategory ) {
				ul.append( "<li class='ui-autocomplete-category'><b>" + item.category + "</b></li>" );
				currentCategory = item.category;
			}
			that._renderItemData( ul, item );
			});
		}
	});
	
  $(function() {
    $( "#searchIndex" ).catcomplete({
      delay: 0,
      source: function( request, response ) {
        var term = request.term;
        jQuery.getJSON( "../rest/ElasticSearch/searchAllIndex", request, function( data, status, xhr ) {
			return response(data);
        });
      },
      minLength: 3,
      select: function( event, ui ) {
			 		   if(equalsIgnoreCaseAndIgnoreSpace(ui.item.category,"Customer"))
			{
				createTabScreen("customer",ui.item.id);
				check_elastic_view_screen=true;
			}		
           		   if(equalsIgnoreCaseAndIgnoreSpace(ui.item.category,"Product"))
			{
				createTabScreen("product",ui.item.id);
				check_elastic_view_screen=true;
			}		
           		   if(equalsIgnoreCaseAndIgnoreSpace(ui.item.category,"Orders"))
			{
				createTabScreen("orders",ui.item.id);
				check_elastic_view_screen=true;
			}		
           		   if(equalsIgnoreCaseAndIgnoreSpace(ui.item.category,"Orderdetail"))
			{
				createTabScreen("orderdetail",ui.item.id);
				check_elastic_view_screen=true;
			}		
           		   if(equalsIgnoreCaseAndIgnoreSpace(ui.item.category,"Employee"))
			{
				createTabScreen("employee",ui.item.id);
				check_elastic_view_screen=true;
			}		
           		   if(equalsIgnoreCaseAndIgnoreSpace(ui.item.category,"Office"))
			{
				createTabScreen("office",ui.item.id);
				check_elastic_view_screen=true;
			}		
           		   if(equalsIgnoreCaseAndIgnoreSpace(ui.item.category,"Payment"))
			{
				createTabScreen("payment",ui.item.id);
				check_elastic_view_screen=true;
			}		
                      		window.setTimeout(function(){check_list_view_screen=false;},1000);		
		  }
    });
  });

function equalsIgnoreCaseAndIgnoreSpace(str1,str2){
	if(removeSpace(str1) ==removeSpace(str2))
		return true ;
	
	return false;
}
function removeSpace(str){
	return str.replace(/ +/g, "").toLowerCase();
}


