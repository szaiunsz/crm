
angular.module("connService",[])
    .factory('commonService', ['$rootScope',
    function ($rootScope) {

        function getDatas(){
            sessionStorage.setItem("datas","");
            var _jsonPID = 0;
            var callBack = 'jsonp_callback' + (++_jsonPID);
            window[callBack]= function (data) {
                sessionStorage.setItem("datas",data);
                setTimeout(function () {
                    window[callBack] = undefined;
                }, 5000);
            }
            option = {"service":"CRM_INT_PKG.query_list_sale_customer","data":{"P_CUSTOMER_NAME":"","P_USER_NAME":"kingnod92","P_ROW_ID":"","P_UP_DOWN":"","P_RECORD_COUNT":"10"},"type":"rest","to":"EBS"}

            var url = "http://test.kingnode.com/Jersey_WebClient/restRequest.jsp";
            var url1 = "Jersey_WebClient/restRequest.jsp";
            if ($.os.android) {

            }else if ($.os.ios) {
                document.location.href = '../../index.html?jspAct=' + url1 + '&jsRe=' + callBack + '&multimedia=0&datas=' + JSON.stringify(option) + '&imgPath=';
            }else{
                $.ajax({
                     url: url + "?data="+JSON.stringify(option),
                    type: 'POST',
                    dataType: "json",
                    async: false,
                    contentType: 'application/x-www-for m-urlencoded;application/json;charset=utf-8',
                    success: function (data) {
//                        score.data =  JSON.stringify(data);
                        sessionStorage.setItem("datas",JSON.stringify(data));
                        console.info(sessionStorage.getItem("datas"));
                    },
                    error: function (data) {
                        alert("服务器连接失败，请稍后重试！");
                        return "网络异常";
                    }
                 });
            }
        }
        return {
            getDatas:getDatas
        }
    }]);


