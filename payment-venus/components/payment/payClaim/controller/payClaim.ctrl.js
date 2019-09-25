/**
 * 到账确认控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var PayClaimCtrl = function($scope,$modal,$$payClaim,mcMultiEditorCacheService){

        $scope.display=false;
        /**
         * 全选&&添加勾选高亮样式
         */
        $scope.selectedAll=function(){
            angular.forEach($scope.payClaim.claimList,function(data){
                if($scope.payClaim.status.checkedAccountAll){
                    data.checked=true;
                }else {
                    data.checked=false;
                }
            });
        };
        /**
         * 单选
         */
        $scope.selectedOne=function(){
            $scope.payClaim.status.checkedAccountAll=$scope.payClaim.claimList.every(function(item){
                return item.checked;
            });
        };
        /**
         * 重置表单
         */
        $scope.resetClaim=function(){
            $scope.payClaim.claimQuery={
                "compensateNo":"",
                "compensateNoList":"",
                "policyNo":"",
                "riskCode":"",
                "currency1":"",
                "comCode":"",
                "handler1Code":"",
                "appliName":"",
                "insuredName":"",
                "endCaseDate":"",
                "underWriteDateFrom":"",
                "underWriteDateTo":"",
                "certiType":""
            };
        };
        /**
         * 付赔款查询结果复选框改变时--更改选中样式 计算费用 记录勾选数据
         * @param claim 当前勾选数据
         */
        $scope.checkedBoxChanged=function(claim){

            changeCheckStatus(claim);//控制复选框可选状态
            record(claim);//记录勾选的保单/批单
            if(claim){
                $scope.selectedOne();//同步全选框状态
            }
            cacutate();//计算汇总金额
        };

        /**
         * 付赔款列表查询
         * flag
         */
        $scope.claimSearch = function (flag) {

            $scope.payClaim.claimQuery.webUserCode = $scope.usercode;
            $scope.payClaim.claimQuery.webComCode = $scope.comCode;
            $scope.payClaim.claimQuery.webCenterCode = $scope.centerCode;

            $$payClaim.claimQuery($scope.payClaim.claimQuery,{
                success: function (data) {
                    $scope.payClaim.claimList=data.content.content;

                    if($scope.payClaim.claimList.length<1&&flag){
                        layerMsg('暂无数据！');
                        return false
                    }
                    $scope.payClaim.pagination.totalItems=data.content.totalCount;//列表总条数

                    // syncData();//同步上次勾选数据状态 暂时关闭此功能
                    changeCheckStatus();//重置可选状态
                    $scope.payClaim.checkedRecords=[];//清空勾选列表 同步上次勾选数据状态功能开启后须注销
                    $scope.selectedOne();//更新复选框状态
                    cacutate();//计算勾选数量和金额

                },
                error: function (e) {
                }
            },{
                "pageIndex":$scope.payClaim.pagination.pageIndex,
                "pageSize":$scope.payClaim.pagination.pageSize
            })
        };
        /**
         *付赔款-提交确认
         */
        $scope.selectedSubmit=function(){

            if($scope.payClaim.checkedRecords.length==0){
                layerMsg('请选择！');
                return false;
            }

            $modal.open({
                templateUrl: 'components/payment/payClaim/tpl/modal/payClaim.selectedSubmit.modal.tpl.html',
                resolve: {
                    payClaim:function(){
                        return $scope.payClaim
                    },
                    user:function(){
                        return $scope.user
                    },
                    centerCode:function(){
                        return $scope.centerCode
                    },
                    centerName:function(){
                        return $scope.centerName
                    },
                    usercode:function(){
                        return $scope.usercode
                    }
                },
                controller: function ($scope, $modalInstance,payClaim,user,centerCode,centerName,usercode) {

                    $scope.payClaim=payClaim;
                    $scope.centerCode=centerCode;

                    $scope.accountRecList=angular.copy($scope.payClaim.accountRecInitList);

                    var LossAndVerifyDto={
                        userCode:$scope.user.userCode,
                        centerCode:centerCode,
                        lossPlanQueryForPayRepDtoList:$scope.payClaim.checkedRecords
                    };
                    $$payClaim.getClaimDetail(LossAndVerifyDto,{
                        success: function (data) {
                            if(data){
                                $scope.claimData=data.content;
                                $scope.claimData.planFeeSumAbs=Math.abs(data.thisPlanFeeSum);//合计金额绝对值
                                $scope.collectionList=[];
                                $scope.collectionList[0]=$scope.claimData.paymentVerifyDto;
                                //实付币种初始化赋值
                                angular.forEach($scope.claimData.lossPlanQueryForPayRepDtoList,function(data){
                                    data.currency2 = data.currency1
                                })
                            }
                        },
                        error: function (e) {
                        }
                    });
                    $scope.accountRecList[0].sumPayRefFee=$scope.payClaim.selectedPay;//将总价格赋值
                    var saveDetail=$scope.payClaim.selectedPay;//临时存放上一次数据
                    //金额改变添加列函数
                    $scope.payChange=function(target,index){
                        if(!target) {
                            $scope.payClaim.claimList[index].sumPayRefFee=0;
                        }
                        //定义一个添加修改数据的方法
                        var changeCount=function(target){
                            return saveDetail-target;
                        };
                        //如果只剩一列暂存数据恢复初始数据
                        if($scope.payClaim.claimList.length==1){
                            saveDetail=$scope.payClaim.selectedPay
                        }
                        //定义一个添加数组对象
                        var newList={
                            "currenCy2":'CNY',
                            "payWay":'',
                            "accountNo":'',
                            "sumPayRefFee":changeCount(target),
                            "centerCode":'11999000'
                        };
                        //如果修改的数据小于剩余数据则执行
                        if(target<saveDetail){
                            var newListDetail=angular.copy(newList);
                            $scope.payClaim.accountRecList.push(newListDetail);
                            saveDetail=changeCount(target);
                        }
                        else if(target>saveDetail){
                            $scope.payClaim.accountRecList[index].sumPayRefFee=saveDetail
                        }
                    };
                    //删除按钮
                    $scope.deleteAccount=function(index) {
                        var totalListCount = 0;
                        if ($scope.payClaim.accountRecList.length == '1') {
                            layerMsg('唯一项不可删除！');
                            return false;
                        }
                        if(index<$scope.payClaim.accountRecList.length-1){
                            layerMsg('请先删除最后选项！');
                            return false;
                        }
                        $scope.payClaim.accountRecList.splice(index, 1)
                        angular.forEach($scope.payClaim.accountRecList, function (data) {
                            totalListCount = parseInt(data.sumPayRefFee) + totalListCount

                        });
                        $scope.payClaim.accountRecList[index-1].sumPayRefFee=payTotal-totalListCount+parseInt($scope.payClaim.accountRecList[index-1].sumPayRefFee);
                    };
                    $scope.changPayWay=function(index){
                        $scope.showBankFlag=index
                    };
                    $scope.getBank = function(item){
                        if(item.payWayType == '211'||item.payWayType == '210'){
                            var _data = {
                                centerCode : centerCode,
                                webUserCode : usercode,
                                currency : item.confirmCurrency
                            };
                            //导入目标银行账号-币别
                            $$payClaim.queryNoBillBankAcount(_data,{
                                success: function (data) {
                                    var payWayObj2 = {};
                                    var payWaySelList2 = [];
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
                            $scope.collectionList[0].accountNo=''
                        }
                    };
                    //币种与兑换率二级联动
                    $scope.findExchangeRate = function (item) {
                        $$payClaim.findExchangeRate(item,{
                            success:function (data) {
                                if(data.content.resultCode=="0000"){
                                    item.currentExchangeRate = data.content.exchangeRate;
                                    item.thisPlanFee = data.content.exchangeRate*item.planFee;
                                }else {
                                    layerMsg(data.content.resultMsg)
                                }
                            },
                            error:function () {

                            }
                        });
                    };
                    //通过实收金额计算汇率
                    $scope.countRate = function (item) {
                        item.currentExchangeRate=item.thisPlanFee/item.planFee;
                    };
                    //通过汇率计算实收金额
                    $scope.countFee = function (item) {
                        item.thisPlanFee=item.planFee*item.currentExchangeRate;
                    };
                    $scope.cancel=function(){
                        $modalInstance.dismiss()
                    };
                    //确认
                    $scope.accountSubmit=function(){

                        //校验收付信息
                        if(!isVerification($scope.collectionList)){
                            return false;
                        }
                        var index=0;
                        angular.forEach($scope.payClaim.accountRecList,function(data){
                            index++;
                            data.serialNo=index;
                        });

                        // 赔款业务信息集合
                        var lossPlanQueryForPayRepDtoList=angular.copy($scope.claimData.lossPlanQueryForPayRepDtoList);
                        var sign = false;
                        $.each(lossPlanQueryForPayRepDtoList,function(index,target){
                            target.exchRate=target.exchangeRate;
                            target.thisRealPayRefFee=target.doneFeeSum;
                            target.payRefTime=new Date().dateConversion();
                            if(!target.currency2){
                                sign = true
                            }
                        });
                        if(sign){
                            layerMsg("实付币种不能为空！");
                            return false
                        }
                        $$payClaim.claimSubmit({

                            userCode: user.userCode,//收付员代码
                            userName: user.userName,//收付员名称
                            comCode: user.comCode,//收付单位代码
                            comName: user.userComName,//收付单位名称
                            payRefDate: new Date().dateConversion(),//收付日期
                            centerCode: centerCode,//核算单位代码
                            centerName: centerName,//核算单位名称
                            lossPlanQueryForPayRepDtoList: lossPlanQueryForPayRepDtoList,//赔款业务信息集合
                            //凭证信息
                            paymentVerifyDto: {
                                payType:$scope.claimData.paymentVerifyDto.payType,//支付类型
                                confirmCurrency:$scope.claimData.paymentVerifyDto.confirmCurrency,//收付币种
                                sumPayRefFee:$scope.claimData.planFeeSumAbs//本次金额合计 取绝对值
                            },
                            prpJpaymentDetailList:$scope.collectionList//收付信息集合
                        },{
                            success: function (data) {
                                // $scope.getNo=data.returnContent;
                                $modalInstance.close(data.content.returnContent);
                            },
                            error: function (e) {
                            }
                        });
                    }
                }
            }).result.then(function (payResult) {
                $scope.successModal(payResult);
                $scope.confirmSearch();
            });

            /**
             *到账确认查询
             */
            $scope.confirmSearch = function (target) {
                $scope.queryNum=0;
                if(target!='page'){
                    $scope.payClaim.pagination.pageIndex=1;
                }
                $$payClaim.claimQuery($scope.payClaim.claimQuery,{
                    success: function (data) {
                        $scope.confirmList=data.content.content;
                        if($scope.confirmList.length<1){
                            layerMsg('暂无数据！');
                            return false
                        }
                        $scope.payClaim.pagination.totalItems=data.content.totalCount;

                        angular.forEach($scope.confirmList,function(data){
                            $scope.queryNum++;
                            data.checked=false;
                        })
                    },
                    error: function (e) {
                    }
                },{
                    "pageIndex":$scope.payClaim.pagination.pageIndex,
                    "pageSize":$scope.payClaim.pagination.pageSize
                })
            };
            /**
             * 支付成功弹窗
             */
            $scope.successModal=function(payResult){

                //todo 暂未提供成功失败标志
                layer.alert(payResult, {
                    icon:1
                });

            }
        };

        /**
         * 计算勾选保单数量和金额
         */
        var cacutate=function(){
            $scope.payClaim.selectedPay=0;//勾选的总金额
            angular.forEach($scope.payClaim.checkedRecords,function(target,index){
                $scope.payClaim.selectedPay+=target.planFee;
            });
        };
        /**
         * 记录勾选的保单号/批单号
         * 同步勾选样式
         * @param obj
         */
        var record=function(obj){

            if(obj){//勾选复选框时
                if(obj.checked){//如果勾选
                    $scope.payClaim.checkedRecords.push(obj);//记录此条数据

                }else{//如果取消勾选
                    $scope.deleteObj(obj,$scope.payClaim.checkedRecords,'policyNo');//删除此条记录

                }
            }else{//勾选全选框时
                if(isEquelCurrency($scope.payClaim.claimList)){//判断币种是否相同&&是否可勾选
                    $scope.payClaim.status.checkedClaimAll_disabled=false;//可全选

                    $scope.selectedAll();
                    angular.forEach($scope.payClaim.claimList,function(target){

                        if($scope.payClaim.status.checkedAccountAll){//如果全选框勾选
                            if(!$scope.findObj(target,$scope.payClaim.checkedRecords)){//先判断当前勾选数据是否已经存在记录列表中
                                $scope.payClaim.checkedRecords.push(target);//记录此条数据

                            }
                        }else{//如果未勾选
                            $scope.deleteObj(target,$scope.payClaim.checkedRecords,'policyNo');//删除对应记录

                        }

                    });
                }else{//币种不相同不允许勾选全选
                    $scope.payClaim.status.checkedAccountAll=false;
                    $scope.payClaim.status.checkedClaimAll_disabled=true;

                }
            }
        };
        /**
         * 同步上次勾选列表数据状态（复选框状态，勾选样式）
         * 勾选数据列表 $scope.payClaim.checkedRecords
         */
        var syncData = function(){
            angular.forEach($scope.payClaim.claimList,function(data){
                data.checked=false;

                angular.forEach($scope.payClaim.checkedRecords,function(target){
                    if(data.policyNo==target.policyNo){//通过唯一标示进行判断
                        data.checked=true;//复选框默认false
                    }
                });

            });
        };
        /**
         * 获取上次数据
         */
        var getLastData = function(){
            var localDada=mcMultiEditorCacheService.localData('payClaim');//获取上次数据
            if(localDada){
                $scope.payClaim=localDada;
            }
        };
        /**
         * 存储当前页面数据和状态
         */
        var saveData = function(){
            mcMultiEditorCacheService.localData('payClaim',$scope.payClaim);//存储数据
        };
        /**
         * 校验
         * @returns {boolean}
         */
        var isVerification = function(collectionList){
            var result=true;
            if(!collectionList[0].payWayType){
                result=false;
                layerMsg('收付方式为必填项');
                return result
            }else if(!collectionList[0].accountNo&&collectionList[0].payWayType=='211'){
                result=false;
                layerMsg('银行账号为必填项');
                return result
            }
            return result;

        };
        /**
         * 判断复选框是否勾选
         * @param item
         */
        var checkedCurrency1 = function(item){
            return item.checked;
        };
        /**
         * 1.判断选中的币种是否都相同&&2.应付金额和已支付金额相等不能进行支付
         * @param data
         * @returns {boolean}
         */
        var isEquelCurrency = function(data){
            //校验币种是否一样
            var currency1 = data[0].currency1;
            // var currency1 = $scope.payClaim.status.currency1 ? $scope.payClaim.status.currency1 : data[0].currency1; //【暂时注释，开启跨页勾选功能时取消注释】
            var result=true;

            $.each($scope.payClaim.claimList,function(index,target){
                if(currency1!=target.currency1||target.realPayRefFee==target.planFee){
                    result=false;
                    return result
                }
            });
            return result;
        };
        /**
         * 控制复选框可选状态
         * @param claim
         */
        var changeCheckStatus = function(claim){
            if(claim){
                if(claim.checked){
                    $scope.payClaim.status.currency1=claim.currency1;
                    $scope.payClaim.status.disabled=false;
                }else if(!$scope.payClaim.claimList.some(checkedCurrency1)) {
                    $scope.payClaim.status.disabled=true;
                }
            }else{//否则重置可选状态
                $scope.payClaim.status.disabled=true;//所有复选框可勾选
                // $scope.payClaim.status.disabled=$scope.payClaim.status.currency1 ? false : true //所有复选框可勾选状态设置【暂时注释 开启跨页勾选的时候取消注释】
                $scope.payClaim.status.checkedClaimAll_disabled=!isEquelCurrency($scope.payClaim.claimList);
            }
        };
        /**
         * 初始化数据
         */
        var initData = function(){
            $scope.payClaim = $$payClaim.Claim();//实例化对象
        };
        /**
         * 初始化
         */
        var init=function(){
            initData();//初始化数据
            getLastData();//获取上次数据
            saveData();//存储数据


        };

        init();
    };
    moduleApp.controller('PayClaimCtrl',['$scope','$modal','$$payClaim','mcMultiEditorCacheService',PayClaimCtrl]);
});