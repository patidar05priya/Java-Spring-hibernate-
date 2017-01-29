function openEditScreen(entityName) {
    removeAllInstanceOfEditor();
    $('#view_' + entityName + '_breadcumbs').css('display', 'none');
    $('#home_' + entityName + '_breadcumbs').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv input').val('');
    $('#add_' + entityName + '_breadcumbs').css('display', 'none');
    $('#edit_' + entityName + '_breadcumbs').css('display', '');
    $('#' + entityName + '_back').css('display', '');
    $('#' + entityName + '_filter_form').css('display', 'none');
    $('#' + entityName + '_quick_filter').css('display', 'none');
    $('#' + entityName + '_breadcrumbs .sideBarBreadCrumbSpan').css('display', 'none');
    $('#nav-search .sideBarBreadCrumbSpan').css('display', 'none');
    $('#' + entityName + '_main_div' + ' > div').css('display', 'none');
    animateDiv("edit", entityName);
    hideFilterDiv();
    $('#' + entityName + '_breadcrumbs #'+entityName+'ViewAttachmentCommentCountDiv').css('display', 'none');
    $('#' + entityName + '_breadcrumbs #'+entityName+'EditAttachmentCommentCountDiv').css('display', '');
}

function openListScreen(entityName) {
    $('#' + entityName + '_breadcrumbs .sideBarBreadCrumbSpan').css('display', '');
    $('#nav-search .sideBarBreadCrumbSpan').css('display', '');
    $('#' + entityName + 'quickFilterDiv').css('display', 'none');
    $('#' + entityName + 'quickFilter').val('');
    removeAllInstanceOfEditor();
    $('#home_' + entityName + '_breadcumbs').css('display', '');

    $('#view_' + entityName + '_breadcumbs').css('display', 'none');
    $('#edit_' + entityName + '_breadcumbs').css('display', 'none');
    $('#add_' + entityName + '_breadcumbs').css('display', 'none');
    $('#' + entityName + '_filter_form').css('display', '');
    $('#' + entityName + '_quick_filter').css('display', '');
    $('#' + entityName + '_back').css('display', 'none');
    $('#' + entityName + '_main_div' + ' > div').css('display', 'none');
    animateDiv("list", entityName);

    $('#' + entityName + '_breadcrumbs #plus_bar').css("display", "");
    $('#nav-search #plus_bar').css("display", "");
    $('#' + entityName + '_breadcrumbs #'+entityName+'ViewAttachmentCommentCountDiv').css('display', 'none');
    $('#' + entityName + '_breadcrumbs #'+entityName+'EditAttachmentCommentCountDiv').css('display', 'none');
}

function openAddScreen(entityName) {
    removeAllInstanceOfEditor();
    $('#' + entityName + '_breadcrumbs .sideBarBreadCrumbSpan').css('display', 'none');
    $('#nav-search .sideBarBreadCrumbSpan').css('display', 'none');
    $('#home_' + entityName + '_breadcumbs').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv input').val('');

    jsonvariable = "";
    $('#view_' + entityName + '_breadcumbs').css('display', 'none');
    $('#edit_' + entityName + '_breadcumbs').css('display', 'none');

    $('#add_' + entityName + '_form').trigger('reset');
    $('#' + entityName + '_back').css('display', '');
    $('#add_' + entityName + '_breadcumbs').css('display', '');
    $('#' + entityName + '_filter_form').css('display', 'none');
    $('#' + entityName + '_quick_filter').css('display', 'none');
    $('#' + entityName + '_main_div' + ' > div').css('display', 'none');
    animateDiv("add", entityName);
    hideFilterDiv();
    $('#' + entityName + '_breadcrumbs #plus_bar').css("display", "none");
    $('#nav-search #plus_bar').css("display", "none");
    
    $('#' + entityName + '_breadcrumbs #'+entityName+'ViewAttachmentCommentCountDiv').css('display', 'none');
    $('#' + entityName + '_breadcrumbs #'+entityName+'EditAttachmentCommentCountDiv').css('display', 'none');
}

function openDetailScreen(entityName) {
    removeAllInstanceOfEditor();
    $('#' + entityName + '_breadcrumbs .sideBarBreadCrumbSpan').css('display', 'none');
    $('#nav-search .sideBarBreadCrumbSpan').css('display', 'none');
    $('#home_' + entityName + '_breadcumbs').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv input').val('');

    $('#edit_' + entityName + '_breadcumbs').css('display', 'none');
    $('#add_' + entityName + '_breadcumbs').css('display', 'none');
    $('#view_' + entityName + '_breadcumbs').css('display', '');
    $('#' + entityName + '_filter_form').css('display', 'none');
    $('#' + entityName + '_quick_filter').css('display', 'none');
    $('#' + entityName + '_back').css('display', '');
    $('#' + entityName + '_main_div' + ' > div').css('display', 'none');
    animateDiv("details", entityName);
    
    $('#' + entityName + '_breadcrumbs #'+entityName+'ViewAttachmentCommentCountDiv').css('display', '');
    $('#' + entityName + '_breadcrumbs #'+entityName+'EditAttachmentCommentCountDiv').css('display', 'none');
}

function openError_404_Screen(entityName) {
    $('#' + entityName + '_main_div' + ' > div').css('display', 'none');
    animateDiv("error_404", entityName);
    
    $('#' + entityName + '_breadcrumbs #'+entityName+'ViewAttachmentCommentCountDiv').css('display', 'none');
    $('#' + entityName + '_breadcrumbs #'+entityName+'EditAttachmentCommentCountDiv').css('display', 'none');
}

function openError_500_Screen(entityName) {
    $('#' + entityName + '_main_div' + ' > div').css('display', 'none');
    animateDiv("error_500", entityName);
    
    $('#' + entityName + '_breadcrumbs #'+entityName+'ViewAttachmentCommentCountDiv').css('display', 'none');
    $('#' + entityName + '_breadcrumbs #'+entityName+'EditAttachmentCommentCountDiv').css('display', 'none');
}

function openEditScreenInline(entityName, divName, desc) {
    $('#' + entityName + '_breadcrumbs .sideBarBreadCrumbSpan').css('display', 'none');
    $('#nav-search .sideBarBreadCrumbSpan').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv input').val('');
    removeAllInstanceOfEditor();
    $('#home_' + entityName + '_breadcumbs').css('display', 'none');

    $('#view_' + entityName + '_breadcumbs').css('display', 'none');

    $('#add_' + entityName + '_breadcumbs').css('display', 'none');
    $('#edit_' + entityName + '_breadcumbs').css('display', '');
    $('#' + entityName + '_main_div' + ' > div').css('display', 'none');
    $('#' + entityName + '_back').css('display', '');

    $('#' + entityName + '_filter_form').css('display', 'none');
    $('#' + entityName + '_quick_filter').css('display', 'none');
    animateDiv("edit", entityName);

    $('#' + entityName + '_breadcrumbs #plus_bar').css("display", "none");
    $('#' + entityName + '_breadcrumbs #'+entityName+'ViewAttachmentCommentCountDiv').css('display', 'none');
    $('#' + entityName + '_breadcrumbs #'+entityName+'EditAttachmentCommentCountDiv').css('display', 'none');
}

function openAddScreenInline(entityName, divName) {
    removeAllInstanceOfEditor();
    if (hasValue(divName)) {
        for (var i = 0; i < divName.length; i++) {
            $('#add_' + entityName + '_form #' + divName).html('');
        }
    }
    $('#' + entityName + '_breadcrumbs .sideBarBreadCrumbSpan').css('display', 'none');
    $('#nav-search .sideBarBreadCrumbSpan').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv').css('display', 'none');
    $('#' + entityName + 'quickFilterDiv input').val('');
    $('#home_' + entityName + '_breadcumbs').css('display', 'none');

    $('#view_' + entityName + '_breadcumbs').css('display', 'none');
    $('#edit_' + entityName + '_breadcumbs').css('display', 'none');

    $('#add_' + entityName + '_breadcumbs').css('display', '');
    $('#add_' + entityName + '_form').trigger('reset');
    $('#' + entityName + '_main_div' + ' > div').css('display', 'none');
    $('#' + entityName + '_back').css('display', '');
    $('#' + entityName + '_filter_form').css('display', 'none');
    $('#' + entityName + '_quick_filter').css('display', 'none');
    animateDiv("add", entityName);

    $('#' + entityName + '_breadcrumbs #plus_bar').css("display", "none");
    $('#' + entityName + '_breadcrumbs #'+entityName+'ViewAttachmentCommentCountDiv').css('display', 'none');
    $('#' + entityName + '_breadcrumbs #'+entityName+'EditAttachmentCommentCountDiv').css('display', 'none');
}

function richscript(hh,divName) {
	initToolbarBootstrapBindings();
    function initToolbarBootstrapBindings() {
			
      var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
            'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
            'Times New Roman', 'Verdana'],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
      $.each(fonts, function (idx, fontName) {
          fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
      });
      $('a[title]').tooltip({container:'body'});
    	$('.dropdown-menu input').click(function() {return false;})
		    .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});

      $('[data-role=magic-overlay]').each(function () { 
        var overlay = $(this), target = $(overlay.data('target')); 
        overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
      });
      if ("onwebkitspeechchange"  in document.createElement("input")) {
        var editorOffset = $('.editor').offset();
        $('#voiceBtn').css('position','absolute');
      } else {
        $('#voiceBtn').hide();
      }
	};
	function showErrorAlert (reason, detail) {
		var msg='';
		if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
		else {
			console.log("error uploading file", reason, detail);
		}
		$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
		 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
	};

	$("#"+hh+" #myEditor #editor").wysiwyg({ fileUploadError: showErrorAlert} );
    window.prettyPrint && prettyPrint();
}

function animateDiv(divName, entityName) {
    var $marginLefty = $("#" + divName + "_" + entityName + "_div");
    $marginLefty.css('marginLeft', $marginLefty.outerWidth());
    $marginLefty.animate({
        duration: 1500,
        height: "toggle",
        marginLeft: parseInt($marginLefty.css('marginLeft'), 10) == 0 ?
            $marginLefty.outerWidth() : 0
    });
}
