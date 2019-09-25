/**
 *收款管理-缴费登记控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var nonFeesCollection=function($scope,$modal,$$nonFeesCollection,mcMultiEditorCacheService){
        /**
         * 查询事件
         */
        $scope.collectionSearch=function(target){
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            if($scope.colRegCondition.earlierMonth!=""&&$scope.colRegCondition.laterMonth!=""&&$scope.colRegCondition.earlierMonth>$scope.colRegCondition.laterMonth){
                layerMsg("起始日期不能大于终止日期！");
                return false
            }
            if($scope.colRegCondition.earlierSumFee!=""&&$scope.colRegCondition.laterSumFee!=""&& Number($scope.colRegCondition.earlierSumFee)>Number($scope.colRegCondition.laterSumFee)){
                layerMsg("起始金额不能大于终止金额！");
                return false
            }
            $$nonFeesCollection.find('searchCollectionReg',{
                "transactionNo":$scope.colRegCondition.transactionNo,
                "certiNo":$scope.colRegCondition.certiNo,
                "earlierMonth":$scope.colRegCondition.earlierMonth,
                "laterMonth":$scope.colRegCondition.laterMonth,
                "earlierSumFee":$scope.colRegCondition.earlierSumFee,
                "laterSumFee":$scope.colRegCondition.laterSumFee,
                "tranoStatus":$scope.colRegCondition.tranoStatus,
                "currenCY":$scope.colRegCondition.currenCY,
                "appliName":$scope.colRegCondition.appliName,
                "printFlag":$scope.colRegCondition.printFlag,
                "globalUserCode":$scope.centerCode,
                "powerSystemCode":"payment",
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":"payment.collection.nonpayment"
            },{
                success:function (data) {
                    $scope.collectionList = data.content.content;
                    if(!target&&$scope.collectionList.length<1){
                        layerMsg('暂无数据！');
                    }
                    $scope.pagination.totalItems = data.content.totalCount;
                    saveData();//存储数据
                },
                error:function (d) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex-1,
                "pageSize": $scope.pagination.pageSize
            })
           
        };
        /**
         * 作废
         */
        $scope.deleteMessage = function (target){
            if(target.tranoStatus !=0&&target.tranoStatus !=2){
                layerMsg("此单号不允许作废")
            }else{
                layer.confirm('确定作废吗?', {
                    btn: ['确定','取消'] //按钮
                }, function() {
                    var index =layer.load(2,{
                        shade:[0.1,'#fff']
                    });
                    $$nonFeesCollection.deleteMessage(target,{
                        success:function (data) {
                            layer.close(index);
                            if(data.content.resultCode=='0000'){
                                layer.msg('作废成功！', {icon: 1});
                                $scope.collectionSearch();
                            }else{
                                layerMsg(data.content.resultMsg)
                            }
                        },
                        error:function () {

                        }
                    })
                });
            }
        };
        /**
         * 查看
         */
        $scope.lookMessage = function (target) {
            $modal.open({
                templateUrl: 'components/collection/nonFeesCollection/tpl/modal/lookInfo.modal.html',
                resolve: {
                    target:function () {
                        return target
                    },
                    usercode:function () {
                        return $scope.usercode
                    }
                },
                controller: function ($scope, $modalInstance,target,usercode) {
                    $scope.paymentNoticeCondition = target;
                    //关闭弹窗
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    };
                    //列表查询
                    $scope.searchpaymentNoticeList = function(){
                        target.globalUserCode = usercode;
                        $$nonFeesCollection.paymentNoticeListInfo(target,{
                            success:function (data) {
                                console.log(data)
                                $scope.paymentNoticeList = data.content.content[0].prpJunjfcdplanDtoList;
                                $scope.paymentNoticeCondition.totalItems = data.content.content[0].prpJunjfcdplanDtoList.length;
                            },
                            error:function () {

                            }
                        })
                    }
                    $scope.searchpaymentNoticeList();
                }
            }).result.then(function (record) {
            });
        };
        /**
         * 查看缴费详情
         */
        $scope.lookPayStatus = function (target) {
            $modal.open({
                templateUrl: 'components/collection/nonFeesCollection/tpl/modal/payStatus.modal.html',
                resolve: {
                    target:function () {
                        return target
                    },
                    usercode:function () {
                        return $scope.usercode
                    }
                },
                controller: function ($scope, $modalInstance,target,usercode) {
                    //关闭弹窗
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    };
                    //初始化查询
                    $$nonFeesCollection.searchPaymentInfo(target,{
                        success:function (data) {
                            console.log(data);
                            //交易信息
                            $scope.defrayCondition = data;
                            //认领银行流水
                            $scope.defrayCondition.prpJtrannsactionPayWayDto1 = data.prpJtrannsactionPayWayDto1;
                            //现金
                            $scope.defrayCondition.prpJtrannsactionPayWayDto2 = data.prpJtrannsactionPayWayDto2;
                            //收银台
                            $scope.defrayCondition.prpJtrannsactionPayWayDto3 = data.prpJtrannsactionPayWayDto3;
                            //无单预收
                            $scope.defrayCondition.prpJtrannsactionPayWayDto4 = data.prpJtrannsactionPayWayDto4;
                        },
                        error:function () {

                        }
                    });

                }
            }).result.then(function (record) {
            });
        };
        /**
         * 修改
         */
        $scope.changeMessage = function (target) {
            if(target.tranoStatus !=0){
                layerMsg("此单号不允许修改");
                return false
            }
            $modal.open({
                templateUrl: 'components/collection/nonFeesCollection/tpl/modal/reviseInfo.modal.html',
                resolve: {
                    target:function () {
                        return target
                    },
                    usercode:function () {
                        return $scope.usercode
                    }
                },
                controller: function ($scope, $modalInstance,target,usercode) {
                    $scope.pagination = {
                        totalItems: '',//总数
                        pageIndex: '1',//当前页面
                        pageSize: '15',//显示条数
                        maxSize: '5',//最大页数
                        numPages: '',//共有多少页
                        previousText: '上一页',
                        nextText: '下一页',
                        firstText: '首页',
                        lastText: '末页'
                    };
                    $scope.revisePaymentNoticeCondition = {};
                    $scope.revisePaymentNoticeCondition = target;
                    //关闭弹窗
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    }
                    //列表查询
                    $scope.searchpaymentNoticeList = function(){
                        target.globalUserCode = usercode;
                        $$nonFeesCollection.paymentNoticeListInfo(target,{
                            success:function (data) {
                                console.log(data)
                                $scope.revisePaymentNoticeList = data.content.content[0].prpJunjfcdplanDtoList;
                                $scope.selectAdd();
                            },
                            error:function () {
                            }
                        })
                    };
                    $scope.searchpaymentNoticeList();
                    //删除操作
                    $scope.deleteInfo = function (index) {
                        $scope.revisePaymentNoticeList.splice(index, 1);
                        $scope.selectAdd();
                    };
                    //新增操作
                    $scope.addInfo = function () {
                        $modal.open({
                            templateUrl: 'components/collection/nonFeesCollection/tpl/modal/reviseAdd.modal.html',
                            resolve: {
                                revisePaymentNoticeList :function () {
                                    return $scope.revisePaymentNoticeList
                                },
                                usercode:function () {
                                    return usercode
                                }
                            },
                            controller: function ($scope, $modalInstance,revisePaymentNoticeList,usercode,$rootScope){
                                $scope.newAddColRegCondition = {
                                    "currenCY1":revisePaymentNoticeList[0].currenCY1
                                };
                                $scope.pagination = {
                                    totalItems: '',//总数
                                    pageIndex: '1',//当前页面
                                    pageSize: '15',//显示条数
                                    maxSize: '5',//最大页数
                                    numPages: '',//共有多少页
                                    previousText: '上一页',
                                    nextText: '下一页',
                                    firstText: '首页',
                                    lastText: '末页',
                                };
                                $scope.collection={
                                    "collectionAddCheckedAll":false
                                };
                                //查询
                                $scope.addNewCollectSearch = function (target) {
                                    if(target!='page'){
                                        $scope.pagination.pageIndex=1;
                                    }
                                    $$nonFeesCollection.find('searchCollectionRegAdd',{
                                        "certiNo":$scope.newAddColRegCondition.certiNo,
                                        "agentName":$scope.newAddColRegCondition.agentName,
                                        "certiNoList":$scope.newAddColRegCondition.certiNoList,
                                        "riskCode":$scope.newAddColRegCondition.riskCode,
                                        "currenCY1":$scope.newAddColRegCondition.currenCY1,
                                        "makeCom":$scope.newAddColRegCondition.makeCom,
                                        "handler1Name":$scope.newAddColRegCondition.handler1Name,
                                        "appliName":$scope.newAddColRegCondition.appliName,
                                        "insuredName":$scope.newAddColRegCondition.insuredName,
                                        "inputDate":$scope.newAddColRegCondition.inputDate,
                                        "globalUserCode":usercode,
                                        "powerSystemCode":"payment",
                                        "webUserCode":usercode,
                                        "webComCode":$rootScope.comCode,
                                        "webCenterCode":$rootScope.user.centerCode,
                                        "webTaskCode":"payment.collection.nonpayment"
                                    },{
                                        success:function (data) {
                                            $scope.newCollectionSearchList = data.content.content;
                                            $scope.pagination.totalItems = data.content.totalCount;
                                            $scope.collection.collectionAddCheckedAll = false;//初始化全选框
                                        },
                                        error:function (d) {
                                        }
                                    },{
                                        "pageNo": $scope.pagination.pageIndex-1,
                                        "pageSize": $scope.pagination.pageSize
                                    })
                                };
                                //重置
                                $scope.addNewCollectionReset = function () {
                                    $scope.newAddColRegCondition = {};
                                };
                                //关闭弹窗
                                $scope.cancel=function(){
                                    $modalInstance.dismiss();
                                };
                                //全选
                                $scope.checkedAllCollection=function(allFlag,objList){
                                    $.each(objList,function(index,obj){
                                        if(allFlag){
                                            obj.checked=true;
                                        }else obj.checked=false;
                                    });
                                };
                                //单选
                                $scope.checkedAddCollection=function(){
                                    $scope.collection.collectionAddCheckedAll=$scope.newCollectionSearchList.every(function(item,index,array){
                                        return item.checked;
                                    })
                                };
                                //添加到缴付费列表
                                $scope.addList = function () {
                                    angular.forEach($scope.newCollectionSearchList,function (data,index,array) {
                                        if (data.checked){
                                                revisePaymentNoticeList.push(array[index]);
                                        }
                                    });
                                    $modalInstance.close();
                                };
                                //业务部门改变清空业务员
                                $scope.clearOperator=function () {
                                    $scope.newAddColRegCondition.handler1Name='';
                                    $scope.newAddColRegCondition.businessMan=''
                                };
                            }
                        }).result.then(function (record) {
                            $scope.selectAdd()
                        });
                    }
                    //保存
                    $scope.saveInfo = function () {
                        $scope.revisePaymentNoticeCondition.globalUserCode=usercode;
                        $scope.revisePaymentNoticeCondition.prpJunjfcdplanDtoList=$scope.revisePaymentNoticeList;
                        $$nonFeesCollection.savePayNot($scope.revisePaymentNoticeCondition,{
                            success:function (data) {
                                console.log(data)
                                if(data.content.resultCode=='0000'){
                                    layer.msg(data.content.resultMsg, {icon: 1});
                                    $modalInstance.close(data);
                                }else{
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error:function () {

                            }
                        })
                    }
                    //累加
                    $scope.selectAdd = function () {
                        var selectedPay =0.00;
                        angular.forEach($scope.revisePaymentNoticeList,function (data) {
                            selectedPay+=data.planFee
                        });
                        $scope.selectedPay = selectedPay;
                        $scope.selectNum = $scope.revisePaymentNoticeList.length;
                        $scope.pagination.totalItems = $scope.selectNum;
                    }
                }
            }).result.then(function (record) {
                if(record){
                    $scope.collectionSearch();
                }
            });
        };
        /**
         * 重置
         */
        $scope.collectionReset = function () {
            $scope.colRegCondition ={};
            saveData();
        };
        /**
         *全选
         */
        $scope.checkedAllCollection=function(allFlag,objList){
            $.each(objList,function(index,obj){
                if(allFlag){
                    obj.checked=true;
                }else obj.checked=false;
            });
        };
        /**
         * 单选
         */
        $scope.checkedAddCollection=function(){
            checkList($scope.collectionSearchList);
            $scope.collection.collectionAddCheckedAll=$scope.collectionSearchList.every(function(item,index,array){
                return item.checked;
            })
        };
        /**
         * 判断是否可以同时勾选
         */
        var checkValueOfList=function (objSt,_obj) {
            var result=false;
            if(_obj.currenCY1!=objSt.currenCY1){
                result=false
            }else{
                result=true
            }
            return result;
        };
        var getAllStatus=function (list) {
            var result=false;
            var _objSt=list[0];
            $.each(list,function (index,obj) {
                if(!checkValueOfList(_objSt,obj)){
                    result=true;
                    return false
                }else{
                    result=false;
                }
            });
            return result;
        };
        var checkList=function (list) {
            var objSt={};
            $.each(list,function (index,obj) {
                if(obj.checked){
                    objSt=obj;
                    return false;
                }
            });
            $.each(list,function (index,_obj) {
                if(objSt.checked){
                    if(!checkValueOfList(objSt,_obj)){
                        _obj.disabled=true
                    }else{
                        _obj.disabled=false
                    }
                }else {
                    _obj.disabled=false;
                }
            })
        };
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
        $scope.printMessage=function(target){
            if(target.tranoStatus=="3"){
                layerMsg("此单号不允许打印！");
                return false
            }
            target.globalUserCode = $scope.usercode;
            $$nonFeesCollection.paymentNoticeListPrint(target,{
                success:function (data) {
                    console.log(data);
                    _printData  = data.content.content[0];
                    _printData.usercode = $scope.usercode;
                    _printData.user = $scope.user;
                    $scope.url = 'components/collection/nonFeesCollection/tpl/print/printTest.html';
                    printer = window.open($scope.url);
                },
                error:function () {
                }
            });
            //window.print();
        };
        /**
         * 新增查询
         */
        $scope.addCollectSearch=function(target){
            if(target!='page'){
                $scope.paginationA.pageIndex=1;
            }
            $$nonFeesCollection.find('searchCollectionRegAdd',{
                "certiNo":$scope.newColRegCondition.certiNo,
                "agentName":$scope.newColRegCondition.agentName,
                "certiNoList":$scope.newColRegCondition.certiNoList,
                "riskCode":$scope.newColRegCondition.riskCode,
                "currenCY1":$scope.newColRegCondition.currenCY1,
                "makeCom":$scope.newColRegCondition.makeCom,
                "handler1Name":$scope.newColRegCondition.handler1Name,
                "appliName":$scope.newColRegCondition.appliName,
                "insuredName":$scope.newColRegCondition.insuredName,
                "inputDate":$scope.newColRegCondition.inputDate,
                "globalUserCode":$scope.usercode,
                "powerSystemCode":"payment",
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":"payment.collection.nonpayment"
            },{
                success:function (data) {
                    $scope.collectionSearchList = data.content.content;
                    if(!target&&$scope.collectionSearchList.length<1){
                        layerMsg('暂无数据！');
                    }
                    $scope.paginationA.totalItems = data.content.totalCount;
                    $scope.collection.collectionAddCheckedAll=false;
                    $scope.collection.disabledAll=getAllStatus($scope.collectionSearchList);
                    saveData();//存储数据
                },
                error:function (d) {
                }
            },{
                "pageNo": $scope.paginationA.pageIndex-1,
                "pageSize": $scope.paginationA.pageSize
            })
        }
        /**
         * 新增重置
         */
        $scope.addCollectionReset = function () {
            $scope.newColRegCondition = {};
            saveData();
        };
        /**
         * 添加到收付费列表
         */
        $scope.addCollectList=function(){
            angular.forEach($scope.collectionSearchList,function (data,index,array) {
                if(data.checked){
                    $scope.collectionDataList.push(array[index])
                }
            });
            if($scope.collectionDataList.length == 0){
                layerMsg("请勾选一条记录！");
                return false
            }
            $modal.open({
                templateUrl: 'components/collection/nonFeesCollection/tpl/modal/addCollectLisr.tpl.html',
                resolve: {
                    collectionDataList:function () {
                        return $scope.collectionDataList
                    },
                    usercode:function () {
                        return $scope.usercode
                    }
                },
                controller: function ($scope, $modalInstance,collectionDataList,usercode) {
                    $scope.newCollectionDataList=collectionDataList;
                    //删除
                    $scope.deleteList = function ($index) {
                        $scope.newCollectionDataList.splice($index,1);
                        $scope.selectAdd()
                    };
                    //累加
                    $scope.selectAdd = function () {
                        var selectedPay =0.00;
                        angular.forEach($scope.newCollectionDataList,function (data) {
                            selectedPay+=data.planFee
                        });
                        $scope.selectedPay = selectedPay
                    };
                    $scope.selectAdd();
                    //保存
                    $scope.saveCollectionDataList = function () {
                        $scope.saveCollectionData={
                            "globalUserCode":usercode,
                            "transactionNo":null,
                            "prpJunjfcdplanDtoList":[]
                        };
                       $scope.saveCollectionData.prpJunjfcdplanDtoList = $scope.newCollectionDataList;
                        $$nonFeesCollection.saveCollectionDto($scope.saveCollectionData,{
                            success:function (data) {
                                console.log(data)
                                if(data.content.resultCode=='0000'){
                                    $modalInstance.close(data.content.content[0]);
                                }else{
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error:function () {

                            }
                        })
                    };
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    }
                }
            }).result.then(function (record) {
                $scope.collectionDataList=[];
                $scope.collection={
                    "collectionCheckedAll":false
                };
                $scope.addCollectSearch(true);
                if(record){
                    $scope.confirmCondition = record;
                    confirmSubmit();//弹出确认页面
                }
            },function () {
                $scope.collectionDataList=[];
                $scope.collection={
                    "collectionCheckedAll":false
                };
                $scope.addCollectSearch(true);
            })
        };
        /**
         *确认页面弹窗
         */
        var confirmSubmit=function(){
            $modal.open({
                templateUrl: 'components/collection/nonFeesCollection/tpl/modal/confirm.tpl.html',
                resolve: {
                    confirmCondition:function () {
                        return $scope.confirmCondition
                    }
                },
                controller: function ($scope, $modalInstance,confirmCondition) {
                    $scope.confirmPageCondition = confirmCondition;
                    $scope.cancel=function(){
                        $modalInstance.dismiss();
                    };
                    $scope.addSearch = function () {
                        $modalInstance.close($scope.confirmPageCondition);
                    }
                }
            }).result.then(function (record) {
                if(record){
                    $scope.addCollectSearch(true);
                }
            });
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.newColRegCondition.handler1Name='';
            $scope.newColRegCondition.businessMan=''
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('nonFeesCollection');//获取上次数据
            if(localDada){
                $scope.pagination = localDada.pagination;
                $scope.paginationA = localDada.paginationA;
                $scope.infoFlag = localDada.infoFlag;
                $scope.moreFlag = localDada.moreFlag;
                $scope.moreFlagNew = localDada.moreFlagNew;
                $scope.collection = localDada.collection;
                $scope.colRegCondition = localDada.colRegCondition;
                $scope.newColRegCondition = localDada.newColRegCondition;
                $scope.collectionDataList = localDada.collectionDataList;
                $scope.collectionList = localDada.collectionList;
                $scope.collectionSearchList = localDada.collectionSearchList;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            $scope.nonFeesCollection = {};
            $scope.nonFeesCollection.pagination = $scope.pagination;
            $scope.nonFeesCollection.paginationA = $scope.paginationA;
            $scope.nonFeesCollection.infoFlag = $scope.infoFlag;
            $scope.nonFeesCollection.moreFlag = $scope.moreFlag;
            $scope.nonFeesCollection.moreFlagNew = $scope.moreFlagNew;
            $scope.nonFeesCollection.collection = $scope.collection;
            $scope.nonFeesCollection.colRegCondition = $scope.colRegCondition;
            $scope.nonFeesCollection.newColRegCondition = $scope.newColRegCondition;
            $scope.nonFeesCollection.collectionDataList = $scope.collectionDataList;
            $scope.nonFeesCollection.collectionList = $scope.collectionList;
            $scope.nonFeesCollection.collectionSearchList = $scope.collectionSearchList;
            mcMultiEditorCacheService.localData('nonFeesCollection',$scope.nonFeesCollection);//存储数据
        };
        /**
         * 切换页面
         */
        $scope.changeTap = function () {
            $scope.infoFlag = !$scope.infoFlag;
            saveData();
        };
        /**
         * 主页面高级普通查询切换
         */
        $scope.changeMoreFlag = function () {
            $scope.moreFlag = !$scope.moreFlag;
            saveData();
        };
        /**
         * 新增页面高级普通查询切换
         */
        $scope.changeMoreFlagNew = function () {
            $scope.moreFlagNew = !$scope.moreFlagNew;
            saveData();
        };
        /**
         * 初始化函数
         */
        var init=function(){
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            $scope.paginationA = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            $scope.collection={
                "collectionAddCheckedAll":false,
                "disabledAll":false
            };
            $scope.infoFlag=true;//新增页面切换标志
            $scope.colRegCondition ={};//缴费页面对象
            $scope.newColRegCondition = {};//新增页面对象
            $scope.collectionDataList =[];//勾选数据存储
            $scope.confirmCondition = {};//存储生成的缴费通知单信息
            getLastData();//获取上次数据
            saveData();
        };
        init();
    };


    moduleApp.controller('NonFeesCollectionCtrl',['$scope','$modal','$$nonFeesCollection','mcMultiEditorCacheService',nonFeesCollection]);

});
