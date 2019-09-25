/**
 * 缴费指令
 */
define(['angular', 'config', 'codes'], function (angular, config, codes) {

    angular.module('mc.payment', [])

        .directive('payData', ['$timeout','$parse',
            function ($timeout,$parse) {
                return {
                    restrict: "AEC",
                    controller:"paymentCtrl",
                    controllerAs:"$payment",
                    scope: {
                        payData:'='
                    },
                    compile: function () {
                        return function (scope, element, attrs, $payment) {

                            element.on('click',function(){
                                scope.user= {
                                    "usercode":scope.$root.user.userCode,
                                    "comCode":scope.$root.comCode
                                };
                                $payment.payment(scope.user); //打开缴费弹窗

                            });
                            //回调控制器中传进来的方法
                            if(attrs.payCallback){
                                $payment.closeCallBack=$parse(attrs.payCallback);
                                $payment.doPayCallback=function(){
                                    $payment.closeCallBack(scope.$parent)
                                }
                            }

                        }
                    }
                }
            }
        ])

        .factory('$$payment',['$http','$q', '$$adapter','ApiPath','constants',
            function ($http,$q, $$adapter,ApiPath,constants){

                //转账--认领操作||到款确认
                var toPaymentWay=function(_data, options){
                    console.log('转账--认领操作／到款确认');
                    config.httpPackage.data=$$adapter.exports(constants.TARGET.TOPAYMENTWAY, _data);
                    config.httpPackage.url=ApiPath.api.toPaymentWay;
                    $http(config.httpPackage)

                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.TOPAYMENTWAY, data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });
                };
                //获取收银台支付链接
                var getPayUrl=function(_data, options){
                    console.log('获取收银台支付链接');
                    config.httpPackage.data=$$adapter.exports(constants.TARGET.GETPAYURL,_data);
                    config.httpPackage.url=ApiPath.api.getPayUrl;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.GETPAYURL, data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });
                };
                //缴费金额为负
                var negativePay=function(_data, options){
                    console.log('缴费金额为负');
                    config.httpPackage.data = $$adapter.exports('negativePay', _data);
                    config.httpPackage.url =  ApiPath.api.negativePayDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('negativePay', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });
                };
                //缴费页面初始化查询
                var searchPaymentInfo=function(_data, options){
                    console.log('缴费页面初始化查询');
                    config.httpPackage.data = $$adapter.exports('searchPaymentInfo', _data);
                    config.httpPackage.url =  ApiPath.api.searchPaymentInfoDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('searchPaymentInfo', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });
                };
                //查询银行流水
                var searchBankFlow=function(keywords, options, pagination){
                    console.log('银行流水查询');
                    var _data={
                        "webUserCode": keywords.webUserCode||'',
                        "webComCode": keywords.webComCode||'',
                        "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                        "webTaskCode":'payment.paymanager.indemnity',//当前操作菜单代码
                        "unifySerialNum": keywords.unifySerialNum||'',
                        "comCode": keywords.comCode||'',
                        "bankAccount": keywords.bankAccount||'',
                        "paymentName": keywords.paymentName||'',
                        "currency": keywords.currency||'',
                        "paymentAccount": keywords.paymentAccount||'',
                        "amountFrom": keywords.amountFrom||'',
                        "amountTo": keywords.amountTo||'',
                        "transDateFrom": keywords.transDateFrom||'',
                        "transDateTo": keywords.transDateTo||'',
                        "claimStatus": keywords.claimStatus||'',
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||''
                    };
                    config.httpPackage.data = $$adapter.exports('searchBankFlow', _data);
                    config.httpPackage.url =  ApiPath.api.searchBankFlowDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('searchBankFlow', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });
                };
                //生成现金流水号
                var createCashNum=function(_data, options){
                    console.log('生成现金流水号');
                    config.httpPackage.data = $$adapter.exports('createCashNum', _data);
                    config.httpPackage.url =  ApiPath.api.createCashNumDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('createCashNum', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });
                };
                //无单预收查询
                var searchReparations=function(keywords,options,pagination){
                    var _data={
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||'',
                        "preBillNo":keywords.preBillNo||'',
                        "unifySerialNum":keywords.unifySerialNum||'',
                        "prePayFeeMin":keywords.prePayFeeMin||'',
                        "prePayFeeMax":keywords.prePayFeeMax||'',
                        "availableFeeMin":keywords.availableFeeMin||'',
                        "availableFeeMax":keywords.availableFeeMax||'',
                        "operatecode":keywords.operatecode||'',
                        "comCode":keywords.comCode||'',
                        "payRefDateStart":keywords.payRefDateStart||'',
                        "payRefDateEnd":keywords.payRefDateEnd||keywords.payRefDateStart||'',
                        "currency":keywords.currency||'',
                        "accountCode":keywords.accountCode||'',
                        "customName":keywords.customName||'',
                        "dataSource":keywords.dataSource||'',
                        "globalUserCode":keywords.globalUserCode||'',
                        "powerSystemCode":keywords.powerSystemCode||''
                    };
                    config.httpPackage.data= $$adapter.exports('temporary', _data);
                    config.httpPackage.url= ApiPath.api.temporary;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('temporary', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })

                };
                //暂存||完成缴费
                var temporaryPay=function(_data, options){
                    console.log('缴费-暂存||缴费-完成缴费');
                    config.httpPackage.data = $$adapter.exports('temporaryPay', _data);
                    config.httpPackage.url =  ApiPath.api.temporaryPayDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('temporaryPay', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });
                };
                //缴费-币种获取兑换率
                var findExchangeRate=function(_data, options){
                    console.log('缴费-币种获取兑换率');
                    var _dto={
                        "currenCY":_data.currenCY||'',
                        "currency2":_data.currency2||''
                    };
                    config.httpPackage.data = $$adapter.exports('findExchangeRate', _dto);
                    config.httpPackage.url =  ApiPath.api.findExchangeRateDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('findExchangeRate', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        });
                };
                //导入目标银行账号-币别
                var queryBankAcount=function(_data,options){
                    var _data={
                        "centerCode":_data||''
                    };
                    config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
                    config.httpPackage.url= ApiPath.api.queryBankAcount;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('queryBankAcount', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                };

                var payWayAccount=function(_data,options){
                    console.log('收付方式-获取银行账号');
                    config.httpPackage.data= $$adapter.exports('payWayAccount', _data);
                    config.httpPackage.url= ApiPath.api.payWayAccountDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports('payWayAccount', data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                };
                return {
                    toPaymentWay:function(_data,options) {
                        return toPaymentWay(_data, options)
                    },
                    getPayUrl:function(_data,options) {
                        return getPayUrl(_data, options)
                    },
                    negativePay:function(_data,options) {
                        return negativePay(_data, options)
                    },
                    searchPaymentInfo:function(_data,options) {
                        return searchPaymentInfo(_data, options)
                    },
                    searchBankFlow:function(_data,options,keywords) {
                        return searchBankFlow(_data,options,keywords)
                    },
                    createCashNum:function(_data,options) {
                        return createCashNum(_data,options)
                    },
                    searchReparations:function(_data,options,keywords) {
                        return searchReparations(_data,options,keywords)
                    },
                    temporaryPay:function(_data,options) {
                        return temporaryPay(_data,options)
                    },
                    findExchangeRate:function(_data,options) {
                        return findExchangeRate(_data,options)
                    },
                    queryBankAcount: function (_data,options) {
                        return queryBankAcount(_data,options);
                    },
                    payWayAccount: function (_data,options) {
                    return payWayAccount(_data,options);
                }
                };
            }])


        .controller('paymentCtrl', ['$scope','$modal','$rootScope',function ($scope,$modal,$rootScope) {
            var ctrl = this;

            ctrl.payment=function(target){
                if($scope.payData.sumFeeCny<0){
                    negativeMoney();
                    return false
                }
                if($scope.payData.tranoStatus=="1"||$scope.payData.tranoStatus=="3"||$scope.payData.tranoStatus=="4"){
                    layerMsg("此单号不允许缴费！");
                    return false
                }
                $modal.open({
                    templateUrl: 'template/mc/payment/payment.modal.html',
                    resolve:{
                        defrayCondition:function(){
                            return $scope.payData;
                        },
                        usercode: function () {
                            return target.usercode
                        },
                        comCode: function () {
                            return target.comCode
                        }
                    },
                    controller: function ($scope, $modalInstance,defrayCondition,$$payment,comCode,usercode,$$code) {
                        //初始化查询
                        $$payment.searchPaymentInfo(defrayCondition,{
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
                                //支付类型默认认领银行流水
                                $scope.defrayCondition.toPaymentWay='2';
                                //用户信息
                                $scope.defrayCondition.globalUserCode=usercode;
                                $scope.defrayCondition.powerSystemCode=comCode;
                                $scope.$watch('defrayCondition.prpJtrannsactionPayWayDto1',function () {
                                    countPlanFee()
                                },true);
                                //完成缴费按钮控制
                                $scope.planFeeFinish = false;
                                $scope.$watch('defrayCondition.planFee',function () {
                                   if($scope.defrayCondition.planFee<=5){
                                       $scope.planFeeFinish = true;
                                   }else {
                                       $scope.planFeeFinish = false;
                                   }
                                });
                                //币种双击域赋值
                                $scope.defrayCondition.currency3 =  $$code.getCodeName($scope.defrayCondition.currency2,"Currency")
                            },
                            error:function () {

                            }
                        });

                        //tab页数据
                        $scope.tabData=[
                            {
                                heading:"认领银行流水",
                                payType:"2",
                                content:"images/bankFlow.png"
                            },
                            {
                                heading:"收银台",
                                payType:"3",
                                content:"images/cashier.png"
                            },
                            {
                                heading:"现金",
                                payType:"1",
                                content:"images/cash.png"
                            },
                            {
                                heading:"抵扣无单预收款",
                                payType:"4",
                                content:"images/negativePay.png"
                            }
                        ];

                        //选择支付类型
                        $scope.choosePayType=function(target){
                            $scope.defrayCondition.toPaymentWay = target;
                        };

                        //删除当前行数据
                        $scope.deleteMessage=function(target,index){
                          target.splice(index,1);
                            countPlanFee();
                        };

                        //选择支付方式
                        $scope.nextStep = function () {
                            //应缴金额校验
                            if(Number($scope.defrayCondition.planFee)<=0){
                                return false
                            }
                            //认领银行流水
                            if ($scope.defrayCondition.toPaymentWay == "2"){
                                $modal.open({
                                    templateUrl: 'template/mc/payment/queryBankFlow.modal.html',
                                    resolve: {
                                        reviseBankList :function () {
                                        return $scope.defrayCondition.prpJtrannsactionPayWayDto1
                                        },
                                        usercode: function () {
                                            return usercode
                                        },
                                        comCode: function () {
                                            return comCode
                                        },
                                        defrayCondition:function(){
                                            return $scope.defrayCondition;
                                        }
                                    },
                                    controller: function ($scope, $modalInstance,reviseBankList,usercode,comCode,defrayCondition,$rootScope){
                                        $scope.centerCode = $rootScope.user.centerCode;
                                        $scope.modalBankFlow = {
                                            "comCode":"",
                                            "currency":defrayCondition.currency2
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
                                            lastText: '末页'
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
                                            if($scope.modalBankFlow.bankAccount==""){
                                                layerMsg("银行账号不能为空！");
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
                                            $scope.modalBankFlow.webCenterCode = $scope.centerCode;
                                            $$payment.searchBankFlow($scope.modalBankFlow,{
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
                                                "comCode":"",
                                                "currency":defrayCondition.currency2
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
                                                    data.payRefFee = data.amount;//可认领交易金额赋值为交易金额
                                                    // data.accountNo = data.bankAccount;//银行账号字段转换
                                                    data.thisClaimBankFlowAmout = Number(data.canClaimAmount);//可认领交易金额赋给本次认领交易金额
                                                    data.isNoBill = "0";//是否转无单预收初始状态
                                                    data.inputRead = true;//初始禁用checkbox
                                                    angular.forEach(reviseBankList,function (target){
                                                        if(data.unifySerialNum == target.unifySerialNum){
                                                            sign = true;
                                                            return false
                                                        }
                                                    });
                                                    if(sign){
                                                        return false
                                                    }
                                                    reviseBankList.push(array[index]);
                                                }
                                            });
                                            if(sign){
                                                layerMsg("银行流水已存在！");
                                                return false
                                            }
                                            $modalInstance.close(reviseBankList);
                                        };
                                        //导入银行账号
                                        $scope.myFunc = function(){
                                            $scope.comcodes = $scope.modalBankFlow.comCode;
                                            //导入目标银行账号-币别
                                            $$payment.queryBankAcount($scope.comcodes,{
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
                                    if(record){
                                        countPlanFee()
                                    }
                                });

                            }
                            //现金
                            if ($scope.defrayCondition.toPaymentWay == "1"){
                                $modal.open({
                                    templateUrl: 'template/mc/payment/cash.modal.html',
                                    resolve: {
                                        defrayCondition:function () {
                                            return $scope.defrayCondition
                                        },
                                        cashList:function () {
                                            return $scope.defrayCondition.prpJtrannsactionPayWayDto2
                                        }
                                    },
                                    controller: function ($scope, $modalInstance,defrayCondition,cashList){
                                        $scope.cashierCondition={
                                            "currency":defrayCondition.currency2,
                                            "payRefFee":""
                                        };
                                        $scope.cashierCondition.paymentName = defrayCondition.appliName;
                                        $scope.cancel = function () {
                                            $modalInstance.dismiss();
                                        };
                                        //金额校验
                                        $scope.changeFee = function () {
                                          if(Number($scope.cashierCondition.payRefFee)<=0){
                                              $scope.cashierCondition.payRefFee=""
                                          }
                                        };
                                        $scope.cashPay = function () {
                                            if($scope.cashierCondition.paymentName==""){
                                                layerMsg("请录入付款人！");
                                                return false
                                            };
                                            if($scope.cashierCondition.payRefFee==""){
                                                layerMsg("请录入金额！");
                                                return false
                                            };
                                            $$payment.createCashNum(defrayCondition,{
                                                success:function (data) {
                                                    if (data.resultCode=="0000"){
                                                        $scope.cashierCondition.unifySerialNum=data.unifySerialNum;
                                                        cashList.push($scope.cashierCondition);
                                                        $modalInstance.close(cashList);
                                                    }else{
                                                        layerMsg(data.resultMsg);
                                                        return false
                                                    }
                                                },
                                                error:function (d) {
                                                }
                                            });
                                        };
                                    }
                                }).result.then(function (record) {
                                    if(record){
                                        countPlanFee()
                                    }
                                });
                            }
                            //收银台
                            if ($scope.defrayCondition.toPaymentWay == "3"){
                                $modal.open({
                                    templateUrl: 'template/mc/payment/cashier.modal.html',
                                    resolve: {
                                        defrayCondition:function () {
                                            return $scope.defrayCondition
                                        }
                                    },
                                    controller: function ($scope, $modalInstance,defrayCondition){
                                        $scope.cashierCondition = {
                                            "sign":'0',
                                            "phoneNum":"",
                                            "comCode":defrayCondition.centerCode,
                                            "productCode":"车险",
                                            "transactionNo":defrayCondition.transactionNo,
                                            "sumFee":defrayCondition.planFee
                                        };
                                        $scope.cancel = function () {
                                            $modalInstance.dismiss();
                                        };
                                        $scope.cashierPay = function () {
                                            if($scope.cashierCondition.sign=="1"&&$scope.cashierCondition.phoneNum==""){
                                                layerMsg("请输入手机号码！");
                                                return false
                                            }
                                            $$payment.getPayUrl($scope.cashierCondition,{
                                                success:function (data) {
                                                    console.log(data);
                                                    if(data.content.resultCode == "0000"){
                                                        if (data.content.sign=="0"){
                                                            window.open(data.content.shortUrl);
                                                            $modalInstance.close();
                                                        }else {
                                                            layer.msg(data.content.resultMsg,{icon:1});
                                                            $modalInstance.close();
                                                        }
                                                    }else {
                                                        layerMsg(data.content.resultMsg)
                                                    }
                                                },
                                                error:function () {

                                                }
                                            })
                                        };
                                    }
                                }).result.then(function (record) {

                                });
                            }
                            //无单预收
                            if ($scope.defrayCondition.toPaymentWay == "4"){
                                $modal.open({
                                    templateUrl: 'template/mc/payment/nobilladvance.modal.html',
                                    resolve: {
                                        noBillList:function () {
                                            return $scope.defrayCondition.prpJtrannsactionPayWayDto4
                                        },
                                        defrayCondition:function(){
                                            return $scope.defrayCondition;
                                        },
                                        usercode: function () {
                                            return usercode
                                        },
                                        comCode: function () {
                                            return comCode
                                        }
                                    },
                                    controller: function ($scope, $modalInstance,noBillList,usercode,comCode,defrayCondition){
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
                                        $scope.colRegCondition = {"checkedAll":false,
                                            "currency":defrayCondition.currency2
                                        };
                                        $scope.cancel=function(){
                                            $modalInstance.dismiss();
                                        };
                                        $scope.ok=function(){
                                            $modalInstance.close();
                                        };
                                        //无单预收查询
                                        $scope.searchAdviceOfSettlement = function (target) {
                                            if(target!='page'){
                                                $scope.pagination.pageIndex=1;
                                            }
                                            $scope.colRegCondition.globalUserCode = usercode;
                                            $scope.colRegCondition.powerSystemCode = comCode;
                                            $$payment.searchReparations($scope.colRegCondition,{
                                                success: function (data) {
                                                    $scope.confirmList=data.content.content;
                                                    if($scope.confirmList.length<1){
                                                        layerMsg('暂无数据！');
                                                    }
                                                    $scope.pagination.totalItems=data.content.totalCount;
                                                    $scope.colRegCondition.checkedAll=false;
                                                },
                                                error: function (e) {
                                                }
                                            },{
                                                "pageNo": $scope.pagination.pageIndex-1,
                                                "pageSize": $scope.pagination.pageSize
                                            })
                                        };
                                        //重置
                                        $scope.collectionReset =function () {
                                            $scope.colRegCondition = {
                                                "checkedAll":false,
                                                "currency":defrayCondition.currency2
                                            };
                                        };
                                        //单选勾选
                                        $scope.change = function (flag) {
                                            angular.forEach($scope.confirmList, function (data,index) {
                                                if (flag == index) {
                                                    data.changeClass ='venus_table_check'
                                                }
                                                else {
                                                    data.changeClass = ''
                                                }
                                            });
                                        };
                                        //选择后添加到列表
                                        $scope.checkedList = function () {
                                            var sign = false;
                                            var signFee = false;
                                            angular.forEach($scope.confirmList,function (data,index,array) {
                                                if (data.changeClass =='venus_table_check'){
                                                    data.payRefFee = data.availableFee;//可用金额金额赋值为交易金额
                                                    data.paymentName = data.customName;//人员字段转换
                                                    data.unifySerialNum = data.preBillNo;//无单预收流水号字段转换
                                                    if(data.availableFee=="0"){
                                                        signFee = true;
                                                    }
                                                    angular.forEach(noBillList,function (target){
                                                        if(data.preBillNo == target.preBillNo){
                                                            sign = true;
                                                            return false
                                                        }
                                                    });
                                                    if(sign){
                                                        layerMsg("银行流水已存在！");
                                                        return false
                                                    }
                                                    if(signFee){
                                                        layerMsg("可用金额为0，不能添加到缴费！");
                                                        return false
                                                    }
                                                    noBillList.push(array[index]);
                                                }
                                            });
                                            if(!signFee && !sign){
                                                $modalInstance.close(noBillList);
                                            }
                                        }

                                    }
                                }).result.then(function (record) {
                                    if(record){
                                        countPlanFee()
                                    }
                                });
                            }
                        };

                        //暂存
                        $scope.temporaryPay = function () {
                            $scope.defrayCondition.requestType="1";
                            $$payment.temporaryPay($scope.defrayCondition,{
                                success:function (data) {
                                    console.log(data);
                                    if(data.content.resultCode=="0000"){
                                        layer.msg(data.content.resultMsg,{icon:1});
                                        $scope.ok();
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }
                                },
                                error:function () {

                                }
                            });
                        };

                        //完成缴费
                        $scope.finishPay = function () {
                            $scope.defrayCondition.requestType="2";
                            $$payment.temporaryPay($scope.defrayCondition,{
                                success:function (data) {
                                    console.log(data);
                                    if(data.content.resultCode=="0000"){
                                        layer.msg(data.content.resultMsg,{icon:1});
                                        $scope.ok();
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }
                                },
                                error:function () {

                                }
                            });
                        };

                        //币种与兑换率二级联动
                        $scope.findExchangeRate = function () {
                            $$payment.findExchangeRate($scope.defrayCondition,{
                                success:function (data) {
                                    console.log(data);
                                    if(data.content.resultCode=="0000"){
                                       $scope.defrayCondition.exchangeRate = data.content.exchangeRate;
                                        $scope.countFee();
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }
                                },
                                error:function () {

                                }
                            });
                        };

                        //通过兑换率计算实收金额
                        $scope.countFee = function () {
                            $scope.defrayCondition.sumFeeCny = $scope.defrayCondition.sumFee*$scope.defrayCondition.exchangeRate
                        };

                        //通过实收金额计算汇率
                        $scope.countRate = function () {
                            $scope.defrayCondition.exchangeRate=$scope.defrayCondition.sumFeeCny/$scope.defrayCondition.sumFee;
                        };

                        //同步计算差额
                        var countPlanFee = function () {
                            var a=0.00;
                            var b=0.00;
                            var c=0.00;
                            var d=0.00;
                            if($scope.defrayCondition&&$scope.defrayCondition.prpJtrannsactionPayWayDto1.length>0){
                            angular.forEach($scope.defrayCondition.prpJtrannsactionPayWayDto1,function (data) {
                                a += Number(data.thisClaimBankFlowAmout);
                                //是否转无单预收校验
                                if(Number(data.canClaimAmount)>Number(data.thisClaimBankFlowAmout)){
                                    data.inputRead = false;
                                }else {
                                    data.inputRead = true;
                                    data.isNoBill = "0";
                                }
                             })
                            };
                            if($scope.defrayCondition&&$scope.defrayCondition.prpJtrannsactionPayWayDto2.length>0){
                                angular.forEach($scope.defrayCondition.prpJtrannsactionPayWayDto2,function (data) {
                                    b += Number(data.payRefFee)
                                })
                            };
                            if($scope.defrayCondition&&$scope.defrayCondition.prpJtrannsactionPayWayDto3.length>0){
                                angular.forEach($scope.defrayCondition.prpJtrannsactionPayWayDto3,function (data) {
                                    c += Number(data.payRefFee)
                                })
                            };
                            if($scope.defrayCondition&&$scope.defrayCondition.prpJtrannsactionPayWayDto4.length>0){
                                angular.forEach($scope.defrayCondition.prpJtrannsactionPayWayDto4,function (data) {
                                    d += Number(data.payRefFee)
                                })
                            };
                            $scope.defrayCondition.planFee = Number($scope.defrayCondition.sumFee)-a-b-c-d;
                        };

                        //金额校验
                        $scope.judgmentSum = function (target){
                            if (Number(target.thisClaimBankFlowAmout) > Number(target.canClaimAmount)){
                                    layerMsg("本次认领交易金额不能大于可认领交易金额!");
                                    target.thisClaimBankFlowAmout =Number(target.canClaimAmount);
                            }
                            if (Number(target.thisClaimBankFlowAmout) < Number(target.canClaimAmount)){
                                layer.msg("银行流水"+target.unifySerialNum+"存在余额，可继续认领或转无单预收!",{icon:1});
                            }
                        };

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
                                        };
                                        //初始化加载
                                        var init = function () {
                                            if(target.prpJNoBillFeeDetailDto.customName){
                                                $scope.customDto = target.prpJNoBillFeeDetailDto
                                            }
                                        };
                                        init();
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
                        //确定并关闭弹窗
                        $scope.ok=function(){
                            $modalInstance.close();
                            ctrl.doPayCallback();//回调控制器中的方法
                        };

                        //取消并关闭弹窗
                        $scope.cancel=function(){
                            $modalInstance.dismiss();
                        }
                    }
                }).result.then(function (record) {
                });
            };
            var negativeMoney = function () {
                $modal.open({
                    templateUrl: 'template/mc/payment/negativeMoney.modal.html',
                    resolve: {
                        confirmCondition:function () {
                            return $scope.payData
                        }
                    },
                    controller: function ($scope, $modalInstance,confirmCondition,$$payment,$rootScope,$$code) {
                        $scope.negativeMoney = confirmCondition;
                        //币种双击域赋值
                        $scope.negativeMoney.currency3 =  $$code.getCodeName($scope.negativeMoney.currency2,"Currency");
                        $scope.cancel=function(){
                            $modalInstance.dismiss();
                        };
                        //币种与兑换率二级联动
                        $scope.findExchangeRate = function () {
                            $$payment.findExchangeRate($scope.negativeMoney,{
                                success:function (data) {
                                    console.log(data);
                                    if(data.content.resultCode=="0000"){
                                        $scope.negativeMoney.exchangeRate = data.content.exchangeRate;
                                        $scope.countFee();
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }
                                },
                                error:function () {

                                }
                            });
                        };

                        //通过兑换率计算实收金额
                        $scope.countFee = function () {
                            $scope.negativeMoney.sumFeeCny = $scope.negativeMoney.sumFee*$scope.negativeMoney.exchangeRate
                        };

                        //通过实收金额计算汇率
                        $scope.countRate = function () {
                            $scope.negativeMoney.exchangeRate=$scope.negativeMoney.sumFeeCny/$scope.negativeMoney.sumFee;
                        };

                        //收付方式触发银行账号查询
                        $scope.payWayAccount = function () {
                            if($scope.negativeMoney.payWay == "222"){
                                $scope.payWay = {
                                    "payFlag":"2",
                                    "centetCode":$rootScope.centerCode
                                };
                                $$payment.payWayAccount($scope.payWay,{
                                    success:function (data) {
                                        console.log(data);
                                        var payWayObj = {};
                                        var payWaySelList = [];
                                        $.each(data.content.content,function(index,obj){
                                            payWayObj['code'] = obj.bankAccountNo;
                                            payWayObj['value'] = '-'+obj.bankName;
                                            payWaySelList.push(angular.copy(payWayObj));
                                        })
                                        $scope.payWayBank = payWaySelList;
                                    },
                                    error:function () {

                                    }
                                })
                            }
                        };

                        $scope.negativeMoneySubmit = function () {
                            //TODO 暂时只有一条
                            $scope.negativeMoney.prpJtrannsactionPayWayDto =[{
                                "payWay":$scope.negativeMoney.payWay,
                                "accountNo":$scope.negativeMoney.accountNo,
                                "currency2":$scope.negativeMoney.currency2,
                                "remark":$scope.negativeMoney.remark
                            }];
                            $$payment.negativePay($scope.negativeMoney,{
                                success:function (data) {
                                    console.log(data);
                                    if(data.content.resultCode=="0000"){
                                        layer.msg(data.content.resultMsg,{icon:1});
                                        $modalInstance.close();
                                        ctrl.doPayCallback();//回调控制器中的方法
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }
                                },
                                error:function () {

                                }
                            })
                        }
                    }
                }).result.then(function (record) {
                });
            };
        }])


});