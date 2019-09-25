/**
 * 手续费进项发票核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function feeInputInvoiceHandler($http,$$adapter,ApiPath) {
        var searchReparations=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "centerCode":keywords.centerCode||'',
                "visaSerialNo":keywords.visaSerialNo||'',
                "visaSerialNoList":keywords.visaSerialNoList||'',
                "comCode":keywords.comCode||'',
                "handler1Code":keywords.handler1Code||'',
                "businessNature":keywords.businessNature||'',
                "currency1":keywords.currency1||'',
                "appliName":keywords.appliName||'',
                "insuredName":keywords.insuredName||'',
                "packCode":keywords.packCode||'',
                "packDate":keywords.packDate||'',
                "agentCode":keywords.agentCode||'',
                "webUserCode":keywords.webUserCode||'',
                "webComCode":keywords.webComCode||'',
                "webCenterCode":keywords.webCenterCode||'',
                "webTaskCode":keywords.webTaskCode||'',
            };
            config.httpPackage.data= $$adapter.exports('searchReparations', _data);
            config.httpPackage.url= ApiPath.api.searchReparations;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchReparations', data);
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
                "checkStatus":{
                    "checkedAccountAll":false,
                    "checkedClaimAll":false,
                    "checkedCommonAll":false,
                    "checkedChecksAll":false
                },
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
                        'title': '手续费发票登记查询',
                        'index': '1',
                        'active': true,
                        "btnStyle":{"width":"150px"}
                    },
                    {
                        'title': '手续费发票查询',
                        'index': '2',
                        'active': false,
                        "btnStyle":{"width":"150px"}

                    }
                ],
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                //手续费发票查询条件
                "feeInputInvoiceCondition":{
                    "centerCode":'',
                    "agentCode":'',
                    "visaSerialNo":"",
                    "visaSerialNoList":'',
                    "comCode":'',
                    "handler1Code":'',
                    "businessNature":'',
                    "currency1":'',
                    "appliName":'',
                    "insuredName":'',
                    "packCode":'',
                    "packDate":''
                },
                "invoiceConditionSearch":{
                    "invoiceNo":'',
                    "invoiceCode":'',
                    "certiNo":"",
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
        var payLossInfo=function(data,options){
            config.httpPackage.data= $$adapter.exports('payLossInfo', data);
            config.httpPackage.url= ApiPath.api.payLossInfo;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('payLossInfo', data);
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
                "comCode":data1.comCode||'',
                "webUserCode":data1.webUserCode||'',
                "webComCode":data1.webComCode||'',
                "webCenterComCode":data1.webCenterCode||'',
                "prpJpaymentBillDtoList":keywords,
                "prpJIncomeInvoiceInfoDtoList":data

            };
            config.httpPackage.data= $$adapter.exports('payLossVerify', _data);
            config.httpPackage.url= ApiPath.api.payLossVerify;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('payLossVerify', data);
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
            config.httpPackage.data= $$adapter.exports('findAllInvoice', _data);
            config.httpPackage.url= ApiPath.api.findAllInvoice;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('findAllInvoice', data);
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
            payLossInfo: function (data, options) {
                return payLossInfo(data, options);
            },
            payLossVerify: function (data1,data,keywords,options,pagination) {
                return payLossVerify(data1,data,keywords,options,pagination);
            },
            findAllInvoice: function (keywords, options, pagination) {
                return findAllInvoice(keywords, options, pagination);
            },
            //sendPaymentPlatformDto:function(_data,options,keywords) {
            //    return sendPaymentPlatformDto(_data, options,keywords)
            //}
        }
    }
    moduleApp.factory('$$feeInputInvoice',['$http','$$adapter','ApiPath',feeInputInvoiceHandler]);
})