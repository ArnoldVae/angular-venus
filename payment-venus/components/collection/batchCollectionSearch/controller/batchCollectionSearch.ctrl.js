/**
 *批量收款-批量收款查询
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var batchCollectionSearch=function($scope,$$batchCollectionSearch,$modal,$$venus,$timeout,mcMultiEditorCacheService){
        /**
         * 初始化函数
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '0',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            //实例化对象
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$batchCollectionSearch.Account().infoToView;
            }
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('batchCollectionSearch',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('batchCollectionSearch');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }

        /**
         *查询
         */
        $scope.searchOutputBlueInvoices = function (target) {
            //先验证焦点定位
            $$venus.Focus(
                "premiumForm"
            ).then(
                function (Ele) {
                    if (angular.isDefined(Ele)) {
                        $timeout(function () {
                            Ele.focus();
                        },1000)
                    } else if($scope.infoToView.collectionSearchs.impDealRst == undefined||$scope.infoToView.collectionSearchs.impDealRst == ''){
                        layer.msg("请录入处理结果");
                    }else {
                        $scope.importCond = function(target){
                            if(target!='page'){
                                $scope.pagination.pageIndex='0';
                            }
                            $scope.infoToView.collectionSearchs.webUserCode = $scope.usercode;
                            $scope.infoToView.collectionSearchs.webComCode = $scope.comCode;
                            $$batchCollectionSearch.collectionSearchs($scope.infoToView.collectionSearchs,{
                                success: function (data) {
                                    $scope.infoToView.confirmList=data.pageInfo.content;
                                    $scope.fileName = data.impFileNum;
                                    saveData();
                                    if($scope.infoToView.confirmList.length<1){
                                        layerMsg('暂无数据！')
                                        return false
                                    }
                                    $scope.pagination.totalItems=data.pageInfo.totalCount;
                                },
                                error: function (e) {
                                }
                            },{
                                "pageNo": $scope.pagination.pageIndex,
                                "pageSize": $scope.pagination.pageSize
                            })
                        }
                        $scope.importCond();
                    }
                }
            );
        };
        /**
         *重置
         */
            $scope.resetAdviceOfSettlement = function () {
                $scope.infoToView.collectionSearchs = '';
            };
        //成功清单弹窗
        $scope.showSuceesetModal = function(listId){
            $modal.open({
                templateUrl: 'components/collection/batchCollectionSearch/tpl/modal/successList.modal.html',
                resolve: {
                    pagination:function () {
                        return $scope.pagination
                    },
                    fileName:function(){
                        return $scope.fileName
                    }
                },
                controller: function ($scope, $modalInstance,pagination,fileName) {
                    //清单查看
                    $scope.pagination = pagination;
                    $scope.sign = 'success';
                    $scope.transactionNo = listId;
                    $scope.impFileNum = fileName;
                    $scope.successListNoticeList = function(target){
                        if(target!='page'){
                            $scope.pagination.pageIndex='0';
                        }
                        $$batchCollectionSearch.showImptMassage($scope,{
                            success:function (data) {
                                $scope.paymentList = data.successList.content;
                                if($scope.paymentList.length<1){
                                    layerMsg('暂无数据！')
                                    return false
                                }
                                $scope.pagination.totalItems2=data.successList.totalCount;
                            },
                            error:function () {

                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        })
                    }
                    $scope.successListNoticeList();
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };

                }
            })
        };

        //失败清单弹窗
        $scope.showFileModal = function(listId){
            $modal.open({
                templateUrl: 'components/collection/batchCollectionSearch/tpl/modal/fileList.modal.html',
                resolve: {
                    pagination:function () {
                        return $scope.pagination
                    },
                    fileName:function(){
                        return $scope.fileName
                    }
                },
                controller: function ($scope, $modalInstance,pagination,fileName) {
                    //清单查看
                    $scope.pagination = pagination;
                    $scope.sign = 'fail';
                    $scope.transactionNo = listId;
                    $scope.impFileNum = fileName;
                    $scope.flieListNoticeList = function(target){
                        if(target!='page'){
                            $scope.pagination.pageIndex='0';
                        }
                        $$batchCollectionSearch.showImptMassage($scope,{
                            success:function (data) {
                                $scope.paymentList = data.failList.content;
                                if($scope.paymentList.length<1){
                                    layerMsg('暂无数据！')
                                    return false
                                }
                                $scope.pagination.totalItems3=data.failList.totalCount;
                            },
                            error:function () {

                            }
                        },{
                            "pageNo": $scope.pagination.pageIndex,
                            "pageSize": $scope.pagination.pageSize
                        })
                    }
                    $scope.flieListNoticeList();
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };

                }
            })
        };
        /**
         * 删除
         */
        $scope.deleteMessage = function (target,index){
                $$batchCollectionSearch.deleteMessage(target,{
                    success:function (data) {
                        console.log(data)
                        if(data.message == "成功"){
                            $scope.pagination.totalItems = $scope.pagination.totalItems-1;
                            $scope.infoToView.confirmList.splice(index, 1);
                            layer.msg('删除成功！', {icon: 1});
                        }
                    },
                    error:function () {

                    }
                })
        };
        init();
    };

    moduleApp.controller('BatchCollectionSearchCtrl',['$scope','$$batchCollectionSearch','$modal','$$venus','$timeout','mcMultiEditorCacheService',batchCollectionSearch]);

});
