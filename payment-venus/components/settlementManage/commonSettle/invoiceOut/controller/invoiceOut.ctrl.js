/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 *  联共保结算--进项发票转出
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp) {
    'use strict';
    var InvoiceOutCtrl = function ($scope, $$invoiceOut,$modal, $state,mcMultiEditorCacheService) {
        /**
         * tab
         */
        $scope.changeTapA=function (index) {
            if(index=='1'){
                $scope.invoiceOut.change='B';
            }else {
                $scope.invoiceOut.change='C';
            }
        };
        /**
         * 重置
         */
        $scope.invoiceOutReset=function () {
          $scope.invoiceOut.invoiceOutQuery={
              "visaSerialNo":"",
              "invoiceCode":""
          }
        };
        /**
         *全部--查询
         */
        $scope.invoiceOutQuery=function(target){
            //菜单权限
            $scope.invoiceOut.invoiceOutQuery.webCenterCode=$scope.centerCode;
            $scope.invoiceOut.invoiceOutQuery.webUserCode=$scope.usercode;
            $scope.invoiceOut.invoiceOutQuery.webComCode=$scope.comCode;
            $scope.invoiceOut.invoiceOutQuery.webTaskCode="payment.invoice.everySettle.inputinvoicetransfer";
            if($scope.invoiceOut.invoiceOutQuery.invoiceCode =='' || $scope.invoiceOut.invoiceOutQuery.visaSerialNo == ''){
                layerMsg('请输入带红*的所有项！');
            }else{
                $$invoiceOut.invoiceOutQuery($scope.invoiceOut.invoiceOutQuery,{
                    success: function (data) {
                        if(data && data.content){
                            $scope.invoiceOut.invoiceOutList=data.content;
                            if($scope.invoiceOut.invoiceOutList && $scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistMainDtoList && $scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistMainDtoList.length<1 && $scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistLoanDtoList && $scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistLoanDtoList.length<1){
                                if(target=='alert'){
                                    layerMsg('暂无数据！');
                                }
                                return false
                            }
                        }else{
                            layerMsg('失败！');
                        }
                    },
                    error: function (e,code) {
                        if (options && options.error && typeof(options.error) == 'function')
                            options.error(e);
                    }
                });
            }
        };
        /**
         * 全部--校验
         */
        $scope.verify=function () {
            $.each($scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistMainDtoList, function (index, _list) {
                if (!_list.reverseInvoiceCode || !_list.reverseVisaSerialNo || !_list.printDate) {
                    layerMsg('请录入完整信息！');
                } else {
                    var date = new Date();
                    var time = date.getFullYear() + ( (date.getMonth() + 1) < 10 ? 0 : '') + (date.getMonth() + 1) +
                        (date.getDate() < 10 ? 0 : '') + date.getDate() + (date.getHours() < 10 ? 0 : '') + date.getHours() +
                        (date.getMinutes() < 10 ? 0 : '') + date.getMinutes() + (date.getSeconds() < 10 ? 0 : '') + date.getSeconds();
                    if ($scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistMainDtoList && $scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistMainDtoList.length > 0) {
                        $.each($scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistMainDtoList, function (index, list) {
                            var queryNo = 'QX' + '|' + 'PAYMENT' + '|' + list.reverseInvoiceCode + '|' + list.reverseVisaSerialNo + '|' + time;
                            list.queryBatchNo=queryNo;
                            //复制数据判断校验后数据是否又改变
                            $scope.copyCode = angular.copy(list.reverseInvoiceCode);
                            $scope.copyNo = angular.copy(list.reverseVisaSerialNo);
                            layerMsg("校验成功！", "success");
                        });
                    }
                }
            });
        };
        /**
         *全部--确认
         */
        $scope.invoiceOutConfirm=function () {
            $.each($scope.invoiceOut.invoiceOutList.prpjInputInvoiceRegistMainDtoList,function (index,list) {
                if(!list.queryBatchNo){
                    layerMsg('请录入完整信息并校验！');
                }else if($scope.copyNo!=list.reverseVisaSerialNo || $scope.copyCode!=list.reverseInvoiceCode){
                    layerMsg('请重新校验！');
                }else{
                    $$invoiceOut.invoiceOutConfirm($scope.invoiceOut.invoiceOutList,{
                        success: function (data) {
                            if(data && data.code){
                                if(data.code=='0000'){
                                    layerMsg(data.message,'success');
                                }
                            }else{
                                layerMsg('失败！');
                            }
                        },
                        error: function (e,code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        }
                    });
                }
            });
        };
        /**
         * 部分--计算
         */
        $scope.$watch('invoiceOut.invoiceOutSome.ntVisaFee', function(newVal, oldVal) {
            $scope.$watch('invoiceOut.invoiceOutSome.vATaxFee', function(_newVal, _oldVal) {
                if(_newVal && newVal){
                    $scope.invoiceOut.invoiceOutSome.visaFee=((_newVal*1)+(newVal*1)).toFixed(2);
                }else{
                    $scope.invoiceOut.invoiceOutSome.visaFee='';
                }
            });
        });
        /**
         *部分-校验
         */
        $scope.checkOut=function () {
            if(!$scope.invoiceOut.invoiceOutSome.inputProject || !$scope.invoiceOut.invoiceOutSome.vATaxRate || !$scope.invoiceOut.invoiceOutSome.taxPayerNo || !$scope.invoiceOut.invoiceOutSome.salePayerNo || !$scope.invoiceOut.invoiceOutSome.visaFee || !$scope.invoiceOut.invoiceOutSome.vATaxFee || !$scope.invoiceOut.invoiceOutSome.ntVisaFee || !$scope.invoiceOut.invoiceOutSome.invoiceCode || !$scope.invoiceOut.invoiceOutSome.visaSerialNo || !$scope.invoiceOut.invoiceOutSome.printDate){
                layerMsg("请录入完整信息！");
            }else{
                var date = new Date();
                var time = date.getFullYear() + ( (date.getMonth() + 1) < 10 ? 0 : '') + (date.getMonth() + 1) +
                    (date.getDate() < 10 ? 0 : '') + date.getDate() + (date.getHours() < 10 ? 0 : '') + date.getHours() +
                    (date.getMinutes() < 10 ? 0 : '') + date.getMinutes() + (date.getSeconds() < 10 ? 0 : '') + date.getSeconds();
                $scope.invoiceOut.invoiceOutSome.queryBatchNo='QX'+'|'+'PAYMENT'+'|'+$scope.invoiceOut.invoiceOutSome.invoiceCode+'|'+$scope.invoiceOut.invoiceOutSome.visaSerialNo+'|'+time;
                //复制数据判断校验后数据是否又改变
                $scope.copyInvoiceCode=angular.copy($scope.invoiceOut.invoiceOutSome.invoiceCode);
                $scope.copyVisaSerialNo=angular.copy($scope.invoiceOut.invoiceOutSome.visaSerialNo);
                layerMsg("校验成功！","success");
            }
        };
        /**
         *部分--确认
         */
        $scope.invoiceOutSomeConfirm=function () {
            if(!$scope.invoiceOut.invoiceOutSome.queryBatchNo){
                layerMsg("请录入完整信息并校验！");
            }else if($scope.copyInvoiceCode!=$scope.invoiceOut.invoiceOutSome.invoiceCode || $scope.copyVisaSerialNo!=$scope.invoiceOut.invoiceOutSome.visaSerialNo){
                layerMsg('请重新校验！');
            }else{
                $scope.invoiceOut.data.prpjVatInputInvoiceDtoList=$scope.invoiceOut.invoiceOutSomeList || [];
                $scope.invoiceOut.data.prpJInputInvoiceRegistMainDto = $scope.invoiceOut.invoiceOutSome || {};
                $$invoiceOut.invoiceOutSomeConfirm($scope.invoiceOut.data,{
                    success: function (data) {
                        if(data && data.code){
                            if(data.code=="0000"){
                                layerMsg(data.message,'success');
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
        /**
         *部分--增加
         */
        $scope.invoiceOutAdd=function(selected){
            $modal.open({
                templateUrl:'components/settlementManage/commonSettle/invoiceOut/tpl/modal/PendingInvoiceInfo.modal.html',
                resolve:{
                    selected:function(){
                        return angular.copy(selected);
                    },
                    centerCode:function(){
                        return $scope.centerCode;
                    },
                    usercode:function(){
                        return $scope.usercode;
                    }
                },
                controller:function($scope,$modalInstance,selected,centerCode,usercode){
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };

                    //modal2查询
                    $scope.invoiceOutsearch=function(target){
                        $scope.invoiceOut.someAdd.webCenterCode=centerCode;
                        $scope.invoiceOut.someAdd.webUserCode=usercode;
                        $scope.invoiceOut.someAdd.webComCode=$scope.comCode;
                        $scope.invoiceOut.someAdd.webTaskCode="payment.invoice.everySettle.inputinvoicetransfer";
                        $scope.invoiceOut.cck.checkAll=false;
                        if($scope.invoiceOut.someAdd.coinsName =='' && $scope.invoiceOut.someAdd.certiNoList =='' && $scope.invoiceOut.someAdd.certiNo1 ==''&& $scope.invoiceOut.someAdd.certiNo2 =='' ){
                            layerMsg('请输入带红*的任意一项！');
                        }else{
                            $$invoiceOut.invoiceOutsearch($scope.invoiceOut.someAdd,{
                                    success: function (data) {
                                        if(data && data.content && data.content.prpjVatInputInvoiceDtoList){
                                            $scope.invoiceOutSomeList=data.content.prpjVatInputInvoiceDtoList;
                                            //全选是否置灰
                                            $.each($scope.invoiceOutSomeList,function (index,list) {
                                                if($scope.invoiceOutSomeList[0].coinsCode!=list.coinsCode){
                                                    $scope.invoiceOut.cck.disabled=true;
                                                }
                                            });
                                            //已勾选数据和查询的数据对比
                                            if($scope.selected && $scope.selected.length>0){
                                                $.each($scope.selected,function (index,list2) {
                                                    if($scope.invoiceOutSomeList && $scope.invoiceOutSomeList.length>0) {
                                                        $.each($scope.invoiceOutSomeList,function (index,list) {
                                                            if(list.certiType == list2.certiType && list.certiNo ==list2.certiNo && list.serialNo==list2.serialNo && list.payRefReason==list2.payRefReason){
                                                                list.checked=true;
                                                                $scope.selectedPayOne();
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                            if($scope.invoiceOutSomeList.length<1){
                                                if(target=='alert'){
                                                    layerMsg('暂无数据！');
                                                }
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
                     *重置
                     */
                    $scope.reset = function () {
                        $scope.invoiceOut.someAdd={
                            "coinsName":'',
                            "chargeType":'ALL',
                            "certiNoList":'',
                            "certiNo1":'',
                            "certiNo2":'',
                            "printType":'2',  //区分进项和部分查询
                            "containsHisData":'2'
                        };
                    };
                    /**
                     * 更改选中样式  记录勾选数据
                     *  invoice 当前勾选数据
                     */
                    $scope.checkedBoxChanged=function(invoice){
                        changeCheckStatus(invoice);//控制复选框可选状态
                    };
                    /**
                     * 控制复选框可选状态
                     *  invoice
                     */
                    var changeCheckStatus = function(invoice){
                        if(invoice){
                            if(invoice.checked){
                                $scope.invoiceOut.status.coinsCode=invoice.coinsCode;
                                $scope.invoiceOut.status.disabled=false;
                            }else if(!$scope.invoiceOutSomeList.some(checkedCurrency1)) {
                                $scope.invoiceOut.status.disabled=true;
                            }
                        }
                    };
                    /**
                     * 判断复选框是否勾选
                     *  item
                     */
                    var checkedCurrency1 = function(item){
                        return item.checked;
                    };

                    /**
                     * 勾选全选
                     */
                    $scope.selectedPayAll = function () {
                        angular.forEach($scope.invoiceOutSomeList, function (data) {
                            if ($scope.invoiceOut.cck.checkAll) {
                                data.checked = true;
                            } else{
                                data.checked = false;
                            }
                        });
                    };

                    /**
                     *单选
                     */
                    $scope.selectedPayOne = function () {
                        $scope.invoiceOut.cck.checkAll = $scope.invoiceOutSomeList.every(function (item, index, array) {
                            return item.checked;
                        });
                    };

                    /**
                     *部分--modal--确定
                     */
                    $scope.confirm = function () {
                        if($scope.invoiceOutSomeList && $scope.invoiceOutSomeList.length>0) {
                            $scope.selected = [];//清空原数组已勾选的
                            $.each($scope.invoiceOutSomeList,function (index,list) {
                                if (list.checked){
                                    $scope.selected.push(list);
                                }
                            });
                        }
                        $modalInstance.close($scope.selected);

                    };
                    /**
                     *初始化
                     */
                    var init =function(){
                        $scope.invoiceOut=$$invoiceOut.invoiceOut();
                        //已勾选数据
                        $scope.selected=selected || [];
                        if($scope.selected.length>0){
                            $scope.invoiceOut.status.coinsCode=$scope.selected[0].coinsCode;
                            $scope.invoiceOut.status.disabled=false;
                        }
                    };
                    init();
                }
            }).result.then(function (_data) {
                info(_data);
            });
            var info = function (_data) {
                $scope.invoiceOut.invoiceOutSomeList=_data;
            };
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('invoiceOut');//获取上次数据
            if(localDada){
                $scope.invoiceOut=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('invoiceOut',$scope.invoiceOut);//存储数据
        };
        /**
         *初始化
         */
        var init =function(){
            $scope.invoiceOut=$$invoiceOut.invoiceOut();
            getLastData();//获取数据
            saveData();
        };
        init();

    };

    moduleApp.controller('InvoiceOutCtrl', ['$scope', '$$invoiceOut','$modal','$state','mcMultiEditorCacheService',InvoiceOutCtrl]);

});
