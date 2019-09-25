/**
 * 结算管理-生成再保结算单
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var reinCreate = function ($scope, $$reinCreate,$modal, $state,mcMultiEditorCacheService) {

        var init=function(){
            $scope.pagination = {
                totalItems:'',//总数
                pageIndex:1,//当前页面
                pageSize:'15',//显示条数
                maxSize:'3',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            }
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$reinCreate.reinCreate().infoToView;
            }
            saveData();
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('reinCreate',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('reinCreate');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }
        /**
         * 重置表单
         */
        $scope.resetReinCreate=function () {
            $.each(Object.keys($scope.infoToView.queryConditions),function (index,obj) {
                $scope.infoToView.queryConditions[obj]=''
            })
        }

        /**
         * 生成再保结算单查询
         */
        $scope.reinCreateSearch=function(target){
            if(target=='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.checkedAll=false;
            $$reinCreate.reinCreateQuery($scope.infoToView.queryConditions,{
                    success: function (data) {
                        $scope.infoToView.queryList=data;
                        // 判断上次勾选数据
                        angular.forEach($scope.infoToView._queryList,function (obj) {
                            angular.forEach($scope.infoToView.queryList,function (_obj) {
                                if(obj.accNo==_obj.accNo){
                                    _obj.checked=true;
                                }
                            })
                        })
                        $scope.changeExClass();
                        $scope.selectedExOne();
                        $scope.pagination.totalItems=$scope.infoToView.queryList.length;
                        saveData();
                    },
                    error: function (e) {
                    }
                },{
                    "pageIndex":$scope.pagination.pageIndex,
                    "pageSize":$scope.pagination.pageSize
                }
            )
        }
        /**
         * 全选
         */
        $scope.selectedExAll = function (list,target) {
            angular.forEach(list,function (data) {
                if (target){
                    data.checked = true
                }else {
                    data.checked = false
                }
            })
        };
        /**
         * 单选
         */
        $scope.selectedExOne = function () {
            $scope.infoToView.checkedAll = $scope.infoToView.queryList.every(function (data) {
                return data.checked;
            })
        };
        /**
         * 勾选改变状态
         */
        $scope.changeExClass = function () {
            $scope.selectNum=0;
            angular.forEach($scope.infoToView.queryList, function (data) {
                if (data.checked) {
                    if(!$scope.findObj(data,$scope.infoToView._queryList)){
                        $scope.infoToView._queryList.push(data);
                    }
                    $scope.selectPay+=data.planFee;
                    $scope.selectNum++;
                }
                else if($scope.findObj(data,$scope.infoToView._queryList)){
                    $scope.deleteObj(data,$scope.infoToView._queryList,'accNo')
                }
            });
        };
        /**
         * 获取勾选数值
         */
        $scope.getCheckedArray=function(){
            var checkList=[];
            angular.forEach($scope.infoToView.queryList,function (data) {
                if (data.checked){
                  checkList.push(angular.copy(data))
                }
            });
           $scope.newArray=checkList;
        };
        /**
         * 账单详情
         */
        $scope.reinCreateDetail=function(target){
            $modal.open({
                templateUrl:'components/settlementManage/paulSettlement/reinCreate/tpl/modal/exportDetail.html',
                resolve:{
                    target:function(){
                        return target;
                    }
                },
                controller:function($scope,$modalInstance,target){
                    $$reinCreate.reinQueryData({
                        "accNo":target.accNo||'',
                        "payAccNo":target.payAccNo||'',
                        "payNo":target.payNo||''
                    },{
                        success: function (data) {
                            $scope.reinDetail=data.prpJreinsFeeDto;
                            $scope.reinDetailList=data.prpJReinsFeeItemDtoList;
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
        //var trasString=function(list,str){
        //    var target=''
        //    $.each(list,function(index,data){
        //        if(data.checked){
        //            if(target){
        //                target=target+','+data[str]
        //            }else {
        //                target=data[str]
        //            }
        //        }
        //    });
        //    return target;
        //}
        /**
         * 账单结付
         */
         $scope.reinPaySubmit=function(){
             var _list=[];
             var a={}
             $.each($scope.infoToView.queryList,function(index,obj){
                 if(obj.checked){
                     a['accNo']=obj.accNo||'';
                     a['reinsCode']=obj.reinsCode||'';
                     a['reinsName']=obj.reinsName||'';
                     a['currency1']=obj.currency1||'';
                     a['planFee']=obj.planFee||'';
                     a['accPeriod']=obj.accPeriod||'';
                     a['payAccNo']=obj.payAccNo||'';
                     a['payNo']=obj.payNo||'';
                     _list.push(angular.copy(a));
                 }
             })
             $$reinCreate.reinPay(_list,{
                 success: function (data) {
                    console.log(data);
                     var reinData=data;
                     $modal.open({
                         templateUrl:'components/settlementManage/paulSettlement/reinCreate/tpl/modal/exCheckIn.html',
                         resolve:{
                             reinData:function(){
                                 return reinData;
                             }
                         },
                         controller:function($scope,$modalInstance,reinData){
                             $scope.reinPayData=reinData
                             $scope.exSubmit=function(){
                                 $$reinCreate.reinConfirm($scope.reinPayData,{
                                     success: function (data) {
                                         if(data.resultCode=='0000'){
                                             $modalInstance.close(data);
                                         }
                                         else {
                                             layerMsg(data.resultMsg)
                                         }

                                     },
                                     error: function (e) {
                                     }
                                 })
                             }
                             //关闭弹窗
                             $scope.cancel = function () {
                                 $modalInstance.dismiss();
                             };
                         }
                     }).result.then(function(data){
                         layer.confirm('成功生成结算单号'+data.settleNo, {
                             btn: ['结算单结算','返回'] //按钮
                         }, function(){
                             //点确定回调方法
                             $state.go('reinQuery');
                             layer.closeAll();
                         });
                     })
                 },
                 error: function (e) {
                 }
             })

         }
        init();


    };

    moduleApp.controller('ReinCreateCtrl', ['$scope', '$$reinCreate','$modal','$state','mcMultiEditorCacheService', reinCreate]);

});