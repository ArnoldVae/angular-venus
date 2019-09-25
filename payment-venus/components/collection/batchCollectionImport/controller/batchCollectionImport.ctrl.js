/**
 *批量收款-批量收款导入
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var batchCollectionImport=function($scope,$$batchCollectionImport,FileUploader,$modal,$$venus,mcMultiEditorCacheService){
        /**
         * 初始化函数
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '3',//最大页数
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
                $scope.infoToView=$$batchCollectionImport.Account().infoToView;
            }
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('batchCollectionImport',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('batchCollectionImport');
        };

     //上传
        $scope.uploadStatus = false; //定义两个上传后返回的状态，成功获失败
        var uploader = $scope.uploader = new FileUploader({
            url: '/comm-fileserver/uploadFile',
            formData:[{userCode:$scope.usercode,systemId:'gscore-pa-web',bussType:'payment'}],
            queueLimit: 1, //文件个数
            removeAfterUpload: true //上传后删除文件
        });
        $scope.clearItems = function(){ //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        }
        uploader.onAfterAddingFile = function(fileItem) {
            $scope.fileItem = fileItem.file; //添加文件之后，把文件信息赋给scope
            $scope.name=fileItem.file.name;
            //if($scope.fileItem.type !== 'text/plain'){
            //    layerMsg('上传文件必须为.txt类型文件！！')
            //}
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.uploadStatus = true; //上传成功则把状态改为true
            $scope.importCondition.impFileNum = response.resultObj.fileId;
            $scope.importCondition.impFileName = $scope.name;
            $scope.fileName ='';
            $scope.resultMsg = '';
            $scope.importCondition.webUserCode = $scope.usercode;
            $scope.importCondition.webComCode = $scope.comCode;
            $scope.importCond = function(){
                //if(target!='page'){
                //    $scope.pagination.pageIndex=1;
                //}
                $$batchCollectionImport.importCondition($scope.importCondition,{
                    success: function (data) {
                        $scope.infoToView.confirmList=data.transactionNoAuto;
                        $scope.fileName = data.impFileNum;
                        $scope.resultMsg = data.resultMsg;
                        if(data.resultCode == '0000'){
                            layer.msg(data.resultMsg,{icon:1});
                            $scope.importCondition = {};
                            saveData();
                            return false;
                        }else{
                            layer.msg(data.resultMsg,{icon:1})
                            return false;
                        }
                    },
                    error: function (e) {

                    }
                }
                //    ,{
                //    "pageNo": $scope.pagination.pageIndex,
                //    "pageSize": $scope.pagination.pageSize
                //}
                )
            }
            $scope.importCond();

        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            $scope.uploadStatus = false;//上传失败则把状态改为false
            alert('上传失败！');
            $scope.fileName ='';
        };
        /**
         *查询
         */
        $scope.UploadFile = function (target) {
            //先验证焦点定位
            $$venus.Focus(
                "premiumForm"
            ).then(
                function (Ele) {
                    if (angular.isDefined(Ele)) {
                        $timeout(function () {
                            Ele.focus();
                        },1000)
                    } else {
                        if($scope.importCondition.appliName == undefined||$scope.importCondition.appliName == ''){
                            layer.msg("请录入投保人");
                        }else if($scope.importCondition.currenCY == undefined||$scope.importCondition.currenCY == ''){
                            layer.msg("请选择币种");
                        }else if($scope.importCondition.impNum == undefined||$scope.importCondition.impNum == ''){
                            layer.msg("请录入导入笔数");
                        }else if($scope.importCondition.impAmount == undefined||$scope.importCondition.impAmount == ''){
                            layer.msg("请录入导入金额");
                        }else if($scope.importCondition.remark == undefined||$scope.importCondition.remark == ''){
                            layer.msg("请填写备注");
                        }else{
                            uploader.uploadAll();
                            if($scope.fileItem== undefined){
                                layerMsg('请选择上传文件')
                            }
                        }
                        if(target!='page'){
                            $scope.pagination.pageIndex=1;
                        }
                    }
                }
            );
        };
        /**
         *重 置
         */
            $scope.resetImport = function () {
                $scope.importCondition = {};
                $scope.fileItem = '';
            };

        //成功清单弹窗
        $scope.showSuceesetModal = function(listId){
                $modal.open({
                    templateUrl: 'components/collection/batchCollectionImport/tpl/modal/successList.modal.html',
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
                        $scope.transactionNo = listId
                        $scope.impFileNum = fileName;
                        $scope.successListNoticeList = function(target){
                            if(target!='page'){
                                $scope.pagination.pageIndex=1;
                            }
                            $$batchCollectionImport.showImptMassage($scope,{
                                success:function (data) {
                                    $scope.paymentList = data.successList.content;
                                    $scope.sumFree = data.sumFree;
                                    if($scope.paymentList.length<1){
                                        $scope.cancel();
                                        layerMsg('暂无数据！')
                                        return false
                                    }
                                    $scope.pagination.totalItems2=data.failList.totalCount;
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
                    templateUrl: 'components/collection/batchCollectionImport/tpl/modal/fileList.modal.html',
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
                                $scope.pagination.pageIndex=1;
                            }
                            $$batchCollectionImport.showImptMassage($scope,{
                                success:function (data) {
                                    $scope.paymentList = data.failList.content;
                                    if($scope.paymentList.length<1){
                                        $scope.cancel();
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
        //模版下载
        $scope.voucherDetailed = function () {
            $scope.fileId = 'd36b38fc872f4ed0bd52195726d77c75';
            window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
        }

        init();

    };

    moduleApp.controller('BatchCollectionImportCtrl',['$scope','$$batchCollectionImport','FileUploader','$modal','$$venus','mcMultiEditorCacheService',batchCollectionImport]);

});
