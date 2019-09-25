/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 *  联共保结算--进项发票登记
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp) {
    'use strict';
    var InvoiceRegisterCtrl = function ($scope, $$invoiceRegister,$modal,state,mcMultiEditorCacheService) {
        /**
         *查询
         */
        $scope.invoiceQuery=function(){
            //菜单权限
            $scope.invoiceRegister.query.webCenterCode=$scope.centerCode;
            $scope.invoiceRegister.query.webUserCode=$scope.usercode;
            $scope.invoiceRegister.query.webComCode=$scope.comCode;
            $scope.invoiceRegister.query.webTaskCode="payment.invoice.everySettle.inputinvoiceregi";
            if($scope.invoiceRegister.moreFlag){
                if($scope.invoiceRegister.query.invoiceCode =='' && $scope.invoiceRegister.query.visaSerialNo  =='' && $scope.invoiceRegister.query.certiNo1 =='' && $scope.invoiceRegister.query.certiNo2  ==''&& $scope.invoiceRegister.query.certiNoList  ==''&& $scope.invoiceRegister.query.invoiceRegistStartDate  ==''&& $scope.invoiceRegister.query.invoiceRegistEndDate  ==''){
                    layerMsg('请输入带红*的任意一项！');
                }else if($scope.invoiceRegister.query.invoiceRegistStartDate < $scope.invoiceRegister.query.invoiceRegistEndDate || $scope.invoiceRegister.query.invoiceRegistEndDate ==''){
                    $$invoiceRegister.invoiceQuery($scope.invoiceRegister.query,{
                        success: function (data) {
                            if(data && data.content && data.content.prpjInputInvoiceRegistMainDtoList){
                                $scope.invoiceRegister.invoiceRegisterList=data.content.prpjInputInvoiceRegistMainDtoList;
                                if($scope.invoiceRegister.invoiceRegisterList && $scope.invoiceRegister.invoiceRegisterList.length<1){
                                    layerMsg('暂无数据！');
                                    return false;
                                }
                            }
                        },
                        error: function (e,code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        }
                    });
                }else {
                    layerMsg('发票登记起期必须小于发票登记止期！');
                }
            }else{
                if($scope.invoiceRegister.query.certiNo1){
                    $$invoiceRegister.invoiceQuery($scope.invoiceRegister.query,{
                        success: function (data) {
                            if(data && data.content && data.content.prpjInputInvoiceRegistMainDtoList){
                                $scope.invoiceRegister.invoiceRegisterList=data.content.prpjInputInvoiceRegistMainDtoList;
                                if($scope.invoiceRegister.invoiceRegisterList && $scope.invoiceRegister.invoiceRegisterList.length<1){
                                    layerMsg('暂无数据！');
                                    return false;
                                }
                            }
                        },
                        error: function (e,code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        }
                    });
                }else{
                    layerMsg('请输入保/批单号！');
                }
            }
        };
        /**
         * 重置
         */
        $scope.invoiceReset=function () {
            $scope.invoiceRegister.query={
                "invoiceCode":"",//发票代码
                "visaSerialNo":"",//发票号码
                "certiNo1":"",//从
                "certiNo2":"",//到
                "certiNoList":"",//保/批单号列表
                "chargeType":"ALL",//费用类型
                "invoiceRegistStartDate":"",//发票登记起期
                "invoiceRegistEndDate":""//发票登记止期
            }
        };
        /**
         * 发票新增
         */
        $scope.invoiceNew=function(){
            $modal.open({
                templateUrl:'components/settlementManage/commonSettle/invoiceRegister/tpl/modal/invoiceNew.modal.html',
                resolve:{
                    centerCode:function(){
                        return $scope.centerCode;
                    },
                    usercode:function(){
                        return $scope.usercode;
                    }
                },
                controller:function($scope,$modalInstance,$modal,$$invoiceRegister,centerCode,usercode){
                    // 关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //计算
                    $scope.$watch('invoiceRegister.ntVisaFee', function(newVal, oldVal) {
                        $scope.$watch('invoiceRegister.vATaxFee', function(_newVal, _oldVal) {
                            if(_newVal && newVal){
                                $scope.invoiceRegister.visaFee=((_newVal*1)+(newVal*1)).toFixed(2);
                            }else{
                                $scope.invoiceRegister.visaFee='';
                            }
                        });
                    });
                    //校验
                    $scope.checkOut=function () {
                        if(!$scope.invoiceRegister.inputProject || !$scope.invoiceRegister.vATaxRate || !$scope.invoiceRegister.taxPayerNo || !$scope.invoiceRegister.salePayerNo || !$scope.invoiceRegister.visaFee || !$scope.invoiceRegister.vATaxFee || !$scope.invoiceRegister.invoiceCode || !$scope.invoiceRegister.visaSerialNo || !$scope.invoiceRegister.printDate || !$scope.invoiceRegister.ntVisaFee){
                            layerMsg("请录入完整信息！");
                        }else{
                            var date = new Date();
                            var time = date.getFullYear() + ( (date.getMonth() + 1) < 10 ? 0 : '') + (date.getMonth() + 1) +
                                (date.getDate() < 10 ? 0 : '') + date.getDate() + (date.getHours() < 10 ? 0 : '') + date.getHours() +
                                (date.getMinutes() < 10 ? 0 : '') + date.getMinutes() + (date.getSeconds() < 10 ? 0 : '') + date.getSeconds();
                            $scope.invoiceRegister.queryBatchNo='QX'+'|'+'PAYMENT'+'|'+$scope.invoiceRegister.invoiceCode+'|'+$scope.invoiceRegister.visaSerialNo+'|'+time;
                            //复制数据判断校验后数据是否又改变
                            $scope.copyCode=angular.copy($scope.invoiceRegister.invoiceCode);
                            $scope.copyNo=angular.copy($scope.invoiceRegister.visaSerialNo);
                            layerMsg("校验成功！","success");
                        }
                    };
                    //确定
                    $scope.confirm = function () {
                        $scope.canDeductVisaFeeSum=0;//初始化可抵扣含税金额总和
                        $.each($scope.invoiceRegisterList,function (index,list) {
                            $scope.canDeductVisaFeeSum+=list.canDeductVisaFee*1;
                        });
                        if($scope.invoiceRegisterList.length<1){
                            layerMsg("请增加待登记进项发票业务信息！");
                        }else if(!$scope.invoiceRegister.queryBatchNo){
                            layerMsg("请录入完整信息并校验！");
                        }else if($scope.copyNo!=$scope.invoiceRegister.visaSerialNo || $scope.copyCode!=$scope.invoiceRegister.invoiceCode){
                            layerMsg('请重新校验！');
                        }else if($scope.invoiceRegister.visaFee!=$scope.canDeductVisaFeeSum){
                            layerMsg('价税合计金额和可抵扣含税金额总和不一致！');
                        }else{
                            //数据转化
                            $scope.Data.data.prpjVatInputInvoiceDtoList = $scope.invoiceRegisterList || [];
                            $scope.Data.data.prpJInputInvoiceRegistMainDto = $scope.invoiceRegister;
                            $$invoiceRegister.confirm($scope.Data.data,{
                                success: function (data) {
                                    if(data && data.code){
                                        if(data.code=="0000"){
                                            layerMsg(data.message,'success');
                                            $scope.cancel();
                                        }else{
                                            layerMsg("失败！");
                                        }
                                    }else{
                                        layerMsg("失败！");
                                    }
                                },
                                error: function (e,code) {
                                    if (options && options.error && typeof(options.error) == 'function')
                                        options.error(e);
                                }
                            });
                        }
                    };
                    //初始化
                    var init =function(){
                        //实例化对象
                        $scope.invoiceRegisterList=[];
                        $scope.invoiceRegister=$$invoiceRegister.invoiceRegister().info;
                        $scope.Data=$$invoiceRegister.invoiceRegister();
                    };
                    init();
                    //增加
                    $scope.unregInvoiceNew = function (selected) {
                        $modal.open({
                            templateUrl:'components/settlementManage/commonSettle/invoiceRegister/tpl/modal/unregInvoiceNew.modal.html',
                            resolve:{
                                selected:function(){
                                    return angular.copy(selected);
                                }
                            },
                            controller:function ($scope,$modalInstance,$$invoiceRegister,selected) {

                                //modal2查询
                                $scope.search=function(){
                                    //菜单权限
                                    $scope.invoiceData.modalQuery.webCenterCode=centerCode;
                                    $scope.invoiceData.modalQuery.webUserCode=usercode;
                                    $scope.invoiceData.modalQuery.webComCode=$scope.comCode;
                                    $scope.invoiceData.modalQuery.webTaskCode="payment.invoice.everySettle.inputinvoiceregi";
                                    $scope.invoiceData.cck.checkAll=false;//全选框
                                    if($scope.invoiceData.modalQuery.coinsName =='' && $scope.invoiceData.modalQuery.certiNoList =='' && $scope.invoiceData.modalQuery.certiNo1 ==''&& $scope.invoiceData.modalQuery.certiNo2 =='' ){
                                        layerMsg('请输入带红*的任意一项！');
                                    }else{
                                        $$invoiceRegister.search($scope.invoiceData.modalQuery,{
                                                success: function (data) {
                                                    if(data &&data.content&&data.content.prpjVatInputInvoiceDtoList){
                                                        $scope.invoiceRegisterList=data.content.prpjVatInputInvoiceDtoList;
                                                        //全选是否置灰
                                                        $.each($scope.invoiceRegisterList,function (index,list) {
                                                            if($scope.invoiceRegisterList[0].coinsCode!=list.coinsCode){
                                                                $scope.invoiceData.cck.disabled=true;
                                                            }
                                                        });
                                                        //已勾选数据和查询的数据对比
                                                            if($scope.selected && $scope.selected.length>0){
                                                                $.each($scope.selected,function (index,list2) {
                                                                    if($scope.invoiceRegisterList && $scope.invoiceRegisterList.length>0) {
                                                                        $.each($scope.invoiceRegisterList,function (index,list) {
                                                                            if(list.certiType == list2.certiType && list.certiNo ==list2.certiNo && list.serialNo==list2.serialNo && list.payRefReason==list2.payRefReason){
                                                                                list.checked=true;
                                                                                $scope.selectedPayOne();
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        if($scope.invoiceRegisterList.length<1){
                                                            layerMsg('暂无数据！');
                                                            return false
                                                        }
                                                    }
                                                },
                                                error: function (e,code) {
                                                    if (options && options.error && typeof(options.error) == 'function')
                                                        options.error(e);
                                                }
                                            }
                                        );
                                    }
                                };
                                /**
                                 * 重置
                                 */
                                $scope.reset = function () {
                                    $scope.invoiceData.modalQuery={
                                        "coinsName":'',
                                        "chargeType":'ALL',
                                        "certiNoList":'',
                                        "certiNo1":'',
                                        "certiNo2":'',
                                        "printType":'1',    //区别进项登记还是部分转出
                                        "containsHisData":'2'
                                    };
                                };
                                //全选
                                $scope.selectedPayAll=function(){
                                    angular.forEach($scope.invoiceRegisterList,function(data){
                                        if($scope.invoiceData.cck.checkAll){
                                            data.checked=true;
                                        }else{
                                            data.checked=false;
                                        }
                                    });
                                };
                                //单选
                                $scope.selectedPayOne=function(){
                                    $scope.invoiceData.cck.checkAll=$scope.invoiceRegisterList.every(function(item,index,array){
                                        return item.checked;
                                    });
                                };
                                /**
                                 * 更改选中样式  记录勾选数据
                                 * 当前勾选数据
                                 */
                                $scope.checkedBoxChanged=function(invoice){
                                    changeCheckStatus(invoice);//控制复选框可选状态
                                };
                                /**
                                 * 判断复选框是否勾选
                                 */
                                var checkedCurrency1 = function(item){
                                    return item.checked;
                                };
                                /**
                                 * 控制复选框可选状态
                                 */
                                var changeCheckStatus = function(invoice){
                                    if(invoice){
                                        if(invoice.checked){
                                            $scope.invoiceData.status.coinsCode=invoice.coinsCode;
                                            $scope.invoiceData.status.disabled=false;
                                        }else if(!$scope.invoiceRegisterList.some(checkedCurrency1)) {
                                            $scope.invoiceData.status.disabled=true;
                                        }
                                    }
                                };
                                //关闭
                                $scope.cancel = function () {
                                    $modalInstance.dismiss();
                                };
                                /**
                                 *modal2确认
                                 */
                                $scope.confirm = function () {
                                        if($scope.invoiceRegisterList && $scope.invoiceRegisterList.length>0) {
                                            $scope.selected = [];//清空原数组已勾选的
                                            $.each($scope.invoiceRegisterList,function (index,list) {
                                                if (list.checked){
                                                    $scope.selected.push(list);
                                                }
                                            });
                                        }
                                    $modalInstance.close($scope.selected);
                                };
                                var init=function () {
                                    //已勾选数据
                                    $scope.selected=selected || [];
                                    $scope.invoiceData=$$invoiceRegister.invoiceRegister();
                                    if($scope.selected.length>0){
                                        $scope.invoiceData.status.coinsCode=$scope.selected[0].coinsCode;
                                        $scope.invoiceData.status.disabled=false;
                                    }
                                };
                                init();
                            }
                        }).result.then(function (_data) {
                            info(_data);
                        });
                        var info = function (_data) {
                            $scope.invoiceRegisterList=_data;
                        };
                    };

                }
            })
        };
        /**
         *  导出EXCEL
         */
        $scope.downExcel = function () {
            $$invoiceRegister.downExcel($scope.invoiceRegisterList, {
                success: function (data) {
                    if(data.code=="0000"){
                        layerMsg("导出成功！",'success');
                    }else {
                        layerMsg("导出失败！")
                    }
                },
                error: function (e,code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                }
            });
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('invoiceRegister');//获取上次数据
            if(localDada){
                $scope.invoiceRegister=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('invoiceRegister',$scope.invoiceRegister);//存储数据
        };
        var init =function(){
            //实例化对象
            $scope.invoiceRegister=$$invoiceRegister.invoiceRegister();
            //获取上次数据
            getLastData();
            saveData();
        };
        init();

    };

    moduleApp.controller('InvoiceRegisterCtrl', ['$scope', '$$invoiceRegister','$modal','$state','mcMultiEditorCacheService', InvoiceRegisterCtrl]);

});
