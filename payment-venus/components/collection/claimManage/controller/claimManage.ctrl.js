/**
 *收款管理-缴费登记控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var claimManage=function($scope,$modal,$$timeCollection){
        var init=function(){
            $scope.collection={
                "collectionCheckedAll":false
            };
            $scope.infoFlag=true;
        }
        /**
         *全选
         */
        $scope.checkedAllCollection=function(){
            $.each($scope.collectionList,function(index,obj){
                if($scope.collection.collectionCheckedAll){
                    obj.checked=true;
                }else obj.checked=false;
            });
        }
        /**
         * 查询事件
         */
        $scope.collectionSearch=function(){
            $scope.collectionList=[
                {
                    "demo1":"A0001001",
                    "demo2":"0001020102001003",
                    "demo3":"北京一部",
                    "demo4":"测试",
                    "demo5":"321.10",
                    "demo6":"CHY",
                    "demo7":"未缴付费",
                    "demo8":"2017-08-24",
                    "demo9":"是",
                    "demo10":"",
                    "checked":false
                },
                {
                    "demo1":"A0001002",
                    "demo2":"0001020102001067",
                    "demo3":"北京一部",
                    "demo4":"测试",
                    "demo5":"43234.50",
                    "demo6":"CHY",
                    "demo7":"已缴付费",
                    "demo8":"2017-08-24",
                    "demo9":"是",
                    "demo10":"",
                    "checked":false
                },
                {
                    "demo1":"A0001003",
                    "demo2":"0001020102001099",
                    "demo3":"北京一部",
                    "demo4":"测试",
                    "demo5":"678.50",
                    "demo6":"CHY",
                    "demo7":"已缴付费",
                    "demo8":"2017-08-24",
                    "demo9":"是",
                    "demo10":"",
                    "checked":false
                }
            ];
        }
        /**
         * 单选
         */
        $scope.checkedCollection=function(){
           $scope.collection.collectionCheckedAll=$scope.collectionList.every(function(item,index,array){
                return item.checked;
            })
        }

        //打印测试
        /**
         * 打印选择表单
         * @param target
         * @param proposalNo
         */
        var printer=undefined;
        var _printData = undefined;
        window.VENUS.feedbackData = function(){
            if(printer)
                printer.transmittingData(_printData);
        };
        $scope.printMessage=function(){
            _printData ={
                test:"打印测试了"
            };
            $scope.url = 'components/collection/claimManage/tpl/print/printTest.html';
            printer = window.open($scope.url);
            //window.print();
        }
        /**
         * 新增查询
         */
        $scope.addCollectSearch=function(){
            $scope.collectionSearchList=[
                {
                    "demo1":"A0001001",
                    "demo2":"0001020102001003",
                    "demo3":"北京一部",
                    "demo4":"测试",
                    "demo5":"321元",
                    "demo6":"CHY",
                    "demo7":"未缴付费",
                    "demo8":"2017-08-24",
                    "demo9":"是",
                    "demo10":"测试",
                    "demo11":"测试",
                    "checked":false
                },
                {
                    "demo1":"A0001002",
                    "demo2":"0001020102001067",
                    "demo3":"北京一部",
                    "demo4":"测试",
                    "demo5":"43234元",
                    "demo6":"CHY",
                    "demo7":"已缴付费",
                    "demo8":"2017-08-24",
                    "demo9":"是",
                    "demo10":"测试",
                    "demo11":"测试",
                    "checked":false
                },
                {
                    "demo1":"A0001003",
                    "demo2":"0001020102001099",
                    "demo3":"北京一部",
                    "demo4":"测试",
                    "demo5":"678元",
                    "demo6":"CHY",
                    "demo7":"已缴付费",
                    "demo8":"2017-08-24",
                    "demo9":"是",
                    "demo10":"测试",
                    "demo11":"测试",
                    "checked":false
                }
            ];
        }
        /**
         * 添加到收付费列表
         */
        $scope.addCollectList=function(){
            $modal.open({
                templateUrl: 'components/collection/claimManage/tpl/modal/addCollectLisr.tpl.html',
                resolve: {

                },
                controller: function ($scope, $modalInstance) {
                    $scope.collectionDataList=[
                        {
                            "demo1":"A0001001",
                            "demo2":"0001020102001003",
                            "demo3":"北京一部",
                            "demo4":"测试",
                            "demo5":"321元",
                            "demo6":"CHY",
                            "demo7":"未缴付费",
                            "demo8":"2017-08-24",
                            "demo9":"是",
                            "demo10":"测试",
                            "demo11":"测试",
                            "checked":false
                        },
                        {
                            "demo1":"A0001002",
                            "demo2":"0001020102001067",
                            "demo3":"北京一部",
                            "demo4":"测试",
                            "demo5":"43234元",
                            "demo6":"CHY",
                            "demo7":"已缴付费",
                            "demo8":"2017-08-24",
                            "demo9":"是",
                            "demo10":"测试",
                            "demo11":"测试",
                            "checked":false
                        },
                        {
                            "demo1":"A0001003",
                            "demo2":"0001020102001099",
                            "demo3":"北京一部",
                            "demo4":"测试",
                            "demo5":"678元",
                            "demo6":"CHY",
                            "demo7":"已缴付费",
                            "demo8":"2017-08-24",
                            "demo9":"是",
                            "demo10":"测试",
                            "demo11":"测试",
                            "checked":false
                        }
                    ];
                    $scope.ok=function(){
                        $modalInstance.close();
                    }
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    }

                }
            }).result.then(function (record) {
                confirmSubmit();

            });
        }
        /**
         *确认页面弹窗
         */
        var confirmSubmit=function(){
            $modal.open({
                templateUrl: 'components/collection/claimManage/tpl/modal/confirm.tpl.html',
                resolve: {

                },
                controller: function ($scope, $modalInstance) {
                    $scope.ok=function(){
                        $modalInstance.close();
                    }
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    }

                }
            }).result.then(function (record) {
                confirmNextSubmit()
            });
        }
        /**
         *next下一步弹窗
         */
        var confirmNextSubmit=function(){
            $modal.open({
                templateUrl: 'components/collection/claimManage/tpl/modal/confirmNext.tpl.html',
                resolve: {

                },
                controller: function ($scope, $modalInstance) {
                    $scope.ok=function(){
                        $modalInstance.close();
                    }
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    }

                }
            }).result.then(function (record) {

            });
        }
        init();
    };


    moduleApp.controller('claimManageCtrl',['$scope','$modal','$$claimManage',claimManage]);

});
