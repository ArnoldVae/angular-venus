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
    var certiManage = function ($scope, $$certiManage,$modal, $state,mcMultiEditorCacheService) {
        var init =function(){

            $scope.pagination = {
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'15',//显示条数
                maxSize:'3',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$certiManage.Common().infoToView;
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
            mcMultiEditorCacheService.localData('certiManage',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('certiManage');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }
        /**
         * 起保日期改变
         */
        $scope.changeInputDate=function () {
            if($scope.infoToView.queryConditions.startDate&&$scope.infoToView.queryConditions.endDate){
                if($scope.infoToView.queryConditions.endDate<$scope.infoToView.queryConditions.startDate){
                    layer.msg('起保终止日期不能小于交易起止日期')
                    $scope.infoToView.queryConditions.endDate=$scope.infoToView.queryConditions.startDate
                }
            }
            if($scope.infoToView.queryConditions.startUnderwriteDate&&$scope.infoToView.queryConditions.endUnderwriteDate){
                if($scope.infoToView.queryConditions.endUnderwriteDate<$scope.infoToView.queryConditions.startUnderwriteDate){
                    layer.msg('审核终止日期不能小于交易起止日期')
                    $scope.infoToView.queryConditions.endUnderwriteDate=$scope.infoToView.queryConditions.startUnderwriteDate
                }
            }
        }
        /**
         * 勾选全选
         */
        $scope.selectedComAll = function (list,target) {
            angular.forEach(list, function (data) {
                if (target) {
                    data.checked = true;
                } else data.checked = false;
            });
        };
        /**
         *单选
         */
        $scope.selectedComOne = function (target,getNum) {
            $scope.infoToView.checkAll = $scope.infoToView.queryList.every(function (item, index, array) {
                return item.checked;
            })
            if(target){
                $scope.getNum=getNum;
            }else {
                $scope.getNum='';
            }

        };
        /**
         *勾选改变状态
         */
        $scope.changeComClass = function () {
            $scope.infoToView.selectPay=0;
            $scope.infoToView.selectNum=0
            angular.forEach($scope.infoToView.queryList, function (data) {
                if (data.checked) {
                    if(!$scope.findObj(data,$scope.infoToView._queryList)){
                        $scope.infoToView._queryList.push(data);
                    }
                    $scope.infoToView.selectPay+=data.planFee;
                    $scope.infoToView.selectNum++;
                }
                else if($scope.findObj(data,$scope.infoToView._queryList)){
                    $scope.deleteObj(data,$scope.infoToView._queryList,'certiNo')
                }
            });
        };
        /**
         *联共保查询
         */
        $scope.commonListQuery=function(target){
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.checkAll=false;
            $$certiManage.commonSearch($scope.infoToView.queryConditions,{
                success: function (data) {
                    $scope.infoToView.queryList=data.content;
                    $scope.pagination.totalItems=data.totalElements;
                    if(!data.content||data.content<1&&!target){
                        layerMsg('暂无数据！')
                        return false
                    }
                    // // 判断上次勾选数据
                    // angular.forEach($scope.infoToView._queryList,function (obj) {
                    //     angular.forEach($scope.infoToView.queryList,function (_obj) {
                    //         if(obj.certiNo==_obj.certiNo){
                    //             _obj.checked=true;
                    //         }
                    //     })
                    // })
                    $scope.changeComClass();
                    saveData();
                    $scope.infoToView.checkAll = $scope.infoToView.queryList.every(function (item, index, array) {
                        return item.checked;
                    }); //调用分页全选勾选状态

                },
                error: function (e) {
                }
            },{
                "pageIndex":$scope.pagination.pageIndex,
                "pageSize":$scope.pagination.pageSize
            })
        }
        /**
         *重置表单
         */
        $scope.resetCommon=function(){
            $scope.infoToView.queryConditions={
                "certiNo":"",
                "comCode":"",
                "certiNoStr":"",
                "handler1Name":"",
                "appliName":"",
                "riskCode":"",
                "insuredName":"",
                "agentName":"",
                "currency1":"",
                "contractNo":"",
                "coinsName":"",
                "policyNo":"",
                "businessNature":"",
                "centerCode":"",
                "startDate":"",
                "endDate":"",
                "startUnderwriteDate":"",
                "endUnderwriteDate":"",
            }
        }
        /**
         * 联共保业务提交
         */
        $scope.conSettleSubmit=function(){

            var newArr=[]
            $.each($scope.infoToView.queryList,function(index,obj){
                if(obj.checked){
                    newArr.push(angular.copy(obj));
                }
            })
            var user={
                "userCode":$scope.usercode,
                "comCode":$scope.comCode,
                "userName":$scope.userName,
                "centerCode":$scope.centerCode
            }
            $modal.open({
                templateUrl:'components/settlementManage/commonSettle/certiManage/tpl/modal/commonDetail,modal.html',
                resolve:{
                    array:function(){
                        return newArr;
                    },
                    user:function () {
                        return user
                    }
                },
                controller:function($scope,$modalInstance,array,user){
                    $scope.com={
                        "certiId":""
                    };
                    /**
                     * 字符串拼接
                     */
                    var trasString=function(list,str){
                        var target=''
                        $.each(list,function(index,data){
                            if(data.checked){
                                if(target){
                                    target=target+','+data[str]
                                }else {
                                    target=data[str]
                                }
                            }
                        });
                        return target;
                    }
                    $scope.commonSelectList=array;
                    //确定
                    $scope.comSubmit=function(){
                        $scope.com.certiId=trasString($scope.commonSelectList,'certiId')
                        $scope.com.webUserName=user.userName;
                        $scope.com.webUserCode=user.userCode;
                        $scope.com.webComCode=user.comCode;
                        $scope.com.webCenterComCode=user.centerCode;
                        $$certiManage.commSubmit($scope.com,{
                            success: function (data) {
                                if(data.resultCode=='0000'){
                                    $modalInstance.close(data);
                                }else {
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
            }).result.then(function(record){
                if(record){
                    showPayrefNo(record);
                }

            })
        };
        var showPayrefNo=function(target){
            $modal.open({
                templateUrl:'components/settlementManage/commonSettle/certiManage/tpl/modal/payrefNo.modal.html',
                resolve:{
                    target:function(){
                        return target;
                    }
                },
                controller:function($scope,$modalInstance,target){
                    $scope.payrefNo=target.resultMsg;

                    //确定
                    $scope.paySubmit=function(){

                        $state.go('payreCom');
                    }
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.close();
                    };
                }
            }).result.then(function(){
                $scope.checkAll=false;
                $scope.commonListQuery();
            })
        }


        init();

    };

    moduleApp.controller('CertiManageCtrl', ['$scope', '$$certiManage','$modal','$state','mcMultiEditorCacheService', certiManage]);

});
