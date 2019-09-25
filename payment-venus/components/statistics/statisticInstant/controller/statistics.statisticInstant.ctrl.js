/**
 * 查询统计-实时查询控制器
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var instant = function ($scope,$$statisticInstant,$modal,mcMultiEditorCacheService) {
        /**
         * 页面初始化加载
         */
        var init=function(){
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
            //实例化对象
            $scope.instant=$$statisticInstant.StatisticInstant();
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$scope.instant.infoToView;
            }
            saveData();
        };
        $scope.selectItem=function () {
            $modal.open({
                templateUrl: 'components/statistics/statisticInstant/tpl/modal/titleItem.html',
                resolve: {
                    infoToView:function () {
                        return $scope.infoToView;
                    }
                },
                controller: function ($scope, $modalInstance,infoToView) {
                    $scope.infoToView=infoToView;
                    $$statisticInstant.titleItem({
                        success: function (data) {
                            if($scope.infoToView._itemList){
                                $.each($scope.infoToView._itemList,function (index,itemCode) {
                                    $.each(data,function (i,_obj) {
                                        if(_obj.itemCode==itemCode){
                                            _obj.checked=true
                                        }
                                    })
                                })
                            }
                            $scope.infoToView.itemList=data;

                        },
                        error: function (e) {
                        }
                    });
                    $scope.checkAll=function () {
                        angular.forEach($scope.infoToView.itemList, function (data) {
                            if (infoToView.model.checkAll) {
                                data.checked = true;
                            } else data.checked = false;
                        });
                    }
                    $scope.selectItemCode=function () {
                        var newCodeList=[];
                        $.each($scope.infoToView.itemList,function (index,obj) {
                            if(obj.checked){
                                newCodeList.push(obj);
                            }
                        })
                        $modalInstance.close(newCodeList);
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result.then(function (list) {
                $scope.infoToView.queryConditions.itemCode=list;
               $scope.infoToView._itemList= getListCode(list);
            });

        }
        //获取选择code值
        var getListCode=function (list) {
            var newCode=[]
            $.each(list,function (index,obj) {
                newCode.push(obj.itemCode)
            })
            return newCode
        }
        //删除选择条目
        $scope.delItem=function (index) {
            $scope.infoToView.queryConditions.itemCode.splice(index,1);
            $scope.infoToView._itemList= getListCode($scope.infoToView.queryConditions.itemCode);
        }
        
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('statisticInstant',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('statisticInstant');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        };
        /**
         * 凭证查询
         * @param target
         */
        $scope.voucherQuery=function(target){
            if(!target){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.queryConditions._itemCode= getListCode($scope.infoToView.queryConditions.itemCode);
            $scope.infoToView.queryConditions.webUserCode = $scope.usercode;
            $scope.infoToView.queryConditions.webComCode = $scope.comCode;
            $scope.infoToView.queryConditions.webCenterCode = $scope.centerCode;
            $scope.infoToView.queryConditions.webTaskCode = 'payment.integrated.realtime.proofquery';
            $$statisticInstant.voucherSearch($scope.infoToView.queryConditions,{
                    success: function (data) {
                        console.log(data);
                        $scope.infoToView.queryList=data.content;
                        $scope.pagination.totalItems=data.totalCount;
                        if($scope.infoToView.queryList.length<1&&!target){
                            layerMsg('暂无数据！');
                            return false;
                        }
                        saveData();
                    },
                    error: function (e) {
                    }
                },{
                "pageNo":$scope.pagination.pageIndex,
                "pageSize":$scope.pagination.pageSize
                }
            )
        };
        /**
         * 凭证查询--清单查询
         */
        $scope.voucherList = function (target) {
            $modal.open({
                templateUrl: 'components/statistics/statisticInstant/tpl/modal/voucherReceivableList.modal.tpl.html',
                resolve: {
                    target:function () {
                      return target
                    },
                    pagination:function () {
                        return $scope.pagination
                    }
                },
                controller: function ($scope, $modalInstance,target,pagination) {
                    $scope.pagination=pagination;
                    $$statisticInstant.payLossInfo({
                        "voucherNo":target
                    },{
                        success:function (data) {
                            $scope.paymentList = data.content.dailyPaymentCheckList;
                            $scope.paymentList2 = data.content;
                            $scope.pagination.totalItems2=$scope.paymentList.length;
                        },
                        error:function () {
                        }
                    },{
                        "pageNo": $scope.pagination.pageIndex,
                        "pageSize": $scope.pagination.pageSize
                    });
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //查询业务信息
                    $scope.searchBus=function(obj){
                        $modal.open({
                            templateUrl: 'components/statistics/statisticInstant/tpl/modal/businessInfoList.modal.tpl.html',
                            resolve: {
                            },
                            controller: function ($scope, $modalInstance) {
                                $$statisticInstant.searchBus(obj,{
                                        success: function (data) {
                                            $scope.businessInfoList=data;
                                            if($scope.businessInfoList.length<1){
                                                layerMsg('暂无数据');
                                            }
                                        },
                                        error: function (e) {
                                        }
                                    }
                                );
                                $scope.cancel = function () {
                                    $modalInstance.dismiss();
                                };
                            }
                        });
                    };
                }
            });
        };
        /**
         * 重置表单
         */
        $scope.resetVoucher=function () {
            //重置表单，界面初始化
            $scope.infoToView.queryConditions={
                "queryType":$scope.infoToView.queryConditions.queryType,
                "businessType":"1",
                "No":"",
                "certiNo":"",
                "centerCode":"",
                "accVoucherNo":"",
                "realPayRefNo":"",
                "yearMonth":"",
                "itemCode":[],
                "riskCode":"",
                "comCode":'',
                "shareHolderFlag":'',
            }
            $scope.infoToView._itemList=[];
        };
        init();
    };
    moduleApp.controller('StatisticInstantCtrl', ['$scope','$$statisticInstant','$modal','mcMultiEditorCacheService',instant]);
});