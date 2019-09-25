/**
 * Created by Administrator on 2017/5/8 0008.
 */
/**
 * 结算单管理控制器
 */


define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var settlement = function ($scope, $$settlement,$modal,mcMultiEditorCacheService) {
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
            $scope.settlement=$$settlement.Settlement();
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView=$scope.settlement.infoToView;
            }
            $scope.today=new Date().dateConversion();
            saveData();
        }
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('settlement',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('settlement');
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
        $scope.selectedSettleAll = function (list,target) {
            angular.forEach(list, function (data) {
                if (target) {
                    data.checked = true;
                } else data.checked = false;
            });
        };
        /**
         *单选
         */
        $scope.selectedSettleOne = function () {
            $scope.infoToView.checkAll = $scope.infoToView.queryList.every(function (item, index, array) {
                return item.checked;
            })
        };
        /**
         *勾选改变状态
         */
        $scope.changeSettleClass = function () {
            $scope.selectNum=0
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
         * 重置
         */
        $scope.resetSettlement=function () {
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
                "payrefflag":"",
            }
        }
        /**
         * 税务结缴查询
         */
        $scope.settlementQuery=function(target){
            $scope.infoToView.checkAll=false;
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.queryConditions.globalUserCode=$scope.usercode;
            $scope.infoToView.queryConditions.powerSystemCode=$scope.centerCode;
            $$settlement.settleSearch($scope.infoToView.queryConditions,{
                success: function (data) {
                    $scope.infoToView.queryList=data.content;
                    $scope.pagination.totalItems=data.totalCount;
                    // 判断上次勾选数据
                    angular.forEach($scope.infoToView._queryList,function (obj) {
                        angular.forEach($scope.infoToView.queryList,function (_obj) {
                            if(obj.payrefno==_obj.payrefno){
                                _obj.checked=true;
                            }
                        })
                    })
                    $scope.checkAll = $scope.infoToView.queryList.every(function (item, index, array) {
                        return item.checked;
                    })
                    saveData();
                    $scope.changeSettleClass();
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
         *税务结缴详情
         */
        $scope.settleData=function(payrefNo){
            $modal.open({
                templateUrl:'components/settlementManage/carShipTax/settlement/tpl/modal/settleDetail.html',
                resolve:{
                    payrefNo:function(){
                        return payrefNo;
                    },
                },
                controller:function($scope,$modalInstance,payrefNo){
                    //返回无收付状态，暂时取查询页面
                    $scope.payrefNo=payrefNo;
                    $$settlement.settleDetail({
                        "payrefNo":payrefNo.payrefno
                    },{
                        success: function (data) {
                            $scope.settleDetail=data;
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
                    layer.msg('结算单终止日期不能小于交易起止日期')
                    $scope.infoToView.queryConditions.laterMonth=$scope.infoToView.queryConditions.earlierMonth
                }
            }
        }
        /**
         * 结算单确认
         */
        $scope.settleNext=function(){
            var user={
                "userCode":$scope.usercode,
                "comCode":$scope.comCode,
                "centerCode":$scope.centerCode
            }
            if($scope.selectNum>1){
                layerMsg('对不起，只能选择一条进行操作！');
                return false;
            }
            $.each($scope.infoToView.queryList,function(index,obj){
                if(obj.checked){
                    $scope.getMessage=obj;
                }
            })
            if($scope.getMessage.flag=='0'){
                layerMsg('此缴费单已经结算！')
            }
            $modal.open({
                templateUrl:'components/settlementManage/carShipTax/settlement/tpl/modal/settleSubmitDetail.html',
                resolve:{
                    submitData:function(){
                        return $scope.getMessage;
                    },
                    user:function () {
                        return user;
                    }
                },
                controller:function($scope,$modalInstance,submitData,user){
                    $scope.user=user;
                    $scope.settleDetail=[];
                    $scope.settleDetail.push(submitData);
                    // $scope.bankData=bankData;
                    // bankData[0].billfee=submitData.billfee
                    var payTotal=submitData.billfee;//临时存放上一次数据
                    var saveDetail=payTotal;
                    console.log(submitData);
                    $scope.bankData=[{
                        "currency":'CNY',
                        "settlementmode":'',
                        "accountNo":'',
                        "billfee":submitData.billfee,
                        "centerCode":submitData.centercode
                    }];
                    $scope.getBank = function(){
                        var _data = {
                                centerCode : $scope.user.centerCode,
                                webUserCode :  $scope.user.userCode,
                                currency : 'CNY'
                            };
                        //导入目标银行账号-币别
                        $$settlement.queryNoBillBankAcount(_data,{
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

                    };
                    $scope.getBank();
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
                            "currency":'CNY',
                            "payWay":'',
                            "accountNo":'',
                            "billfee":changeCount(target),
                            "centerCode":'11999000'
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
                    //关闭弹窗
                    $scope.cancel = function () {
                        $modalInstance.dismiss();
                    };
                    $scope.submit=function(){
                        $$settlement.settleSubmitDetail({
                            "packagecode": submitData.packagecode||'',
                            "itemstatus":  submitData.itemstatus||'',
                            "centerflag":  submitData.centerflag||'',
                            "payrefnotype":submitData.payrefnotype||'',
                            "settletimes": submitData.settletimes||'',
                            "yearMonth": submitData.yearMonth||'',
                            "flag": submitData.flag||'',
                            "currency": submitData.currency||'',
                            "payrefno": submitData.payrefno||'',
                            "billfee": submitData.billfee||'',
                            "centercode": submitData.centercode||'',
                            "attaches": submitData.attaches||'',
                            "inputdate": submitData.inputdate,
                            "packagedate": submitData.packagedate,
                            "uploadstatus": submitData.uploadstatus||'',
                            "packageunit": submitData.packageunit||'',
                            "payrefflag": submitData.payrefflag||'',
                            "accountcode":$scope.bankData[0].accountNo.bankAccountNo||'',
                            "settlementmode":'211',
                            "bankName":$scope.bankData[0].accountNo.bankName||''
                        },{
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
                }
            }).result.then(function(record){
                if(record.resultCode){
                    layerMsg(record.resultMsg,'success');
                    $scope.checkAll=false;
                    $scope.settlementQuery();
                }

            })
            // $$settlement.settleBankDetail({
            //     "globalUserCode":$scope.usercode,
            //     "powerSystemCode":$scope.centerCode
            // },{
            //     success: function (data) {
            //         $scope.bankDetail=data;
            //         $$settlement.settleSubmitDetail({
            //             "packagecode": $scope.getMessage.packagecode||'',
            //             "itemstatus":  $scope.getMessage.itemstatus||'',
            //             "centerflag":  $scope.getMessage.centerflag||'',
            //             "payrefnotype":$scope.getMessage.payrefnotype||'',
            //             "settletimes": $scope.getMessage.settletimes||'',
            //             "yearMonth": $scope.getMessage.yearMonth||'',
            //             "flag": $scope.getMessage.flag||'',
            //             "currency": $scope.getMessage.currency||'',
            //             "payrefno": $scope.getMessage.payrefno||'',
            //             "billfee": $scope.getMessage.billfee||'',
            //             "centercode": $scope.getMessage.centercode||'',
            //             "attaches": $scope.getMessage.attaches||'',
            //             "inputdate": 1506067538000,
            //             "packagedate": $scope.getMessage.packagedate,
            //             "uploadstatus": $scope.getMessage.uploadstatus||'',
            //             "packageunit": $scope.getMessage.packageunit||'',
            //             "payrefflag": $scope.getMessage.payrefflag||'',
            //             "accountcode":$scope.bankDetail.bankCode||'',
            //             "settlementmode":$scope.bankDetail.settlementmode||'',
            //             "bankName": $scope.bankDetail.bankName||''
            //         },{
            //             success: function (data) {
            //                 $scope.submitData=data;
            //
            //
            //
            //             },
            //             error: function (e) {
            //             }
            //
            //         })
            //     },
            //     error: function (e) {
            //     }
            // })

        }
        /**
         * 结算单导出
         */
        $scope.settleExport=function(){
            layerMsg('正在导出……','success');
            //范本下载
            if(target=='sample'){
                window.location.href='prpservice/xlsxexport/carlistmodelexport';
            }
            //导出excel
            if(target=='export'&&id){
                window.location.href='prpservice/xlsxcarexport/export?contractno='+id;
            }
        }
        init();
    };

    moduleApp.controller('CarShipTaxsettlementCtrl', ['$scope', '$$settlement', '$modal','mcMultiEditorCacheService',settlement]);

});
