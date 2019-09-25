/**
 * Created by Administrator on 2017/5/8 0008.
 */
/**
 *  结缴单管理
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var payTax = function ($scope, $$payTax,$modal,mcMultiEditorCacheService) {
        var init =function(){
            $scope.pagination = {
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'20',//显示条数
                maxSize:'3',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            $scope.getNum='';
            //实例化对象
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$payTax.PayTax().infoToView;
            }
            $scope.today=new Date().dateConversion();
            saveData();
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('payTax',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('payTax');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }
        /**
         * 勾选全选
         */
        $scope.selectedPayTaxAll = function (list,target) {
            angular.forEach(list, function (data) {
                if (target) {
                    data.checked = true;
                } else data.checked = false;
            });
        };
        /**
         *单选
         */
        $scope.selectedPayTaxOne = function (target,getNum) {
            $scope.infoToView.checkAll = $scope.infoToView.queryList.every(function (item, index, array) {
                return item.checked;
            })
        };
        /**
         *勾选改变状态
         */
        $scope.changePayTaxClass = function () {
            $scope.selectNum=0;
            angular.forEach($scope.infoToView.queryList, function (data) {
                if (data.checked) {
                    $scope.selectNum++;
                    if(!$scope.findObj(data,$scope.infoToView._queryList)){
                        $scope.infoToView._queryList.push(data);
                    }
                }
                else if($scope.findObj(data,$scope.infoToView._queryList)){
                    $scope.deleteObj(data,$scope.infoToView._queryList,'payrefno')
                    data.selectedClass=''
                } else {
                    data.selectedClass = ''
                }
            });

        };
        /**
         *
         */
        $scope.resetPayTax=function () {
            $scope.infoToView.queryConditions={
                "settlementNo":'',
                "payrefnoStart":"",
                "payrefnoEnd":"",
                "payrefnoLists":"",
                "currency":"",
                "centercode":"",
                "packagecode":"",
                "earlierMonth":"",
                "laterMonth":"",
                "centerflag":"",
                "flag":"1",
                "payrefflag":""
            }
        }
        /**
         *结缴单查询
         */
        $scope.payTaxQuery=function(target){
            $scope.infoToView.checkAll=false;
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.queryConditions.globalUserCode=$scope.usercode;
            $scope.infoToView.queryConditions.powerSystemCode=$scope.centerCode;
            $$payTax.payTaxSearch($scope.infoToView.queryConditions,{
                success: function (data) {
                    $scope.infoToView.queryList=data.content;
                    $scope.pagination.totalItems=data.totalCount
                    $scope.infoToView.checkAll = $scope.infoToView.queryList.every(function (item, index, array) {
                        return item.checked;
                    })
                    $scope.changePayTaxClass();
                    saveData();
                    if($scope.infoToView.queryList.length<1){
                        layerMsg('暂无数据！')
                        return false
                    }
                },
                error: function (e) {
                }
            },{
                "pageIndex":$scope.pagination.pageIndex,
                "pageSize":$scope.pagination.pageSize
            })
        }
        /**
         * 结算单详情
         */
        $scope.payTaxDetail=function(payrefNo){
            $modal.open({
                templateUrl:'components/settlementManage/carShipTax/payTax/tpl/modal/payTaxDetail.html',
                resolve:{
                    payrefNo:function(){
                        return payrefNo;
                    }
                },
                controller:function($scope,$modalInstance,payrefNo){
                    $$payTax.taxDetail({
                        "payrefno":payrefNo.payrefno
                    },{
                        success: function (data) {
                            console.log(data);
                            $scope.taxDetail=data.content[0];
                            $.each(Object.keys(payrefNo),function (index,obj) {
                                $scope.taxDetail.prpJCSTaxSettleBillDtoList[0][obj]=payrefNo[obj]
                            })
                        },
                        error: function (e) {
                        }
                    })

                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            })
        };
        /**
         * 日期改变
         */
        $scope.changeInputDate=function () {
            if($scope.infoToView.queryConditions.earlierMonth&&$scope.infoToView.queryConditions.laterMonth){
                if($scope.infoToView.queryConditions.laterMonth<$scope.infoToView.queryConditions.earlierMonth){
                    layer.msg('统计终止日期不能小于交易起止日期')
                    $scope.infoToView.queryConditions.laterMonth=$scope.infoToView.queryConditions.earlierMonth
                }
            }
        }
        /**
         *结缴单作废
         */
        $scope.nullify=function(No){
            // 风险提示弹窗
            layer.confirm('确定作废吗', {
                btn: ['确定','取消'] //按钮
            }, function(){
                //点确定回调方法
                $$payTax.taxDelete({
                    "payrefNo":No
                },{
                    success: function (data) {
                        if(data.resultCode=='0000'){
                            layerMsg(data.resultMsg,'success');
                            $scope.checkAll=false;
                            $scope.payTaxQuery();
                        }else {
                            layerMsg(data.resultMsg);
                        }
                    },
                    error: function (e) {
                    }
                })
            });
        };

        init();

    };

    moduleApp.controller('CarShipTaxpayTaxCtrl', ['$scope', '$$payTax','$modal','mcMultiEditorCacheService', payTax]);

});
