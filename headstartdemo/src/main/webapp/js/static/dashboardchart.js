var dashboardChartData = [{"id":1,"title":"Recent Activity","permission_name":"canviewrecentactivity","permission":"view_recent_activity_permission","type":"recent","url":"/ActivityStream/FIQLsearch?date=\"+new Date()+\"&ulimit=2&llimit=0&orderBy=date&orderType=desc"}, {"id":2,"title":"Users Map","permission_name":"canviewusermap","permission":"view_map_permission","type":"google","url":"/Users/search?&ulimit=3&llimit=0&orderBy=date&orderType=desc"}, {"id":3,"title":"Users","type":"users","url":"/Users/search?&ulimit=3&llimit=0"}, {"id":4,"title":"payment trend chart","permission_name":"canViewpaymentamount","permission":"view_payment_amount_permission","type":"line","url":"/Dashboard/getTrendLineChartForpayment"}, {"id":5,"title":"employee bar chart","permission_name":"canViewemployeeofficeid","permission":"view_employee_officeid_permission","type":"bar","url":"/Dashboard/getTrendBarChartForemployee"}, {"id":6,"title":"customer Donut chart","permission_name":"canViewcustomerprioritystatus","permission":"view_customer_prioritystatus_permission","type":"donut","url":"/Dashboard/getcustomerprioritystatusEnumPieChart"}, {"id":7,"title":"product Donut chart","permission_name":"canViewproductproductline","permission":"view_product_productline_permission","type":"donut","url":"/Dashboard/getproductproductlineEnumPieChart"}, {"id":8,"title":"orders Pie chart","permission_name":"canViewordersorder_status","permission":"view_orders_order_status_permission","type":"pie","url":"/Dashboard/getordersorder_statusStatusPieChart"}]
 
 
 
var addressFields=["Users","Customer" ]