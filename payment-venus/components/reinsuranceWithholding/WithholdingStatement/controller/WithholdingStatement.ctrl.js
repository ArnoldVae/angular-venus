/**
 * Created by Administrator on 2017-10-24.
 * 再保代扣代缴-代扣代缴报表控制器
 */
define([
    '../module',
    'config'
],function (moduleApp,config) {
    'use strict';
    var WithholdingStatement=function($scope,$rootScope,$modal,$$WithholdingStatement) {
        var checkedRecords=[];
        $scope.WithHoldStatements={
            "withHoldNoStart":"",
            "withHoldNoEnd":"",
            "withHoldNoList":"",
            "settleNoStart":"",
            "settleNoEnd":"",
            "settleNoList":"",
            "freinsName":"",
            "freinsNameSign":"=",
            "settleStartDate":"",
            "settleEndDate":"",
            "operateStartDate":"",
            "operateEndDate":"",
            "currency":"",
            "taskCode":"payment.withholding.statements",
            "userDto":{
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$rootScope.comCode
            }
        };
        /**
         * 比较对象属性
         */
        var checkValueOfList=function (objSt,_obj) {
            var result=false
            if(_obj.currency1!=objSt.currency1||
                (_obj.freinsCode!=objSt.freinsCode)||
                (_obj.chargeType!=objSt.chargeType)){
               result=false
            }else if((_obj.currency1==objSt.currency1)&&
                (_obj.freinsCode==objSt.freinsCode)&&
                (_obj.chargeType==objSt.chargeType)){
                result=true
            }
            return result;
        }

        var getAllStatus=function (list) {
            var result=false;
            var _objSt=list[0]
            $.each(list,function (index,obj) {
                if(!checkValueOfList(_objSt,obj)){
                    result=false;
                    return false
                }else{
                   result=true;
                }
            })
            return result;

        }
        var checkList=function (list) {
            var objSt={};
            $.each(list,function (index,obj) {
                if(obj.checked){
                    objSt=obj;
                    return false;
                }
            })
            $.each(list,function (index,_obj) {
                if(objSt.checked){
                    if(!checkValueOfList(objSt,_obj)){
                        _obj.disabled=true
                    }else{
                        _obj.disabled=false
                    }
                }else {
                    _obj.disabled=false;
                }
            })
        }
        var changeListClass = function () {
            checkedRecords=[];
            angular.forEach($scope.WithHoldingStatements, function (data) {
                if (data.checked) {
                    data.selectedClass = 'venus_table_check';
                    checkedRecords.push(data);
                }
                else {
                    data.selectedClass = ''
                }
            });
            $scope.checkedRecords=checkedRecords;
        }
        /**
         * 全选
         */
        $scope.selectedAll=function(){
            checkList($scope.WithHoldingStatements);
            angular.forEach($scope.WithHoldingStatements,function(data){
                if($scope.status.checkedAccountAll){
                    data.checked=true;
                }else data.checked=false;
            });
            changeListClass()
        };
        /**
         * 单选
         */
        $scope.selectedOne=function(){
            checkList($scope.WithHoldingStatements);
            $scope.status.checkedAccountAll=$scope.WithHoldingStatements.every(function(item,index,array){
                return item.checked;
            })
            changeListClass()
        };
        /**
         * 获取是否有效字段暂时
         */
        $scope.getWithHoldStatus=function(target1,target2){
            console.log(target1+'and'+target2);
            if(target1&&!target2){
                $rootScope.withHoldstatus1="1"
                }else if(!target1&&target2){
                $rootScope.withHoldstatus1="0"
                }else if(target1&&target2){
                $rootScope.withHoldstatus1="0,1"
                } else {
                $rootScope.withHoldstatus1=""
            }
        }
        //生成报表
        $scope.Reports = function () {
            $scope.userDto={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$rootScope.comCode
            }
            $modal.open({
                templateUrl:"components/reinsuranceWithholding/WithholdingStatement/tpl/modal/withholdingStatement.modal.tpl.html",
                resolve:{
                    target:function () {
                        return checkedRecords;
                    },
                    user:function () {
                        return $scope.userDto;
                    }
                },
                controller:function ($scope,$modalInstance,target,user) {
                    $scope.userDto=user
                    $scope.today=new Date().dateConversion();
                    console.log(target);
                    var a={};
                    var b=[];
                    var obj1={};
                    $.each(target,function(index,obj){
                        obj1['settleNo']=obj.settleNo;
                        obj1['freinsCode']=obj.freinsCode;
                        obj1['currency1']=obj.currency1;
                        obj1['comCode']=obj.comCode;
                        b.push(angular.copy(obj1));
                        a.prpjReinsInputTaxRelatedMainDtoList = b;
                    });
                    a.userDto=$scope.userDto
                    $$WithholdingStatement.geneReports(a,{
                        success:function (data) {
                            $scope.Statement=data.prpjReinsInputTaxRelatedMainDtoList;
                            console.log($scope.Statement);
                            if($scope.Statement==""){
                                layerMsg('暂无数据！');
                                return false
                            }
                        },
                        error:function () {
                        }
                    });
                    $scope.printSubmit = function (Statement) {
                        $modalInstance.close(Statement);
                    };
                    $scope.export = function (Statement) {
                        var Export = {};
                        Export.Model = Statement;
                        $modalInstance.close(Export);
                    };
                    $scope.cancel = function () {
                        $modalInstance.close('search');
                    };

                }
            }).result.then(function(reword){
                if(reword=='search'){
                    $scope.queryStatements('page',true);
                }else if((reword)instanceof Array){
                    $scope.printOne(reword);
                    $scope.queryStatements('page',true);
                }else {
                    $scope.exportModel(reword);
                    $scope.queryStatements('page',true);
                }

            })
        };

        /**
         * 重置表单
         */
        $scope.resetWithHoldingStatements = function(){
            $scope.WithHoldStatements = {
                "withHoldNoStart":"",
                "withHoldNoEnd":"",
                "withHoldNoList":"",
                "settleNoStart":"",
                "settleNoEnd":"",
                "settleNoList":"",
                "freinsName":"",
                "freinsNameSign":"=",
                "settleStartDate":"",
                "settleEndDate":"",
                "operateStartDate":"",
                "operateEndDate":"",
                "taskCode":"payment.withholding.statements",
                "currency":"",
                "userDto":{
                    "userCode":$scope.usercode,
                    "userName":$scope.userName,
                    "comCode":$rootScope.comCode
                }
            };
            $scope.getWithHoldStatus();
        };
        /**
         *代扣代缴报表列表查询
         */
        $scope.queryStatements = function (target,index) {
            checkedRecords=[];
            $scope.checkedRecords = checkedRecords;
            $scope.status.checkedAccountAll = false;
            if(target!='page'){
                $scope.pagination.pageIndex=1
            }
            if($scope.WithHoldStatements.settleNoEnd&&$scope.WithHoldStatements.settleNoStart){
                if(($scope.WithHoldStatements.settleNoEnd<$scope.WithHoldStatements.settleNoStart)){
                    layerMsg("结算单号（从）不能大于结算单号（到）！");
                    return false
                }
            }
            if($scope.WithHoldStatements.withHoldNoStart&&$scope.WithHoldStatements.withHoldNoEnd){
                if($scope.WithHoldStatements.withHoldNoEnd<$scope.WithHoldStatements.withHoldNoStart){
                    layerMsg("代扣代缴单号（从）不能大于代扣代缴单号（到）！");
                    return false
                }
            }
            if(($scope.WithHoldStatements.settleStartDate&&!$scope.WithHoldStatements.settleEndDate)||(!$scope.WithHoldStatements.settleStartDate&&$scope.WithHoldStatements.settleEndDate)){
                layerMsg("日期起期和日期止期必须同时输入或不输入！");
                return false
            }else if($scope.WithHoldStatements.settleEndDate&&$scope.WithHoldStatements.settleStartDate){
                if(!($scope.WithHoldStatements.settleEndDate>=$scope.WithHoldStatements.settleStartDate)){
                    layerMsg("日期起期不能大于日期止期！");
                    return false
                }else {

                }
            }
            $scope.WithHoldStatements.withHoldStatus=$rootScope.withHoldstatus1;
            $scope.WithHoldStatements.userDto={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$rootScope.comCode
            };
            $$WithholdingStatement.queryStatements($scope.WithHoldStatements,{
                success: function (data) {
                    $scope.WithHoldingStatements=data.content;
                    $scope.selectAllDisabled=getAllStatus($scope.WithHoldingStatements)

                    if(!index&&$scope.WithHoldingStatements.length<1){
                        layerMsg('暂无数据！');
                        return false
                    }
                    $scope.pagination.totalItems=data.totalCount;//列表总条数

                },
                error: function (e) {
                }
            },{
                "pageIndex":$scope.pagination.pageIndex,
                "pageSize":$scope.pagination.pageSize
            })
        };
        /**
         * 作废
         */
        $scope.invalidStatement = function (target){
            var obj1={};
                obj1['withHoldNoStart']=target;
            $$WithholdingStatement.invalidStatement(obj1,{
                success:function (data) {
                    console.log(data);
                    if(data.resultCode&&data.resultCode =='0000'){
                        layer.msg('作废成功', {icon: 1});
                    }else {
                        layer.msg('作废失败');
                    }
                    $scope.queryStatements("page",true)
                },
                error:function () {

                }
            })
        };
        /**
         * 导出报表
         * @param target
         * @param proposalNo
         */
        $scope.exportModel = function(target){
            var a={};
            var b=[];
            var obj1={};
            $.each(target.Model,function(index,obj){
                obj1['withHoldNo']=obj.withHoldNo;
                b.push(angular.copy(obj1))
                a.prpjReinsInputTaxRelatedMainDtoList = b;
            });
            a.UserDto={
                "userCode":$scope.usercode,
                "userName":$scope.userName,
                "comCode":$rootScope.comCode
            }
            $$WithholdingStatement.exportModel(a,{
                success:function (data) {
                    console.log(data);
                    if(data.resultCode =='0000'){
                        $scope.fileId = data.fileId;
                        window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
                        layer.msg('导出成功', {icon: 1});
                    }else {
                        layer.msg('导出失败');
                    }
                },
                error:function () {

                }
            })
        }
        /**
         * 打印选择表单
         * @param target
         * @param proposalNo
         */
        var printer=undefined;
        var _printData = undefined;
        window.VENUS.feedbackData = function(){
            if(printer)
                printer.transmittingData(_printData);
        };
        $scope.printTest=function(){

            //window.print();
        }
        /**
         * 打印
         */
        $scope.printOne = function (target){
            if(typeof (target)=="string"){
                var a={};
                var b=[];
                var obj1={};
                obj1['withHoldNo']=target
                b.push(angular.copy(obj1))
                a.prpjReinsInputTaxRelatedMainDtoList = b;
            }else {
                var a={};
                var b=[];
                var obj1={};
                obj1['withHoldNo']=target[0].withHoldNo;
                b.push(angular.copy(obj1));
                a.prpjReinsInputTaxRelatedMainDtoList = b;
            }
            $$WithholdingStatement.printOne(a,{
                success:function (data) {
                    _printData = {
                        test: data.prpjReinsInputTaxRelatedMainDtoList
                    };
                    $scope.url = 'components/reinsuranceWithholding/WithholdingStatement/tpl/print/printTest.html';
                    printer = window.open($scope.url);
                },
                error:function () {

                }
            })
        };
        /**
         * 初始化
         */
        var init=function(){
            $scope.withHoldStatus11=false;
            $scope.withHoldStatus22=false;
            $scope.selectAllDisabled=true;
            $scope.status={
                        "checkedAccountAll":false,//全选
                        "moreFlag":false//展开高级查询flag
            };
            $scope.selectedNum = WithholdingStatement.selectedNum;//勾选的保单数量
            $scope.queryWithHoldingStatements = WithholdingStatement.queryWithHoldingStatements;//查询条件
            $scope.checkedRecords = WithholdingStatement.checkedRecords;//记录勾选的保单号/批单号

            //分页信息
            $scope.pagination={
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'15',//显示条数
                maxSize:'5',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            }
        };

        init();
    }
    moduleApp.controller('WithholdingStatementCtrl',['$scope','$rootScope','$modal','$$WithholdingStatement',WithholdingStatement]);
});
