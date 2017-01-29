var DEFAULT_PAGE_LOWERLIMIT=0;
var DEFAULT_PAGE_UPPERLIMIT;

var VIEW_DETAIL_SPAN_TH = document.createElement( 'th' );
var VIEW_DETAIL_SPAN_TD = document.createElement( 'td' ); 

var detailpng = context +"/images/User/details_open.png";
VIEW_DETAIL_SPAN_TD.innerHTML = detailpng;
VIEW_DETAIL_SPAN_TD.className = "center";
var csrfCookiePath="/"
var uploadid;
var primaryKey;
var foreignKey;
var uploadName;
var upload_div_id;
var upid;
var richTextVar;
var description;
var userLanguage = "en";
var currentDomainId;
var tabNameArr=new Array();
var myjsonnode;
var check_list_view_screen=false;
var list_view_callId;
var uniqueid;
var LOGIN_USER_LANGUAGE = "en";
var LOGIN_USER_CONFIG_LANGUAGE_JSON;
var LOGIN_USER_ID;
var check_elastic_view_screen=false;
var TodayDate = "";

var EMPTY_DATA_VAR = "-"; // to show empty data as dash (-) in application
var DELETE_COMMENT_CONFIRM_MSG_VAR = "Are you sure you want to delete this comment ?";
var DELETE_ATTACHMENT_CONFIRM_MSG_VAR = "Are you sure you want to delete this attachment ?";

var TOTAL_COUNT_TEXT_VAR = "Total: ";
