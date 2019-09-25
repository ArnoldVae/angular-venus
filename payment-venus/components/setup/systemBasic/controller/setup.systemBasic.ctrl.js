/**
 *  设置模块-系统基础设置控制器
 */
define([
    'app',
    'config'
],function (app,config) {
    'use strict';
    app.registerController('SystemBasicCtrl', ['$scope','$modal','$$systemBasic','mcMultiEditorCacheService','$timeout','constants',
        function ($scope,$modal,$$systemBasic,mcMultiEditorCacheService,$timeout,constants) {
            /**
             * 临时数据管理
             * 存储临时数据
             */
            var saveData=function () {
                mcMultiEditorCacheService.localData('systemBasicData',$scope.infoToView);
            };
            /**
             * 获取存储数据
             */
            var getData=function () {
                return mcMultiEditorCacheService.localData('systemBasicData');
            };
            /**
             * 初始化函数
             */
            var init = function () {
                $scope.Base=$$systemBasic.Preference();
                //判断上次是否有数据如果有则取记录值
                if(getData()){
                    $scope.infoToView=getData();
                }else {
                    $scope.infoToView=$scope.Base.infoToView;
                    $scope.tapName = $scope.infoToView.tapName;
                    $scope.tapHeader = $scope.infoToView.tapHeader;
                }
                // 初始化时间
                var data = new Date();
                $scope.initDate = data.dateConversion();
                saveData();
            };
            $scope.constants=constants;
            /**
             * 系统基础信息tab切换
             */
            $scope.changeTapA = function (index) {
                $scope.infoToView.tapFlagA = index;
            };
            /**
             * 业务基础信息tab切换
             */
            $scope.changeTapB = function (index) {
                $scope.infoToView.tapFlagB = index;
            };
            /**
             *公共综合模块查询
             * @parm target判断标志
             * @parm page分页判断标志
             */
            $scope.findPublic=function (target,page) {
                //获取登录信息
                $scope.infoToView[target].queryConditions.webUserCode=$scope.usercode;
                $scope.infoToView[target].queryConditions.webComCode=$scope.comCode;
                $scope.infoToView[target].queryConditions.webCenterCode=$scope.centerCode;
                if(!page){
                    $scope.infoToView[target].pagination.pageIndex=1
                }
                $$systemBasic.find(target,$scope.infoToView[target].queryConditions,{
                    success:function(data){
                        $scope.infoToView[target].queryList = data.content;
                        $scope.infoToView[target].pagination.totalItems=data.totalCount;
                        if(!data.content||data.content.length<1&&!page){
                            layerMsg('暂无数据！');
                        }
                    },
                    error: function (e) {
                    }
                },{
                    "pageNo": $scope.infoToView[target].pagination.pageIndex,
                    "pageSize": $scope.infoToView[target].pagination.pageSize
                })
            }
            /**
             *公共综合模块删除
             */
            $scope.delPublic=function (target,obj) {
                // 风险提示弹窗
                layer.confirm('确定删除吗', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    //点确定回调方法
                    var index = layer.load(2, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                    $$systemBasic.delItems(target,obj,{
                        success: function (data) {
                            layer.close(index);
                            if(data.resultCode=='0000'){
                                layerMsg(data.resultMsg,'success');
                                $scope.findPublic(target,'page')

                            }else {
                                layerMsg(data.resultMsg);
                            }
                        },
                        error: function (e) {
                        }
                    })
                });
            }
            // 兑换率模块/
            /**
             * 兑换率设置--重置
             */
            $scope.exchangeReset = function () {
                $.each(Object.keys($scope.infoToView.exchangeRate.queryConditions),function (index,obj) {
                    $scope.infoToView.exchangeRate.queryConditions[obj]=''
                })
            };
            /**
             * 兑换率设置--新增
             */
            $scope.newExchange = function () {
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/newExchange.html',
                    resolve:{},
                    controller:function($scope,$modalInstance){
                        $scope.newExchangeCondition = {
                            "baseCurrency":"",
                            "exchCurrency":"",
                            "exchDate":"",
                            "validStatus":"1",
                            "base":"",
                            "exchRate":""
                        };
                        $scope.saveNewExChange = function () {
                            if(!$scope.newExchangeCondition.exchDate){
                                layer.msg('日期不能为空！');
                                return false;
                            }
                            if(!$scope.newExchangeCondition.base){
                                layer.msg('基准不能为空！');
                                return false;
                            }
                            if(!$scope.newExchangeCondition.baseCurrency){
                                layer.msg('基准币别不能为空！');
                                return false;
                            }
                            if(!$scope.newExchangeCondition.exchRate){
                                layer.msg('兑换率不能为空！');
                                return false;
                            }
                            if(!$scope.newExchangeCondition.exchCurrency){
                                layer.msg('兑换币别不能为空！');
                                return false;
                            }
                            $$systemBasic.saveNewExc($scope.newExchangeCondition,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        $modalInstance.close(data);
                                    }else {
                                        layerMsg(data.content.resultMsg);
                                    }

                                },
                                error: function (e) {
                                }
                            })

                        };
                        $scope.resetNewExChange = function () {
                            $scope.newExchangeCondition = {
                                "baseCurrency":"",
                                "exchCurrency":"",
                                "exchDate":"",
                                "validStatus":"1",
                                "base":"",
                                "exchRate":""
                            };
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {
                    layerMsg(data.content.resultMsg,'success');
                    $scope.findPublic('exchangeRate')
                })
            }
            /**
             * 兑换率设置--修改
             */
            $scope.reviseExchange = function (target) {
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/reviseExchange.html',
                    resolve:{
                        target: function () {
                            return target;
                        }
                    },
                    controller:function($scope,$modalInstance,target){
                        var _target=angular.copy(target);
                        $scope.target = angular.copy(target);
                        $scope.reviseExchangeCondition = angular.copy($scope.target);
                        $scope.saveReviseExChange = function () {
                            if(!$scope.reviseExchangeCondition.exchRate){
                                layer.msg('兑换率不能为空！');
                                return false;
                            }
                            $$systemBasic.saveReviseExc($scope.reviseExchangeCondition,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        $modalInstance.close(data);
                                    }else {
                                        layerMsg(data.content.resultMsg);
                                    }
                                },
                                error: function (e) {
                                }
                            })

                        };
                        $scope.resetData=function () {
                            $scope.reviseExchangeCondition=angular.copy(_target)
                        }
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {
                    layerMsg(data.content.resultMsg,'success');
                    $scope.findPublic('exchangeRate','page')

                })
            }
            /**
             * 收付员设置--重置(new)
             */
            $scope.cashReset = function () {
                $.each(Object.keys($scope.infoToView.cashMember.queryConditions),function (index,obj) {
                    $scope.infoToView.cashMember.queryConditions[obj]=''
                })
            }
            /**
             * 核算单位银行账号联动
             */
            var selLD=function(target){
                $$systemBasic.selChange({
                    "comCode":target.centerCode||'',
                    "currency":target.currency||''
                },{
                    success:function(data){
                        target.accValueList= data;
                    },
                    error: function (e) {
                    }
                })
            }
            /**
             * 收付员-查看详情
             */
            $scope.showCash=function (target) {
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/showCash.html',
                    resolve:{
                        target: function () {
                            return target;
                        }
                    },
                    controller:function($scope,$modalInstance,target){
                        $scope.target= target;
                        $scope.reviseCashCondition ="";
                        $$systemBasic.modifyCash({
                            "unitType":  $scope.target.unitType,
                            "unitCode":  $scope.target.unitCode
                        },{
                            success:function(data){
                                $scope.reviseCashCondition = data;
                            },
                            error: function (e) {
                            }
                        })
                           $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {

                })
            }
            /**
             * 收付员设置--新增(new)
             */
            $scope.newCash = function () {
                var user={
                    "userCode":$scope.usercode,
                    "comCode":$scope.comCode,
                    "centerCode":$scope.centerCode
                }
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/newCash.html',
                    resolve:{
                        user:function () {
                            return user
                        },
                        selLD:function () {
                            return selLD
                        }
                    },
                    controller:function ($scope,$modalInstance,user,selLD) {
                        $scope.user=user;
                        $scope.selLD=selLD;
                        $scope.newCashCondition ={
                            "accountCode": "",
                            "accountList": [],
                            "comCode": "",
                            "comName": "",
                            "flag": "",
                            "gdinvoicePassWord": "setGdinvoicePassWord",
                            "gdinvoicePassWord1": "setGdinvoicePassWord1",
                            "gdinvoiceUserCode1": "setGdinvoiceUsercode1",
                            "gdinvoiceUsercode": "setGdinvoiceUsercode",
                            "invalidDate":"" ,
                            "levelNo": 1,
                            "manageLevel": 1,
                            "startCloseDate": "",
                            "unitCode": "",
                            "unitName": "",
                            "unitType": "1",
                            "validStatus": "1",
                            "un":"213",
                            "com":""
                        };
                        $scope.newcashDelete = function (index) {
                            $scope.newCashCondition.accountList.splice(index,1);
                        };
                        $scope.saveNewCash = function(){
                            if(!$scope.newCashCondition.unitCode){
                                layer.msg('收付员信息不能为空');
                                return false;
                            }
                            if(!$scope.newCashCondition.comCode){
                                layer.msg('归属机构不能为空');
                                return false;
                            }
                            if(!$scope.newCashCondition.startCloseDate){
                                layer.msg('启用日期不能为空');
                                return false;
                            }
                            var goFlag=false;
                            if($scope.newCashCondition.accountList.length>0){
                                $.each($scope.newCashCondition.accountList,function (index,obj) {
                                    if(index+1==$scope.newCashCondition.accountList.length){
                                        if(!obj.centerCode||!obj.centerName){
                                            layer.msg('核算单位不能为空！');
                                            return false;
                                        }else if(!obj.currency){
                                            layer.msg('币种不能为空！');
                                            return false;
                                        }else if(!obj.accountCode){
                                            layer.msg('账号不能为空！');
                                            return false;
                                        }else if(!obj.unitCode||!obj.unitName){
                                            layer.msg('收付员不能为空！');
                                            return false;
                                        }else if(!obj.startDate){
                                            layer.msg('启用日期不能为空！');
                                            return false;
                                        }else {
                                            goFlag=true;
                                        }
                                    }


                                })
                            }
                            if(!goFlag&&$scope.newCashCondition.accountList.length>0){
                                return false
                            }
                            $$systemBasic.saveNewCh($scope.newCashCondition,{
                                success: function (data) {
                                    if(data.resultCode=='0000'){
                                        $modalInstance.close(data)
                                    }else {
                                        layerMsg(data.resultMsg)
                                    }

                                },
                                error: function (e) {
                                }
                            })

                        };
                        $scope.newCashAdd = function () {
                            var goFlag=false;
                            if($scope.newCashCondition.accountList.length>0){
                                $.each($scope.newCashCondition.accountList,function (index,obj) {
                                    if(index+1==$scope.newCashCondition.accountList.length){
                                        if(!obj.centerCode||!obj.centerName){
                                            layer.msg('核算单位不能为空！');
                                            return false;
                                        }else if(!obj.currency){
                                            layer.msg('币种不能为空！');
                                            return false;
                                        }else if(!obj.accountCode){
                                            layer.msg('账号不能为空！');
                                            return false;
                                        }else if(!obj.unitCode||!obj.unitName){
                                            layer.msg('收付员不能为空！');
                                            return false;
                                        }else if(!obj.startDate){
                                            layer.msg('启用日期不能为空！');
                                            return false;
                                        }else {
                                            goFlag=true;
                                        }
                                    }


                                })
                            }
                            if(!goFlag&&$scope.newCashCondition.accountList.length>0){
                                return false
                            }

                            var newArray = {
                                "accountCode": "",
                                "accountName": "",
                                "centerCode": "",
                                "currency": "",
                                "saveType": "1",
                                "startDate":$scope.newCashCondition.startCloseDate,
                                "unitCode": $scope.newCashCondition.unitCode,
                                "unitType": $scope.newCashCondition.unitType
                            }
                            $scope.newCashCondition.accountList.push(newArray);
                        };
                        $scope.resetNewCash = function () {
                            $scope.newCashCondition ={
                                "accountCode": "",
                                "accountName": "",
                                "accountList": [],
                                "comCode": "",
                                "comName": "",
                                "flag": "",
                                "gdinvoicePassWord": "setGdinvoicePassWord",
                                "gdinvoicePassWord1": "setGdinvoicePassWord1",
                                "gdinvoiceUserCode1": "setGdinvoiceUsercode1",
                                "gdinvoiceUsercode": "setGdinvoiceUsercode",
                                "invalidDate":"" ,
                                "levelNo": 1,
                                "manageLevel": 1,
                                "startCloseDate": "",
                                "unitCode": "999999",
                                "unitName": "",
                                "unitType": "1",
                                "validStatus": "1"
                            };
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {
                    layerMsg(data.resultMsg,'success');
                    $scope.findPublic('cashMember','page');

                })
            }
            /**
             * 收付员设置--修改
             */
            $scope.revisecash = function (target){
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/reviseCash.html',
                    resolve:{
                        target: function () {
                            return target;
                        },
                        selLD:function () {
                            return selLD
                        }
                    },
                    controller:function($scope,$modalInstance,target,selLD){
                        $scope.selLD=selLD;
                        $scope.target= target;
                        $scope.reviseCashCondition ="";
                        var modifyCashData=function () {
                            $$systemBasic.modifyCash({
                                "unitType":  $scope.target.unitType,
                                "unitCode":  $scope.target.unitCode
                            },{
                                success:function(data){
                                    $scope.reviseCashCondition = data;
                                    $.each($scope.reviseCashCondition.accountList,function (index,obj) {
                                        selLD(obj);
                                    })
                                },
                                error: function (e) {
                                }
                            })
                        }
                        modifyCashData();
                        $scope.reviseCashDelete = function(index){
                            $scope.reviseCashCondition.accountList.splice(index,1);
                        };
                        $scope.reviseCashAdd =function(){
                            var goFlag=false;
                            if($scope.reviseCashCondition.accountList.length>0){
                                $.each($scope.reviseCashCondition.accountList,function (index,obj) {
                                    if(index+1==$scope.reviseCashCondition.accountList.length){
                                        if(!obj.centerCode||!obj.centerName){
                                            layer.msg('核算单位不能为空！');
                                            return false;
                                        }else if(!obj.currency){
                                            layer.msg('币种不能为空！');
                                            return false;
                                        }else if(!obj.accountCode){
                                            layer.msg('账号不能为空！');
                                            return false;
                                        }else {
                                            goFlag=true;
                                        }
                                    }


                                })
                            }
                            if(!goFlag&&$scope.reviseCashCondition.accountList.length>0){
                                return false
                            }
                            var newArray = {
                                "accountCode": "",
                                "centerCode": "",
                                "currency": "",
                                "saveType": "1",
                                "startDate":$scope.reviseCashCondition.startCloseDate,
                                "unitCode": $scope.reviseCashCondition.unitCode,
                                "unitType": $scope.reviseCashCondition.unitType
                            }
                            $scope.reviseCashCondition.accountList.push(newArray);
                        };
                        $scope.saveReviseCash = function (index) {
                            var goFlag=false;
                            if($scope.reviseCashCondition.accountList.length>0){
                                $.each($scope.reviseCashCondition.accountList,function (index,obj) {
                                    if(index+1==$scope.reviseCashCondition.accountList.length){
                                        if(!obj.centerCode||!obj.centerName){
                                            layer.msg('核算单位不能为空！');
                                            return false;
                                        }else if(!obj.currency){
                                            layer.msg('币种不能为空！');
                                            return false;
                                        }else if(!obj.accountCode){
                                            layer.msg('账号不能为空！');
                                            return false;
                                        }else {
                                            goFlag=true;
                                        }
                                    }


                                })
                            }
                            if(!goFlag&&$scope.reviseCashCondition.accountList.length>0){
                                return false
                            }
                            $$systemBasic.saveReviseCh($scope.reviseCashCondition,
                                {
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
                        };
                        $scope.resetReviseCash = function () {
                            modifyCashData();
                        };
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {
                    layerMsg(data.resultMsg,'success');
                    $scope.findPublic('cashMember','page')
                })
            };
            /**
             * 会计期间设置--重置
             */
            $scope.accountReset = function () {
                $.each(Object.keys($scope.infoToView.accountPeriod.queryConditions),function (index,obj) {
                    $scope.infoToView.accountPeriod.queryConditions[obj]=''
                })
            };
            /**
             * 会计期间设置--修改
             */
            $scope.modifyAcccounting = function (target) {
                var flag="";
                if (target.accMonthStat == "3"){
                    flag = "5";
                } else if(target.accMonthStat=='5'){
                    var kqzt = new Date()
                    var date = kqzt.getFullYear()+"-"+((kqzt.getMonth() + 1) < 10 ? 0 : '')+ (kqzt.getMonth() + 1);
                    if(target.yearMonth == date ){
                        layerMsg("不允许关闭当月会计期间")
                    }else{
                        flag = "3"
                    }
                };
                $$systemBasic.changeAccount({
                    "centerCode":target.centerCode,
                    "yearMonth":target.yearMonth,
                    "accMonthStat":flag,
                    "accBookType": target.accBookType,
                    "accBookCode": target.accBookCode
                },{
                    success: function (data) {
                        if(data.content.resultCode=='0000'&&flag=='3'){
                            layerMsg('关闭成功！','success');
                            $scope.findPublic('accountPeriod','page');
                        }else if(data.content.resultCode=='0000'&&flag=='5'){
                            layerMsg('开启成功！','success');
                            $scope.findPublic('accountPeriod','page');
                        }else {
                            layerMsg(data.content.resultMsg);
                        }
                    },
                    error: function (e) {
                    }
                })
            };
//-------------------------- 工作日管理模块 start --------------------------
            /**
             * 日历-可设置工作日标识
             */
            $scope.isSetDate = true;
            /**
             * 日历-提交事件回调
             */
            // $scope.setNonWorkingDaySuccess = function (data) {
            //     console.log(data,'选中日期')
            // };
            /**
             * 工作日初始化
             */
            $scope.initWorkday = function () {
                if($scope.infoToView.workCondition.workYear==""){
                    layerMsg("请选择年份！");
                    return false
                }
                if($scope.infoToView.workCondition.workMonth==""){
                    layerMsg("请选择月份！");
                    return false
                }
                $$systemBasic.initWork($scope.infoToView.workCondition,{
                    success: function (data) {
                        if(data.content.resultCode=="0000"){
                            layer.msg(data.content.resultMsg,{icon:1});
                        }else{
                            layerMsg(data.content.resultMsg)
                        }
                    },
                    error: function (e) {
                    }
                })
            };
            $scope.retWorkday = function () {
                $scope.infoToView.workCondition = {
                    "workYear":"",
                    "workMonth":""
                };
            };
            /**
             * 工作日设置--初始化查询
             */
            $scope.initWorkdaySet = function(){
                var date = new Date();
                var monthDay = {};
                monthDay.workYear = date.dateConversion().split("-")[0];
                var month = date.dateConversion().split("-")[1];
                var monTh = Number(month);
                if (monTh<10){
                    month = month.split("")[1];
                }
                monthDay.workMonth = month;
                monthDay.pageNo = "1";
                monthDay.pageSize= "31";
                console.log(monthDay)
                $$systemBasic.searchWorkDay(monthDay,{
                    success: function (data) {
                        console.log(data);
                        var setDay = [{}];
                        setDay = data.content.content;
                        angular.forEach(setDay,function (data) {
                            var day = String(data.workDay)
                            data.date = data.workYear+"-"+data.workMonth+"-"+day;
                            if(data.workDayFlag == 0 ){
                                data.color = "red";
                            }
                        })
                        $scope.data = setDay;
                    },
                    error: function (e) {
                    }
                })
            }
            $scope.initWorkdaySet();
            /**
             * 日点击回调
             */
            $scope.onDayClick = function (data) {
                console.log(data)
            };
            /**
             * 月点击回调
             */
            $scope.onMonthClick = function (date) {
                console.log(date,'month');
                var monthDay = {};
                if(angular.isArray(date)){
                    monthDay.workYear = date[0].workYear;
                    monthDay.workMonth =date[0].workMonth;
                }else {
                    monthDay.workYear = date.split(":")[0];
                    monthDay.workMonth =date.split(":")[1];
                }
                monthDay.pageNo = "1";
                monthDay.pageSize= "31";
                console.log(monthDay)
                $$systemBasic.searchWorkDay(monthDay,{
                    success: function (data) {
                        console.log(data);
                        var setDay = [{}];
                        setDay = data.content.content;
                        angular.forEach(setDay,function (data) {
                            var day = String(data.workDay)
                            data.date = data.workYear+"-"+data.workMonth+"-"+day;
                            if(data.workDayFlag == 0 ){
                                data.color = "red";
                            }
                        })
                        $scope.data = setDay;
                    },
                    error: function (e) {
                    }
                })
            };
            /**
             *工作日设置--提交
             */
            $scope.setNonWorkingDaySuccess = function (date) {
                console.log(date)
                angular.forEach(date,function (data) {
                    data.workYear = data.date.split(":")[0];
                    data.workMonth = data.date.split(":")[1];
                    data.workDate = data.date.split(":")[0]+"-"+data.date.split(":")[1]+"-"+data.date.split(":")[2];
                });
                console.log(date);
                var listPrpjWorkDayDt = {
                    "updateWorkDay":[]
                };
                listPrpjWorkDayDt.updateWorkDay= date;
                $$systemBasic.workDaySubmit(listPrpjWorkDayDt,{
                    success: function (data) {
                        console.log(data);
                        if(data.content.resultCode=="0000"){
                            layer.msg(data.content.resultMsg,{icon:1});
                            $scope.onMonthClick(date);
                        }else{
                            layerMsg(data.content.resultMsg)
                        }
                    },
                    error: function (e) {
                    }
                })
            }
            /**
             *工作日设置--重置
             */
            $scope.dailyReset = function (date) {
                console.log(date);
                var allSet = {};
                allSet.workYear = date.split("-")[0];
                allSet.workMonth =date.split("-")[1];
                $$systemBasic.resetWorkDay(allSet,{
                    success: function (data) {
                        console.log(data);
                        var setDay = [{}];
                        setDay = data.content.content;
                        angular.forEach(setDay,function (data) {
                            data.date = data.workYear+"-"+data.workMonth+"-"+data.workDay;
                            if(data.workDayFlag == 0 ){
                                data.color = "red";
                            }
                        })
                        $scope.data = setDay;
                    },
                    error: function (e) {
                    }
                })
            };
//-------------------------- 工作日管理模块 end --------------------------
            //导入银行账号
            $scope.myFunc = function(){
                //导入目标银行账号-币别
                $$systemBasic.queryBankAcount($scope.infoToView.bankAccount.queryConditions.centerCodeStr,{
                    success: function (data) {
                        var payWayObj = {};
                        var payWaySelList = [];
                        $.each(data.content,function(index,obj){
                            payWayObj['code'] = obj;
                            payWayObj['value'] = obj.bankAccountNo+'-'+obj.currency;
                            payWaySelList.push(angular.copy(payWayObj));
                        })
                        $scope.bankTypeCNY = payWaySelList;
                    },
                    error: function (e) {

                    }
                });
            }
            $scope.bankReset=function(){
                $.each(Object.keys($scope.infoToView.bankAccount.queryConditions),function (index,obj) {
                    $scope.infoToView.bankAccount.queryConditions[obj]=''
                })
            }
            /**
             * 银行账号详情
             */
            $scope.bankNoDetail=function(bankNo){
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/bankDetail.html',
                    resolve:{
                        bankNo:function () {
                            return bankNo
                        }
                    },
                    controller:function($scope,$modalInstance,bankNo){
                        $$systemBasic.bankNoDetail(bankNo,{
                            success: function (data) {
                                $scope.bankNoData=data;
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
            }
            /**
             * 新增银行账号
             */
            $scope.newBankNo = function () {
                var user={
                    "comCode":$scope.comCode,
                    "centerCode":$scope.centerCode,
                    "userCode":$scope.userCode
                }
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/bankAdd.html',
                    resolve:{
                        user:function () {
                            return user;
                        }
                    },
                    controller:function($scope,$modalInstance,user){
                        $scope.user=user;
                        $scope.bankNoData={
                            "bankAccountNo":"",
                            "bankAccountName":"",
                            "centerCode":"",
                            "bankCode":"",
                            "bankName":"",
                            "currency":"",
                            "saveNature":"",
                            "accountType":"",
                            "titleCode":"",
                            "titleName":"",
                            "validStatus":""
                        }
                        //关闭弹窗
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                        $scope.addSubmit = function(){
                            if(!$scope.bankNoData.centerCode){
                                layer.msg('银行账户归属机构不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.bankAccountNo){
                                layer.msg('银行账号不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.bankAccountName){
                                layer.msg('银行账户名称不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.bankCode){
                                layer.msg('银行编码不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.bankName){
                                layer.msg('银行名称不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.saveNature){
                                layer.msg('存款性质不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.accountType){
                                layer.msg('账户类型不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.currency){
                                layer.msg('币种不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.titleCode){
                                layer.msg('科目代码或科目名称不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.validStatus){
                                layer.msg('有效标志不能为空！')
                                return false;
                            }
                            $$systemBasic.bankNewAdd($scope.bankNoData,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        $modalInstance.close(data);
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }

                                },
                                error: function (e) {
                                }
                            })
                        }
                    }
                }).result.then(function (data) {
                    layerMsg(data.content.resultMsg,'success')
                    $scope.findPublic('bankAccount','page');
                })
            };
            /**
             *修改银行账号
             */
            $scope.modifyBankNo = function(bankNo){
                var user={
                    "comCode":$scope.comCode,
                    "userCode":$scope.usercode,
                    "centerCode":$scope.centerCode
                }
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/bankModify.html',
                    resolve:{
                        bankNo:function () {
                            return bankNo
                        },
                        user:function () {
                            return user
                        }
                    },
                    controller:function($scope,$modalInstance,bankNo){
                        var bankNoModify=function () {
                            $$systemBasic.bankNoModify(bankNo,{
                                success: function (data) {
                                    $scope.bankNoData=data;
                                },
                                error: function (e) {
                                }
                            });
                        }
                        bankNoModify();
                        $scope.modifySubmit=function(){
                            if(!$scope.bankNoData.centerCode){
                                layer.msg('银行账户归属机构不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.bankAccountNo){
                                layer.msg('银行账号不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.bankAccountName){
                                layer.msg('银行账户名称不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.bankCode){
                                layer.msg('银行编码不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.bankName){
                                layer.msg('银行名称不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.saveNature){
                                layer.msg('存款性质不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.accountType){
                                layer.msg('账户类型不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.currency){
                                layer.msg('币种不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.titleCode){
                                layer.msg('科目代码或科目名称不能为空！')
                                return false;
                            }
                            if(!$scope.bankNoData.validStatus){
                                layer.msg('有效标志不能为空！')
                                return false;
                            }
                            $$systemBasic.saveBankAccount($scope.bankNoData,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        $modalInstance.close(data)
                                    }else {
                                        layerMsg(data.content.resultMsg);
                                    }

                                },
                                error: function (e) {
                                }
                            })
                        }
                        /**
                         * 重置
                         */
                        $scope.resetData=function () {
                            bankNoModify();
                        }
                        //关闭弹窗
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {
                    layerMsg(data.content.resultMsg,'success');
                    $scope.findPublic('bankAccount','page');
                })
            };

//-------------------------- 银行账户商户配置 start --------------------------
            /**
             * 银行账户商户配置
             */
            $scope.goBankMerchantSetup = function () {
                $scope.infoToView.isBankMerchantSetup = true;
            };
            /**
             * 离开银行商户配置页面，返回到银行账户维护正常页面
             */
            $scope.cancelBankAccountMaintenance = function () {
                $scope.infoToView.isBankMerchantSetup = false;
            };
            /**
             * 银行商户高级查询表单重置
             */
            $scope.bankMerchantReset = function () {
                $.each(Object.keys($scope.infoToView.bankMerchant.queryConditions),function (index,obj) {
                    $scope.infoToView.bankMerchant.queryConditions[obj]=''
                })
                //同时清空银行账号等信息
                $scope.bankBase={};
                $scope.bankNos=[];
            };
            /**
             * 银行商户查询
             */
            $scope.bankBase={};//获取银行基本信息
            //获取银行信息赋值
            $scope.getBankName = function (bankBase) {
                $scope.infoToView.bankMerchant.queryConditions.bankName = bankBase.bankName;
                $scope.infoToView.bankMerchant.queryConditions.bankCode = bankBase.bankCode;
                $scope.infoToView.bankMerchant.queryConditions.accountCode = bankBase.bankAccountNo;
            };
            $scope.getBankNos = function(){//导入银行账号
                //导入目标银行账号
                $$systemBasic.queryBankAcount($scope.infoToView.bankMerchant.queryConditions.sffComCode,{
                    success: function (data) {
                        var payWayObj = {};
                        var payWaySelList = [];
                        $.each(data.content,function(index,obj){
                            payWayObj['code'] = obj;
                            payWayObj['value'] = obj.bankAccountNo+'-'+obj.bankAccountName;
                            payWaySelList.push(angular.copy(payWayObj));
                        });
                        $scope.bankNos = payWaySelList;
                    },
                    error: function (e) {

                    }
                });
            };
            /**
             * 银行商户添加/修改
             */
            $scope.editBankMerchant = function (target,bankMerchant) {
                var _bankMerchant = {
                    "bankCode":bankMerchant ? bankMerchant.bankCode || '' : '',
                    "merchantNo":bankMerchant ? bankMerchant.merchantNo || '' : '',
                    "payFlag":bankMerchant ? bankMerchant.payFlag || '' : '',
                    "sffComCode":bankMerchant ? bankMerchant.sffComCode || '' : '',
                    "sffComName":bankMerchant ? bankMerchant.sffComName || '' : '',
                    "accountCode":bankMerchant ? bankMerchant.accountCode || '' : '',
                    "bankName":bankMerchant ? bankMerchant.bankName || '' : '',
                    "opCode":bankMerchant ? bankMerchant.opCode || '' : '',
                    "useFlag":bankMerchant ? bankMerchant.useFlag || '' : '',
                    "insertTime":bankMerchant ? bankMerchant.insertTime || '' : '',
                    "updateTime":bankMerchant ? bankMerchant.updateTime || '' : '',
                    "operationSign":target == 'add' ? '0' : '1',//操作标示0:add;1:modifi;2:delete
                    "centerCode":$scope.centerCode,
                    "comCode":$scope.comCode,
                    "webUserCode":$scope.usercode//当前登陆人
                };
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/editBankMerchant.html',
                    resolve:{
                        bankMerchant:function () {
                            return _bankMerchant
                        },
                        target:function () {
                            return target
                        }
                    },
                    controller:function($scope,$modalInstance,$$systemBasic,bankMerchant,target){
                        $scope.modalType = target;
                        $scope.editBankMerchant=angular.copy(bankMerchant);
                        $scope.bankBase={};//获取银行基本信息
                        /**
                         * 校验
                         */
                        $scope.checkout = {
                            isComplete:false,
                            isVerification:false
                        };
                        //导入银行账号
                        $scope.getAccountCodes = function(){
                            //导入目标银行账号
                            $$systemBasic.queryBankAcount($scope.editBankMerchant.sffComCode,{
                                success: function (data) {
                                    $scope.bankBases = data.content;
                                    var payWayObj = {};
                                    var payWaySelList = [];
                                    $.each($scope.bankBases,function(index,obj){
                                        payWayObj['code'] = obj.bankAccountNo;
                                        payWayObj['value'] = obj.bankAccountNo+'-'+obj.bankAccountName;
                                        payWaySelList.push(angular.copy(payWayObj));
                                    });
                                    $scope.accountCodes = payWaySelList;
                                },
                                error: function (e) {

                                }
                            });
                        };
                        //如果是修改，初始化查询一下银行卡号
                        if($scope.modalType == 'modify'){
                            $scope.getAccountCodes();
                        }
                        //获取所属银行信息赋值
                        $scope.getBankBase = function (accountCode) {
                            if(!!$scope.bankBases && $scope.bankBases.length > 0){
                                $.each($scope.bankBases,function (index, _obj) {
                                    if(_obj.bankAccountNo == accountCode){
                                        $scope.editBankMerchant.bankName = _obj.bankName;
                                        $scope.editBankMerchant.bankCode = _obj.bankCode;
                                        $scope.editBankMerchant.accountCode = _obj.bankAccountNo;
                                    }
                                })
                            }
                        };
                        //保存
                        $scope.saveBankMerchant = function(){
                            if(!!$scope.editBankMerchant.sffComCode && !!$scope.editBankMerchant.sffComName){
                                $scope.checkout.isComplete = true;
                                $timeout(function () {
                                    if($scope.checkout.isVerification){
                                        $scope.checkout.isComplete = false;
                                        $$systemBasic.operationBankMerchant($scope.editBankMerchant,{
                                            success: function (data) {
                                                if(data.resultCode=='0000'){
                                                    layerMsg(data.resultMsg,'success');
                                                    $modalInstance.close('success');
                                                }else {
                                                    layerMsg(data.resultMsg);
                                                }
                                            },
                                            error: function (e) {
                                            }
                                        });
                                    }else {
                                        $scope.checkout.isComplete = false;
                                    }
                                },500);
                            }else {
                                layerMsg('请选择核算单位及代码')
                            }
                        };
                        //重置
                        $scope.resetBankMerchant = function () {
                            if($scope.modalType == 'add'){
                                $scope.editBankMerchant.bankCode = '';
                                $scope.editBankMerchant.merchantNo = '';
                                $scope.editBankMerchant.payFlag = '';
                                $scope.editBankMerchant.sffComCode = '';
                                $scope.editBankMerchant.sffComName = '';
                                $scope.editBankMerchant.accountCode = '';
                                $scope.editBankMerchant.bankName = '';
                                $scope.editBankMerchant.opCode = '';
                                $scope.editBankMerchant.useFlag = '';
                                // $scope.editBankMerchant.insertTime = '';
                                // $scope.editBankMerchant.updateTime = '';
                            }
                            if($scope.modalType == 'modify')
                                $scope.editBankMerchant = angular.copy(bankMerchant);
                        };
                        //关闭弹窗
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (flag) {
                    if(flag == 'success'){
                        $scope.findPublic('bankMerchant','page');
                    }
                })
            };
            /**
             * 银行商户删除
             */
            $scope.deleteBankMerchant = function (bankMerchant) {
                var _bankMerchant = {
                    "bankCode":bankMerchant.bankCode || '',
                    "merchantNo":bankMerchant.merchantNo || '',
                    "payFlag":bankMerchant.payFlag || '',
                    "sffComCode":bankMerchant.sffComCode || '',
                    "sffComName":bankMerchant.sffComName || '',
                    "accountCode":bankMerchant.accountCode || '',
                    "bankName":bankMerchant.bankName || '',
                    "opCode":bankMerchant.opCode || '',
                    "useFlag":bankMerchant.useFlag || '',
                    "insertTime":bankMerchant.insertTime || '',
                    "updateTime":bankMerchant.updateTime || '',
                    "operationSign":'2',//操作标示0:add;1:modifi;2:delete
                    "centerCode":$scope.centerCode,
                    "comCode":$scope.comCode,
                    "webUserCode":$scope.usercode//当前登陆人
                };
                // 风险提示弹窗
                layer.confirm('确定删除吗', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    //点确定回调方法
                    var index = layer.load(2, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                    $$systemBasic.operationBankMerchant(_bankMerchant,{
                        success: function (data) {
                            layer.close(index);
                            if(data.resultCode=='0000'){
                                layerMsg(data.resultMsg,'success');
                                $scope.findPublic('bankMerchant','page');
                            }else {
                                layerMsg(data.resultMsg);
                            }
                        },
                        error: function (e) {
                        }
                    });
                });
            };
//-------------------------- 银行账户商户配置 end -------------------------
            /**
             * 账龄重置
             */
            $scope.agingReset=function(){
                $.each(Object.keys($scope.infoToView.ageRange.queryConditions),function (index,obj) {
                    $scope.infoToView.ageRange.queryConditions[obj]=''
                })
            };
            /**
             * 账龄新增
             */
            $scope.newAging=function(){
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/agingAdd.html',
                    resolve:{
                    },
                    controller:function($scope,$modalInstance){
                        $scope.newAging={
                            "comCode":"",
                            "comName":"",
                            "agingType":"1",
                            "agingInterval":"",
                            "agingStart":"",
                            "agingEnd":"",
                            "createCode":"",
                            "createDate":""
                        }
                        //关闭弹窗
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                        //添加确认
                        $scope.addSubmit = function(){
                            if(!$scope.newAging.comCode){
                                layer.msg('机构代码或机构名称不能为空！')
                                return false;
                            }
                            if(!$scope.newAging.agingType){
                                layer.msg('账龄区间类型不能为空！')
                                return false;
                            }
                            if(!$scope.newAging.agingInterval){
                                layer.msg('区间间隔不能为空！')
                                return false;
                            }
                            if(!$scope.newAging.agingStart){
                                layer.msg('账龄区间开始不能为空！')
                                return false;
                            }
                            if(!$scope.newAging.agingEnd){
                                layer.msg('账龄区间结束不能为空！')
                                return false;
                            }
                            if(!$scope.newAging.createCode){
                                layer.msg('创建人代码不能为空！')
                                return false;
                            }
                            if(!$scope.newAging.createName){
                                layer.msg('创建人名称不能为空！')
                                return false;
                            }
                            if(!$scope.newAging.createDate){
                                layer.msg('创建日期不能为空！')
                                return false;
                            }
                            $$systemBasic.agingAdd($scope.newAging,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        $modalInstance.close(data);
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }

                                },
                                error: function (e) {
                                }
                            })
                        }
                    }
                }).result.then(function (data) {
                    layerMsg(data.content.resultMsg,'success');
                    $scope.findPublic('ageRange');
                })
            };
            /**
             * 账龄修改
             */
            $scope.modifyAging=function(obj){
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/agingModify.html',
                    resolve:{
                        obj:function () {
                            return obj
                        }
                    },
                    controller:function($scope,$modalInstance,obj){
                        var agingModify=function () {
                            $$systemBasic.agingModify(obj,{
                                success: function (data) {
                                    $scope.modifyAging=data;
                                },
                                error: function (e) {
                                }
                            });
                        }
                        agingModify();
                        $scope.modifySubmit=function(){
                            if(!$scope.modifyAging.comCode){
                                layer.msg('机构代码或机构名称不能为空！')
                                return false;
                            }
                            if(!$scope.modifyAging.agingType){
                                layer.msg('账龄区间类型不能为空！')
                                return false;
                            }
                            if(!$scope.modifyAging.agingInterval){
                                layer.msg('区间间隔不能为空！')
                                return false;
                            }
                            if(!$scope.modifyAging.agingStart){
                                layer.msg('账龄区间开始不能为空！')
                                return false;
                            }
                            if(!$scope.modifyAging.agingEnd){
                                layer.msg('账龄区间结束不能为空！')
                                return false;
                            }
                            if(!$scope.modifyAging.createCode){
                                layer.msg('创建人代码不能为空！')
                                return false;
                            }
                            if(!$scope.modifyAging.createName){
                                layer.msg('创建人名称不能为空！')
                                return false;
                            }
                            if(!$scope.modifyAging.createDate){
                                layer.msg('创建日期不能为空！')
                                return false;
                            }
                            $$systemBasic.agingSave($scope.modifyAging,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        $modalInstance.close(data)
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }

                                },
                                error: function (e) {
                                }
                            })
                        }
                        /**
                         * 重置
                         */
                        $scope.resetData=function () {
                            agingModify();
                        }
                        //关闭弹窗
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                }).result.then(function (data) {
                    layerMsg(data.content.resultMsg,'success');
                    $scope.findPublic('ageRange','page');

                })
            };
            /**
             * 收付机构-重置
             */
            $scope.paymentInstitutionReset = function () {
                $scope.infoToView.paymentInstitutions.queryConditions ={};
            };
            /**
             * 收付机构-查看详细信息
             */
            $scope.lookPaymentInf = function (obj) {
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/paymentInstitutionInfo.html',
                    resolve:{
                        obj:function(){
                            return obj;
                        }
                    },
                    controller:function($scope,$modalInstance,obj){
                        $$systemBasic.comDetail({
                            "comCode": obj.comCode
                        },{
                            success:function(data){
                                console.log(data)
                                $scope.paymentInfCondition = data[0];
                                $scope.paymentInfConditionList=data[0].utiiUserCompanyList
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
             * 操作员-重置
             */
            $scope.operatorReset = function () {
                $scope.infoToView.operator.queryConditions= {};
            };
            /**
             * 操作员-查看
             */
            $scope.showOperator = function (target) {
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/showOperator.html',
                    resolve:{
                        target:function () {
                            return target
                        }
                    },
                    controller:function($scope,$modalInstance,target){
                        $scope.operatorInfCondition = target;
                        //关闭弹窗
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                })
            };
            /**
             * 权限管理--重置
             */
            $scope.priManConditionReset = function () {
                $scope.infoToView.permissions.queryConditions = {}
            };
            /**
             * 权限管理--岗位配置查询
             */
            $scope.postConfiguration = function (target) {
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/postConfiguration.html',
                    resolve:{},
                    controller:function($scope,$modalInstance) {
                        $scope.showFlag=target.validStatus;
                        $$systemBasic.postConfigQuery({
                            'userCode':target.userCode,
                            'userName':target.userName
                        },{
                            success:function (data) {
                                $scope.priManModalDto = data;
                            },
                            error:function (e) {
                            }
                        });
                        //勾选
                        $scope.itemSelected=function(target){
                            $.each($scope.priManModalDto.saaGradeList,function(index,obj){
                                if(index==target){
                                    obj.checked=true;
                                }else {
                                    obj.checked=false;
                                }
                            })
                        };
                        //关闭弹窗
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                        //保存
                        $scope.savePostConfigData = function () {
                            $$systemBasic.savePostConfig($scope.priManModalDto,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        $modalInstance.close(data);
                                    }else {
                                        layerMsg(data.content.resultMsg)
                                    }

                                },
                                error: function (e) {
                                }
                            })
                        };
                    }
                }).result.then(function (data) {
                    layerMsg(data.content.resultMsg,'success');
                    $scope.findPublic('permissions','page');
                })
            };
            /**
             * 岗位管理--重置
             */
            $scope.resetPostManage = function () {
                $scope.infoToView.postManage.queryConditions = {};
            };
            /**
             * 岗位管理--删除
             */
            $scope.deletePost = function (target) {
                // 风险提示弹窗
                layer.confirm('确定删除吗', {
                    btn: ['确定','取消'] //按钮
                }, function(){
                    //点确定回调方法
                    var index = layer.load(2, {
                        shade: [0.1,'#fff'] //0.1透明度的白色背景
                    });
                    $$systemBasic.deletePostManage({
                        "iD":target
                    },{
                        success: function (data) {
                            layer.close(index);
                            if(data.content.resultCode=='0000'){
                                layerMsg(data.content.resultMsg,'success');
                                $scope.findPublic('postManage','page');
                            }else {
                                layerMsg(data.content.resultMsg);
                            }
                        },
                        error: function (e) {
                        }
                    })
                });
            };
            /**
             * 岗位管理--岗位详情
             */
            $scope.postDetails = function (target) {
                $modal.open({
                    templateUrl:'components/setup/systemBasic/tpl/modal/postDetails.html',
                    resolve:{
                        target:function () {
                            return target
                        }
                    },
                    controller:function($scope,$modalInstance, target) {
                        $scope.postDetailCondition = {};
                        $scope.postDetailCondition =target;
                        //关闭弹窗
                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                        //-----ui-tree------
                        //获取属性菜单数据
                        function getTree() {
                            $$systemBasic.postManageDetail({
                                    "gradeId":target.iD
                                },{
                                    success: function (data) {
                                        if(data.content){
                                            $scope.treeData = data.content;
                                        }else {
                                            layerMsg(data.resultMsg);
                                        }
                                    },
                                    error: function (e) {
                                    }
                                })
                        };
                        getTree();
                        //开关触发器
                        $scope.toggle = function (scope) {
                            console.log(scope);
                            scope.toggle();
                        };
                        //折叠所有节点
                        $scope.collapseAll = function () {
                            $scope.$broadcast('angular-ui-tree:collapse-all');
                        };

                        //打开所有节点
                        $scope.expandAll = function () {
                            $scope.$broadcast('angular-ui-tree:expand-all');
                        };
                        //当checked发生变化 执行本方法
                        $scope.changeNode = function (node,parent,parentNode) {
                            $scope.changeFlag=true;
                            $scope.copyData=[];
                            changeChildrenNodeStatus(node);
                            checkBrotherNodeStatus(parentNode);
                            getCheckedData($scope.treeData);

                        };
                        //改变兄弟级的状态
                        function changeChildrenNodeStatus(node) {
                            if(!node)
                                return false;
                            angular.forEach(node.nodes,function(childrenNode){
                                if(childrenNode){
                                    childrenNode.checked=node.checked;
                                    $scope.nodeData=childrenNode.menuCName;
                                }

                                //如果还有子集
                                if(childrenNode&&childrenNode.nodes && childrenNode.nodes.length>0){
                                    changeChildrenNodeStatus(childrenNode);
                                }
                            })
                        }

                        //获取选中的节点
                        function getCheckedData(data){
                            angular.forEach(data,function(childData){
                                if(childData&&childData.checked){
                                    var checkedData=childData;
                                    $scope.copyData.push(checkedData)
                                    console.log($scope.copyData);
                                }
                                if(childData&&childData.nodes &&childData.nodes.length>0){
                                    getCheckedData(childData.nodes);
                                }
                            })
                        }

                        //检查兄弟级的状态
                        function checkBrotherNodeStatus(nodeScope){
                            //判断是否到达了顶级
                            if(!nodeScope){
                                return false;
                            }
                            //父节点的值
                            var parentNodeValue=nodeScope.$modelValue;
                            //父节点上次的状态
                            var lastStatus=parentNodeValue.checked;

                            var checkedAll=false;

                            angular.forEach(parentNodeValue.nodes,function(brotherNode){
                                if(brotherNode.checked) {
                                    checkedAll=true;
                                    return true
                                }
                            })
                            parentNodeValue.checked=checkedAll;

                            if(lastStatus!==parentNodeValue.checked){
                                checkBrotherNodeStatus(nodeScope.$parentNodeScope);
                            }
                        }
                        //-----ui-tree end------
                        //保存
                        $scope.savePost = function () {
                            var _data={
                                "list":$scope.copyData,
                                "id":target.iD
                            }
                            $$systemBasic.savePostDetails(_data,{
                                success: function (data) {
                                    if(data.content.resultCode=='0000'){
                                        $modalInstance.close(data);
                                    }else {
                                        layerMsg(data.content.resultMsg);
                                    }

                                },
                                error: function (e) {
                                }
                            })
                        }
                    }
                }).result.then(function (data) {
                    layerMsg(data.content.resultMsg,'success')
                })
            };
            init();
        }
    ])
});