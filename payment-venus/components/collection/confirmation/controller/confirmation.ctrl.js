/**
 * 到账确认控制器
 */

define([
    '../module',
    'config'
],function (moduleApp,config) {
    'use strict';
    var ConfirmationCtrl=function($scope,$modal,$$confirmation,mcMultiEditorCacheService,$$venus,$timeout,$$util){


        var init=function(){
            $scope.parseInt = parseInt;
            $scope.queryNum=0;
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
            };
            $scope.today=new Date().dateConversion();
            //实例化对象
            $scope.confirmation=$$confirmation.Account();
            $scope.infoToView=$scope.confirmation.infoToView;
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$scope.confirmation.infoToView;
            }
            saveData();

        };
        //自动到款确认
        $scope.automatiConfirmation = function () {
            $$confirmation.paymentAndSpayCheck($scope,{
                success: function (data) {
                    if(data.resultCode=='0000'){
                        var contentConfirm = '';
                        $.each(data.getVoucherNoList,function(index,target){
                                contentConfirm+="<a style='color:#333'>"+target+"</a>"+"<br>"
                        })
                        layer.alert('自动到款确认成功'+'<br>'+contentConfirm,{icon:1})
                    }else{
                        layer.alert('自动到款确认失败',{icon:2})
                        return;
                    }
                },
                error: function (e) {
                }
            })
        }
        $scope.checkInputDate=function () {
            if($scope.infoToView.confirmQuery.endDate&&$scope.infoToView.confirmQuery.inputDate){
                if($scope.infoToView.confirmQuery.endDate<$scope.infoToView.confirmQuery.inputDate){
                    layer.msg('交易终止日期不能小于交易起止日期')
                    $scope.infoToView.confirmQuery.endDate=$scope.infoToView.confirmQuery.inputDate
                }
            }

        }
        /**
         *到账确认查询
         */
        $scope.confirmSearch = function (target) {
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.confirmQuery.transactionNoList=$$util.translateEnter($scope.infoToView.confirmQuery.transactionNoList)
            $scope.infoToView.confirmQuery.certiNoList=$$util.translateEnter($scope.infoToView.confirmQuery.certiNoList)
            $scope.infoToView.confirmQuery.webComCode=$scope.comCode;
            $$confirmation.confirmQuery($scope.infoToView.confirmQuery,{
                success: function (data) {
                    if(data.content){
                        $scope.infoToView.confirmList=data.content;
                        $scope.pagination.totalItems=data.totalCount;
                        if($scope.infoToView.confirmList.length<1&&target=='search'){
                            layerMsg('暂无数据！')
                            return false
                        }
                        // // 判断上次勾选数据
                        // angular.forEach($scope.infoToView.checkedConfirmList,function (obj) {
                        //     angular.forEach($scope.infoToView.confirmList,function (_obj) {
                        //         if(obj.transactionNo==_obj.transactionNo){
                        //             _obj.checked=true;
                        //         }
                        //     })
                        // })
                        // $scope.selectedOne(); //调用分页全选勾选状态
                        // $scope.selectedChangeClass();
                    }else {
                        layerMsg(data.resultMsg);
                    }

                },
                error: function (e) {
                }
            },{
                "pageIndex":$scope.pagination.pageIndex,
                "pageSize":$scope.pagination.pageSize
            })
        };
        //全选
        $scope.selectedAll=function(){
            angular.forEach($scope.infoToView.confirmList,function(data){
                if($scope.infoToView.checkStatus.checkedAccountAll){
                    data.checked=true;
                }else data.checked=false;
            });
        };
        //单选
        $scope.selectedOne=function(){
            $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.confirmList.every(function(item,index,array){
                return item.checked;
            })

        };
        /**
         *到账确认查询结果--样式改变
         */
        $scope.selectedChangeClass=function(index){
            angular.forEach($scope.infoToView.confirmList,function(data,i){
                if(index==i){
                    data.checked=true
                }else {
                    data.checked=false
                }
                if(data.checked){
                    data.selectedClass='venus_table_check';
                    if(!$scope.findObj(data,$scope.infoToView.checkedConfirmList)){
                        $scope.infoToView.checkedConfirmList.push(data);
                    }

                }
                else if($scope.findObj(data,$scope.infoToView.checkedConfirmList)){
                    $scope.deleteObj(data,$scope.infoToView.checkedConfirmList,'transactionNo')
                    data.selectedClass=''
                }else {
                    data.selectedClass=''
                }
            });
        };
        /**
         * 业务部门改变清空业务员
         */
        $scope.clearOperator=function () {
            $scope.infoToView.confirmQuery.operatorCode='';
            $scope.infoToView.confirmQuery.operatorName=''
        };
        /**
         *到账确认-提交确认
         */
        $scope.selectedSubmit=function(selectObj){
            if(!selectObj)
                selectObj=$scope.infoToView.checkedConfirmList[0];
            var user={
                "userCode":$scope.usercode,
                "comCode":$scope.comCode,
                "centerCode":$scope.centerCode
            }
            $modal.open({
                templateUrl: 'components/collection/confirmation/tpl/modal/collection.confirmation.selectedSubmit.modal.tpl.html',
                resolve: {
                    user:function () {
                        return user;
                    },
                    selectObj:function(){
                        return selectObj;
                    },
                    infoToView:function(){
                        return $scope.infoToView
                    }
                },
                controller: function ($scope, $modalInstance,infoToView,selectObj,user) {
                    $scope.user=user;
                    var payTotal=0
                    //获取table值
                    $$confirmation.submitDetail({
                        "transactionNo":selectObj.transactionNo
                    },{
                        success: function (data) {
                            $scope.resultCode=data.resultCode;
                            $scope.accountSelectList=data.MainList;
                            $scope.payWayList=[{
                                "payWay": "",
                                "payFlag":"",
                                "currency2": "CNY",
                                "accountNo":"",
                                "payRefFee":$scope.accountSelectList[0].sumFeeCny
                            }]
                        },
                        error: function (e) {
                        }
                    })
                    // //获取银行信息
                    $scope.getBank=function (item) {
                        if(item.payWay == '211'||item.payWay == '210'){
                            var _data = {
                                centerCode : user.centerCode,
                                webUserCode : user.userCode,
                                currency : item.currency2
                            };
                            //导入目标银行账号-币别
                            $$confirmation.queryNoBillBankAcount(_data,{
                                success: function (data) {
                                    var payWayObj2 = {};
                                    var payWaySelList2 = [];
                                   if(data.content.resultCode&&data.content.resultCode!='0000'){
                                       layerMsg(data.content.resultMsg);
                                       return false
                                   }
                                    $.each(data.content.accountList,function(index,obj){
                                        payWayObj2['code'] = obj.bankAccountNo;
                                        payWayObj2['value'] = obj.bankAccountNo+'-'+obj.currency;
                                        payWaySelList2.push(angular.copy(payWayObj2));
                                    });
                                    $scope.bankTypeCNYF = payWaySelList2;
                                },
                                error: function (e) {

                                }
                            });
                        }else {
                          $scope.payWayList[0].accountNo=''
                        }
                    }
                   /* //金额改变添加列函数
                    $scope.payChange=function(target,index){
                        if(!target) {
                            $scope.accountRecList[index].sumPayRefFee=0;
                        }
                        //定义一个添加修改数据的方法
                        var changeCount=function(target){
                            return saveDetail-target;
                        };
                        //如果只剩一列暂存数据恢复初始数据
                        if($scope.accountRecList.length==1){
                            saveDetail=payTotal;
                        }
                        //定义一个添加数组对象
                        var newList={
                            "amount": 0,
                            "operateType": "RECPREMIUM",
                            "pageSize": 0,
                            "payWay": "6",
                            "attaches": {},
                            "payWayType": "1",
                            "payType": "30",
                            "size": "2",
                            "pageNo": 0,
                            "centerCode": "00000000",
                            "currenCY": "CNY",
                            "sumPayRefFee": changeCount(target),
                            "verifyUrl": ""
                        };
                        //如果修改的数据小于剩余数据则执行
                        if(target<saveDetail){
                            var newListDetail=angular.copy(newList);
                            $scope.accountRecList.push(newListDetail);
                            saveDetail=changeCount(target);
                        }
                        else if(target>saveDetail){
                            $scope.accountRecList[index].sumPayRefFee=saveDetail
                        }
                    };*/
                    //删除按钮
                  /*  $scope.deleteAccount=function(index) {
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
                    };*/
                    $scope.changPayWay=function(index){
                        $scope.showBankFlag=index
                    };
                    $scope.cancel=function(){
                        $modalInstance.dismiss()
                    };
                    //确认
                    $scope.accountSubmit=function(){
                        //var index=0;
                        //angular.forEach($scope.accountRecList,function(data){
                        //    index++;
                        //    data.serialNo=index;
                        //});
                        $$confirmation.accountSubmit({
                            "transactionNo":$scope.accountSelectList[0].transactionNo,
                            "resultCode":$scope.resultCode||'',
                            "currency2":$scope.payWayList[0].currency2||'',
                            "accountNo":$scope.payWayList[0].accountNo||'',
                            "payWay":$scope.payWayList[0].payWay||'',
                            "webCenterCode":$scope.user.centerCode,
                            "webUserCode":$scope.user.userCode
                        },{
                            success: function (data) {
                                if(data.resultCode=='0000'){
                                    $scope.getNo=data.voucherNo;
                                    $modalInstance.close($scope.getNo);

                                }else {
                                    layerMsg(data.resultMassage);
                                    return false;
                                }

                            },
                            error: function (e) {
                            }
                        });
                    }
                }
            }).result.then(function (record) {
                layer.alert("到款确认成功！<br>临时凭证号：<span style='color: red'>"+record+"</span>", {
                    icon: 1
                });
                $scope.selectedPay=0;
                $scope.selectedNum=0
            });
        };

        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('confirmation',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('confirmation');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            $scope.infoToView.moreFlag=!$scope.infoToView.moreFlag;
        }
        /**
         * 重置表单
         */
        $scope.resetConfirm=function(){
            $.each(Object.keys($scope.infoToView.confirmQuery),function (index,obj) {
                $scope.infoToView.confirmQuery[obj]=''
            })
        };
        init();
    };
    moduleApp.controller('ConfirmationCtrl',['$scope','$modal','$$confirmation','mcMultiEditorCacheService','$$venus','$timeout','$$util',ConfirmationCtrl]);

});