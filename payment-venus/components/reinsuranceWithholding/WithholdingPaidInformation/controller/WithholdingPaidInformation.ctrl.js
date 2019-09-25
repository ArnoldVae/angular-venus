/**
 * Created by Administrator on 2017-10-24.
 * 再保代扣代缴-代扣代缴实付信息控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var WithholdingPaidInformation=function($scope,$modal,$$WithholdingPaidInformation) {
        /**
         * 代扣代缴实付信息列表查询
         */
        $scope.InformationSearch = function (target,index) {
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            if($scope.Information.withHoldNoStart&&$scope.Information.withHoldNoEnd){
                if($scope.Information.withHoldNoEnd<$scope.Information.withHoldNoStart){
                    layerMsg("代扣代缴单号（从）不能大于代扣代缴单号（到）！");
                    return false
                }
            }
            if($scope.Information.settleNoEnd&&$scope.Information.settleNoStart){
                if(($scope.Information.settleNoEnd<$scope.Information.settleNoStart)){
                    layerMsg("结算单号（从）不能大于结算单号（到）！");
                    return false
                }
            }
            if(($scope.Information.settleStartDate&&!$scope.Information.settleEndDate)||(!$scope.Information.settleStartDate&&$scope.Information.settleEndDate)){
                layerMsg("日期起期和日期止期必须同时输入或不输入！");
                return false
            }else if($scope.Information.settleEndDate&&$scope.Information.settleStartDate){
                if(($scope.Information.settleEndDate>=$scope.Information.settleStartDate)){

                }else {
                    layerMsg("日期起期不能大于日期止期！");
                    return false
                }
            }
            if(($scope.Information.operateStartDate&&!$scope.Information.operateEndDate)||(!$scope.Information.operateStartDate&&$scope.Information.operateEndDate)){
                layerMsg("日期起期和日期止期必须同时输入或不输入！");
                return false
            }else if(($scope.Information.operateStartDate&&$scope.Information.operateEndDate)){
                if(($scope.Information.operateEndDate>=$scope.Information.operateStartDate)){

                }else {
                    layerMsg("日期起期不能大于日期止期！");
                    return false
                }

            }
            if(($scope.Information.withHoldStartDate&&!$scope.Information.withHoldEndDate)||(!$scope.Information.withHoldStartDate&&$scope.Information.withHoldEndDate)){
                layerMsg("日期起期和日期止期必须同时输入或不输入！");
                return false
            }else if(($scope.Information.withHoldStartDate&&$scope.Information.withHoldEndDate)){
                if(($scope.Information.withHoldEndDate>=$scope.Information.withHoldStartDate)){

                }else {
                    layerMsg("日期起期不能大于日期止期！");
                    return false
                }

            }
            $scope.Information.userDto={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$scope.comCode
            };
            $$WithholdingPaidInformation.find('InformationSearch',{
                "withHoldNoStart":$scope.Information.withHoldNoStart,
                "withHoldNoEnd":$scope.Information.withHoldNoEnd,
                "withHoldNoList":$scope.Information.withHoldNoList,
                "settleNoStart":$scope.Information.settleNoStart,
                "settleNoEnd":$scope.Information.settleNoEnd,
                "settleNoList":$scope.Information.settleNoList,
                "freinsName":$scope.Information.freinsName,
                "freinsNameSign":$scope.Information.freinsNameSign,
                "currency":$scope.Information.currency,
                "settleStartDate":$scope.Information.settleStartDate,
                "settleEndDate":$scope.Information.settleEndDate,
                "operateStartDate":$scope.Information.operateStartDate,
                "operateEndDate":$scope.Information.operateEndDate,
                "withHoldEndDate":$scope.Information.withHoldEndDate||'',
                "withHoldStartDate":$scope.Information.withHoldStartDate||'',
                "taskCode":'payment.withholding.paymentinfo',
                "userDto":$scope.Information.userDto,
                //"globalUserCode":$scope.usercode,
                "withHoldStatus1":"1",
                "globalUserCode":"",
                "powerSystemCode":""
            },{
                success:function (data) {
                    $scope.InformationList = data.content.content;
                    if($scope.InformationList.length<1){
                        layerMsg('暂无数据！');
                    }
                    $scope.pagination.totalItems = data.content.totalCount;
                },
                error:function (d) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex,
                "pageSize": $scope.pagination.pageSize
            })

        };
        /**
         * 代扣代缴实付信息查询结果列表导出
         */
        $scope.exportDataToExcel = function () {

            $$WithholdingPaidInformation.exportDataToExcel($scope.Information,{
                success:function (data) {
                    if(data.resultCode =='0000'){
                        $scope.fileId = data.fileId;
                        window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
                        layer.msg('导出成功', {icon: 1});
                    }else {
                        layerMsg('导出失败');
                    }
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
        $scope.resetInformation=function(){
            $scope.Information={
            };
        };
        //说明项
        $scope.ExplanationItem = function(target){
            $modal.open({
                templateUrl:"components/reinsuranceWithholding/WithholdingPaidInformation/tpl/modal/withholdingPaidInformation.Explanation.modal.tpl.html",
                resolve:{
                    target:function () {
                        return target;
                    }
                },
                controller:function ($scope,$modalInstance,target) {
                    $scope.remark = target;
                    //关闭
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        }
        //凭证明细查看
        $scope.VoucherView = function(target){
            var obj3 = {};
            obj3.payRefNo=target;
            $$WithholdingPaidInformation.Vouchers(obj3,{
                success:function (data) {
                    $scope.VoucherList=data.intfSubVoucherQueryList;
                    $scope.vouStatus=data.vouStatus;
                    if(!$scope.VoucherList||$scope.VoucherList.length<1){
                        layerMsg('暂无数据！');
                        return false
                    }
                    $modal.open({
                        templateUrl:"components/reinsuranceWithholding/WithholdingPaidInformation/tpl/modal/withholdingPaidInformation.VoucherView.modal.tpl.html",
                        resolve:{
                            target:function(){
                                return $scope.VoucherList
                            },
                            vouStatus:function(){
                                return $scope.vouStatus
                            }

                        },
                        controller:function ($scope,$modalInstance,target,vouStatus) {
                            $scope.VoucherList=target;
                            $scope.vouStatus=vouStatus;//是否显示凭证复核和凭证取消按钮标志
                            //凭证复核
                            $scope.Reviews = function() {
                                $$WithholdingPaidInformation.voucherReview(obj3, {
                                    success: function (data) {
                                        $modalInstance.close(data);
                                        if(data.resultCode=='0000'){
                                            layerMsg(data.resultMassage,'success')
                                        }
                                    },
                                    error: function () {
                                    }
                                })
                            };
                            $scope.Cancel = function (target) {
                                var a3={};
                                var b1=[];
                                var obj4={};
                                $.each(target,function(index,obj){
                                    obj4['payRefNo']=obj.realPayRefNo;
                                    b1.push(angular.copy(obj4))
                                    a3.payRefNoList = b1;
                                    a3.modifyReason = "出错凭证"
                                });
                                $$WithholdingPaidInformation.voucherCancel(obj3, {
                                    success: function (data) {
                                        $scope.voucher = data;
                                        console.log($scope.voucher)
                                        if ($scope.voucher.resultCode == "0000") {
                                            layer.msg('凭证已取消，代扣代缴单已还原到未实付状态，请重新实付！',{icon: 1});
                                            return false;
                                        }else{
                                            layerMsg('凭证取消失败！');
                                        }
                                    },
                                    error: function () {
                                    }
                                });
                            }
                            console.log($scope.remake);
                            $scope.cancel = function () {
                                $modalInstance.dismiss();
                            };
                        }
                    }).result.then(function(reword){
                        if (reword.content.resultCode == "0000") {
                            layer.msg('复核成功！',{icon: 1});
                            InformationSearch('page',true);
                            return false;
                        }
                    });
                },
                error:function () {
                }
            });
        }
        //结算单明细查看
        $scope.SettlementView = function(target){
            var Settle = {};
            Settle.withHoldNo = target.withHoldNo
            var _data={
                "prpjReinsInputTaxRelatedMainDtoList":[
                    {
                        "withHoldNo": Settle.withHoldNo
                    }]
            }
            $$WithholdingPaidInformation.Settlements(_data,{
                success:function (data) {
                    if(data){
                        $scope.Settlement=data.content.prpjReinsInputTaxRelatedMainDtoList;
                        if($scope.Settlement==""){
                            layerMsg('暂无数据！');
                            return false
                        }
                        $modal.open({
                            templateUrl:"components/reinsuranceWithholding/WithholdingPaidInformation/tpl/modal/WiwithholdingPaidInformation.Settlement.modal.tpl.html",
                            resolve:{
                                target:function(){
                                    return $scope.Settlement
                                },
                                user:function(){
                                    return $scope.user
                                }

                            },
                            controller:function ($scope,$modalInstance,target,user) {
                                $scope.today=new Date().dateConversion();
                                $scope.Settlement = target;
                                $scope.printSubmit = function () {
                                    $modalInstance.close($scope.Settlement);
                                };
                                //导出
                                $scope.exportModel = function(){
                                    var C={};
                                    var A=[];
                                    var obj1={};
                                    obj1['withHoldNo']=$scope.Settlement[0].withHoldNo;
                                    A.push(angular.copy(obj1))
                                    C.prpjReinsInputTaxRelatedMainDtoList = A;
                                    C.userDto={
                                        "userCode":$scope.user.userCode,
                                        "userName":$scope.user.userName,
                                        "comCode":$scope.user.comCode,
                                    }
                                    $$WithholdingPaidInformation.exportModel(C,{
                                        success:function (data) {
                                            if(data.resultCode =='0000'){
                                                $scope.fileId = data.fileId;
                                                window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
                                                layer.msg('导出成功', {icon: 1});
                                            }else {
                                                layerMsg('导出失败');
                                            }
                                        },
                                        error:function () {
                                            layerMsg('导出失败！');
                                        }
                                    })
                                };
                                console.log($scope.remake)
                                $scope.cancel = function () {
                                    $modalInstance.dismiss();
                                };
                            }
                        }).result.then(function(reword){
                            $scope.printOne(reword)
                        })
                    }
                },
                error:function () {
                }
            });

        };
        /**
         * 打印
         */
        var printer=undefined;
        var _printData = undefined;
        window.VENUS.feedbackData = function(){
            if(printer)
                printer.transmittingData(_printData);
        };
        $scope.printTest=function(){

            //window.print();
        }
        $scope.printOne = function (target) {
            _printData = {
                test: target
            };
            $scope.url = 'components/reinsuranceWithholding/WithholdingPaidInformation/tpl/print/printTest.html';
            printer = window.open($scope.url);

        };
        //初始化
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
            $scope.Information={
                "collectionCheckedAll":false,
                "withHoldNoStart":"",
                "withHoldNoEnd":"",
                "withHoldNoList":"",
                "settleNoStart":"",
                "settleNoEnd":"",
                "settleNoList":"",
                "freinsName":"",
                "freinsNameSign":"=",
                "Currency1":"",
                "settleStartDate":"",
                "settleEndDate":"",
                "operateStartDate":"",
                "operateEndDate":"",
                "withHoldEnd":"",
                "withHoldStart":"",
                "globalUserCode":$scope.usercode,
                "userDto":{
                    "userCode":$scope.usercode||'',
                    "userName":$scope.userName,
                    "comCode":$scope.comCode
                },
                "powerSystemCode":"payment"
            };
            $scope.infoFlag=true;

        };
        init();
    };
    moduleApp.controller('WithholdingPaidInformationCtrl',['$scope','$modal','$$WithholdingPaidInformation',WithholdingPaidInformation]);
});
