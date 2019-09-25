/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function blueInvoiceIssued($http,$$adapter, ApiPath) {
        /**
         *开票查询
         */
        var invoiceSearch=function(keywords,options){
            var _data={
                "certiNoE":keywords.certiNoE,//保/批单号 从
                "certiNoS":keywords.certiNoS,//保/批单号 到
                "certiNoList":keywords.certiNoList,//保/批单号列表
                "comCode":keywords.comCode,//业务部门
                "handler1Code":keywords.handler1Code,//业务员
                "agentCode":keywords.agentCode,//代理人/经纪人
                "contractNo":keywords.contractNo,//"车队合同号预约协议号
                "businessNature":keywords.businessNature,//业务渠道
                "riskCode":keywords.riskCode,//险种
                "insuredName":keywords.insuredName,//被保险人名称
                "appliName":keywords.appliName,//投保人名称
                "agriType":keywords.agriType,//农险补贴类型
                "chargeType":keywords.chargeType,//费用类型
                "startInputDate":keywords.startInputDate,//核保日期起期
                "endInputDate":keywords.endInputDate,//核保日期止期
                "systemSource":keywords.systemSource,//业务来源
                "webUserCode":keywords.webUserCode,//权限配置
                "webComCode":keywords.webComCode,
                "webCenterCode":keywords.webCenterCode,
                "webTaskCode":keywords.webTaskCode
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.invoiceQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('invoiceQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 勾选提交
         */
        var blueInvoiceSubmit=function(_data,options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.checkInvoiceSubmit,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('checkInvoiceSubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 打印申请
         */
        var blueInvoiceModalSubmit=function(_data,options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.blueInvoiceSubmitModal,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = angular.copy($$adapter.imports('blueInvoiceSubmitModal', data));
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 蓝票开票申请记录保存，切换页面时保存实例化对象
         */
        var bulueInvoice=function () {
            // 状态
            this.status={
                "checkedClaimAll":false,//全选flag
                "checkedClaimAll_disabled":false,//全选flag
                "moreFlag":false,//展开高级查询flag
                "taxRate":"",//taxRate
                "appliName":"",//appliName
                "coinsName":"",//coinsName
                "disabled":true//复选框disabled flag
            };
            this.selectedPay=0;//勾选数据总和
            this.checkedRecords=[];// 勾选数据备份
            this.blueInfoView={
                //条件
                "blueQuery":{
                    "certiNoS":'',//起始保单号
                    "certiNoE":'',//终止保单号
                    "certiNoList":'',//批单号列表
                    "comCode":'',//业务部门
                    "handler1Code":'',//业务员
                    "agentCode":'',//代理人
                    "contractNo":'',//车队合同号
                    "businessNature":'',//业务渠道
                    "riskCode":'',//riskCode
                    "insuredName":'',//被保险人名称
                    "appliName":'',//投保人名称
                    "agriType":'',//农险补贴类型
                    "chargeType":'1',//费用类型
                    "startInputDate":'',//核保日期起期
                    "endInputDate":'',//核保日期止期
                    "systemSource":'',//业务来源
                    "dFFlag":''//费用性质
                },
                "checkedBlueList":[]
            };
        };
        /**
         * 改变开票对象，信息联动
         */
        var blueChangeInfo=function(_data,options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.blueChangeInfomation,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = angular.copy($$adapter.imports('blueChangeInfomation', data));
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 判断复选框是否可以勾选
         */
        var buleIsTrueSubmit=function(_data,options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.IsTrueSubmit,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = angular.copy($$adapter.imports('IsTrueSubmit', data));
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        return{
            invoiceSearch:function(keywords,options){
                return invoiceSearch(keywords,options);
            },
            blueInvoiceSubmit:function(keywords,options){
                return blueInvoiceSubmit(keywords,options);
            },
            bulueInvoice:function(){
                return new bulueInvoice();
            },
            blueInvoiceModalSubmit:function(keywords,options){
                return blueInvoiceModalSubmit(keywords,options);
            },
            blueChangeInfo:function(keywords,options){
                return blueChangeInfo(keywords,options);
            },
            buleIsTrueSubmit:function (keywords,options) {
                return buleIsTrueSubmit(keywords,options);
            }
        }
    }
    moduleApp.factory('$$blueInvoiceIssued',['$http','$$adapter','ApiPath',blueInvoiceIssued]);

});