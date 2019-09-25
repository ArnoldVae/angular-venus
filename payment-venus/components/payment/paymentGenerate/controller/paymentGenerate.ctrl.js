/**
 * 付款单生成控制器
 */
define([
    '../module',
    'config'
], function (moduleApp, config) {
    'use strict';
    var PaymentGenerateCtrl = function ($scope, $$paymentGenerate,mcMultiEditorCacheService, $modal,FileUploader) {
        console.log('付款单生成控制器...');
        /**
         *查询
         */
        $scope.searchAdviceOfSettlement = function (target) {
            if(target!='page'){
                $scope.paymentGenerate.pagination.pageIndex=1;
            }
            if($scope.paymentGenerate.adviceOfSettlementCondition.statisticsDateStart!=""&&$scope.paymentGenerate.adviceOfSettlementCondition.statisticsDateEnd!=""&&$scope.paymentGenerate.adviceOfSettlementCondition.statisticsDateStart>$scope.paymentGenerate.adviceOfSettlementCondition.statisticsDateEnd){
                layerMsg("起始日期不能大于终止日期！");
                return false
            }
            if($scope.paymentGenerate.adviceOfSettlementCondition.currency1==""&&$scope.paymentGenerate.adviceOfSettlementCondition.policyNoStart==""){
                layerMsg("保/批单号和币种不能同时为空！");
                return false
            }
            $$paymentGenerate.find('searchAdviceOfSettlementList', {
                "policyNoStart": $scope.paymentGenerate.adviceOfSettlementCondition.policyNoStart,
                "policyNoEnd": $scope.paymentGenerate.adviceOfSettlementCondition.policyNoEnd,
                "policyNoList": $scope.paymentGenerate.adviceOfSettlementCondition.policyNoList,
                "comCode": $scope.paymentGenerate.adviceOfSettlementCondition.comCode,
                "businessCode": $scope.paymentGenerate.adviceOfSettlementCondition.businessCode,
                "agentCode": $scope.paymentGenerate.adviceOfSettlementCondition.agentCode,
                "contractNo": $scope.paymentGenerate.adviceOfSettlementCondition.contractNo,
                "businessNature": $scope.paymentGenerate.adviceOfSettlementCondition.businessNature,
                "currency1": $scope.paymentGenerate.adviceOfSettlementCondition.currency1,
                "appliName": $scope.paymentGenerate.adviceOfSettlementCondition.appliName,
                "insuredName": $scope.paymentGenerate.adviceOfSettlementCondition.insuredName,
                "riskCode": $scope.paymentGenerate.adviceOfSettlementCondition.riskCode,
                "statisticsDateStart": $scope.paymentGenerate.adviceOfSettlementCondition.statisticsDateStart,
                "statisticsDateEnd": $scope.paymentGenerate.adviceOfSettlementCondition.statisticsDateEnd,
                "webUserCode":$scope.usercode,//当前登录人代码
                "webComCode":$scope.comCode,//当前登录机构代码
                "webCenterCode":$scope.centerCode//当前核算单位代码
            }, {
                success: function (data) {
                    $scope.paymentGenerate.adviceOfSettlementList = data.content.content;
                    if(!target&&$scope.paymentGenerate.adviceOfSettlementList.length==0){
                        layerMsg("暂无数据！")
                    }
                    $scope.paymentGenerate.pagination.totalItems = data.content.totalCount;
                },
                error: function (e) {
                }
            }, {
                "pageNo": $scope.paymentGenerate.pagination.pageIndex-1,
                "pageSize": $scope.paymentGenerate.pagination.pageSize
            })
        };
        /**
         *重置
         */
        $scope.resetAdviceOfSettlement = function () {
            $scope.paymentGenerate.adviceOfSettlementCondition = {
                "currency1":"",
                "policyNoStart":"",
                "policyNoEnd":"",
                "commisionType":"1"
            };
        };
        /**
         *确定
         */
        $scope.confirmAdviceOfSettlement = function () {
            $scope.confirmList = {"list": []};
            $scope.confirmList.list =$scope.paymentGenerate.adviceOfSettlementList;
            $modal.open({
                    templateUrl: 'components/payment/paymentGenerate/tpl/modal/paymentGenerate.modal.html',
                    resolve: {
                        confirmList: function () {
                            return $scope.confirmList;
                        },
                        comcode: function () {
                            return $scope.comCode;
                        },
                        usercode: function () {
                            return $scope.usercode;
                        }
                    },
                    controller: function ($scope, $modalInstance, confirmList,comcode,usercode,$rootScope) {
                        var init=function () {
                            $scope.showBtn = false;
                            var addPlanFee = 0.00;
                            var addTaxFee = 0.00;
                            var addFeeOut = 0.00;
                            angular.forEach(confirmList.list,function(data){
                                addPlanFee+=data.taxDisFee;//本次实付合计
                                addTaxFee+=data.taxFee;//进项税
                                addFeeOut+=data.planFee;//手续费支出
                                if(data.businessNature!="9"){
                                    $scope.showBtn = true;
                                }
                            });
                            //实例化手续费结算单对象
                            $scope.settlementCondition = {
                                "agentName":confirmList.list[0].agentName,
                                "addBusinessBase":0.00,
                                "currency1":confirmList.list[0].currency1,
                                "vatFee":0.00,
                                "taxDisFee":addPlanFee.toFixed(2),
                                "businessTax":0.00,
                                "constructionTax":0.00,
                                "houseTax":0.00,
                                "landTax":0.00,
                                "peopleTax":0.00,
                                "carShipTax":0.00,
                                "companyTax":0.00,
                                "preventFloodTax":0.00,
                                "stampTax":0.00,
                                "educationTax":0.00,
                                "ddasuccorTax":0.00,
                                "localEducationTax":0.00,
                                "otherTax":0.00,
                                "taxFee":addTaxFee.toFixed(2),
                                "planFee":addFeeOut.toFixed(2),
                                "vatRate":confirmList.list[0].vatRate,
                                "modifyReason":"",
                                "context":"",
                                "list": [],
                                "businessNature":confirmList.list[0].businessNature
                            };
                            $scope.settlementCondition.list = confirmList.list;
                        };
                        init();
                        //关闭
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                        //确认
                        $scope.confirmsettlement = function () {
                            $scope.settlementCondition.centerCode =$rootScope.user.centerCode;
                            $scope.settlementCondition.packageCode = usercode;
                            $scope.settlementCondition.packageUnit = comcode;
                            $$paymentGenerate.confirmSettlement($scope.settlementCondition,{
                                success: function (data) {
                                    if (data.content.resultCode == "0000"){
                                        layerMsg('结算单&nbsp;'+"<a>"+data.content.resultMsg+"</a>"+'&nbsp;生成成功','success');
                                        $modalInstance.close(data.content.resultCode);
                                    }else{
                                        layerMsg(data.content.resultMsg)
                                    }
                                },
                                error: function (e) {
                                }
                            })
                        };

                        //计算税金
                        $scope.searchsettlement = function () {
                            $scope.settlementCondition.comCode =comcode;
                            $$paymentGenerate.searchMoreAdviceOfSettlement($scope.settlementCondition, {
                                success: function (data) {
                                    $scope.settlementCondition = data.content;
                                    $scope.settlementCondition.packageCode = usercode;
                                    $scope.settlementCondition.packageUnit = comcode;
                                    $scope.settlementCondition.list = confirmList.list;
                                    if (data.content.agentName){
                                        layer.msg('计算税金成功',{icon:1});
                                        $scope.showBtn = true;
                                    }else{
                                        layerMsg("计算税金失败！")
                                    }
                                },
                                error: function (e) {
                                }
                            })
                        }
                    }
                }).result.then(function (record) {
                if(record){
                    $scope.searchAdviceOfSettlement(true)
                }
            })
        };
        /**
         * 保单详细信息
         */
        $scope.moreFormData = function (target) {
            $modal.open({
                templateUrl:"components/payment/paymentGenerate/tpl/modal/policyNoList.modal.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $$paymentGenerate.searchPolicyNoList(target,{
                        success: function (data) {
                            $scope.policyNoList = data.content;
                        },
                        error: function (e) {
                        }
                    });
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        };
        //-------------------------- 上传下载 start --------------------------
        //上传
        $scope.submitImport = function(){
            uploader.uploadAll();
            if($scope.fileItem== undefined||$scope.fileItem== ""){
                layerMsg('请选择上传文件')
            }
        };
        var uploader = $scope.uploader = new FileUploader({
            url: '/comm-fileserver/uploadFile',
            formData:[{userCode:$scope.usercode,systemId:'gscore-pa-web',bussType:'payment'}],
            queueLimit: 1, //文件个数
            removeAfterUpload: false //上传后删除文件
        });
        $scope.clearItems = function(){ //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        };
        uploader.onAfterAddingFile = function(fileItem) {
            //上传必须为xlsx
            var fileName = fileItem.file.name;
            var ext = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
            if (ext != "xlsx") {
                layerMsg("上传文件必须为.xlsx类型文件！");
                return false;
            }
            $scope.fileItem = fileItem.file; //添加文件之后，把文件信息赋给scope
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.importCondition={};
            $scope.importCondition.localfileurl = response.resultObj.fileId;
            $scope.importCondition.webUserCode = $scope.usercode;
            $scope.importCondition.webCenterCode = $scope.centerCode;
            $scope.importCondition.webComCode = $scope.comCode;
            $scope.importCondition.webTaskCode = "payment.paymanager.commission.settlement";
            $scope.importCond = function(){
                $$paymentGenerate.excelImport($scope.importCondition,{
                    success: function (data) {
                        if(data.resultCode == '0000'){
                            layerMsg(data.resultMsg,'success');
                            $scope.fileItem = '';
                        }else{
                            layerMsg(data.resultMsg);
                            $scope.fileItem = '';
                        }
                    },
                    error: function (e) {
                        $scope.fileItem = '';
                    }
                });
            };
            $scope.importCond();


        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            layerMsg('上传失败！');
            $scope.fileItem = '';
        };
        //模版下载
        $scope.templateDownload = function () {
            $scope.fileId = '1979546048334bf79124f0c2769d0588';
            window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
        };
        //-------------------------- 上传下载 end --------------------------
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('paymentGenerate');//获取上次数据
            if(localDada){
                $scope.paymentGenerate=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('paymentGenerate',$scope.paymentGenerate);//存储数据
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.paymentGenerate.adviceOfSettlementCondition.businessCode='';
            $scope.paymentGenerate.adviceOfSettlementCondition.businessMan=''
        };
        /**
         * 初始化函数
         */
        var init = function () {
            $scope.paymentGenerate = $$paymentGenerate.paymentGenerate();
            getLastData();
            saveData();
        };
        init();

    };
    moduleApp.controller('PaymentGenerateCtrl', ['$scope', '$$paymentGenerate', 'mcMultiEditorCacheService', '$modal','FileUploader', PaymentGenerateCtrl]);
});