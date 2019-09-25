/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 *  联共保结算
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var invoiceInformationQuery = function ($scope, $$blueInvoiceIssued,$modal, $state,mcMultiEditorCacheService) {
        /**
         * 查询方法
         */
        $scope.invoiceInfoQuery=function (target) {
            var result=[];
            $.each($scope.checkDetail,function (index,detailItem) {
                if(detailItem.checkCode){
                    result.push("'"+detailItem.key+"'");
                }
            });
            //json格式用逗号分隔
            result=result.join(',');
            $scope.invoiceQueryInfo.infos.invoiceQuery.statusSub=result;
            $scope.invoiceQueryInfo.infos.invoiceQuery.webUserCode=$scope.usercode;
            $scope.invoiceQueryInfo.infos.invoiceQuery.webComCode=$scope.comCode;
            $scope.invoiceQueryInfo.infos.invoiceQuery.webCenterCode=$scope.centerCode;
            $scope.invoiceQueryInfo.infos.invoiceQuery.webTaskCode='payment.invoice.invoiceinfoquery';
            $$blueInvoiceIssued.invoiceInfoQuery($scope.invoiceQueryInfo.infos.invoiceQuery,{
                success: function (data) {
                    $scope.invoiceQueryInfo.infos.invoiceQueryLists=data.prpJInvoiceMainDtoList || [];
                    if($scope.invoiceQueryInfo.infos.invoiceQueryLists.length==0){
                        if(target=='flag'){
                            layerMsg('暂无数据！');
                            return false
                        }
                    }
                    $scope.invoiceInfoFlag=true;
                    saveData();
                },
                error: function (e) {
                }
            },{
                "pageIndex":$scope.pagination.pageIndex,
                "pageSize":$scope.pagination.pageSize
            })
        };
        /**
         * 重置方法
         */
        $scope.resetInvoiceIfo=function () {
            $scope.invoiceQueryInfo.infos.invoiceQuery={};
            $.each($scope.checkDetail,function (index ,detailItem) {
                detailItem.checkCode=false;
            });
            $scope.state.checkAll=false;
        };
        /**
         * 返回方法
         */
        $scope.invoiceCancel=function () {
            $scope.invoiceInfoFlag=false;
        };
        /**
         * 导出Excal
         */
        $scope.exportExcal=function () {
        };
        /**
         *
         * 全选
         */
        $scope.checkedAll=function () {
            if($scope.state.checkAll){
                $.each($scope.checkDetail,function (index,detailItem) {
                    detailItem.checkCode=true;
                });
            }else{
                $.each($scope.checkDetail,function (index,detailItem) {
                    detailItem.checkCode=false;
                });
            }
        };
        $scope.changeCheckAll=function (flag) {
            if(flag==false){
                $scope.state.checkAll=false;
            }
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            mcMultiEditorCacheService.localData('invoiceInformationQuery',$scope.invoiceQueryInfo);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('invoiceInformationQuery');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            $scope.moreFlag=!$scope.moreFlag;
            saveData();
        };
        /**
         * 初始化数据
         */
        var init=function () {
            $scope.invoiceQueryInfo=$$blueInvoiceIssued.invoiceInfoUser();
            $scope.state={};
            $scope.state.checkAll=true;
            $scope.invoiceInfoFlag=true;
            if(getData()){
                $scope.invoiceQueryInfo=getData();
            }else {
                $scope.invoiceQueryInfo.infos=$scope.invoiceQueryInfo.infos;
            }
            //分页信息
            $scope.pagination = {
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'15',//显示条数
                maxSize:'3',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            $scope.checkDetail=[
                {
                    'checkCode':true,
                    'key':'09',
                    'value':'已开票'
                },
                {
                    'checkCode':true,
                    'key':'06',
                    'value':'作废'
                },
                {
                    'checkCode':true,
                    'key':'12',
                    'value':'批改红字发票'
                },
                {
                    'checkCode':true,
                    'key':'13',
                    'value':'红字发票'
                },
                {
                    'checkCode':true,
                    'key':'15',
                    'value':'蓝票开票申请'
                },
                {
                    'checkCode':true,
                    'key':'16',
                    'value':'红票开票申请'
                },
                {
                    'checkCode':true,
                    'key':'18',
                    'value':'电子红票开票申请'
                },
                {
                    'checkCode':true,
                    'key':'19',
                    'value':'红字发票处理中'
                }
            ];
        };
        init();
    };

    moduleApp.controller('invoiceInformationQueryCtrl', ['$scope', '$$invoiceInformationQuery','$modal','$state','mcMultiEditorCacheService', invoiceInformationQuery]);

});
