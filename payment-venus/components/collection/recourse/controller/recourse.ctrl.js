/**
 * 追偿款处理
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var recourseCtrl=function($scope,$$recourse,$modal){
        console.log('追偿款处理控制器...');
        /**
         * 查询
         */
        $scope.searchList = function () {
            $$recourse.searchRecourseList($scope.recourseCondition,{
                success: function (data) {
                    console.log(data);
                    $scope.recourseList = data;
                    $scope.allChecked = false;
                    $scope.pagination.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex,
                "pageSize": $scope.pagination.pageSize
            });
        };
        /**
         * 重置
         */
        $scope.resetForm = function () {
            $scope.recourseCondition = {};
        };
        /**
         * 全选
         */
        $scope.checkedAll = function () {
            angular.forEach($scope.recourseList,function (data) {
                if ($scope.allChecked){
                    data.checked = true
                }else {
                    data.checked = false
                }
            })
        };
        /**
         * 单选
         */
        $scope.checkedOne = function () {
            $scope.allChecked = $scope.recourseList.every(function (data) {
                return data.checked;
            })
        };

        /**
         * 勾选改变状态
         */
        $scope.selectNum = 0;
        $scope.changeSelectNumClass = function () {
            var selectNum = 0;
            angular.forEach($scope.recourseList,function (data) {
                if (data.checked){
                    data.changeClass = 'venus_table_check';
                    selectNum++
                }
                else{
                    data.changeClass =''
                }
            });
            $scope.selectNum = selectNum;
        };

        /**
         * 确认
         */
        $scope.confirmRecourse=function () {
            $scope.confirmList = {"list":[]};
            angular.forEach($scope.recourseList,function (data,index,array) {
                if(data.checked){
                    $scope.confirmList.list.push(array[index])
                }
            });
            if ($scope.confirmList.list.length == 0){
                layerMsg("请勾选一条记录！")
            }else {
                $$recourse.confirmRecourse($scope.confirmList,{
                    success: function (data) {
                        console.log(data);
                        if(data.message == "成功"){
                            layer.msg("确认成功",{icon:1});
                        }
                    },
                    error: function (e) {
                        layer.msg("确认失败",{icon:2});
                    }
                });
            }
        };

        /**
         * 详细信息
         */
        $scope.moreFormData = function (target) {
            $modal.open({
                templateUrl:"components/payment/recourse/tpl/modal/recourse.modal.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $scope.moreFormInfo = target;
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        };
        /**
         * 初始化函数
         */
        var init = function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '0',//当前页面
                pageSize: '10',//显示条数
                maxSize: '8',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            $scope.recourseCondition ={};
        };
        init();


    };
    moduleApp.controller('recourseCtrl',['$scope','$$recourse','$modal',recourseCtrl]);
});