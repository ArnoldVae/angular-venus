/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function redInvoiceIssued($http,$$adapter, ApiPath) {
        var redInvoice=function () {
            //储存查询的数据
            this.getPayList=[];
            // 状态
            this.status={
                "checkedClaimAll_disabled":false,//全选flag
                "moreFlag":false,//展开高级查询flag
                "taxRate":"",//taxRate
                "appliName":"",//appliName
                "disabled":true//复选框disabled flag
            };
            this.selectedPay=0;//勾选的总金额
            //红票查询
            this.query={
                "certiNoE":'',
                "certiNoS":'',
                "certiNoList":'',
                "comCode":'',
                "handler1Code":'',
                "agentCode":'',
                "contractNo":'',
                "businessNature":'',
                "riskCode":'',
                "insuredName":'',
                "appliName":'',
                "agriType":'',
                "chargeType":'1'
            }
        };

        /**
         *查询
         */
        var invoiceSearch=function(keywords,options){
            var _data={
                "certiNoE":keywords.certiNoE,
                "certiNoS":keywords.certiNoS,
                "certiNoList":keywords.certiNoList,
                "comCode":keywords.comCode,
                "handler1Code":keywords.handler1Code,
                "agentCode":keywords.agentCode,
                "contractNo":keywords.contractNo,
                "businessNature":keywords.businessNature,
                "riskCode":keywords.riskCode,
                "insuredName":keywords.insuredName,
                "appliName":keywords.appliName,
                "agriType":keywords.agriType,
                "webCenterCode":keywords.webCenterCode,
                "webComCode":keywords.webComCode,
                "webTaskCode":keywords.webTaskCode,
                "webUserCode":keywords.webUserCode,
                "chargeType":keywords.chargeType
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.redInvoiceQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.REDINVOICEQUERY, data);
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
        var redInvoiceSubmit=function(_data,options){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.CHECKREDINVOICESUBMIT, _data);
            config.httpPackage.url =  ApiPath.api.checkRedInvoiceSubmit;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.CHECKREDINVOICESUBMIT, data);
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
        var redInvoiceModalSubmit=function(_data,options){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.BLUEINVOICESUBMITMODAL, _data);
            config.httpPackage.url =  ApiPath.api.blueInvoiceSubmitModal;
            $http(config.httpPackage)
                .success(function (data) {
                    data = angular.copy($$adapter.imports(constants.TARGET.BLUEINVOICESUBMITMODAL, data));
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
            redInvoiceSubmit:function(keywords,options){
                return redInvoiceSubmit(keywords,options);
            },
            redInvoice:function(){
                return new redInvoice();
            },
            redInvoiceModalSubmit:function(keywords,options){
                return redInvoiceModalSubmit(keywords,options);
            }
        }
    }

    moduleApp.factory('$$redInvoiceIssued',['$http','$$adapter','ApiPath',redInvoiceIssued]);

});