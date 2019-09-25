/**
 *预认领控制器
 */
define([
    '../module'
], function (moduleApp) {
    'use strict';
    var preClaim = function ($scope, $$preClaim, $modal,mcMultiEditorCacheService) {
        $scope.tapFlag = '0';
        $scope.tapName = [
            {
                'title': '缴费通知单信息',
                'index': '1',
                'active': false,
                "btnStyle": {"width": "150px"}
            },
            {
                'title': '查询银行流水信息',
                'index': '2',
                'active': false,
                "btnStyle": {"width": "150px"}
            }
        ];
        /**
         * tap切换
         */
        $scope.changeTap = function (index) {
            $scope.tapFlag = index;
            saveData();
        };
        /**
         *预认领查询
         */
        $scope.searchPreClaim = function (target) {
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            //上分特殊处理
            if($scope.centerCode=="02"){
                if($scope.preClaimCondition.tradingNo == ""&& $scope.preClaimCondition.inputDateFrom=="" && $scope.preClaimCondition.inputDateTo==""&& $scope.preClaimCondition.certiNo=="" ){
                    layerMsg("平台交易号、业务单号、登记日期不能同时为空！");
                    return false
                }
            }else {
                if($scope.preClaimCondition.transactionNo == ""&& $scope.preClaimCondition.inputDateFrom=="" && $scope.preClaimCondition.inputDateTo==""&& $scope.preClaimCondition.certiNo=="" ){
                    layerMsg("缴费通知单号、业务单号、登记日期不能同时为空！");
                    return false
                }
            }
            if($scope.preClaimCondition.claimStatus == undefined){
                layerMsg("认领状态不能为空！");
                return false
            }
            if($scope.preClaimCondition.inputDateFrom!=""&&$scope.preClaimCondition.inputDateTo!=""&&$scope.preClaimCondition.inputDateFrom>$scope.preClaimCondition.inputDateTo){
                layerMsg("起始登记日期不能大于终止登记日期！");
                return false
            }
            if($scope.preClaimCondition.sumFeeCnyFrom!=""&&$scope.preClaimCondition.sumFeeCnyTo!=""&&Number($scope.preClaimCondition.sumFeeCnyFrom)>Number($scope.preClaimCondition.sumFeeCnyTo)){
                layerMsg("起始金额不能大于终止金额！");
                return false
            }
            $$preClaim.searchPreClaim($scope.preClaimCondition, {
                success: function (data) {
                    console.log(data);
                    $scope.preClaimList = data.content.content;
                    if(!target&&$scope.preClaimList.length == 0){
                        layerMsg("暂无数据！")
                    }
                    $scope.pagination.totalItems = data.content.totalCount;
                    saveData();//存储数据
                },
                error: function (e) {
                }
            }, {
                "pageNo": $scope.pagination.pageIndex-1,
                "pageSize": $scope.pagination.pageSize
            });
        };
        /**
         *预认领重置
         */
        $scope.resetPreClaim = function () {
            $scope.preClaimCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":'payment.collection.claimmanagement.preclaim',
                "transactionNo":"",
                "tradingNo":"",
                "claimStatus":"1",
                "inputDateFrom":"",
                "inputDateTo":"",
                "certiNo":""
            };
            saveData();
        };
        /**
         *预认领查看
         */
        $scope.lookMessage = function (target) {
            target.webUserCode = $scope.usercode;
            target.webComCode = $scope.comCode;
            $modal.open({
                templateUrl: 'components/collection/preClaim/tpl/modal/lookInfo.modal.html',
                resolve: {
                    target: function () {
                        return target
                    }
                },
                controller: function ($scope, $modalInstance, target) {
                    $$preClaim.lookPreClaim(target, {
                        success: function (data) {
                            console.log(data);
                            $scope.lookPreClaimCondition = data.content;
                        },
                        error: function (e) {
                        }
                    });
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    }
                }
            }).result.then(function (record) {
            });

        };
        /**
         *预认领修改
         */
        $scope.changeMessage = function (target) {
            target.webUserCode = $scope.usercode;
            target.webComCode = $scope.comCode;
            $modal.open({
                templateUrl: 'components/collection/preClaim/tpl/modal/reviseInfo.modal.html',
                resolve: {
                    target: function () {
                        return target
                    },
                    usercode: function () {
                        return $scope.usercode
                    },
                    comCode: function () {
                        return $scope.comCode
                    }
                },
                controller: function ($scope, $modalInstance, target,comCode,usercode) {
                    //获取修改数据
                    $$preClaim.reviseLookPreClaim(target, {
                        success: function (data) {
                            console.log(data);
                            $scope.revisePreClaimCondition = data.content;
                            $scope.selectAdd();
                        },
                        error: function (e) {
                        }
                    });
                    //关闭弹窗
                    $scope.cancel = function (){
                        $modalInstance.dismiss();
                    };
                    //查询银行流水
                    $scope.queryBankFlow = function () {
                        $modal.open({
                            templateUrl: 'components/collection/preClaim/tpl/modal/queryBankFlow.modal.html',
                            resolve: {
                                reviseBankList :function () {
                                    return $scope.revisePreClaimCondition.prpJClaimBankFlowDetallDtoList
                                },
                                usercode: function () {
                                    return usercode
                                },
                                comCode: function () {
                                    return comCode
                                }
                            },
                            controller: function ($scope, $modalInstance,reviseBankList,usercode,comCode,$rootScope){
                                $scope.centerCode = $rootScope.user.centerCode;
                                $scope.modalBankFlow = {
                                    "comCode":""
                                };
                                $scope.status = {
                                    "checkedAll":false
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
                                //查询
                                $scope.searchBankFlow = function (target) {
                                    if(target!='page'){
                                        $scope.pagination.pageIndex=1;
                                    }
                                    if($scope.modalBankFlow.comCode==""){
                                        layerMsg("账号归属机构不能为空！");
                                        return false
                                    }
                                    if($scope.modalBankFlow.transDateFrom!=""&&$scope.modalBankFlow.transDateTo!=""&&$scope.modalBankFlow.transDateFrom>$scope.modalBankFlow.transDateTo){
                                        layerMsg("起始交易日期不能大于终止交易日期！");
                                        return false
                                    }
                                    if($scope.modalBankFlow.amountFrom!=""&&$scope.modalBankFlow.amountTo!=""&&Number($scope.modalBankFlow.amountFrom)>Number($scope.modalBankFlow.amountTo)){
                                        layerMsg("起始交易金额不能大于终止交易金额！");
                                        return false
                                    }
                                    $scope.modalBankFlow.webUserCode = usercode;
                                    $scope.modalBankFlow.webComCode = comCode;
                                    $scope.modalBankFlow.webTaskCode = "payment.collection.claimmanagement.preclaim";
                                    $$preClaim.searchBankFlow($scope.modalBankFlow,{
                                        success:function (data) {
                                            $scope.modalBankFlowList = data.content.content;
                                            if($scope.modalBankFlowList.length == 0){
                                                layerMsg("暂无数据！")
                                            }
                                            $scope.status.checkedAll = false;
                                            $scope.pagination.totalItems = data.content.totalCount;
                                        },
                                        error:function (d) {
                                        }
                                    },{
                                        "pageNo": $scope.pagination.pageIndex-1,
                                        "pageSize": $scope.pagination.pageSize
                                    })
                                };
                                //重置
                                $scope.resetBankFlow = function () {
                                    $scope.modalBankFlow = {
                                        "comCode":""
                                    };
                                };
                                //关闭弹窗
                                $scope.cancel=function(){
                                    $modalInstance.dismiss();
                                };
                                //全选
                                $scope.checkedAll=function(allFlag,objList){
                                    $.each(objList,function(index,obj){
                                        if(allFlag){
                                            obj.checked=true;
                                        }else obj.checked=false;
                                    });
                                };
                                //单选
                                $scope.checkedBankFlowOne=function(){
                                    $scope.status.checkedAll=$scope.modalBankFlowList.every(function(item,index,array){
                                        return item.checked;
                                    })
                                };
                                //添加到列表
                                $scope.addList = function () {
                                    var sign = false;
                                    angular.forEach($scope.modalBankFlowList,function (data,index,array) {
                                        if (data.checked){
                                            data.thisClaimBankFlowAmout = data.canClaimAmount;//可认领交易金额赋给本次认领交易金额
                                            data.bankFlowClaimStatus=data.claimStatus;//认领状态字段转换
                                            data.inputRead = true;
                                            angular.forEach(reviseBankList,function (target){
                                                if(data.unifySerialNum == target.unifySerialNum){
                                                    sign = true;
                                                    return
                                                }
                                            });
                                            if(sign){
                                                layerMsg("银行流水已存在！");
                                                return
                                            }
                                            reviseBankList.push(array[index]);
                                        }
                                    });
                                    $modalInstance.close();
                                }
                                //导入银行账号
                                $scope.myFunc = function(){
                                    $scope.comcodes = $scope.modalBankFlow.comCode;
                                    //导入目标银行账号-币别
                                    $$preClaim.queryBankAcount($scope.comcodes,{
                                        success: function (data) {
                                            var payWayObj = {};
                                            var payWaySelList = [];
                                            $.each(data.content,function(index,obj){
                                                payWayObj['code'] = obj.bankAccountNo;
                                                payWayObj['value'] = obj.bankAccountNo+'-'+obj.currency;
                                                payWaySelList.push(angular.copy(payWayObj));
                                            })
                                            $scope.bankTypeCNY = payWaySelList;
                                        },
                                        error: function (e) {

                                        }
                                    });
                                }
                            }
                        }).result.then(function (record) {
                            $scope.selectAdd();
                        });
                    };
                    //累加金额
                    $scope.selectAdd = function () {
                        var paymentFee = 0;
                        var bankFlowFee = 0;
                        angular.forEach($scope.revisePreClaimCondition.prpJClaimTransactionMainDtoList, function (data) {
                            paymentFee += Number(data.thisClaimSumFeeCny);
                        });
                        angular.forEach($scope.revisePreClaimCondition.prpJClaimBankFlowDetallDtoList, function (data) {
                            bankFlowFee += Number(data.thisClaimBankFlowAmout);
                            if(data.canClaimAmount=="0"){
                                data.readonly = true;
                            }
                        });
                        $scope.modalPaymentFee = paymentFee;
                        $scope.modalBankFlowFee = bankFlowFee;
                        //是否转无单预收校验
                        if($scope.modalPaymentFee>=$scope.modalBankFlowFee){
                            angular.forEach($scope.revisePreClaimCondition.prpJClaimBankFlowDetallDtoList, function (data) {
                                if(Number(data.canClaimAmount)>Number(data.thisClaimBankFlowAmout)){
                                    data.inputRead = false;
                                }else {
                                    data.inputRead = true;
                                }
                            });
                        }else{
                            angular.forEach($scope.revisePreClaimCondition.prpJClaimBankFlowDetallDtoList, function (data) {
                                data.isNoBill = "0";
                                data.inputRead = true;
                            });
                        }
                    };
                    //删除
                    $scope.delBankFolw = function (index) {
                        $scope.revisePreClaimCondition.prpJClaimBankFlowDetallDtoList.splice(index,1)
                        $scope.selectAdd();
                    };
                    //修改预认领
                    $scope.revisePreClaim = function () {
                        if($scope.revisePreClaimCondition.prpJClaimBankFlowDetallDtoList.length==0){
                                layerMsg("请添加银行流水信息！");
                                return false
                        }
                        $scope.revisePreClaimCondition.sumThisClaimSumFeeCny =$scope.modalPaymentFee;
                        $scope.revisePreClaimCondition.sumThisClaimBankFlowAmout =$scope.modalBankFlowFee;
                        $scope.revisePreClaimCondition.webUserCode = usercode;
                        $scope.revisePreClaimCondition.webComCode = comCode;
                        $$preClaim.revisePreClaim($scope.revisePreClaimCondition, {
                            success: function (data) {
                                console.log(data);
                                if (data.content.resultCode == "0000") {
                                    layer.msg(data.content.resultMsg, {icon: 1});
                                    $modalInstance.close(data.content.resultCode);
                                }else{
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error: function (e) {
                            }
                        });
                    };
                    //金额校验
                    $scope.judgmentSum = function (target){
                        if (Number(target.thisClaimBankFlowAmout) > Number(target.canClaimAmount)){
                                layerMsg("本次认领交易金额不能大于可认领交易金额!")
                                target.thisClaimBankFlowAmout =target.canClaimAmount;
                        }
                    };
                    $scope.$watch('revisePreClaimCondition.prpJClaimBankFlowDetallDtoList',function () {
                        $scope.selectAdd()
                    },true);
                    //录入客户信息
                    $scope.customInfo = function (target) {
                        if(target.isNoBill=="1"){
                            $modal.open({
                                templateUrl: 'components/collection/preClaim/tpl/modal/customInf.modal.html',
                                resolve: {
                                    target: function () {
                                        return target
                                    }
                                },
                                controller: function ($scope, $modalInstance, target) {
                                    $scope.customDto ={
                                        "customName":"",
                                        "customCode":"",
                                        "customType":""
                                    };
                                    $scope.cancel = function () {
                                        $modalInstance.dismiss();
                                    }
                                    //确定
                                    $scope.confirmCustom = function () {
                                        // if($scope.customDto.customCode==""){
                                        //     layerMsg("请录入客户代码！");
                                        //     return false
                                        // }
                                        if($scope.customDto.customName==""){
                                            layerMsg("请录入客户名称！");
                                            return false
                                        }
                                        if($scope.customDto.customType==""){
                                            layerMsg("请录入客户类型！");
                                            return false
                                        }
                                        target.prpJNoBillFeeDetailDto = $scope.customDto;
                                        $modalInstance.close();
                                    };
                                }
                            }).result.then(function (record) {

                            });
                        }
                    };
                }
            }).result.then(function (record) {
                if(record){
                    $scope.searchPreClaim(true);
                }
            });
        };
        /**
         *查询缴费通知单
         */
        $scope.searchPaymentNotice = function (target) {
            if(target!='page'){
                $scope.paginationB.pageIndex=1;
            }
            if($scope.centerCode=="02"){
                if($scope.paymentNoticeCondition.tradingNo == "" && $scope.paymentNoticeCondition.certiNo == ""&& $scope.paymentNoticeCondition.invoiceNo=="" && $scope.paymentNoticeCondition.underwritedate==""){
                    layerMsg("平台交易号、业务单号、发票号、核保/批日期不能同时为空！");
                    return false
                }
            }else {
                if($scope.paymentNoticeCondition.transactionNo == "" && $scope.paymentNoticeCondition.certiNo == ""&& $scope.paymentNoticeCondition.invoiceNo=="" && $scope.paymentNoticeCondition.underwritedate==""){
                    layerMsg("缴费通知单号、业务单号、发票号、核保/批日期不能同时为空！");
                    return false
                }
            }
            $$preClaim.searchPaymentNotice($scope.paymentNoticeCondition, {
                success: function (data) {
                    console.log(data);
                    $scope.paymentNoticeList = data.content.content;
                    if(!target&&$scope.paymentNoticeList.length == 0){
                        layerMsg("暂无数据！")
                    }
                    $scope.status.checkedAll = false;
                    $scope.paginationB.totalItems = data.content.totalCount;
                    saveData();//存储数据
                },
                error: function (e) {
                }
            }, {
                "pageNo": $scope.paginationB.pageIndex-1,
                "pageSize": $scope.paginationB.pageSize
            });

        };
        /**
         *缴费通知单重置
         */
        $scope.resetPaymentNotice = function () {
            $scope.paymentNoticeCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":'payment.collection.claimmanagement.preclaim',
                "transactionNo":"",
                "tradingNo":"",
                "certiNo":"",
                "invoiceNo":"",
                "underwritedate":""
            };
            saveData();
        };
        /**
         * 全选
         */
        $scope.checkedAll = function (allFlag, objList) {
            $.each(objList, function (index, obj) {
                if (allFlag) {
                    obj.checked = true;
                } else obj.checked = false;
            });
        };
        /**
         * 单选
         */
        $scope.checkedPaymentNoticeOne = function () {
            $scope.status.checkedAll = $scope.paymentNoticeList.every(function (item, index, array) {
                return item.checked;
            })
        };
        $scope.checkedBankFlowOne = function () {
            $scope.status.checkedBankAll = $scope.bankFlowList.every(function (item, index, array) {
                return item.checked;
            })
        };
        /**
         *查询银行流水号
         */
        $scope.searchBankFlow = function (target) {
            if(target!='page'){
                $scope.paginationA.pageIndex=1;
            }
            if($scope.bankFlowCondition.comCode == ""){
                layerMsg("请录入账号归属机构！");
                return false
            }
            if($scope.bankFlowCondition.transDateFrom!=""&&$scope.bankFlowCondition.transDateTo!=""&&$scope.bankFlowCondition.transDateFrom>$scope.bankFlowCondition.transDateTo){
                layerMsg("起始交易日期不能大于终止交易日期！");
                return false
            }
            if($scope.bankFlowCondition.amountFrom!=""&&$scope.bankFlowCondition.amountTo!=""&&Number($scope.bankFlowCondition.amountFrom)>Number($scope.bankFlowCondition.amountTo)){
                layerMsg("起始交易金额不能大于终止交易金额！");
                return false
            }
            $$preClaim.searchBankFlow($scope.bankFlowCondition, {
                success: function (data) {
                    console.log(data);
                    $scope.bankFlowList = data.content.content;
                    if(!target&&$scope.bankFlowList.length == 0){
                        layerMsg("暂无数据！")
                    }
                    $scope.status.checkedBankAll = false;
                    $scope.paginationA.totalItems = data.content.totalCount;
                    saveData();//存储数据
                },
                error: function (e) {
                }
            }, {
                "pageNo": $scope.paginationA.pageIndex-1,
                "pageSize": $scope.paginationA.pageSize
            });
        };
        /**
         *银行流水号重置
         */
        $scope.resetBankFlow = function () {
            $scope.bankFlowCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":'payment.collection.claimmanagement.preclaim',
                "comCode":""
            };
            saveData();
        };
        /**
         *提交返回主页面
         */
        $scope.showInfo = function (obj, list,target) {
            var sign = false;
            // var storage = {};
            // storage.storage = angular.copy(list);
            angular.forEach(obj, function (data, index, array) {
                if (data.checked){
                    if(data.canClaimSumFeeCny){
                        data.thisClaimSumFeeCny = Number(data.canClaimSumFeeCny);//可认领缴费金额赋给本次认领缴费金额
                        data.currency=data.currenCY;//币种字段转换
                    };
                    if(data.canClaimAmount){
                        data.thisClaimBankFlowAmout = Number(data.canClaimAmount);//可认领交易金额赋给本次认领交易金额
                        data.isNoBill = "0";
                        data.inputRead = true;
                    };
                    angular.forEach(list, function (target) {
                        if(data.transactionNo){
                            if (data.transactionNo == target.transactionNo){
                                sign = true;
                                return false
                            }
                        }
                        if(data.unifySerialNum){
                            if (data.unifySerialNum == target.unifySerialNum){
                                sign = true;
                                return false
                            }
                        }
                    });
                    if (sign) {
                        return false
                    }
                    list.push(array[index]);
                };
            });
            if(sign){
                layerMsg("请勿重复添加相同数据");
                return sign
            }
            // if(list&&list.length>1 && target.length>1){
            //     layerMsg("不允许多条缴费通知单对应多条银行流水信息");
            //     if(list[0].transactionNo){
            //         $scope.preClaim.prpJClaimTransactionMainDtoList = storage.storage;
            //     }
            //     if(list[0].unifySerialNum){
            //         $scope.preClaim.prpJClaimBankFlowDetallDtoList = storage.storage;
            //     }
            //     return false
            // }
            if(list&&list.length == 0){
                layerMsg("请勾选！");
                return false
            }
            $scope.tapFlag = 0;
            $.each($scope.tapName, function (index, obj) {
                obj.active = false
            });
            $scope.addFee();
            saveData();
        };
        /**
         *金额校验
         */
        $scope.judgmentSum = function (target){
            if(target.thisClaimSumFeeCny){
                if (Number(target.thisClaimSumFeeCny) > Number(target.canClaimSumFeeCny)){
                        layerMsg("本次认领缴费金额不能大于可认领缴费金额!");
                        target.thisClaimSumFeeCny =target.canClaimSumFeeCny;
                }
            }
            if(target.thisClaimBankFlowAmout){
                if (Number(target.thisClaimBankFlowAmout) > Number(target.canClaimAmount)){
                    layerMsg("本次认领交易金额不能大于可认领交易金额!");
                    target.thisClaimBankFlowAmout =target.canClaimAmount;
                }
            }
        };
        $scope.$watch('preClaim.prpJClaimTransactionMainDtoList',function () {
            $scope.addFee()
        },true);
        $scope.$watch('preClaim.prpJClaimBankFlowDetallDtoList',function () {
            $scope.addFee()
        },true);
        /**
         *新增页面删除
         */
        $scope.delPaymentNoticeList = function (index) {
            $scope.preClaim.prpJClaimTransactionMainDtoList.splice(index, 1);
        };
        $scope.delBankFlow = function (index) {
            $scope.preClaim.prpJClaimBankFlowDetallDtoList.splice(index, 1);
        };
        /**
         *新增页面金额累加
         */
        $scope.addFee = function () {
            var paymentFee = 0;
            var bankFlowFee = 0;
            angular.forEach($scope.preClaim.prpJClaimTransactionMainDtoList, function (data) {
                paymentFee += Number(data.thisClaimSumFeeCny);
            });
            angular.forEach($scope.preClaim.prpJClaimBankFlowDetallDtoList, function (data) {
                bankFlowFee += Number(data.thisClaimBankFlowAmout);
            });
            $scope.paymentFee = paymentFee;
            $scope.bankFlowFee = bankFlowFee;
            //计算差额调整
            $scope.preClaim.differenceAmout = $scope.paymentFee-$scope.bankFlowFee;
            //是否转无单预收校验
            if( $scope.bankFlowFee>=$scope.paymentFee){
                angular.forEach($scope.preClaim.prpJClaimBankFlowDetallDtoList, function (data) {
                   if(Number(data.canClaimAmount)>Number(data.thisClaimBankFlowAmout)){
                       data.inputRead = false;
                   }else {
                       data.inputRead = true;
                   }
                });
            }else{
                angular.forEach($scope.preClaim.prpJClaimBankFlowDetallDtoList, function (data) {
                    data.isNoBill = "0";
                    data.inputRead = true;
                });
            }
        };
        /**
         *新增页面认领
         */
        $scope.confirmpreClaim = function () {
            if($scope.preClaim.prpJClaimTransactionMainDtoList.length ==0 ||$scope.preClaim.prpJClaimBankFlowDetallDtoList.length ==0){
                layerMsg("请添加缴费通知单和银行流水信息！");
                return false
            }
            if($scope.preClaim.differenceAmout!=0&&$scope.preClaim.remark == ""){
                layerMsg("请录入备注！");
                return false
            }
            $scope.preClaim.sumThisClaimSumFeeCny =$scope.paymentFee;
            $scope.preClaim.sumThisClaimBankFlowAmout =$scope.bankFlowFee;
            $$preClaim.confirmpreClaim($scope.preClaim,{
                success: function (data) {
                    console.log(data);
                    if (data.content.resultCode == "0000") {
                        layer.msg(data.content.resultMsg, {icon: 1});
                        $scope.resetpreClaim();//重置新增页面
                        $scope.infoFlag=true;//返回查询页面
                        $scope.searchBankFlow(true);
                        $scope.searchPaymentNotice(true);
                    }else{
                        layerMsg(data.content.resultMsg)
                    }
                },
                error: function (e) {
                }
            });
        };
        /**
         *新增页面重置
         */
        $scope.resetpreClaim = function () {
            $scope.preClaim = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "differenceAmout":"",
                "remark":"",
                "prpJClaimTransactionMainDtoList": [],
                "prpJClaimBankFlowDetallDtoList": []
            };
            $scope.addFee();
        };
        /**
         *新增页面-录入客户信息
         */
        $scope.customInfo = function (target) {
          if(target.isNoBill=="1"){
              $modal.open({
                  templateUrl: 'components/collection/preClaim/tpl/modal/customInf.modal.html',
                  resolve: {
                      target: function () {
                          return target
                      }
                  },
                  controller: function ($scope, $modalInstance, target) {
                      $scope.customDto ={
                        "customName":""
                      };
                      $scope.cancel = function () {
                          $modalInstance.dismiss();
                      }
                      //确定
                      $scope.confirmCustom = function () {
                        if($scope.customDto.customName==""){
                            layerMsg("请录入客户名称！");
                            return false
                        }
                        target.prpJNoBillFeeDetailDto = $scope.customDto;
                        $modalInstance.close();
                      };
                  }
              }).result.then(function (record) {

              });
          }
        };
        /**
         *账户归属机构获取银行账号
         */
        $scope.myFunc = function(){
            $scope.comcodes = $scope.bankFlowCondition.comCode;
            //导入目标银行账号-币别
            $$preClaim.queryBankAcount($scope.comcodes,{
                success: function (data) {
                    var payWayObj = {};
                    var payWaySelList = [];
                    $.each(data.content,function(index,obj){
                        payWayObj['code'] = obj.bankAccountNo;
                        payWayObj['value'] = obj.bankAccountNo+'-'+obj.currency;
                        payWaySelList.push(angular.copy(payWayObj));
                    })
                    $scope.bankTypeCNY = payWaySelList;
                },
                error: function (e) {

                }
            });
        };
        /**
         *缴费通知单号查询业务单号
         */
        $scope.searchCertiNo = function (target) {
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
                        $$preClaim.paymentNoticeListInfo(target,{
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
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('preClaim');//获取上次数据
            if(localDada){
                $scope.pagination = localDada.pagination;
                $scope.paginationA = localDada.paginationA;
                $scope.paginationB = localDada.paginationB;
                $scope.infoFlag = localDada.infoFlag;
                $scope.preClaimCondition = localDada.preClaimCondition;
                $scope.paymentNoticeCondition = localDada.paymentNoticeCondition;
                $scope.bankFlowCondition = localDada.bankFlowCondition;
                $scope.preClaim = localDada.preClaim;
                $scope.tapFlag = localDada.tapFlag;
                $scope.tapName = localDada.tapName;
                $scope.moreFlag = localDada.moreFlag;
                $scope.moreFlagNew = localDada.moreFlagNew;
                // $scope.moreFlagBank = localDada.moreFlagBank;
                $scope.preClaimList = localDada.preClaimList;
                $scope.paymentNoticeList = localDada.paymentNoticeList;
                $scope.bankFlowList = localDada.bankFlowList;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            $scope.preClaimDto = {};
            $scope.preClaimDto.pagination = $scope.pagination;
            $scope.preClaimDto.paginationA = $scope.paginationA;
            $scope.preClaimDto.paginationB = $scope.paginationB;
            $scope.preClaimDto.infoFlag = $scope.infoFlag;
            $scope.preClaimDto.preClaimCondition = $scope.preClaimCondition;
            $scope.preClaimDto.paymentNoticeCondition = $scope.paymentNoticeCondition;
            $scope.preClaimDto.bankFlowCondition = $scope.bankFlowCondition;
            $scope.preClaimDto.preClaim = $scope.preClaim;
            $scope.preClaimDto.tapFlag=$scope.tapFlag;
            $scope.preClaimDto.tapName=$scope.tapName;
            $scope.preClaimDto.moreFlag = $scope.moreFlag;
            $scope.preClaimDto.moreFlagNew = $scope.moreFlagNew;
            // $scope.preClaimDto.moreFlagBank = $scope.moreFlagBank;
            $scope.preClaimDto.preClaimList = $scope.preClaimList;
            $scope.preClaimDto.paymentNoticeList = $scope.paymentNoticeList;
            $scope.preClaimDto.bankFlowList = $scope.bankFlowList;
            mcMultiEditorCacheService.localData('preClaim',$scope.preClaimDto);//存储数据
        };
        /**
         * 切换页面
         */
        $scope.changeTapBtn = function () {
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
         * 缴费通知单页面高级普通查询切换
         */
        $scope.changeMoreFlagNew = function () {
            $scope.moreFlagNew = !$scope.moreFlagNew;
            saveData();
        };
        /**
         * 银行流水页面高级普通查询切换
         */
        $scope.changeMoreFlagBank = function () {
            $scope.moreFlagBank= !$scope.moreFlagBank;
            saveData();
        };
        /**
         * 初始化函数
         */
        var init = function () {
            //分页信息
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
            $scope.paginationB = {
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
            $scope.infoFlag = true;
            //预认领
            $scope.preClaimCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":'payment.collection.claimmanagement.preclaim',
                "transactionNo":"",
                "tradingNo":"",
                "claimStatus":"1",
                "inputDateFrom":"",
                "inputDateTo":"",
                "certiNo":""
            };
            //查询缴费通知单
            $scope.paymentNoticeCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":'payment.collection.claimmanagement.preclaim',
                "transactionNo":"",
                "tradingNo":"",
                "certiNo":"",
                "invoiceNo":"",
                "underwritedate":""
            };
            //查询银行流水
            $scope.bankFlowCondition = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "webCenterCode":$scope.centerCode,
                "webTaskCode":'payment.collection.claimmanagement.preclaim',
                "comCode":""
            };
            //全选标志
            $scope.status ={
                "checkedAll": false,
                "checkedBankAll":false
            };
            //新增界面
            $scope.preClaim = {
                "webUserCode":$scope.usercode,
                "webComCode":$scope.comCode,
                "differenceAmout":"",
                "remark":"",
                "prpJClaimTransactionMainDtoList": [],
                "prpJClaimBankFlowDetallDtoList": []
            };
            getLastData();//获取上次数据
            saveData();
        };
        init();
    };

    moduleApp.controller('PreClaimCtrl', ['$scope', '$$preClaim', '$modal', 'mcMultiEditorCacheService',preClaim]);

});
