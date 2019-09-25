/**
 *暂收款存取控制器
 */
define([
    '../module',
    'config'
], function (moduleApp,config) {
    'use strict';
    var collectionTemporaryAccess = function ($scope,$$code, $$collectionTemporaryAccess,$modal,mcMultiEditorCacheService) {
        /**
         * 初始化
         */
        var init=function () {
            //分页信息
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '3',//最大页数
                numPages: '',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            //实例化对象
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$$collectionTemporaryAccess.Account().infoToView;
            }
            $scope.tapName = $scope.infoToView.tapName;
            $scope.auditingConditions = [];
            $scope.PrpJCommBillDto = [];
            $scope.lisr2 = {};
            $scope.lisr = {};
        };
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('collectionTemporaryAccess',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('collectionTemporaryAccess');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }
        $scope.newsaveInputData=function () {
            saveData();
        }
        /**
         * tap切换
         */
        $scope.changeTap = function (index) {
            $scope.infoToView.tapFlag = index;
            $scope.infoToView.checkStatus.checkedAccountAll='';
            saveData();
        };
        $scope.infoFlagg = function(a){
            $scope.infoToView.showflag2 = false;
            if(a == 1){
                $scope.infoToView.infoFlag = false;
                $scope.infoToView.newconfirmList = {};
                $scope.infoToView.seccessConfirmList = {};
            }else if(a == 2){
                $scope.infoToView.infoFlag = true;
                $scope.infoToView.showflag =false;
            }
        }
        //导入银行账号
        $scope.myFunc = function(){
            $scope.centerCode = $scope.centerCode;
            //导入目标银行账号-币别
            $$collectionTemporaryAccess.queryBankAcount($scope,{
                success: function (data) {
                    var payWayObj = {};
                    var payWaySelList = [];
                    $.each(data.content,function(index,obj){
                        payWayObj['code'] = obj.bankAccountNo;
                        payWayObj['value'] = obj.bankAccountNo+'-'+obj.currency;
                        payWaySelList.push(angular.copy(payWayObj));
                    })
                    $scope.bankTypeCNY = payWaySelList;
                },
                error: function (e) {

                }
            });
        }
        //无单预收查询
        $scope.searchAdviceOfSettlement = function (target) {
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.colRegCondition.globalUserCode = $scope.usercode;
            $scope.infoToView.colRegCondition.powerSystemCode = $scope.comCode;
            $$collectionTemporaryAccess.searchReparations($scope.infoToView.colRegCondition,{
                success: function (data) {
                    $scope.infoToView.confirmList=data.content.content;
                    if($scope.infoToView.confirmList.length<1){
                        layerMsg('暂无数据！')
                        return false
                    }
                    $scope.pagination.totalItems=data.content.totalCount;
                    saveData();
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex-1,
                "pageSize": $scope.pagination.pageSize
            })
        }

        /**
         *重置
         */
        $scope.collectionReset = function () {
            $scope.infoToView.colRegCondition = {};
            $scope.infoToView.newcolRegCondition = {};
            $scope.infoToView.tcolRegCondition = {};
            $scope.infoToView.newtcolRegCondition = {};
        };
        $scope.chosebank = function () {
            $scope.infoToView.showflag = true;
            $scope.infoToView.newconfirmList={};
            $scope.pagination.totalItems2 = 0;
            $scope.PrpJCommBillDto = [];
            //统一格式银行流水查询
            $scope.addCollectSearch = function (target) {
                if(target!='page'){
                    $scope.pagination.pageIndex=1;
                }
                $scope.infoToView.newcolRegCondition.globalUserCode = $scope.usercode;
                $scope.infoToView.newcolRegCondition.powerSystemCode = $scope.comCode;
                $$collectionTemporaryAccess.tonyisearchReparations($scope.infoToView.newcolRegCondition,{
                    success: function (data) {
                        $scope.infoToView.newconfirmList=data.content.content;
                        $scope.infoToView.selectfalg = true;
                        if($scope.infoToView.newconfirmList.length<1){
                            layerMsg('暂无数据！')
                            return false
                        }
                        $scope.pagination.totalItems2=data.content.totalCount;
                        angular.forEach($scope.infoToView.newconfirmList,function(data){
                            data.checked=false;
                            data.selectedClass='';
                            $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.newconfirmList.every(function(item,index,array){
                                return item.checked;
                            })
                        })
                    },
                    error: function (e) {
                    }
                },{
                    "pageNo": $scope.pagination.pageIndex-1,
                    "pageSize": $scope.pagination.pageSize
                })
            }
        };
        /**
         * 全选
         */
        $scope.checkedReparationsAll=function(allFlag,objList){
            $.each(objList,function(index,obj){
                if(allFlag){
                    obj.checked=true;
                }else obj.checked=false;
            });
        }
        /**
         * 单选
         */
        $scope.checkedReparationsOne=function(){
            $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.newconfirmList.every(function(item,index,array){
                return item.checked;
            })
        };
        var aa;
        $scope.test=function(a){
            angular.forEach($scope.infoToView.newconfirmList,function(data,index){
                if(index==a){
                    data.selectedClass='venus_table_check';
                    aa=data;
                }
                else {
                    data.selectedClass=''
                }
            });
    }
        /**
         * 勾选改变状态
         */
        $scope.selectedChangeClass=function(){
            angular.forEach($scope.infoToView.newconfirmList,function(data){
                if(data.checked){
                    data.selectedClass='venus_table_check';
                }
                else {
                    data.selectedClass=''
                }
            });
        };
        //提交选择
        $scope.settlementConfirmation = function(){
            $scope.preBillNoList = [];
            if(aa==undefined){
                layerMsg('请选择！');
                return false;
            }
            $scope.PrpJCommBillDto.push(aa);
            $scope.preBillNoList.push(aa.unifySerialNum);
            $scope.infoToView.showflag = false;
            $scope.infoToView.selectfalg = false;
            $$collectionTemporaryAccess.noneusedie($scope.preBillNoList,{
                success: function (data) {
                    $scope.infoToView.seccessConfirmList = data.content.prpJbankFlowDetallDtoList;
                    $scope.lisr2 = data.content.prpJNoBillFeeDetailDto;
                    $scope.lisr2.accoulag = $$code.getCodeName($scope.lisr2.accountFlag,'accountFlag');
                    $scope.lisr2.accountp = $$code.getCodeName($scope.lisr2.accountType,'accountType_company');
                    $scope.lisr2.accountpw = $$code.getCodeName($scope.lisr2.certificateType,'IDTYPE');
                    $scope.infoToView.showflag2 = true;
                    $scope.pagination.totalItems= $scope.infoToView.seccessConfirmList.length;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex-1,
                "pageSize": $scope.pagination.pageSize
            })
        }
        //删除
        $scope.deleteMessage = function (target,index){
            $scope.infoToView.seccessConfirmList.splice(index, 1);
            $scope.pagination.totalItems = $scope.infoToView.seccessConfirmList.length;
            layer.msg('删除成功！', {icon: 1});
        };
        //提交
        $scope.settlementConfirmationSuccess = function(target){
                $scope.infoToView.confirmList = {};
                $scope.confirmunifySerialNum = {};
                $scope.preBillNoList2=[];
                $scope.confirmunifySerialNum.globalUserCode = $scope.usercode;
                $scope.confirmunifySerialNum.powerSystemCode = $scope.comCode;
                for(var j= 0;j<$scope.infoToView.seccessConfirmList.length;j++){
                    $scope.preBillNoList2[j]=$scope.infoToView.seccessConfirmList[j].unifySerialNum;
                }
                if($scope.infoToView.seccessConfirmList.length<1){
                    layerMsg('请选择！');
                    return false;
                }
                $$collectionTemporaryAccess.unifySerialNum($scope,{
                    success: function (data) {
                        $scope.lisr2 = {};
                        $scope.searchAdviceOfSettlement();
                        $scope.infoToView.infoFlag = true;
                        if(data.content.resultCode == '0000'){
                            layerMsg(data.content.resultMsg,'success')
                            $scope.infoToView.infoFlag = true;
                            $scope.searchAdviceOfSettlement();
                        }else{
                            layerMsg(data.content.resultMsg)
                            return false;
                        }
                    },
                    error: function (e) {
                    }
                },{
                    "pageNo": $scope.pagination.pageIndex-1,
                    "pageSize": $scope.pagination.pageSize
                })

        }
        //提交重置
        //$scope.settlementCollectionReset = function(){
        //    $scope.lisr2 = {};
        //}
        //退无单查询
        $scope.tsearchAdviceOfSettlement = function(target){
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.tcolRegCondition.globalUserCode = $scope.usercode;
            $scope.infoToView.tcolRegCondition.powerSystemCode = $scope.comCode;
            $$collectionTemporaryAccess.tsearchReparations($scope.infoToView.tcolRegCondition,{
                success: function (data) {
                    $scope.infoToView.TconfirmList=data.content.content;
                    if($scope.infoToView.TconfirmList.length<1){
                        layerMsg('暂无数据！')
                        return false
                    }
                    $scope.pagination.totalItems3=data.content.totalCount;
                },
                error: function (e) {
                }
            },{
                "pageNo": $scope.pagination.pageIndex-1,
                "pageSize": $scope.pagination.pageSize
            })
        }
        //退无单新增查询
            $scope.taddCollectSearch = function (target) {
                if(target!='page'){
                    $scope.pagination.pageIndex=1;
                }
                $scope.infoToView.newtcolRegCondition.globalUserCode = $scope.usercode;
                $scope.infoToView.newtcolRegCondition.powerSystemCode = $scope.comCode;
                $$collectionTemporaryAccess.addsearchReparations($scope.infoToView.newtcolRegCondition,{
                    success: function (data) {
                        $scope.infoToView.neiTconfirmLists=data.content.content;
                        $scope.infoToView.newconfirmList = $scope.infoToView.neiTconfirmLists;
                        if($scope.infoToView.neiTconfirmLists.length<1){
                            layerMsg('暂无数据！')
                            return false
                        }
                        $scope.pagination.totalItems4=data.content.totalCount;
                        angular.forEach($scope.infoToView.neiTconfirmLists,function(data){
                            data.checked=false;
                            $scope.infoToView.checkStatus.checkedAccountAll=$scope.infoToView.neiTconfirmLists.every(function(item,index,array){
                                return item.checked;
                            })
                        })
                    },
                    error: function (e) {
                    }
                },{
                    "pageNo": $scope.pagination.pageIndex-1,
                    "pageSize": $scope.pagination.pageSize
                })
            }
        $scope.datfalg = false;
        $scope.tsettlementConfirmation = function(tagert){
            $scope.PrpJCommBillDtoList={};
            $scope.lisr = {};
            $scope.PrpJCommBillDtoList = tagert;
            $scope.lisr.globalUserCode = $scope.usercode;
            $scope.lisr.powerSystemCode = $scope.comCode;
            $scope.lisr.centerCode = $scope.centerCode;
            $modal.open({
                templateUrl: 'components/collection/collectionTemporary/collectionTemporaryAccess/tpl/modal/accountIntuihuan.modal.tpl.html',
                resolve: {
                    PrpJCommBillDtoList:function () {
                        return $scope.PrpJCommBillDtoList
                    },
                    lisr:function () {
                        return $scope.lisr
                    }
                },
                controller: function ($scope, $modalInstance,PrpJCommBillDtoList,lisr) {
                    $scope.lisr = lisr;
                    $$collectionTemporaryAccess.availableFee($scope.lisr,PrpJCommBillDtoList,{
                        success: function (data) {
                            $scope.auditingConditions=data.content.PrpJNoBillFeeRequestDto;
                            $scope.usercode = $scope.lisr.globalUserCode;
                            $scope.comCode = $scope.lisr.powerSystemCode;
                            $scope.centerCode = $scope.lisr.centerCode;
                            $scope.lisr = data.content.PrpJNoBillFeeRequestDto;
                           $scope.lisr.accouaantFlag = $$code.getCodeName($scope.lisr.accountFlag,'accountFlag');
                            $scope.lisr.accounssatType = $$code.getCodeName($scope.lisr.accountType,'accountType_company');
                            $scope.lisr.accountTypwwe = $$code.getCodeName($scope.lisr.certificateType,'IDTYPE');
                        },
                        error: function (e) {
                        }
                    })
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    //导入银行账号
                    $scope.myFuncType = function(){
                        if($scope.lisr.payWayCode == '211'){
                            $scope.datfalg = true;
                            $scope.centerCode = $scope.centerCode;
                            $scope.webUserCode = $scope.usercode;
                            $scope.currency = $scope.auditingConditions.currency;
                            //导入目标银行账号-币别
                            $$collectionTemporaryAccess.queryNoBillBankAcount($scope,{
                                success: function (data) {
                                    var payWayObj2 = {};
                                    var payWaySelList2 = [];
                                    $.each(data.content,function(index,obj){
                                        payWayObj2['code'] = obj.bankAccountNo;
                                        payWayObj2['value'] = obj.bankAccountNo+'-'+obj.currency;
                                        payWaySelList2.push(angular.copy(payWayObj2));
                                    })
                                    $scope.bankTypeCNYF = payWaySelList2;
                                },
                                error: function (e) {

                                }
                            });
                        }else {
                            $scope.datfalg = false;
                        }
                    }
                    //金额校验
                    $scope.checkFee = function () {
                        if($scope.auditingConditions.prePayFee<0||$scope.auditingConditions.prePayFee>$scope.auditingConditions.availableFee){
                            layerMsg("退还金额不能大于可用金额！")
                            $scope.auditingConditions.prePayFee=""
                        }
                    };
                    $scope.confirmAuditing = function () {
                        if($scope.lisr.customName == undefined||$scope.lisr.customName == ''){
                            layer.msg("请录入客户名称");
                        }else if($scope.lisr.accountCode == undefined||$scope.lisr.accountCode == ''){
                            layer.msg("请录入账号/卡号");
                        }else if($scope.lisr.prePayFee == undefined||$scope.lisr.prePayFee == ''){
                            layer.msg("请录入退还金额");
                        }else if($scope.lisr.payWayCode == undefined||$scope.lisr.payWayCode == ''){
                            layer.msg("请选择收付方式");
                        }else if($scope.lisr.accountFlag == undefined||$scope.lisr.accountFlag == ''){
                            layer.msg("请录入卡折标志");
                        } else if($scope.lisr.accountType == undefined||$scope.lisr.accountType == ''){
                            layer.msg("请录入公私标志");
                        }else{
                            $scope.lisr.prePayFeeS = $scope.auditingConditions.prePayFee;
                            $scope.lisr.globalUserCode = $scope.usercode;
                            $scope.lisr.powerSystemCode = $scope.comCode;
                            $$collectionTemporaryAccess.lisr($scope.lisr,$scope.auditingConditions,{
                                success: function (data) {
                                    $scope.datfalg = false;
                                    if(data.content.resultCode == '0000'){
                                        layerMsg(data.content.resultMsg,'success')
                                        $scope.lisr = {};
                                    }else{
                                        layerMsg(data.content.resultMsg)
                                        return false;
                                    }
                                    $modalInstance.dismiss();
                                },
                                error: function (e) {
                                }
                            })
                        }
                    }
                }
            });
        }
        init();
    };


    moduleApp.controller('CollectionTemporaryAccessCtrl', ['$scope','$$code', '$$collectionTemporaryAccess','$modal','mcMultiEditorCacheService',collectionTemporaryAccess]);

});
