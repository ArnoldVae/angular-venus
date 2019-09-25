/**
 *银行流水查询控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var bankStatementSearch=function($scope, $$bankStatementSearch, mcMultiEditorCacheService) {
        /**
         *查询
         */
        $scope.searchSerial = function (target) {
            if(target!='page'){
                $scope.bankStatementSearch.pagination.pageIndex=1;
            }
            if($scope.bankStatementSearch.serialCondition.impDate!=""&&$scope.bankStatementSearch.serialCondition.impDateEnd!=""&&$scope.bankStatementSearch.serialCondition.impDate>$scope.bankStatementSearch.serialCondition.impDateEnd){
                layerMsg("起始日期不能大于终止日期！");
                return false
            }
            $$bankStatementSearch.find("searchSerial", {
                "comCode": $scope.bankStatementSearch.serialCondition.comCode,
                "impTargetBankAccount": $scope.bankStatementSearch.serialCondition.impTargetBankAccount,
                "impFileName": $scope.bankStatementSearch.serialCondition.impFileName,
                "impDate": $scope.bankStatementSearch.serialCondition.impDate,
                "impDateEnd": $scope.bankStatementSearch.serialCondition.impDateEnd,
                "processStatus": $scope.bankStatementSearch.serialCondition.processStatus,
                "globalUserCode":$scope.usercode
            }, {
                success: function (data) {
                    console.log(data);
                    $scope.bankStatementSearch.serialList = data.content.content;
                    if(!target&&$scope.bankStatementSearch.serialList.length == 0){
                        layerMsg("暂无数据！")
                    }
                    $scope.bankStatementSearch.pagination.totalItems = data.content.totalCount;
                }, error: function (e) {
                }
            }, {
                "pageNo": $scope.bankStatementSearch.pagination.pageIndex-1,
                "pageSize": $scope.bankStatementSearch.pagination.pageSize
            })
        };
        /**
         *重置
         */
        $scope.resetSerial = function () {
            $scope.bankStatementSearch.serialCondition = {};
        };
        /**
         *删除
         */
        $scope.deleteSerial = function (target) {
            if(target.processStatus=="1"){
                layerMsg("只能删除未处理的文件！");
                return false
            }
            layer.confirm('确定删除吗?', {
                btn: ['确定','取消'] //按钮
            }, function() {
                var index =layer.load(2,{
                    shade:[0.1,'#fff']
                });
                $$bankStatementSearch.deleteSerialData(target, {
                    success: function (data) {
                        layer.close(index);
                        if(data.content.resultCode == "0000"){
                            layer.msg(data.content.resultMsg,{icon:1});
                            $scope.searchSerial(true);
                        }else {
                         layerMsg(data.content.resultMsg)
                        }
                    }, error: function (e) {
                    }
                })
            });
        };
        //文件下载
        $scope.voucherDetailed = function (fileId) {
            $scope.fileId = fileId.impFileNum;
            window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
        };
        //导入银行账号
        $scope.myFunc = function(){
            $scope.comcodes = $scope.bankStatementSearch.serialCondition.comCode;
            //导入目标银行账号-币别
            $$bankStatementSearch.queryBankAcount($scope.comcodes,{
                success: function (data) {
                    var payWayObj = {};
                    var payWaySelList = [];
                    $.each(data.content,function(index,obj){
                        payWayObj['code'] = obj.bankAccountNo;
                        payWayObj['value'] = obj.bankAccountNo+'-'+obj.currency;
                        payWaySelList.push(angular.copy(payWayObj));
                    })
                    $scope.bankTypeCNY = payWaySelList;
                },
                error: function (e) {

                }
            });
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('bankStatementSearch');//获取上次数据
            if(localDada){
                $scope.bankStatementSearch=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('bankStatementSearch',$scope.bankStatementSearch);//存储数据
        };
        var init = function () {
            $scope.bankStatementSearch = $$bankStatementSearch.bankStatementSearch();
            $scope.accountcomCode = $scope.centerCode;
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('BankStatementSearchCtrl',['$scope', '$$bankStatementSearch', 'mcMultiEditorCacheService',bankStatementSearch]);

});
