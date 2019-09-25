/**
 * Created by Administrator on 2017-10-24.
 * 再保代扣代缴-代扣代缴实付控制器
 */
define([
    '../module',
    'config'
],function (moduleApp,config) {
    'use strict';
    var WithholdingPay=function($scope,$modal,$$WithholdingPay,$$util,$$venus) {
        var selectedNum = 0;
        $scope.WithHoldStatements={
            "withHoldNoStart":"",
            "withHoldNoEnd":"",
            "withHoldNoList":"",
            "settleNoStart":"",
            "settleNoEnd":"",
            "settleNoList":"",
            "freinsName":"",
            "freinsNameSign":"=",
            "settleStartDate":"",
            "settleEndDate":"",
            "operateStartDate":"",
            "operateEndDate":"",
            "currency":"",
            "userDto":{
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$scope.comCode
            }
        };
        /**
         *全选
         */
        $scope.checkedAllCondition=function(allFlag,objList){
            $.each(objList,function(index,obj){
                if($scope.collectionCheckedAll){
                    obj.checked=true;
                }else obj.checked=false;
            });
        };
        /**
         * 单选
         */
        $scope.checkedCondition=function(){
            $scope.collectionCheckedAll=$scope.ConditionList.every(function(item,index,array){
                return item.checked;
            })
        }
        /**
         *勾选改变状态
         */
        $scope.selectedChangeClass=function(objList){
            if (objList == $scope.ConditionList){
                selectedNum = 0;
                angular.forEach(objList,function(data){
                    if(data.checked){
                        data.changeClass='venus_table_check';
                        selectedNum++
                    }
                    else {
                        data.changeClass=''
                    }
                });
                $scope.selectedNum = selectedNum;
            };
        };
        /**
         * 代扣代缴实付列表查询
         */
        $scope.ConditionsSearch = function (target,index) {
            $scope.collectionCheckedAll = false;
            selectedNum = 0;
            $scope.selectedNum = selectedNum;
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            if($scope.Condition.withHoldNoStart&&$scope.Condition.withHoldNoEnd){
                if($scope.Condition.withHoldNoEnd<$scope.Condition.withHoldNoStart){
                    layerMsg("代扣代缴单号（从）不能大于代扣代缴单号（到）！");
                    return false
                }
            }
            if($scope.Condition.settleNoEnd&&$scope.Condition.settleNoStart){
                if(($scope.Condition.settleNoEnd<$scope.Condition.settleNoStart)){
                    layerMsg("结算单号（从）不能大于结算单号（到）！");
                    return false
                }
            }
            if(($scope.Condition.settleStartDate&&!$scope.Condition.settleEndDate)||(!$scope.Condition.settleStartDate&&$scope.Condition.settleEndDate)){
                layerMsg("日期起期和日期止期必须同时输入或不输入！");
                return false
            }else if($scope.Condition.settleEndDate&&$scope.Condition.settleStartDate){
                if(($scope.Condition.settleEndDate>=$scope.Condition.settleStartDate)){

                }else {
                    layerMsg("日期起期不能大于日期止期！");
                    return false
                }
            }
            if(($scope.Condition.operateStartDate&&!$scope.Condition.operateEndDate)||(!$scope.Condition.operateStartDate&&$scope.Condition.operateEndDate)){
                layerMsg("日期起期和日期止期必须同时输入或不输入！");
                return false
            }else if(($scope.Condition.operateStartDate&&$scope.Condition.operateEndDate)){
                if(($scope.Condition.operateEndDate>=$scope.Condition.operateStartDate)){

                }else {
                    layerMsg("日期起期不能大于日期止期！");
                    return false
                }

            };
            $scope.Condition.userDto={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$scope.comCode
            };
            $$WithholdingPay.find('ConditionsSearch',{
                "withHoldNoStart":$scope.Condition.withHoldNoStart||'',
                "withHoldNoEnd":$scope.Condition.withHoldNoEnd||'',
                "withHoldNoList":$scope.Condition.withHoldNoList||'',
                "settleNoStart":$scope.Condition.settleNoStart||'',
                "settleNoEnd":$scope.Condition.settleNoEnd||'',
                "settleNoList":$scope.Condition.settleNoList||'',
                "freinsName":$scope.Condition.freinsName||'',
                "freinsNameSign":$scope.Condition.freinsNameSign||'',
                "settleStartDate":$scope.Condition.settleStartDate||'',
                "settleEndDate":$scope.Condition.settleEndDate||'',
                "operateStartDate":$scope.Condition.operateStartDate||'',
                "operateEndDate":$scope.Condition.operateEndDate||'',
                "taskCode":'payment.withholding.agent',
                "userDto":$scope.Condition.userDto,
                //"globalUserCode":$scope.usercode||'',
                "globalUserCode":'',
                "powerSystemCode":$scope.Condition.powerSystemCode||''
            },{
                success:function (data) {
                    $scope.ConditionList = data.content;
                    if(!index&&$scope.ConditionList.length<1){
                        layerMsg('暂无数据！');
                    }
                    $scope.pagination.totalItems = data.totalCount;
                },
                error:function (d) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex,
                "pageSize": $scope.pagination.pageSize
            })

        };
        /**
         * 重置表单
         */
        $scope.resetCondition=function(){
            $scope.Condition={
            };
        };
        $scope.centerCode=$scope.centerCode
        /**
         * 实付操作
         */
        $scope.PaidOperation = function(target){
            $modal.open({
                templateUrl:"components/reinsuranceWithholding/WithholdingPay/tpl/modal/WithholdingPay.PaidOperation.modal.tpl.html",
                resolve:{
                    target:function(){
                        return target
                    },
                    user:function(){
                        return $scope.user
                    },
                    centerCode:function(){
                        return $scope.centerCode
                    }

                },
                controller:function ($scope,$modalInstance,target,$$venus,user,$timeout,centerCode) {
                    $scope.centerCode=centerCode;
                    $scope.user=user;
                    var a=[];
                    var obj1={};
                    var totalFee='';
                    var obj2={"payRefNoType":"VJP02"};
                    $.each(target,function(index,obj){
                        if(obj.checked){
                            obj2['withHoldNo']=obj.withHoldNo;
                            a.push(angular.copy(obj2));
                            obj1.paymentVerifyQueryList = a;
                        }
                        obj1.userDto={
                            "userCode":$scope.user.userCode,
                            "userName":$scope.user.userName,
                            "comCode":$scope.user.comCode,
                        }
                    });
                    $$WithholdingPay.paymentVerifyQuery(obj1,{
                        success:function (data) {
                            $scope.Operations=data.prpjReinsWithHoldingTaxList;
                            $.each($scope.Operations,function(index,obj){
                                totalFee= $$util.floatAdd(obj.payVaTaxTotalFeeCNY,totalFee);
                            });
                            //获取收付方式
                            $$venus.getPayWay($scope.user.comCode,{
                                success:function (data){
                                    var payWayObj={};
                                    var payWayList=[];
                                    $.each(data.content,function(index,obj){
                                        payWayObj['code']=obj.payWayCode;
                                        payWayObj['value']=obj.payWayCName;
                                        payWayList.push(angular.copy(payWayObj));
                                    })
                                    $scope.payWayList=payWayList
                                },
                                error:function(e){
                                }
                            });

                            //获取银行账户
                            $$venus.getSelBank($scope.Operations[0].currency1,{
                                success:function (data){
                                    var SelBankObj={};
                                    var BankAccountNoList=[];
                                    $.each(data.accountList,function(index,obj){
                                        SelBankObj['code']=obj.bankAccountNo;
                                        if(obj.accountType == 1){
                                            SelBankObj['value']=obj.bankAccountNo+"-收入户";
                                        }else if(obj.accountType == 2){
                                            SelBankObj['value']=obj.bankAccountNo+"-支出户";
                                        }
                                        BankAccountNoList.push(angular.copy(SelBankObj))
                                    })
                                    $scope.AccountNoList=BankAccountNoList
                                },
                                error:function(e){
                                }
                            });
                            if($scope.Settlement==""){
                                layerMsg('暂无数据！');
                                return false
                            };
                            $scope.VerifyDtoList=[
                                {
                                    "currency":'CNY',
                                    "payWay":"212",
                                    "accountNo":"1232131241221",
                                    "payRefFee":totalFee,
                                    "payRefFeeCNY":100,
                                    "currentCode":"Liberty Mutual Europe"

                                }
                            ];
                            //差额合计
                            $scope.balance = function(target){
                                target.diffTaxFeeCNY = target.payVaTaxTotalFeeCNY-target.vaTaxTotalFeeCNY;
                                totalFee=0;
                                $.each($scope.Operations,function(index,obj){
                                    totalFee= $$util.floatAdd(obj.payVaTaxTotalFeeCNY,totalFee);
                                });
                                $scope.VerifyDtoList=[
                                    {
                                        "currency":'CNY',
                                        "payWay":"212",
                                        "accountNo":"1232131241221",
                                        "payRefFee":totalFee,
                                        "payRefFeeCNY":100,
                                        "currentCode":"Liberty Mutual Europe"

                                    }
                                ]

                            };

                        },
                        error:function () {
                        }
                    });

                    var saveDetail=totalFee;//临时存放上一次数据
                    //金额改变添加列函数
                    $scope.payFeeVChange=function(target,index){
                        //如果只剩一列暂存数据恢复初始数据
                        if( $scope.VerifyDtoList.length==1){
                            saveDetail=totalFee
                        }
                        if(!target||target==0) {
                            layerMsg('输入金额不能小于等于0！')
                            $scope.VerifyDtoList[index].payRefFee=saveDetail;
                            return false
                        }
                        //定义一个添加修改数据的方法
                        var changeCount=function(target){
                            return saveDetail-target;
                        };
                        //定义一个添加数组对象
                        var feeObj={
                            "currency":'CNY',
                            "payWay":"212",
                            "accountNo":"1232131241221",
                            "payRefFee": changeCount(target),
                            "payRefFeeCNY":100,
                            "currentCode":"Liberty Mutual Europe"
                        }
                        //如果修改的数据小于剩余数据则执行
                        if(target<saveDetail){
                            var newListDetail=angular.copy(feeObj);
                            $scope.VerifyDtoList.push(newListDetail);
                            saveDetail=changeCount(target);
                        }
                        else if(target>saveDetail){
                            $scope.VerifyDtoList[index].payRefFee=saveDetail
                        }
                    };
                    //删除按钮
                    $scope.deleteAccount=function(index) {
                        var totalListCount = 0;
                        if ($scope.VerifyDtoList.length == '1') {
                            layerMsg('唯一项不可删除！');
                            return false;
                        }
                        if(index<$scope.VerifyDtoList.length-1){
                            layerMsg('请先删除最后选项！');
                            return false;
                        }
                        $scope.VerifyDtoList.splice(index, 1);
                        angular.forEach($scope.VerifyDtoList, function (data) {
                            totalListCount = $$util.floatAdd(data.payRefFee, totalListCount);
                        });
                        $scope.VerifyDtoList[index-1].payRefFee=totalFee-totalListCount+parseInt($scope.VerifyDtoList[index-1].payRefFee);
                    };
                    $scope.submit=function(){
                        var b = [];
                        var a = []
                        var obj3 = {};
                        var obj4 = {};
                        var totalFee1='';
                        $.each($scope.Operations, function (index, obj) {
                            totalFee1= $$util.floatAdd(obj.payVaTaxTotalFeeCNY,totalFee1);
                            obj4['withHoldNo'] = obj.withHoldNo||'';
                            obj4['taxPayBookNo'] = obj.taxPayBookNo||'';
                            obj4['payVaTaxTotalFeeCNY'] = parseFloat(obj.payVaTaxTotalFeeCNY)||'';
                            obj4['payVaTaxFeeCNY'] = parseFloat(obj.payVaTaxFeeCNY)||'';
                            obj4['diffTaxFeeCNY'] = parseFloat(obj.diffTaxFeeCNY)||0;
                            obj4['remark'] = obj.remark||'';
                            obj4['comCode'] = obj.comCode||'';
                            b.push(angular.copy(obj4));
                            obj3.paymentVerifyQueryList = b;
                        });
                        $.each($scope.VerifyDtoList, function (index, obj) {
                            obj.payWay = obj.payWay||'';
                            obj.accountNo = obj.accountNo||'';
                            a.push(angular.copy(obj));
                            obj3.paymentWayVerifyDtoList = a;
                        });
                        obj3.payRefNoType="VJP02";
                        obj3.sumPayRefFee=totalFee1;
                        obj3.centerCode=$scope.centerCode
                        obj3.strPayRefDate=new Date().dateConversion();
                        obj3.userDto={
                            "userCode":$scope.user.userCode,
                            "userName":$scope.user.userName,
                            "comCode":$scope.user.comCode,
                        }
                        console.log(obj3);
                        //实付查询确认接口
                        $scope.test1=function(){
                            $$venus.Focus(
                                "modalTest"
                            ).then(
                                function (Ele) {
                                    if (angular.isDefined(Ele)) {
                                        $timeout(function () {
                                            Ele.focus();
                                        },1000)
                                    } else {
                                        $$WithholdingPay.paymentVerifyResultQuery(obj3, {
                                            success: function (data) {
                                                if(data.resultCode=="9999"){
                                                    layerMsg(data.resultMsg);
                                                    return false
                                                }
                                                $scope.credentials = data
                                                if ($scope.credentials == "") {
                                                    $modalInstance.close($scope.credentials);
                                                    layerMsg('暂无数据！');
                                                    return false
                                                }else {
                                                    $modalInstance.close($scope.credentials);
                                                }
                                            },
                                            error: function () {
                                            }
                                        })
                                    }
                                }
                            );
                        };
                    };
                    $scope.cancel = function () {
                        $modalInstance.close('search');
                    };
                }
            }).result.then(function(reword){
                if(reword=='search'){
                    $scope.ConditionsSearch('page',true);
                }else if(reword){
                    $scope.modalTest(reword)
                }
            })
        }
        $scope.modalTest=function(_list){
            $modal.open({
                templateUrl: "components/reinsuranceWithholding/WithholdingPay/tpl/modal/WithholdingPay.submit.modal.tpl.html",
                resolve: {
                    target: function () {
                        return _list
                    }
                },
                controller: function ($scope, $modalInstance,target) {
                    $scope.credentials=target.intfSubVoucherList;
                    $scope.payRefNo=target.payRefNo;
                    //凭证复核
                    $scope.Submit = function () {
                        var A = {};
                        A.PayRefNo = $scope.payRefNo
                        $$WithholdingPay.voucherReview(A, {
                            success: function (data) {
                                $modalInstance.close(data);
                            },
                            error: function () {
                            }
                        })
                    }
                    $scope.Cancel = function () {
                        $$WithholdingPay.voucherCancel({
                            "payRefNo":$scope.payRefNo,
                            "modifyReason":"操作失误"
                        }, {
                            success: function (data) {
                                $modalInstance.close(data);
                            },
                            error: function () {
                            }
                        })
                    };

                    console.log($scope.remake);
                    $scope.cancel = function () {
                        $modalInstance.close('search');
                    };
                }
            }).result.then(function(reword){
                if (reword.resultCode == "0000"&&reword.resultMsg == "实收凭证取消成功！") {
                    layer.msg('凭证已取消，代扣代缴单号'+reword.withHoldingNoList+'已还原到未实付状态，请重新实付！',{icon: 1});
                    $scope.ConditionsSearch('page',true);
                    return false;
                }else if(reword == 'search'){
                    $scope.ConditionsSearch('page',true);
                    return false;
                }else if(reword.resultCode == "0000"){
                    layer.msg(reword.resultMassage,{icon: 1});
                    $scope.ConditionsSearch('page',true);
                    return false;
                }else {
                    layerMsg('处理失败')
                }
            })

        }
        /**
         * 初始化函数
         */
        var init=function(){
            $scope.pagination={
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'15',//显示条数
                maxSize:'5',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            }
            $scope.Condition={
                "collectionCheckedAll":false,
                "withHoldNoStart":'',
                "withHoldNoEnd":'',
                "withHoldNoList":'',
                "settleNoStart":'',
                "settleNoEnd":'',
                "settleNoList":'',
                "freinsName":'',
                "freinsNameSign":"=",
                "Currency1":'',
                "settleStartDate":'',
                "settleEndDate":'',
                "operateStartDate":'',
                "operateEndDate":'',
                "userDto":{
                    "userCode":$scope.usercode,
                    "userName":$scope.userName,
                    "comCode":$scope.comCode
                }
            };
            $scope.infoFlag=true;
            $scope.collectionCheckedAll = false;
        };
        init();
    }
    moduleApp.controller('WithholdingPayCtrl',['$scope','$modal','$$WithholdingPay','$$util',WithholdingPay]);
});