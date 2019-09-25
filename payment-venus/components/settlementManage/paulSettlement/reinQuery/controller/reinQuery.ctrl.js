/**
 * 结算管理-再保分出结算
 */
define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var reinQuery = function ($scope, $$reinQuery,$modal,mcMultiEditorCacheService) {

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
                $scope.infoToView=$$reinQuery.reinQuery().infoToView;
            }
            saveData();
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('reinQuery',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('reinQuery');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }

        /**
         *再保查询
         */
        $scope.reinData=function(target){
            $scope.checkedAll=false;
            if(target=='page'){
                $scope.pagination.pageIndex=1;
            }
            $$reinQuery.reinSearch($scope.infoToView.queryConditions,{
                    success: function (data) {
                        $scope.infoToView.queryList=data.list;
                        saveData();
                        // $scope.pagination.totalItems=$scope.importList.length;
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
         * 重置表单
         */
        $scope.resetImport=function(){
            $scope.query={
                "settleNo1":'',
                "settleNo2":'',
                "settleNoList":'',
                "reinsCode":'',
                "currency":'',
                "operateDateStart":'',
                "operateDateEnd":'',
            }
        }

        /**
         * 再保结算单详情
         */
        $scope.reinDetail=function(target){
            $modal.open({
                templateUrl:'components/settlementManage/paulSettlement/reinQuery/tpl/modal/reinDetail.html',
                resolve:{
                    target:function(){
                        return target;
                    }
                },
                controller:function($scope,$modalInstance,target){
                    $$reinQuery.reinQueryDetail({
                        "settleNo":target
                    },{
                        success: function (data) {
                            console.log(data);
                            $scope.settleDetail=data.prpJreinsPaymentDto;
                            $scope.settleFlag=data.settleFlag;
                            $scope.settleDataList=data.listDetail;
                        },
                        error: function (e) {
                        }
                    });
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result.then(function(reword){

            })
        };
        /**
         * 再保结算
         */
         $scope.reinSubmit=function(selectNo){
             var user={
                 "userCode":$scope.usercode,
                 "comCode":$scope.comCode,
                 "centerCode":$scope.centerCode
             }
             $modal.open({
                 templateUrl:'components/settlementManage/paulSettlement/reinQuery/tpl/modal/reinCheckIn.html',
                 resolve:{
                     selectNo:function(){
                         return selectNo
                     },
                     user:function () {
                         return user
                     }
                 },
                 controller:function($scope,$modalInstance,selectNo,user){
                     $scope.user=user;
                     var payTotal=0;
                     $scope.getBank=function (item) {
                         if(item.payWay == '211'){
                             var _data = {
                                 centerCode : $scope.user.centerCode,
                                 webUserCode :  $scope.user.userCode,
                                 currency : item.confirmCurrency
                             };
                             //导入目标银行账号-币别
                             $$reinQuery.queryNoBillBankAcount(_data,{
                                 success: function (data) {
                                     var payWayObj2 = {};
                                     var payWaySelList2 = [];
                                     $.each(data.content,function(index,obj){
                                         payWayObj2['code'] = obj;
                                         payWayObj2['value'] = obj.bankAccountNo+'-'+obj.currency;
                                         payWaySelList2.push(angular.copy(payWayObj2));
                                     });
                                     $scope.bankTypeCNYF = payWaySelList2;
                                 },
                                 error: function (e) {

                                 }
                             });
                         }
                     }
                     $$reinQuery.reinDataQuery({
                         "settleNo":selectNo
                     },{
                         success: function (data) {
                             $scope.reObj=[];
                             $scope.reListObj=data.PrpJreinsPaymentDto;
                             $scope.reObj[0]=data.PaymentVerifyVO;
                             payTotal=$scope.reObj[0].sumPayRefFee;
                         },
                         error: function (e) {
                         }
                     });
                     var saveDetail=payTotal;
                     //金额改变添加列函数
                     $scope.payChange=function(target,index){
                         if(!target) {
                             $scope.reObj[index].sumPayRefFee=0;
                         }
                         //定义一个添加修改数据的方法
                         var changeCount=function(target){
                             return saveDetail-target;
                         };
                         //如果只剩一列暂存数据恢复初始数据
                         if($scope.reObj.length==1){
                             saveDetail=payTotal
                         }
                         //定义一个添加数组对象
                         var _obj={
                             "agentAccountFlag": "0",
                             "coinsCommissionFlag": "0",
                             "coinsType": "0",
                             "confirmCurrency": "CNY",
                             "operateType": "",
                             "payRefNoType": "6",
                             "payType": "37",
                             "payWay": "",
                             "payWayFlag": "1",
                             "payWayType": "",
                             "size": "1",
                             "sumPayRefFee": "3.3",
                             "userCode": "222",
                             "verifyUrl": ""
                         };
                         //如果修改的数据小于剩余数据则执行
                         if(target<saveDetail){
                             var newListDetail=angular.copy(_obj);
                             $scope.reObj.push(newListDetail);
                             saveDetail=changeCount(target);
                         }
                         else if(target>saveDetail){
                             $scope.reObj[index].sumPayRefFee=saveDetail
                         }
                     };
                     //删除按钮
                     $scope.deleteAccount=function(index) {
                         var totalListCount = 0;
                         if ($scope.accountRecList.length == '1') {
                             layerMsg('唯一项不可删除！');
                             return false;
                         }
                         if(index<$scope.accountRecList.length-1){
                             layerMsg('请先删除最后选项！');
                             return false;
                         }
                         $scope.accountRecList.splice(index, 1)
                         angular.forEach($scope.accountRecList, function (data) {
                             totalListCount = parseInt(data.sumPayRefFee) + totalListCount
                         });
                         $scope.accountRecList[index-1].sumPayRefFee=payTotal-totalListCount+parseInt($scope.accountRecList[index-1].sumPayRefFee);
                     };
                     /**
                      * 提交确认
                      */
                     $scope.reinDetailSubmit=function(){
                         $$reinQuery.settlementSave({
                             "settleNo": $scope.reListObj.settleNo,
                             "currency2": $scope.reListObj.currency2,
                             "payRefFee": $scope.reListObj.payRefFee,
                             "payType": "37",
                             "payWay": "1",
                             "accountNo":"",
                             "confirmCurrency": "CNY",
                             "sumPayRefFee": "3.3",
                             "globalUserCode":"123456"
                         },{
                             success: function (data) {
                                 console.log(data);
                                 if(data.content.resultCode=='0000'){
                                     $modalInstance.close(data);
                                 }else {
                                     layerMsg(data.content.message)
                                 }

                             },
                             error: function (e) {
                             }
                         })
                     };
                     //关闭弹窗
                     $scope.cancel = function () {
                         $modalInstance.dismiss();
                     };
                 }
             }).result.then(function(data){

             })

         }
        init();


    };

    moduleApp.controller('ReinQueryCtrl', ['$scope', '$$reinQuery','$modal','mcMultiEditorCacheService', reinQuery]);

});