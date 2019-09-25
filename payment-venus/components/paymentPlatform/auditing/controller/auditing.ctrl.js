/**
 * 送支付平台审核控制器
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var AuditingCtrl=function($scope,$$auditing,mcMultiEditorCacheService,$modal){
        /**
         * tap切换
         */
        $scope.changeTap = function (index) {
            $scope.auditing.tapFlag = index;
        };
        /**
         * 待审批记录查询--查询
         */
        $scope.searchAuditing = function(target){
            if(target!='page'){
                $scope.auditing.pagination.pageIndex=1;
            }
            // if($scope.auditing.paymentPlatformAudit.annulus==null){
            //     layerMsg("管控环节不能为空！");
            //     return false
            // }
            if($scope.auditing.paymentPlatformAudit.businessType==""){
                layerMsg("业务类型不能为空！");
                return false
            }
            if($scope.auditing.paymentPlatformAudit.approveStatus==""){
                layerMsg("待审批状态不能为空！");
                return false
            }
            // if($scope.auditing.paymentPlatformAudit.earlierMonth==null||$scope.auditing.paymentPlatformAudit.laterMonth==null){
            //     layerMsg("提交时间不能为空！");
            //     return false
            // }
            if($scope.auditing.paymentPlatformAudit.earlierMonth!=""&&$scope.auditing.paymentPlatformAudit.laterMonth!=""&&$scope.auditing.paymentPlatformAudit.earlierMonth>$scope.auditing.paymentPlatformAudit.laterMonth){
                layerMsg("起始日期不能大于终止日期！");
                return false
            }
            $$auditing.find('searchAuditing',{
                'annulus':$scope.auditing.paymentPlatformAudit.annulus,
                'visaSerialNo':$scope.auditing.paymentPlatformAudit.visaSerialNo,
                'businessDepartment':$scope.auditing.paymentPlatformAudit.businessDepartment,
                'businessMember':$scope.auditing.paymentPlatformAudit.businessMember,
                'earlierMonth':$scope.auditing.paymentPlatformAudit.earlierMonth,
                'laterMonth':$scope.auditing.paymentPlatformAudit.laterMonth,
                'businessType':$scope.auditing.paymentPlatformAudit.businessType,
                'approveStatus':$scope.auditing.paymentPlatformAudit.approveStatus,
                'taskName':"0",
                "globalUserCode":$scope.usercode,
                "powerSystemCode":$scope.comCode,
                "taskCode":"payment.unionpay.auditpayment"
            },{
                success: function (data) {
                    console.log(data);
                    $scope.auditing.auditingList = data.content.content;
                    if(!target&&$scope.auditing.auditingList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.auditing.pagination.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.auditing.pagination.pageIndex-1,
                "pageSize": $scope.auditing.pagination.pageSize
            })
        };
        /**
         * 待审批记录查询--重置
         */
        $scope.resetAuditing = function () {
            $scope.auditing.paymentPlatformAudit = {
                "businessType":"1",
                "approveStatus":"3"
            }
        };
        /**
         * 待审批记录查询--审批
         */
        $scope.lookAuditDto = function (target) {
            if(target.approveStatus=="z"){
                layerMsg("该支付批次号"+ target.visaSerialNo + "存在待修改数据,请修改数据在操作！");
                return false
            }
            $modal.open({
                templateUrl:'components/paymentPlatform/auditing/tpl/modal/auditingInfo.html',
                resolve:{
                    target:function () {
                        return target
                    }},
                controller:function ($scope,$modalInstance,target) {
                    $scope.target = target;
                    $scope.auditingCondition = {};
                    $scope.auditingCondition = $scope.target;
                    // if($scope.auditingCondition.annulus == 0){
                        $scope.approvalFirst = false;
                        $scope.conclusion = "审批结论：";
                        $scope.opinion = "审批意见：";
                        $scope.approvalFirst2 = true;
                    // };
                    // if($scope.auditingCondition.annulus == 1){
                    //     $scope.approvalFirst = true;
                    //     $scope.conclusion = "二级审批结论：";
                    //     $scope.opinion = "二级审批意见：";
                    //     $scope.approvalFirst2 = false;
                    // };
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //锁定
                    $scope.isLocking =true;
                    $scope.locked = false;
                    $scope.isRelease = false;
                    $scope.released = true;
                    $scope.lockingAuditing = function () {
                        // if($scope.auditingCondition.approveConclusion==null||$scope.auditingCondition.approveSuggestion==null||$scope.auditingCondition.approveSuggestion==""){
                        //     layerMsg("审批结论与审批意见不能为空！");
                        //     return false
                        // };
                        if($scope.auditingCondition.reserve1==null||$scope.auditingCondition.reserve2==null||$scope.auditingCondition.reserve2==""){
                            layerMsg("审批结论与审批意见不能为空！");
                            return false
                        }
                        $scope.auditingCondition.reserve3 = "0";
                        $$auditing.lockingAudit($scope.auditingCondition,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode == "0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $scope.isLocking =false;
                                    $scope.locked = true;
                                    $scope.isRelease = true;
                                    $scope.released = false;
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                    //释放
                    $scope.releaseAuditing = function () {
                        $scope.auditingCondition.reserve3 = "1";
                        $$auditing.lockingAudit($scope.auditingCondition,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode == "0000"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $scope.isLocking =true;
                                    $scope.locked = false;
                                    $scope.isRelease = false;
                                    $scope.released = true;
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    };
                    //审批
                    $scope.confirmAuditing = function () {
                        $$auditing.confirmAudit($scope.auditingCondition,{
                            success: function (data) {
                                console.log(data);
                                if(data.content.resultCode == "success"){
                                    layer.msg(data.content.resultMsg,{icon:1});
                                    $modalInstance.close(data.content.resultCode);
                                }else{
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        })
                    }
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchAuditing(true);
                }
            })
        };
        /**
         * 待审批记录查询--详细信息
         */
        $scope.lookMoreAuditDto = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/auditing/tpl/modal/auditingMoreInfo.html',
                resolve:{
                    target:function () {
                        return target
                    }},
                controller:function ($scope,$modalInstance,target) {
                    $scope.target = target;
                    $scope.auditingConditionDto = {};
                    $scope.auditingConditionDto = $scope.target;
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        };
        /**
         * 待审批记录查询--查看流图
         */
        $scope.lookPhoto = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/auditing/tpl/modal/imageShow.html',
                resolve:{
                    target:function () {
                        return target
                    }},
                controller:function($scope,$modalInstance,target){
                    if(target.approveStatus == "3"){
                        $scope.imageType = "images/1.png";
                    };
                    if(target.approveStatus == "0"){
                        if(target.approveConclusion == "0"){
                            $scope.imageType = "images/2.png";
                        }else if(target.approveConclusion == "1"){
                            $scope.imageType = "images/not.png";
                        }
                    };
                    if(target.approveStatus == "1"||target.approveStatus == "2"){
                        $scope.imageType = "images/end.png";
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        };
        /**
         * 已审批记录查询--查询
         */
        $scope.searchApproved = function (target) {
            if(target!='page'){
                $scope.auditing.paginationA.pageIndex=1;
            }
            // if($scope.auditing.approvedCondition.annulus==null){
            //     layerMsg("审批状态不能为空！");
            //     return false
            // }
            if($scope.auditing.approvedCondition.businessType==null){
                layerMsg("业务类型不能为空！");
                return false
            }
            // if($scope.auditing.approvedCondition.earlierMonth==null||$scope.auditing.approvedCondition.laterMonth==null){
            //     layerMsg("提交时间不能为空！");
            //     return false
            // }
            if($scope.auditing.approvedCondition.earlierMonth!=""&&$scope.auditing.approvedCondition.laterMonth!=""&&$scope.auditing.approvedCondition.earlierMonth>$scope.auditing.approvedCondition.laterMonth){
                layerMsg("起始日期不能大于终止日期！");
                return false
            }
            $$auditing.find('searchApproved',{
                'annulus':$scope.auditing.approvedCondition.annulus,
                'visaSerialNo':$scope.auditing.approvedCondition.visaSerialNo,
                'businessDepartment':$scope.auditing.approvedCondition.businessDepartment,
                'businessMember':$scope.auditing.approvedCondition.businessMember,
                'earlierMonth':$scope.auditing.approvedCondition.earlierMonth,
                'laterMonth':$scope.auditing.approvedCondition.laterMonth,
                'approveStatus':$scope.auditing.approvedCondition.approveStatus,
                'businessType':$scope.auditing.approvedCondition.businessType,
                'taskName':"0",
                "globalUserCode":$scope.usercode,
                "powerSystemCode":$scope.comCode,
                "taskCode":"payment.unionpay.auditpayment"
            },{
                success: function (data) {
                    console.log(data);
                    $scope.auditing.approvedList = data.content.content;
                    if($scope.auditing.approvedList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.auditing.paginationA.totalItems = data.content.totalCount;
                    //是否显示按钮
                    // angular.forEach($scope.auditing.approvedList,function (data) {
                    //     if(data.reserve1=="0"){
                    //         data.simulationShow = true;
                    //     }
                    // });
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.auditing.paginationA.pageIndex-1,
                "pageSize": $scope.auditing.paginationA.pageSize
            })
        };
        /**
         * 已审批记录查询--重置
         */
        $scope.resetApproved = function () {
            $scope.auditing.approvedCondition = {};
        };
        /**
         * 已审批记录查询--详细信息
         */
        $scope.lookMoreApprovedDto = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/auditing/tpl/modal/auditingMoreInfo.html',
                resolve:{
                    target:function () {
                        return target
                    }},
                controller:function ($scope,$modalInstance,target) {
                    $scope.target = target;
                    $scope.auditingConditionDto = {};
                    $scope.auditingConditionDto = $scope.target;
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        };
        /**
         *全选
         */
        $scope.checkedAll=function(){
            $.each($scope.auditing.approvedList,function(index,obj){
                if($scope.auditing.status.checkedAll){
                    obj.checked=true;
                }else obj.checked=false;
            });
        };
        /**
         * 单选
         */
        $scope.checkedOne =function(){
            $scope.auditing.status.checkedAll=$scope.auditing.approvedList.every(function(item,index,array){
                return item.checked;
            })
        };
        /**
         * 已审批记录查询--推送
         */
        $scope.submitApprovedDto = function () {
            $scope.submitCondition = {
                "globalUserCode":$scope.usercode,
                "synchronizationPlatformList":[]
            };
            var sign = false;
            angular.forEach($scope.auditing.approvedList,function (data) {
                if (data.checked){
                    if(data.reserve1 == 0 && data.approveStatus == 1){
                        $scope.submitCondition.synchronizationPlatformList.push(data)
                    }else {
                        sign = true
                    }
                }
            });
            if(sign){
                layerMsg("只能推送同意二级审核的数据！");
                return false
            }
            if($scope.submitCondition.synchronizationPlatformList.length==0){
                layerMsg("请勾选！");
                return false
            }
            $$auditing.submitApproved($scope.submitCondition,{
                success: function (data) {
                    console.log(data);
                    if(data.content.resultCode == "0000"){
                        layer.msg("推送成功",{icon:1})
                        $scope.searchApproved();
                    }else {
                        layerMsg(data.content.resultMsg)
                    }
                },
                error: function (e) {
                }
            })
        };
        /**
         * 已审批记录查询--模拟支付成功
         */
        $scope.simulationSuccess = function (target) {
            if(target.sendPayFlag != "z"){
                layerMsg("已支付，请勿重复提交！");
                return false
            }
            target.globalUserCode=$scope.usercode;
            target.powerSystemCode=$scope.comCode;
            $$auditing.simulationSuccess(target,{
                success: function (data) {
                    console.log(data);
                    if(data.content.resultCode == "0000"){
                        layerMsg(data.content.resultMsg,'success');
                        $scope.searchApproved();
                    }else {
                        layerMsg(data.content.resultMsg)
                    }
                },
                error: function (e) {
                }
            })
        };
        /**
         * 已审批记录查询--模拟退票
         */
        $scope.simulationFail = function (target) {
            if(target.sendPayFlag != "9"){
                layerMsg("请先进行支付操作！");
                return false
            }
            target.globalUserCode=$scope.usercode;
            target.powerSystemCode=$scope.comCode;
            $$auditing.simulationFail(target,{
                success: function (data) {
                    console.log(data);
                    if(data.content.resultCode == "0000"){
                        layerMsg(data.content.resultMsg,'success');
                        $scope.searchApproved();
                    }else {
                        layerMsg(data.content.resultMsg)
                    }
                },
                error: function (e) {
                }
            })
        };
        /**
         * 支付单号详情查看
         */
        $scope.lookVisaSerialNo = function (target) {
            $modal.open({
                templateUrl:'components/paymentPlatform/auditing/tpl/modal/lookVisaSerialNo.modal.html',
                resolve:{
                    target:function () {
                        return target
                    }},
                controller:function ($scope,$modalInstance,target) {
                    target.visaserialNo = target.visaSerialNo;
                    $$auditing.lookVisaSerialNo(target,{
                        success: function (data) {
                            console.log(data);
                           $scope.visaSerialNoDto = data.content;
                        },
                        error: function (e) {
                        }
                    });
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('auditing');//获取上次数据
            if(localDada){
                $scope.auditing=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('auditing',$scope.auditing);//存储数据
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.auditing.paymentPlatformAudit.businessMember='';
            $scope.auditing.paymentPlatformAudit.businessMan=''
        };
        $scope.clearOperatorApproved=function () {
            $scope.auditing.approvedCondition.businessMember='';
            $scope.auditing.approvedCondition.businessMan=''
        };
        /**
         * 初始化函数
         */
        var init=function () {
            $scope.auditing = $$auditing.auditing();
            getLastData();
            saveData();
        };
        init();
    };
    moduleApp.controller('AuditingCtrl',['$scope','$$auditing','mcMultiEditorCacheService','$modal',AuditingCtrl]);
});
