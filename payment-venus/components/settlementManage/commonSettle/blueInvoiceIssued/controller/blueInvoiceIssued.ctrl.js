/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 *  联共保结算
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var blueInvoiceIssued = function ($scope, $$blueInvoiceIssued,$modal, $state,$q,mcMultiEditorCacheService) {
        /**
         *勾选改变状态
         */
        $scope.checkedBoxChanged=function(pay){
            if(pay.checked){
                $scope.invoiceIsChecked=true;
                //利用信任的功能，如果返回成功执行，否则计算金额
                isTrueSubmit(pay).then(
                    function (data) {
                        if(data==true){
                            changeCheckStatus(pay);//控制复选框可选状态
                            record(pay);
                            cacutate();//计算汇总金额
                            $scope.selectedOne();
                        }
                    },function () {
                    }
                );
            }else{
                changeCheckStatus(pay);//控制复选框可选状态
                record(pay);
                cacutate();//计算汇总金额
            }
        };
        /**
         *判断是否可以提交
         * @param pay
         * @returns {boolean}
         */
        var isTrueSubmit=function (pay) {
            var deffer = $q.defer();
            if(pay.coinsFlag=='3' || pay.coinsFlag=='1'){
                $$blueInvoiceIssued.buleIsTrueSubmit(pay,{
                    success:function (data) {
                        if(data.content.coinsFlag=='success'){
                            deffer.resolve(true);
                        }else if(data.content.coinsFlag=='false'){
                            pay.checked=false;
                            pay.selectedClass='';
                            layerMsg("从联方已开票，不能再代从联方开票");
                            deffer.reject(false);
                        }
                    }
                });
            }else if(pay.coinsFlag=='4'){
                $$blueInvoiceIssued.buleIsTrueSubmit(pay,{
                    success:function (data) {
                        if(data.content.coinsFlag=='success'){
                            deffer.resolve(true);
                        }else if(data.content.coinsFlag=='false'){
                            layerMsg("主联方已代从联方打印发票，从联方打印发票时开票对象只能选择共保人!");
                            deffer.resolve(true);
                        }else if(data.content.coinsFlag=='false1'){
                            layerMsg("主联方已打印自己份额发票，从联方打印发票时开票对象只能选择投/被保人!");
                            deffer.resolve(true);
                        }
                    }
                });
            }else{
                deffer.resolve(true);
            }
            return deffer.promise;
        };
        /**
         * 判断选中的币种是否都相同
         * @param data
         * @returns {boolean}
         */
        var isEquelCurrency = function(data){
            //校验币种是否一样
            var taxRate=data[0].taxRate;
            var appliCode=data[0].appliCode;
            var result=true;
            $.each($scope.blueDataInvoice.blueInfoView.checkedBlueList,function(index,target){
                if(taxRate!=target.taxRate){
                    result=false;
                    return result
                }else if(appliCode!=target.appliCode){
                    result=false;
                    return result
                }
            });
            return result;
        };
        /**
         * 记录勾选的保单号/批单号
         * @param obj
         */
        var record=function(obj){
            if(obj){//勾选复选框时
                if(obj.checked){//如果勾选
                    $scope.blueDataInvoice.checkedRecords.push(obj);//记录此条数据
                    obj.selectedClass='venus_table_check';//添加列表勾选样式

                }else{//如果取消勾选
                    $scope.deleteObj(obj,$scope.blueDataInvoice.checkedRecords,'policyNo');//删除此条记录
                    $scope.blueDataInvoice.status.checkedAccountAll=false;
                    obj.selectedClass='';//删除列表样式
                }
            }else{//勾选全选框时
                if(isEquelCurrency($scope.blueDataInvoice.blueInfoView.checkedBlueList)){//判断币种是否相同&&是否可勾选
                    $scope.selectedAll();
                    angular.forEach($scope.blueDataInvoice.blueInfoView.checkedBlueList,function(target){

                        if($scope.blueDataInvoice.status.checkedAccountAll){//如果全选框勾选
                            if(!$scope.findObj(target,$scope.blueDataInvoice.checkedRecords)){//先判断当前勾选数据是否已经存在记录列表中
                                $scope.blueDataInvoice.checkedRecords.push(target);//记录此条数据
                                target.selectedClass='venus_table_check';//添加列表勾选样式

                            }
                        }else{//如果未勾选
                            $scope.deleteObj(target,$scope.blueDataInvoice.checkedRecords,'policyNo');//删除对应记录
                            target.selectedClass='';//删除列表样式

                        }

                    });
                }else{//币种不相同不允许勾选全选
                    $scope.blueDataInvoice.status.checkedAccountAll=false;
                }
            }
        };
        /**
         * 判断复选框是否勾选
         * @param item
         */
        var checkedCurrency1 = function(item){
            return item.checked;
        };
        /**
         * 控制复选框可选状态
         * @param claim
         */
        var changeCheckStatus = function(pay){
            if(pay){
                if(pay.checked){
                    $scope.blueDataInvoice.status.taxRate=pay.taxRate;
                    $scope.blueDataInvoice.status.appliCode=pay.appliCode;
                    $scope.blueDataInvoice.status.disabled=false;
                }else if(!$scope.blueDataInvoice.blueInfoView.checkedBlueList.some(checkedCurrency1)) {
                    $scope.blueDataInvoice.status.disabled=true;
                }
            }else{//否则重置可选状态
                $scope.blueDataInvoice.status.disabled=true;
                $scope.blueDataInvoice.status.checkedClaimAll_disabled=!isEquelCurrency($scope.blueDataInvoice.blueInfoView.checkedBlueList);
            }
        };
        /**
         * 全选
         */
        $scope.selectedAll=function(){
            angular.forEach($scope.blueDataInvoice.blueInfoView.checkedBlueList,function(data){
                if($scope.blueDataInvoice.status.checkedAccountAll){
                    data.checked=true;
                    data.selectedClass = 'venus_table_check';
                }else {
                    data.checked=false;
                    data.selectedClass = '';
                }
            });
            cacutate();
        };
        /**
         * 计算勾选保单数量和金额
         */
        var cacutate=function(){
            $scope.blueDataInvoice.selectedPay=0;//勾选的总金额
            angular.forEach($scope.blueDataInvoice.blueInfoView.checkedBlueList,function(target,index){
                if(target.checked)
                $scope.blueDataInvoice.selectedPay+=target.notVisaFee;
            });
        };
        /**
         * 单选
         */
        $scope.selectedOne=function(){
            $scope.blueDataInvoice.status.checkedAccountAll=$scope.blueDataInvoice.blueInfoView.checkedBlueList.every(function(item){
                return item.checked;
            });
        };
        /**
         * 查询所有 账单
         */
        $scope.queryList=function (target) {
            $scope.blueDataInvoice.status.checkedAccountAll=false;
            $scope.blueDataInvoice.blueInfoView.blueQuery.webUserCode=$scope.usercode;
            $scope.blueDataInvoice.blueInfoView.blueQuery.webComCode=$scope.comCode;
            $scope.blueDataInvoice.blueInfoView.blueQuery.webCenterCode=$scope.centerCode;
            $scope.blueDataInvoice.blueInfoView.blueQuery.webTaskCode='payment.invoice.blueticket';
            $$blueInvoiceIssued.invoiceSearch($scope.blueDataInvoice.blueInfoView.blueQuery,{
                success: function (data) {
                    $scope.blueDataInvoice.blueInfoView.checkedBlueList=[];
                    if(data && data.prpJVatInvoiceDtoList){
                        $scope.blueDataInvoice.blueInfoView.checkedBlueList=data.prpJVatInvoiceDtoList;
                    }
                        if($scope.blueDataInvoice.blueInfoView.checkedBlueList.length<1){
                            if(target=='flag'){
                                layerMsg('暂无数据！');
                                return false
                            }
                        }
                        changeCheckStatus();
                        saveData();
                },
                error: function (e) {
                }
            })
        };
        /**
         * 重置表单
         */
        $scope.resetList=function(){
            $scope.blueDataInvoice.blueInfoView.blueQuery={};
        };
        /**
         * 蓝票开具申请业务提交
         */
        $scope.blueInvoiceSubmit=function(){
            var keyWords={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "loginComCode":$scope.comCode,
                "comCode":$scope.comCode,
                "prpJVatInvoiceDtoList":$scope.blueDataInvoice.blueInfoView.checkedBlueList
            };
            $.each(keyWords.prpJVatInvoiceDtoList,function (index,item) {
                if(item.checked){
                    item.checkFlag='Y';
                }else{
                    item.checkFlag='N';
                }
            });
            var invoiceData={};
            $$blueInvoiceIssued.blueInvoiceSubmit(keyWords,{
                success: function (data) {
                    invoiceData=data;
                    if(invoiceData.prpJInvoiceMainDto.vaTaxRateNow==undefined || invoiceData.prpJInvoiceMainDto.vaTaxRateNow==''){
                        invoiceData.prpJInvoiceMainDto.vaTaxRateNow=0+'%';
                    }else {
                        invoiceData.prpJInvoiceMainDto.vaTaxRateNow = invoiceData.prpJInvoiceMainDto.vaTaxRateNow * 100 + '%';
                    }
                    /**
                     * 打开模态框
                     */
                    $modal.open({
                        templateUrl:'components/settlementManage/commonSettle/blueInvoiceIssued/tpl/modal/blueInvoiceIssued.modal.html',
                        resolve:{
                            arrayChecked:function () {
                                return invoiceData;
                            }
                        },
                        controller:function($scope,$modalInstance,$$blueInvoiceIssued,arrayChecked) {
                            var vaTaxRateNow;
                            /**
                             *单选
                             */
                            $scope.selectedComOne = function (target,getNum) {
                                $scope.checkAll = $scope.invoiceSelectList.every(function (item, index, array) {
                                    return item.checked;
                                });
                            };
                            /**
                             *勾选改变状态
                             */
                            $scope.changeComClass = function (invoiceSelect) {
                                $scope.prpJInvoiceMainDto.totalVisaFee=0;
                                $scope.selectNum=0;
                                $scope.checkString=[];
                                angular.forEach($scope.invoiceSelectList, function (data) {
                                    if (data.checked) {
                                        data.selectedClass = 'venus_table_check';
                                        $scope.prpJInvoiceMainDto.totalVisaFee+=data.visaFee * 1;
                                        $scope.selectNum++;
                                        data.checkFlag='Y';
                                    }
                                    else {
                                        data.selectedClass = '';
                                        data.checkFlag='N';
                                    }
                                    $scope.checkString.push(data);
                                });
                                if(invoiceSelect){

                                    var vaTaxRateNow=angular.copy($scope.prpJInvoiceMainDto.vaTaxRateNow);
                                    var index=vaTaxRateNow.indexOf('%');
                                    if(index>=0){
                                        vaTaxRateNow = (vaTaxRateNow.substring(0,$scope.prpJInvoiceMainDto.vaTaxRateNow.indexOf('%')))/100;
                                    }
                                    else{
                                        vaTaxRateNow=vaTaxRateNow/100;
                                    }
                                    $scope.prpJInvoiceMainDto.totalVisaFee=$scope.prpJInvoiceMainDto.totalVisaFee.toFixed(2);
                                    $scope.prpJInvoiceMainDto.totalNtVisaFee = ($scope.prpJInvoiceMainDto.totalVisaFee / (1 + vaTaxRateNow)).toFixed(2);
                                    $scope.prpJInvoiceMainDto.totalVaTaxFee = ($scope.prpJInvoiceMainDto.totalVisaFee - $scope.prpJInvoiceMainDto.totalNtVisaFee).toFixed(2);
                                    invoiceSelect.notPayRefFee=(invoiceSelect.visaFee/(1+invoiceSelect.taxRate)).toFixed(2);
                                    invoiceSelect.notPayRefTaxFee=(invoiceSelect.visaFee-invoiceSelect.notPayRefFee).toFixed(2);
                                }
                            };
                            /**
                             * 开票金额input改变，开票含税金额==开票金额，税额=开票含税金额/（1+税率）
                             * 开票不含税金额=开票含税金额=税额
                             */
                            $scope.changeTotalVisaFee=function (invoiceSelect) {
                                if(invoiceSelect.visaFee == '0'){
                                    layerMsg('本次开票金额不允许为零','error');
                                    invoiceSelect.visaFee=invoiceSelect.notVisaFee;
                                    return ;
                                }else if(invoiceSelect.visaFee < 0){
                                    layerMsg('本次开票金额不允许小于零','error');
                                    invoiceSelect.visaFee=invoiceSelect.notVisaFee;
                                    return ;
                                }
                                vaTaxRateNow=angular.copy($scope.prpJInvoiceMainDto.vaTaxRateNow);
                                var index=vaTaxRateNow.indexOf('%');
                                if(index>=0){
                                    vaTaxRateNow = (vaTaxRateNow.substring(0,$scope.prpJInvoiceMainDto.vaTaxRateNow.indexOf('%')))/100;
                                }
                                else{
                                    vaTaxRateNow=vaTaxRateNow/100;
                                }
                                if(invoiceSelect.visaFee<=invoiceSelect.notVisaFee) {
                                    $scope.prpJInvoiceMainDto.totalVisaFee = 0;
                                    angular.forEach($scope.invoiceSelectList, function (data) {
                                        if (data.checked) {
                                            $scope.prpJInvoiceMainDto.totalVisaFee += data.visaFee * 1;
                                        }
                                    });
                                    $scope.prpJInvoiceMainDto.totalVisaFee=$scope.prpJInvoiceMainDto.totalVisaFee.toFixed(2);
                                    $scope.prpJInvoiceMainDto.totalNtVisaFee = ($scope.prpJInvoiceMainDto.totalVisaFee / (1 + vaTaxRateNow)).toFixed(2);
                                    $scope.prpJInvoiceMainDto.totalVaTaxFee = ($scope.prpJInvoiceMainDto.totalVisaFee - $scope.prpJInvoiceMainDto.totalNtVisaFee).toFixed(2);
                                    invoiceSelect.notPayRefFee=(invoiceSelect.visaFee/(1+invoiceSelect.taxRate)).toFixed(2);
                                    invoiceSelect.notPayRefTaxFee=(invoiceSelect.visaFee-invoiceSelect.notPayRefFee).toFixed(2);
                                }else if(invoiceSelect.visaFee>invoiceSelect.notVisaFee){
                                    layerMsg("开票金额不能大于未开票金额",'error');
                                    invoiceSelect.visaFee=invoiceSelect.notVisaFee;
                                    $scope.prpJInvoiceMainDto.totalVisaFee = 0;
                                    angular.forEach($scope.invoiceSelectList, function (data) {
                                        if (data.checked) {
                                            $scope.prpJInvoiceMainDto.totalVisaFee += data.visaFee * 1;
                                        }
                                    });
                                    $scope.prpJInvoiceMainDto.totalVisaFee=$scope.prpJInvoiceMainDto.totalVisaFee.toFixed(2);
                                    $scope.prpJInvoiceMainDto.totalNtVisaFee = ($scope.prpJInvoiceMainDto.totalVisaFee / (1 + vaTaxRateNow)).toFixed(2);
                                    $scope.prpJInvoiceMainDto.totalVaTaxFee = ($scope.prpJInvoiceMainDto.totalVisaFee - $scope.prpJInvoiceMainDto.totalNtVisaFee).toFixed(2);
                                    invoiceSelect.notPayRefFee=(invoiceSelect.visaFee/(1+invoiceSelect.taxRate)).toFixed(2);
                                    invoiceSelect.notPayRefTaxFee=(invoiceSelect.visaFee-invoiceSelect.notPayRefFee).toFixed(2);
                                }
                            };
                            /**
                             * 蓝票打印申请
                             * @returns {boolean}
                             */
                            $scope.blueInvoiceModalSubmit=function(){
                                var getFlag=false;
                                var isok=false;
                                $.each($scope.invoiceSelectList,function (index,item) {
                                    if(item.visaFee=='' || item.visaFee==undefined){
                                        isok=true;
                                    }
                                });
                                if(isok){
                                    layerMsg('本次开票金额不允许为空','error');
                                    return;
                                }
                                $.each($scope.invoiceSelectList,function (index,item) {
                                    if(item.checked){
                                        getFlag=true;
                                    }
                                });
                                if(!getFlag){
                                    layerMsg('请选择开票信息','error');
                                    return;
                                }
                                if($scope.prpJInvoiceMainDto.taxPayer=='' || $scope.prpJInvoiceMainDto.taxPayer==undefined) {
                                    layerMsg('纳税人身份不能为空','error');
                                    return;
                                }
                                if($scope.prpJInvoiceMainDto.invoiceType=='3'){
                                    if($scope.invoiceObjects.email==''){
                                        layerMsg('邮箱不能为空','error');
                                        return
                                    }else if($scope.invoiceObjects.taxPayerNo==''){
                                        layerMsg('购方纳税人识别号/统一社会信用代码不能为空','error');
                                        return
                                    }else if($scope.invoiceObjects.address==''){
                                        layerMsg('购方地址不能为空','error');
                                        return
                                    }else if($scope.invoiceObjects.phoneNo==''){
                                        layerMsg('购方电话不能为空','error');
                                        return
                                    }else if($scope.invoiceObjects.bankName==''){
                                        layerMsg('购方开户银行不能为空','error');
                                        return
                                    }else if($scope.invoiceObjects.accountCode==''){
                                        layerMsg('购方银行账号不能为空','error');
                                        return
                                    }else if($scope.prpJInvoiceMainDto.invoiceHeader1==''){
                                        layerMsg('付款人（发票抬头）不能为空','error');
                                        return
                                    }else if($scope.prpJInvoiceMainDto.invoiceObjectType=='4'){
                                        layerMsg('当发票类型为增值税专票且开票对象不为其他','error');
                                        return
                                    }else if($scope.prpJInvoiceMainDto.taxPayer!='1'){
                                        layerMsg('发票类型为增值税专用发票时，纳税人身份必须为增值税一般纳税人！','error');
                                        return
                                    }
                                }
                                if($scope.prpJInvoiceMainDto.invoiceType=='1'){
                                    if($scope.prpJInvoiceMainDto.invoiceObjectType=='4'){
                                        layerMsg('当发票类型为增值税电子普通发票且开票对象不为其他','error');
                                        return
                                    }else if($scope.prpJInvoiceMainDto.invoiceHeader1==''){
                                        layerMsg('付款人（发票抬头）不能为空','error');
                                        return
                                    }
                                    //校检邮箱
                                    if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($scope.invoiceObjects.email)) {
                                        layerMsg("请检查邮箱格式",'error');
                                        return false;
                                    }
                                    var totalVisaFee=0;
                                    var totalNoVisaFee=0;
                                    $.each($scope.invoiceSelectList,function (index,item) {
                                        if(item.checked){
                                            totalVisaFee+=item.visaFee;
                                            totalNoVisaFee+=item.notVisaFee
                                        }
                                    });
                                    if(totalVisaFee != totalNoVisaFee){
                                        layerMsg("发票类型为增值税电子普通发票时不允许拆分打印，开票金额必须等于应收本位币金额！",'error');
                                        return ;
                                    }
                                }
                                if($scope.prpJInvoiceMainDto.invoiceType=='2'){
                                    if($scope.prpJInvoiceMainDto.invoiceObjectType=='4'){
                                        layerMsg('当发票类型为增值税普通发票且开票对象不为其他','error');
                                        return
                                    }else if($scope.prpJInvoiceMainDto.invoiceHeader1==''){
                                        layerMsg('付款人（发票抬头）不能为空','error');
                                        return
                                    }
                                }
                                //根据后端的需求，如果是选中的项，给个属性checkFlag=true,没选就false
                                $.each($scope.invoiceSelectList,function (index, selectlist) {
                                    if(selectlist.checked){
                                        selectlist.checkFlag='Y';
                                    }else{
                                        selectlist.checkFlag='N';
                                    }
                                });
                                //拷贝一份税率，把百分比改成小数给后端传过去
                                var vaTaxRateNow=angular.copy($scope.prpJInvoiceMainDto.vaTaxRateNow);
                                var index=vaTaxRateNow.indexOf('%');
                                if(index>=0){
                                    vaTaxRateNow = (vaTaxRateNow.substring(0,$scope.prpJInvoiceMainDto.vaTaxRateNow.indexOf('%')))/100;
                                }
                                else{
                                    vaTaxRateNow=vaTaxRateNow/100;
                                }
                                var keyWord={
                                    "prpJVatInvoiceDtoList":$scope.invoiceSelectList,//列表
                                    "prpJInvoiceMainDto":$scope.prpJInvoiceMainDto, //对象
                                    "prpdCustomerTaxPayInfoDto":$scope.invoiceObjects,//可选择的对象
                                    "printType":$scope.invoicePrintType
                                };
                                keyWord.prpJInvoiceMainDto.appliCode=keyWord.prpJVatInvoiceDtoList[0].appliCode;
                                keyWord.prpJInvoiceMainDto.vaTaxRateNow=vaTaxRateNow;
                                //dealTaxDiff税额差计算，税额尾差=开票税额-开票明细税额之和，dealTaxDiff=税额-列表里的notPayRefTaxFee
                                var sum=0;
                                $.each(keyWord.prpJVatInvoiceDtoList,function (index,item) {
                                    if(item.checkFlag=='Y'){
                                        sum+=item.notPayRefTaxFee * 1;
                                        $scope.invoiceFlag=true;
                                    }
                                });
                                if($scope.invoiceFlag){
                                    $scope.dealTaxDiff=(keyWord.prpJInvoiceMainDto.totalVaTaxFee-sum).toFixed(2);
                                    keyWord.dealTaxDiff=$scope.dealTaxDiff;
                                }
                                keyWord.dealTaxDiff=$scope.dealTaxDiff;
                                //请求接口
                                $$blueInvoiceIssued.blueInvoiceModalSubmit(keyWord,{
                                    success: function (data) {
                                        $scope.prpJInvoiceMainDto.vaTaxRateNow=$scope.prpJInvoiceMainDto.vaTaxRateNow * 100+'%';
                                        if(data.content.userExceptionDto.messageCode =='0000'){
                                            layerMsg(data.content.userExceptionDto.messageText+",交易流水号为：" +data.content.batchNo,'success');
                                            $modalInstance.close(true);
                                        }else if(data.code=='0000' || data.content.userExceptionDto.messageCode ==''){
                                            layerMsg("打印申请成功,"+ "交易流水号为：" +data.content.batchNo,'success');
                                            $modalInstance.close(true);
                                        }
                                    },
                                    error: function (e) {
                                    }
                                });
                            };
                            //关闭弹窗
                            $scope.blueInvoiceModalCancel = function () {
                                $modalInstance.dismiss();
                            };
                            var getInvoiceData=function () {
                                if($scope.prpJInvoiceMainDto.invoiceObjectCode=='' || $scope.prpJInvoiceMainDto.invoiceObjectCode==undefined){
                                    $scope.invoiceObjects={};
                                }else{
                                    $$blueInvoiceIssued.blueChangeInfo($scope.prpJInvoiceMainDto.invoiceObjectCode,{
                                        success:function (data) {
                                            $scope.invoiceObjects=data.content;
                                        }
                                    })
                                }
                            };
                            /**
                             * 开票对象改变联调
                             */
                            $scope.changeInfo=function (flag) {
                                if(flag=='1'){
                                    $scope.prpJInvoiceMainDto.invoiceObjectCode=$scope.invoiceSelectList[0].appliCode;
                                    $scope.prpJInvoiceMainDto.invoiceHeader1=$scope.invoiceSelectList[0].appliName;
                                    getInvoiceData();
                                }else if(flag=='2'){
                                    $scope.prpJInvoiceMainDto.invoiceObjectCode=$scope.invoiceSelectList[0].insuredCode;
                                    $scope.prpJInvoiceMainDto.invoiceHeader1=$scope.invoiceSelectList[0].insuredName;
                                    getInvoiceData();
                                }else if(flag=='3'){
                                    $scope.prpJInvoiceMainDto.invoiceObjectCode=$scope.invoiceSelectList[0].coinsCode;
                                    $scope.prpJInvoiceMainDto.invoiceHeader1=$scope.invoiceSelectList[0].coinsName;
                                    getInvoiceData();
                                }else if(flag=='4'){
                                    $scope.prpJInvoiceMainDto.invoiceObjectCode='';
                                    $scope.prpJInvoiceMainDto.invoiceHeader1='';
                                    getInvoiceData();
                                }
                            };
                            var init=function () {
                                $scope.invoiceObjectFlag=false;
                                if (arrayChecked.prpJVatInvoiceDtoList && arrayChecked.prpdCustomerTaxPayInfoDtoList && arrayChecked.prpdCustomerTaxPayInfoDtoList.length>0) {
                                    $scope.invoiceSelectList = arrayChecked.prpJVatInvoiceDtoList || [];
                                    $scope.invoiceObjects = arrayChecked.prpdCustomerTaxPayInfoDtoList[0] || {};
                                    $scope.prpJInvoiceMainDto = arrayChecked.prpJInvoiceMainDto || {};
                                    $scope.dealTaxDiff=arrayChecked.dealTaxDiff || '';
                                    $scope.printedFlag=arrayChecked.printedFlag
                                }
                                $.each($scope.invoiceSelectList ,function (index,item) {
                                    item.visaFee=parseInt(item.visaFee);
                                });
                                $scope.invoiceFlag=false;
                                $scope.commonSelectList=[];
                                //设置页面的默认值，根据需要稳当设置
                                $scope.invoicePrintType='1';
                                $scope.prpJInvoiceMainDto.invoiceType='2';
                                if($scope.prpJInvoiceMainDto.invoiceHeader1=='' || $scope.prpJInvoiceMainDto.invoiceHeader1==undefined) {
                                    $scope.prpJInvoiceMainDto.invoiceObjectType='4';
                                    $scope.prpJInvoiceMainDto.invHandlerName = $scope.user.userName;
                                }else{
                                    $scope.prpJInvoiceMainDto.invoiceObjectType='1';
                                    $scope.prpJInvoiceMainDto.invoiceObjectCode=arrayChecked.prpJVatInvoiceDtoList[0].appliCode;
                                }
                                $scope.printedFlag=arrayChecked.printedFlag;
                                if($scope.printedFlag=='false'){
                                    $scope.arrays=[
                                        {"code": '1', "value": '投保人'},
                                        {"code": '2', "value": '被保险人'},
                                        {"code": '3', "value": '共保人'},
                                        {"code": '4', "value": '其他'}
                                    ];
                                    $scope.prpJInvoiceMainDto.invoiceObjectType='3';
                                    $scope.invoiceObjectFlag=true;
                                    $scope.prpJInvoiceMainDto.invoiceHeader1=arrayChecked.prpJVatInvoiceDtoList[0].coinsName;
                                    $scope.prpJInvoiceMainDto.invoiceObjectCode=arrayChecked.prpJVatInvoiceDtoList[0].coinsCode;
                                }else if($scope.printedFlag== 'false1'){
                                    $scope.arrays=[
                                        {"code":"1","value":"投保人"},
                                        {"code":"2","value":"被保险人"}
                                    ];
                                }else{
                                    $scope.arrays=[
                                        {"code": '1', "value": '投保人'},
                                        {"code": '2', "value": '被保险人'},
                                        {"code": '3', "value": '共保人'},
                                        {"code": '4', "value": '其他'}
                                    ];
                                }
                                //默认列表全选
                                $.each($scope.invoiceSelectList,function (index,item) {
                                    item.checked=true;
                                });
                                $scope.changeComClass();
                            };
                            init();
                        }
                    }).result.then(function(flag){
                        if(flag==true){
                            $scope.blueDataInvoice.blueInfoView.checkedBlueList=[];
                            $scope.blueDataInvoice.selectedPay=0;
                            $scope.blueDataInvoice.status.checkedAccountAll=false;
                        }
                    })
                },
                error: function (e) {
                }
            });
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            mcMultiEditorCacheService.localData('blueInvoiceIssued',$scope.blueDataInvoice);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('blueInvoiceIssued');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            $scope.moreFlag=!$scope.moreFlag;
            saveData();
        };
        var init =function(){
            $scope.blueDataInvoice=$$blueInvoiceIssued.bulueInvoice();
            $scope.invoiceIsChecked=true;
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.blueDataInvoice=getData();
            }else {
                $scope.blueDataInvoice.blueInfoView=$scope.blueDataInvoice.blueInfoView;
            }
        };
        init();
    };
    moduleApp.controller('blueInvoiceIssuedCtrl', ['$scope', '$$blueInvoiceIssued','$modal','$state','$q','mcMultiEditorCacheService', blueInvoiceIssued]);
});
