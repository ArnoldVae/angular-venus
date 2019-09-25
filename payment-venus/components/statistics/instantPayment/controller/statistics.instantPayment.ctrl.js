/**
 * 查询统计-实时查询控制器
 */
define([
    'app',
    'config'
],function (app,config) {
    'use strict';
    app.registerController('InstantPaymentCtrl', ['$scope','$$instantPayment','$modal',
        function ($scope,$$instantPayment,$modal) {

            var init=function(){
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
                $scope.instant=$$instantPayment.InstantPayment();
                $scope.infoToView=$scope.instant.infoToView;
            };
            $scope.voucherQuery=function(){
                var _data={
                    "voucherNo":$scope.infoToView.voucherNo||'',
                    "comCode":$scope.headersel.comCode||'',
                    "certiNo":$scope.infoToView.certiNo||'',
                    "yearMonth":$scope.infoToView.yearMonth||'',
                    "payRefNo":$scope.infoToView.payRefNo||'',
                    "centerCode":$scope.infoToView.centerCode||'',
                    "financeVoucherNo":$scope.infoToView.financeVoucherNo||''

                };
                $$instantPayment.voucherQuery(_data,{
                        success: function (data) {
                            console.log(data)
                            $scope.infoToView.voucherList=data.list;
                            if($scope.infoToView.voucherList.length<1){
                                layerMsg('暂无数据！');
                                return false;
                            }
                        },
                        error: function (e) {
                        }
                    }
                )

            };

            init();

        }

    ])
});
