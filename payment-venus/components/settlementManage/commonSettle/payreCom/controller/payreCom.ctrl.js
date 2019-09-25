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
    var payreCom = function ($scope, $$payreCom,$modal,mcMultiEditorCacheService, $state) {
        var init =function(){
            $scope.pagination = {
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'10',//显示条数
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
                $scope.infoToView=$$payreCom.Payre().infoToView;
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
            mcMultiEditorCacheService.localData('payreCom',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('payreCom');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }
        /**
         * 日期改变
         */
        $scope.changeInputDate=function () {
            if($scope.infoToView.queryConditions.earlierMonth&&$scope.infoToView.queryConditions.laterMonth){
                if($scope.infoToView.queryConditions.laterMonth<$scope.infoToView.queryConditions.earlierMonth){
                    layer.msg('结算单终止日期不能小于交易起止日期')
                    $scope.infoToView.queryConditions.laterMonth=$scope.infoToView.queryConditions.earlierMonth
                }
            }
        }

        /**
         * 勾选全选
         */
        $scope.selectedPayAll = function (list,target) {
            angular.forEach(list, function (data) {
                if (target) {
                    data.checked = true;
                } else data.checked = false;
            });
        };
        /**
         *单选
         */
        $scope.selectedPayOne = function (target,getNum) {
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
        $scope.changePayClass = function () {
            $scope.selectPay=0;
            $scope.selectNum=0;
            angular.forEach($scope.infoToView.queryList, function (data) {
                if (data.checked) {
                    data.selectedClass = 'venus_table_check';
                    if(!$scope.findObj(data,$scope.infoToView._queryList)){
                        $scope.infoToView._queryList.push(data);
                    }
                    $scope.selectPay+=data.billfee;
                    $scope.selectNum++;
                }
                else if($scope.findObj(data,$scope.infoToView._queryList)){
                    $scope.deleteObj(data,$scope.infoToView._queryList,'certiNo')
                    data.selectedClass=''
                } else {
                    data.selectedClass = ''
                }
            });
        };
        /**
         * 结算单详情
         */
        $scope.payreDetail=function(payrefNo){
            $modal.open({
                templateUrl:'components/settlementManage/commonSettle/payreCom/tpl/modal/payreDetail.html',
                resolve:{
                    payrefNo:function(){
                        return payrefNo;
                    }
                },
                controller:function($scope,$modalInstance,payrefNo){
                    $$payreCom.payDetail({
                        "payrefno":payrefNo
                    },{
                        success: function (data) {
                            $scope.payDetail=data;
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
         * 结算单修改
         */
        $scope.modifyPayre=function(obj){
            $modal.open({
                templateUrl:'components/settlementManage/commonSettle/payreCom/tpl/modal/payreModifyDetail,modal.html',
                resolve:{
                    obj:function(){
                        return obj;
                    }
                },
                controller:function($scope,$modalInstance,obj){
                    console.log(obj);
                    $scope.payref=obj;
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //确定
                    $scope.payrefModeifySubmit=function(){
                        $$payreCom.payModify($scope.payref,{
                                success: function (data) {
                                    $modalInstance.close(data);
                                },
                                error: function (e) {
                                }
                            }
                        )
                    }
                }
            }).result.then(function(record){
                if(record.resultCode=='0000'){
                    layerMsg(record.message,'success');
                    $scope.payreQuery('page')
                }
                else{
                    layerMsg(record.message)
                }
            })

        };
        /**
         *联共保结算单
         */
        $scope.payreQuery=function(target){
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.checkAll=false;
            $$payreCom.payreSearch($scope.infoToView.queryConditions,{
                success: function (data) {
                    $scope.infoToView.queryList=data.content;
                    $scope.infoToView.checkAll = $scope.infoToView.queryList.every(function (item, index, array) {
                        return item.checked;
                    })
                    // // 判断上次勾选数据
                    // angular.forEach($scope.infoToView._queryList,function (obj) {
                    //     angular.forEach($scope.infoToView.queryList,function (_obj) {
                    //         if(obj.certiNo==_obj.certiNo){
                    //             _obj.checked=true;
                    //         }
                    //     })
                    // })
                    // $scope.changePayClass();
                    saveData();
                    if(!data.content||data.content<1&&!target){
                        layerMsg('暂无数据！')
                        return false
                    }
                    $scope.pagination.totalItems=data.totalCount;
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
        $scope.resetPayre=function(){
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
        var showPayrefNo=function(target){
            $modal.open({
                templateUrl:'components/settlementManage/commonSettle/payreCom/tpl/modal/paySuccess.modal.html',
                resolve:{
                    target:function(){
                        return target;
                    }
                },
                controller:function($scope,$modalInstance,target){
                    $scope.getNo=target;

                    //确定
                    $scope.pSubmit=function(){
                        $modalInstance.close();
                    }
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                }
            }).result.then(function(record){
                $scope.checkAll=false;
                $scope.payreQuery();
            })
        }
        /**
         * 点击确认--下一步
         */
        $scope.payrefNext=function(obj){
            var user={
                "userCode":$scope.usercode,
                "comCode":$scope.comCode,
                "userName":$scope.userName,
                "centerCode":$scope.centerCode
            }
            $modal.open({
                templateUrl:'components/settlementManage/commonSettle/payreCom/tpl/modal/payrefNext.html',
                resolve:{
                   obj:function(){
                        return obj;
                    },
                    user:function () {
                        return user
                    }
                },
                controller:function($scope,$modalInstance,obj,user){
                    $scope.com=obj;
                    var payTotal=0
                    $$payreCom.payrefSubmitData({
                        "payrefno":obj.payrefno,
                        "currency":obj.currency
                    },{
                        success: function (data) {
                            console.log(data);
                            $scope.comMData=data;
                            payTotal=data.billfee;
                            $scope.bankData=[
                                {
                                    "currenCy2": $scope.comMData.currency,
                                    "payWay":$scope.comMData.payType,
                                    "accountNo":'',
                                    "billfee":payTotal,
                                    "centerCode":user.centerCode
                                }
                            ];
                        },
                        error: function (e) {
                        }
                    });
                    $$payreCom.payWaySelect({
                        "comCode":user.comCode,
                        "permitPayType":"ZP01"
                    },{
                        success: function (data) {
                            var a={}
                            var aList=[];
                            $.each(data.content,function(index,obj){
                                a['code']=obj.payWayCode;
                                a['value']=obj.payWayCName
                                aList.push(angular.copy(a))
                            })
                            $scope.payWayList=aList;
                        },
                        error: function (e) {
                        }
                    })
                    $$payreCom.confirmBank({
                        "centerCode":user.centerCode,
                        "webUserCode":user.userCode,
                        "currency":"CNY"
                    },{
                        success: function (data) {
                            var a={}
                            var aList=[];
                            $.each(data.accountList,function(index,obj){
                                a['code']=obj.bankAccountNo;
                                a['value']=obj.bankAccountName
                                aList.push(angular.copy(a))
                            })
                            $scope.accuntNoList=aList;
                        },
                        error: function (e) {
                        }
                    })

                    var saveDetail=payTotal;
                    //金额改变添加列函数
                    $scope.payInputChange=function(target,index){
                        if(!target) {
                            $scope.bankData[index].billfee=0;
                        }
                        //定义一个添加修改数据的方法
                        var changeCount=function(target){
                            return saveDetail-target;
                        };
                        //如果只剩一列暂存数据恢复初始数据
                        if($scope.bankData.length==1){
                            saveDetail=payTotal
                        }
                        //定义一个添加数组对象
                        var newList={
                            "currenCy2":'CNY',
                            "payWay":'',
                            "accountNo":'',
                            "billfee":changeCount(target),
                        };
                        //如果修改的数据小于剩余数据则执行
                        if(target<saveDetail){
                            var newListDetail=angular.copy(newList);
                            $scope.bankData.push(newListDetail);
                            saveDetail=changeCount(target);
                        }
                        else if(target>saveDetail){
                            $scope.bankData[index].billfee=saveDetail
                        }
                    };
                    //删除按钮
                    $scope.delfee=function(index) {
                        var totalListCount = 0;
                        if ($scope.bankData.length == '1') {
                            layerMsg('唯一项不可删除！');
                            return false;
                        }
                        if(index<$scope.bankData.length-1){
                            layerMsg('请先删除最后选项！');
                            return false;
                        }
                        $scope.bankData.splice(index, 1)
                        angular.forEach($scope.bankData, function (data) {
                            totalListCount = parseInt(data.billfee) + totalListCount

                        });
                        $scope.bankData[index-1].billfee=payTotal-totalListCount+parseInt($scope.bankData[index-1].billfee);
                    };
                    //确定
                    $scope.payreOk=function(){
                        if(payTotal<0){
                            layerMsg('结算单金额必须为正数才可送资金平台！');
                            return false;
                        }
                        var _data={
                            "payType":'',
                            "accountNo":'',
                            "currency1":'',
                            "planFee":''
                        }
                        $.each($scope.bankData,function(index,obj){
                            _data.payType+=obj.payWay+','
                            _data.accountNo+=obj.accountNo+','
                            _data.currency1+=obj.currenCy2+','
                            _data.planFee+=obj.billfee+','
                        })
                        // webUserCode，webUserName
                        $$payreCom.payrefSubmit({
                            "planPayRefNo":obj.payrefno,
                            "sendPlatform":"1",
                            "payRefDate":new Date(obj.packagedate).dateConversion(),
                            "attribute1":$scope.comMData.prpJpaymentBillList[0].attribute1,
                            "attribute2": $scope.comMData.prpJpaymentBillList[0].attribute2,
                            "centerCode":obj.centercode,
                            "centerCodeName":"",
                            "operateType":"COINSSETTLE",
                            "webUserCode":user.userCode,
                            "webUserName":user.userName,
                            "payType":_data.payType.substring(0,_data.payType.length-1),
                            "accountNo": _data.accountNo.substring(0,_data.accountNo.length-1),
                            "currency1": _data.currency1.substring(0,_data.currency1.length-1),
                            "planFee": _data.planFee.substring(0,_data.planFee.length-1)
                        },{
                            success: function (data) {
                                console.log(data);
                                if(data.resultCode=='0000'){
                                    $modalInstance.close(data.getNum);
                                }else {
                                    layerMsg(data.message)
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
                showPayrefNo(record)
            })

        }


        init();

    };

    moduleApp.controller('PayreComCtrl', ['$scope', '$$payreCom','$modal','mcMultiEditorCacheService','$state', payreCom]);

});
