var accountApp = angular.module('accountController',['connService','ng-iscroll']);

var dataModel= {"listdata":[{"PARTY_ID":116240,"PARTY_NAME":"广州联欣信息科技有限公司","ADDRESS":"萝岗区科学城科汇金谷四街3号4-限广州市510663中国","TOTAL_NUMBER":132,"LOCATION_ID":7509,"ADDRESS_ID":111793,"PHONE_NUMBER":"02084108888","ROW_ID":"AAA/sgAAWAABJwaAAA"},{"PARTY_ID":116193,"PARTY_NAME":"Shenzhen Kingnod Consulting Inc","ADDRESS":"Flat East 12/F, Lenovo Building, Gaoxin Avenue 1 South, High-Tech Industrial Park Nanshan District, Shenhen Dna, 518057","TOTAL_NUMBER":132,"LOCATION_ID":7483,"ADDRESS_ID":111768,"PHONE_NUMBER":"075523982505","ROW_ID":"AAA/sgAAWAABJwdAAQ"},{"PARTY_ID":116172,"PARTY_NAME":"深圳盈诺德信息技术有限公10司","ADDRESS":"鼬区后馱道以东天利中央商务广场2705深圳市518054中国","TOTAL_NUMBER":132,"LOCATION_ID":7471,"ADDRESS_ID":111756,"PHONE_NUMBER":"075523982505","ROW_ID":"AAA/sgAAWAABJwSAAP"},{"PARTY_ID":116169,"PARTY_NAME":"深圳盈诺德信息技术有限公9司","ADDRESS":"鼬区后馱道以东天利中央商务广场2705深圳市518054中国","TOTAL_NUMBER":132,"LOCATION_ID":7469,"ADDRESS_ID":111754,"PHONE_NUMBER":"075523982505","ROW_ID":"AAA/sgAAWAABJwSAAM"},{"PARTY_ID":116166,"PARTY_NAME":"深圳盈诺德信息技术有限公7司","ADDRESS":"鼬区后馱道以东天利中央商务广场2705深圳市518054中国","TOTAL_NUMBER":132,"LOCATION_ID":7467,"ADDRESS_ID":111752,"PHONE_NUMBER":"075523982505","ROW_ID":"AAA/sgAAWAABJwSAAJ"},{"PARTY_ID":116163,"PARTY_NAME":"深圳盈诺德信息技术有限公司6","ADDRESS":"鼬区后馱道以东天利中央商务广场2705深圳市518054中国","TOTAL_NUMBER":132,"LOCATION_ID":7465,"ADDRESS_ID":111750,"PHONE_NUMBER":"075523982505","ROW_ID":"AAA/sgAAWAABJwSAAG"},{"PARTY_ID":116160,"PARTY_NAME":"深圳盈诺德信息技术有限公司5","ADDRESS":"鼬区后馱道以东天利中央商务广场2705深圳市518054中国","TOTAL_NUMBER":132,"LOCATION_ID":7463,"ADDRESS_ID":111748,"PHONE_NUMBER":"075523980473","ROW_ID":"AAA/sgAAWAABJwdAAD"},{"PARTY_ID":116157,"PARTY_NAME":"深圳盈诺德限公司","ADDRESS":"鼬区后馱道以东天利中央商务广场2705深圳市518054中国","TOTAL_NUMBER":132,"LOCATION_ID":7461,"ADDRESS_ID":111746,"PHONE_NUMBER":"075523980473","ROW_ID":"AAA/sgAAWAABJwdAAA"},{"PARTY_ID":116154,"PARTY_NAME":"深圳盈诺德信","ADDRESS":"鼬区后馱道以东天利中央商务广场2705深圳市518054中国","TOTAL_NUMBER":132,"LOCATION_ID":7459,"ADDRESS_ID":111744,"PHONE_NUMBER":"075523980473","ROW_ID":"AAA/sgAAWAABJwSAAD"}],"size":132,"status":"success"} ;

accountApp.controller('listController',['$scope','commonService','$interval',function($scope,service,$interval){

    service.getDatas();

    $scope.lists="";
    var stop;
    $scope.sec = 5000;

    stop = $interval(function() {
        if (sessionStorage.getItem("datas")!="") {
            try{
                $scope.lists = JSON.parse(sessionStorage.getItem("datas")).listdata;
            }catch(e){
            }
            $scope.stopFight();
            $.ui.launch();
        } else if($scope.sec>0){
            $scope.sec = $scope.sec - 50;
        }
    }, 50);

    $scope.stopFight = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };

    //必须初始化
    if($scope.$parent.myRefresh === undefined){
        $scope.$parent.myRefresh=[];
    }

    $scope.$parent.myRefresh['pullDown'] = function(){
        setTimeout(function(){
            $scope.lists.unshift({"PARTY_ID":1164569,"PARTY_NAME":"bbb","ADDRESS":"wetsds","TOTAL_NUMBER":135,"LOCATION_ID":7499,"ADDRESS_ID":111754,"PHONE_NUMBER":"075523982505","ROW_ID":"AAA/sgAAWAABJwSAAM"});
            $scope.$apply();
            $scope.$parent.myScroll['wrapper'].refresh();
        },500)
    }

    $scope.$parent.myRefresh['pullUp'] = function(){
        setTimeout(function(){
            $scope.lists.push({"PARTY_ID":1164569,"PARTY_NAME":"aaa","ADDRESS":"fffffffffffff","TOTAL_NUMBER":135,"LOCATION_ID":7499,"ADDRESS_ID":111754,"PHONE_NUMBER":"075523982505","ROW_ID":"AAA/sgAAWAABJwSAAM"});
            $scope.$apply();
            $scope.$parent.myScroll['wrapper'].refresh();
        },500)
    }

    $scope.$parent.myScrollOptions = {
        /*snap: false,
        onScrollEnd: function ()
        {
            alert('finshed1 scrolling');
        }*/
    };

}]);
