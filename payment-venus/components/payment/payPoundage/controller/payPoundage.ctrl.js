/**
 * 付手续费
 */
define([
    '../module',
    'config'
],function (moduleApp, config) {
    'use strict';
    var PayPoundageCtrl=function($scope,$$payPoundage,mcMultiEditorCacheService,$modal){
        console.log('付手续费控制器');
        /**
         * 查询
         */
        $scope.searchPoundage = function (target) {
            if(target!='page'){
                $scope.payPoundage.pagination.pageIndex=1;
            }
            if($scope.payPoundage.payPoundageCondition.visaSerialNoStart==""&&$scope.payPoundage.payPoundageCondition.visaSerialNoEnd==""&&$scope.payPoundage.payPoundageCondition.visaSerialNoList==""&&$scope.payPoundage.payPoundageCondition.contractNo==""){
                layerMsg("结算单号和结算单号列表和手续费批次号不能同时为空！");
                return false
            }
            if($scope.payPoundage.payPoundageCondition.commisionType==undefined){
                layerMsg("费用类型不能为空！");
                return false
            }
            $scope.payPoundage.payPoundageCondition.webUserCode = $scope.usercode;
            $scope.payPoundage.payPoundageCondition.webComCode = $scope.comCode;
            $scope.payPoundage.payPoundageCondition.webCenterCode = $scope.centerCode;
            $$payPoundage.searchPoundageList($scope.payPoundage.payPoundageCondition,{
                success: function (data) {
                    $scope.payPoundage.payPoundageList = data.content;
                    if(!target&&$scope.payPoundage.payPoundageList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.payPoundage.pagination.totalItems = data.content.totalCount;
                    $scope.payPoundage.status.allChecked = false;
                    $scope.payPoundage.status.disabledAll=getAllStatus($scope.payPoundage.payPoundageList);
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.payPoundage.pagination.pageIndex-1,
                "pageSize": $scope.payPoundage.pagination.pageSize
            });
        };
        /**
         * 重置
         */
        $scope.resetPoundage = function () {
            $scope.payPoundage.payPoundageCondition = {
                "contractNo":"",
                "visaSerialNoStart":"",
                "visaSerialNoEnd":"",
                "visaSerialNoList":"",
                "commisionType":"0"
            };
        };
        /**
         * 全选
         */
        $scope.checkedAll = function () {
            angular.forEach($scope.payPoundage.payPoundageList,function (data) {
                if ($scope.payPoundage.status.allChecked){
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
            checkList($scope.payPoundage.payPoundageList);
            $scope.payPoundage.status.allChecked = $scope.payPoundage.payPoundageList.every(function (data) {
                return data.checked;
            })
        };
        /**
         * 判断是否可以同时勾选
         */
        var checkValueOfList=function (objSt,_obj) {
            var result=false;
            var sign = (_obj.payCommission * objSt.payCommission)>0 ? true:false;
            if(_obj.currency2!=objSt.currency2||!sign){
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
         * 确定
         */
        $scope.confirmPoundage=function () {
            angular.forEach($scope.payPoundage.payPoundageList,function (data,index,array) {
                if(data.checked){
                    $scope.payPoundage.selectedList.push(array[index])
                }
            });
            if ($scope.payPoundage.selectedList.length == 0){
                layerMsg("请勾选一条记录！");
                return false
            };
            $modal.open({
                templateUrl:"components/payment/payPoundage/tpl/modal/selectedSubmit.modal.html",
                resolve:{
                    selectedList:function () {
                        return $scope.payPoundage.selectedList
                    }
                },
                controller:function ($scope,$modalInstance,selectedList,$rootScope) {
                    var init =function () {
                        $scope.conifrmCondition = {
                            "userCode":$rootScope.user.userCode,
                            "userName":$rootScope.user.userName,
                            "comCode":$rootScope.comCode,
                            "comName":$rootScope.user.userComName,
                            "centerCode":$rootScope.user.centerCode,
                            "centerName":$rootScope.user.centerName,
                            "payRefDate":new Date().dateConversion(),
                            "sumPayCommission":"",
                            "prpJCommBillDtoList":selectedList,
                            "prpJpaymentDetailList":[{
                                "currency2":selectedList[0].currency2,
                                "payWay":"",
                                "accountNo":"",
                                "checkNo":"",
                                "attribute1":""
                            }]
                        };
                        var sumFee = 0;
                        angular.forEach($scope.conifrmCondition.prpJCommBillDtoList,function (data,index) {
                            sumFee+=data.payCommission
                        });
                        $scope.conifrmCondition.sumPayCommission = sumFee;//计算合计金额
                        $scope.getBank = function(item){
                            if(item.payWay == '211'){
                                var _data = {
                                    centerCode : $rootScope.user.centerCode,
                                    webUserCode : $rootScope.user.userCode,
                                    currency : item.currency2
                                };
                                //导入目标银行账号-币别
                                $$payPoundage.queryNoBillBankAcount(_data,{
                                    success: function (data) {
                                        var payWayObj2 = {};
                                        var payWaySelList2 = [];
                                        $.each(data.content.accountList,function(index,obj){
                                            payWayObj2['code'] = obj.bankAccountNo;
                                            payWayObj2['value'] = obj.bankAccountNo+'-'+obj.currency;
                                            payWaySelList2.push(angular.copy(payWayObj2));
                                        });
                                        $scope.bankTypeCNYF = payWaySelList2;
                                    },
                                    error: function (e) {

                                    }
                                });
                            }
                        };
                        //确认
                        $scope.accountSubmit = function () {
                            if($scope.conifrmCondition.prpJpaymentDetailList[0].payWay==""){
                                layerMsg("请选择收付方式！");
                                return false
                            }
                            if($scope.conifrmCondition.prpJpaymentDetailList[0].payWay=="211"&&$scope.conifrmCondition.prpJpaymentDetailList[0].accountNo==""){
                                layerMsg("请选择银行账号！");
                                return false
                            }
                            angular.forEach($scope.conifrmCondition.prpJpaymentDetailList,function (data,index) {
                                data.payRefFee=$scope.conifrmCondition.sumPayCommission
                            });
                            $$payPoundage.confirmPoundageInf($scope.conifrmCondition,{
                                success: function (data) {
                                   if(data.content.resultCode=="0000"){
                                       layerMsg(data.content.resultMsg,'success');
                                       $modalInstance.close();
                                   }else {
                                       layerMsg(data.content.resultMsg)
                                   }
                                },
                                error: function (e) {

                                }
                            });
                        };
                    };
                    init();
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result.then(function () {
                $scope.payPoundage.selectedList = [];
                $scope.searchPoundage(true);
            },function () {
                $scope.payPoundage.selectedList = [];
            })
        };
        /**
         * 详细信息
         */
        $scope.moreFormData = function (target) {
            $modal.open({
                templateUrl:"components/payment/payPoundage/tpl/modal/payPoundage.modal.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $$payPoundage.searchVisaSerialNoList(target,{
                        success: function (data) {
                            $scope.visaSerialNoList = data.content;
                        },
                        error: function (e) {
                        }
                    });
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //业务单详情查询
                    $scope.queryCertiNo = function (target) {
                        $modal.open({
                            templateUrl:"components/payment/payPoundage/tpl/modal/certiNo.modal.html",
                            resolve:{
                                target:function () {
                                    return target;
                                }
                            },
                            controller:function ($scope,$modalInstance,target) {
                                $scope.certiNoCondition = target;
                                //关闭
                                $scope.cancel = function () {
                                    $modalInstance.dismiss();
                                };

                            }
                        })
                    }
                }
            })
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.payPoundage.payPoundageCondition.handler1Code='';
            $scope.payPoundage.payPoundageCondition.businessMan=''
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('payPoundage');//获取上次数据
            if(localDada){
                $scope.payPoundage=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('payPoundage',$scope.payPoundage);//存储数据
        };
        /**
         * 初始化函数
         */
        var init = function () {
            $scope.payPoundage = $$payPoundage.payPoundage();
            getLastData();
            saveData();
        };
        init();


    };
    moduleApp.controller('PayPoundageCtrl',['$scope','$$payPoundage','mcMultiEditorCacheService','$modal',PayPoundageCtrl]);
});