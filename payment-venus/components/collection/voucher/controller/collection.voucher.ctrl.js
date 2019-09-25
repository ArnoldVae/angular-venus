/**
 * 收保费控制器
 */
define([
    'app',
    'config'
],function (app,config) {
    'use strict';
    app.registerController('VoucherCtrl', ['$scope','$$voucher',
        function ($scope,$$voucher) {
            var init=function(){
                $scope.showFlag=false;
                $scope.pagination = {
                    totalItems:'',//总数
                    pageIndex:'1',//当前页面
                    pageSize:'20',//显示条数
                    maxSize:'3',//最大页数
                    numPages:'',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                };
                //实例化对象
                $scope.voucher=$$voucher.Voucher();
                $scope.infoToView=$scope.voucher.infoToView;
            };
            //全选
            $scope.selectedAccountAll=function(){
                angular.forEach($scope.checkList,function(data){
                    if($scope.infoToView.checkStatus.checkedCheckAll){
                        data.checked=true;
                    }else data.checked=false;
                });
            };
            //单选
            $scope.selectedAccountOne=function(){
                $scope.infoToView.checkStatus.checkedCheckAll=$scope.checkList.every(function(item,index,array){
                    return item.checked;
                })
            };
            /**
             *查询结果--样式改变 计算费用
             */
            $scope.selectedChangeClass=function(){
                var selectedNum=0;
                var selectedPay=0;
                angular.forEach($scope.checkList,function(data){
                    if(data.checked){
                        data.selectedClass='collection-content-result-selected';
                        selectedPay+=data.planFee;
                        selectedNum++
                    }
                    else {
                        data.selectedClass=''
                    }
                });
                $scope.selectedNum=selectedNum;
                $scope.selectedPay=selectedPay
            };
            /**
             *刷卡凭证查询
             */
            $scope.checkQuery=function(){
                $$voucher.checkQuery($scope.infoToView.checkQuery,{
                    success: function (data) {
                        $scope.checkList=data.list;
                        if($scope.checkList.length<1){
                            layerMsg('暂无数据！')
                            return false
                        }
                        //$scope.pagination.totalItems=data.totalCount;

                        angular.forEach($scope.checkList,function(data){
                            $scope.queryNum++;
                            data.checked=false;
                            data.selectedClass=''
                        })
                    },
                    error: function (e) {
                    }
                },{
                    "pageIndex":$scope.pagination.pageIndex,
                    "pageSize":$scope.pagination.pageSize
                })
            };
            $scope.voucherSubmit=function(){
                $$voucher.voucherSubmit({
                    "accType": "AA01",
                    "centerCode": "11999000",
                    "payrefDate": "2017-04-28",
                    "userCode": "00000099",
                    "userName": "收付人员A"
                },{
                    success: function (data) {
                        console.log(data);
                        layerMsg('提交成功'+data.resultMsg,'success')
                    },
                    error: function (e) {
                    }
                });
            };
            init();

        }

    ])
});