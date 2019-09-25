/**
 * 共保进项发票核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function feeInputInvoiceHandler($http,$$adapter,ApiPath) {
        var searchReparations=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "certiNo":keywords.certiNo||'',
                "certiNoList":keywords.certiNoList||'',
                "comCode":keywords.comCode||'',
                "handlerCode":keywords.handlerCode||'',
                "businessNature":keywords.businessNature||'',
                "currency1":keywords.currency1||'',
                "appliName":keywords.appliName||'',
                "insuredName":keywords.insuredName||'',
                "riskCode":keywords.riskCode||'',
                "validDate":keywords.validDate||'',
                "agentCode":keywords.agentCode||'',
                "webUserCode":keywords.webUserCode||'',
                "webComCode":keywords.webComCode||'',
                "webCenterCode":keywords.webCenterCode||'',
                "webTaskCode":keywords.webTaskCode||'',
            };
            config.httpPackage.data= $$adapter.exports('queryCoinsSettlePlanForInvoice', _data);
            config.httpPackage.url= ApiPath.api.queryCoinsSettlePlanForInvoice;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryCoinsSettlePlanForInvoice', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var Account=function(){
            this.infoToView={
                "pagination" : {
                    totalItems: '',//总数
                    pageIndex: '1',//当前页面
                    pageSize: '15',//显示条数
                    maxSize: '3',//最大页数
                    numPages: '',//共有多少页
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                },
                "tapFlag":1,
                "moreFlag":false,
                "serchmoreFlag":false,
                "tapName" : [
                    {
                        'title': '共保保费发票查询',
                        'index': '1',
                        'active': true,
                        "btnStyle":{"width":"150px"}
                    },
                    {
                        'title': '共保发票查询',
                        'index': '2',
                        'active': false,
                        "btnStyle":{"width":"150px"}

                    }
                ],
                "checkStatus":{
                    "checkedAccountAll":false,
                    "checkedClaimAll":false,
                    "checkedCommonAll":false,
                    "checkedChecksAll":false
                },
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                //手续费发票查询条件
                "feeInputInvoiceCondition":{
                    "certiNo":'',
                    "certiNoList":'',
                    "comCode":'',
                    "handlerCode":'',
                    "agentCode":'',
                    "businessNature":'',
                    "currency1":'',
                    "appliName":'',
                    "insuredName":'',
                    "riskCode":'',
                    "validDate":''

                },
                "invoiceConditionSearch":{
                    "invoiceNo":'',
                    "invoiceCode":'',
                    "certiNo":'',
                    "billingDate":'',

                },
                //弹框表格绑定
                "accountRecList":[
                    {
                        "currenCy2":'CNY',
                        "payWay":'01',
                        "accountNo":'',
                        "payrefFee":'',
                        "itemCode":"",
                        "centerCode":'11999000'
                    }
                ],
                //弹框表格绑定初始化
                "accountRecInitList":[
                    {
                        "currenCy2":'CNY',
                        "payWay":'01',
                        "accountNo":'',
                        "itemCode":"",
                        "payrefFee":'',
                        "centerCode":'11999000'
                    }
                ]
            }
        };
        var payLossInfo=function(data,options,pagination){
            config.httpPackage.data= $$adapter.exports('inToInvoiceCoinsSettlePlanView', data);
            config.httpPackage.url= ApiPath.api.inToInvoiceCoinsSettlePlanView;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('inToInvoiceCoinsSettlePlanView', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var payLossVerify=function(data1,data,keywords,options,pagination){
            var _data={
                "comCode":data1,
                "prpJcoinsSettlePlanDtoList":keywords,
                "prpJIncomeInvoiceInfoDtoList":data
            };
            config.httpPackage.data= $$adapter.exports('saveCoinsSettlePlanInvoices', _data);
            config.httpPackage.url= ApiPath.api.saveCoinsSettlePlanInvoices;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('saveCoinsSettlePlanInvoices', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var findAllInvoice=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "invoiceNo":keywords.invoiceNo||'',
                "invoiceCode":keywords.invoiceCode||'',
                "certiNo":keywords.certiNo||'',
                "billingDate":keywords.billingDate||'',
                "webUserCode":keywords.webUserCode||'',
                "webComCode":keywords.webComCode||'',
                "webCenterCode":keywords.webCenterCode||'',
                "webTaskCode":keywords.webTaskCode||'',
            };
            config.httpPackage.data= $$adapter.exports('findAllInvoiceForCoinsSettlePlan', _data);
            config.httpPackage.url= ApiPath.api.findAllInvoiceForCoinsSettlePlan;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('findAllInvoiceForCoinsSettlePlan', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        return {
            searchReparations: function (keywords, options, pagination) {
                return searchReparations(keywords, options, pagination);
            },
            Account:function(){
                return new Account()
            },
            payLossInfo: function (data, options, pagination) {
                return payLossInfo(data, options, pagination);
            },
            payLossVerify: function (data1,data,keywords,options,pagination) {
                return payLossVerify(data1,data,keywords,options,pagination);
            },
            findAllInvoice: function (keywords, options, pagination) {
                return findAllInvoice(keywords, options, pagination);
            }
        }
    }
    moduleApp.factory('$$coinsuranceInvoicesInvoice',['$http','$$adapter','ApiPath',feeInputInvoiceHandler]);
})