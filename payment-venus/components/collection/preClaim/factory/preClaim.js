/**
 * 预认领核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function preClaimHandler($http,$$adapter,ApiPath) {
        console.log('预认领模块api...');
        var searchPreClaim=function(keywords, options, pagination){
            console.log('预认领查询');
            var _data={
                "webUserCode": keywords.webUserCode||'',
                "webComCode": keywords.webComCode||'',
                "webCenterCode": keywords.webCenterCode||'',
                "webTaskCode": keywords.webTaskCode||'',
                "transactionNo": keywords.transactionNo||'',
                "certiNo": keywords.certiNo||'',
                "paymentName": keywords.paymentName||'',
                "tradingNo": keywords.tradingNo||'',
                "currency": keywords.currency||'',
                "sumFeeCnyFrom": keywords.sumFeeCnyFrom||'',
                "sumFeeCnyTo": keywords.sumFeeCnyTo||'',
                "claimStatus": keywords.claimStatus||'',
                "inputDateFrom": keywords.inputDateFrom||'',
                "inputDateTo": keywords.inputDateTo||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchPreClaim', _data);
            config.httpPackage.url =  ApiPath.api.searchPreClaimDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchPreClaim', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchPaymentNotice=function(keywords, options, pagination){
            console.log('预认领--缴费通知单查询');
            var _data={
                "webUserCode": keywords.webUserCode||'',
                "webComCode": keywords.webComCode||'',
                "webCenterCode": keywords.webCenterCode||'',
                "webTaskCode": keywords.webTaskCode||'',
                "transactionNo": keywords.transactionNo||'',
                "tradingNo": keywords.tradingNo||'',
                "certiNo": keywords.certiNo||'',
                "startdate": keywords.startdate||'',
                "insuredname": keywords.insuredname||'',
                "appliName": keywords.appliName||'',
                "taxpremium": keywords.taxpremium||'',
                "invoiceNo": keywords.invoiceNo||'',
                "taxfee": keywords.taxfee||'',
                "underwritedate": keywords.underwritedate||'',
                "inputDate": keywords.inputDate||'',
                "currenCY": keywords.currenCY||'',
                "exchangeRate": keywords.exchangeRate||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchPaymentNotice', _data);
            config.httpPackage.url =  ApiPath.api.searchPaymentNoticeDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchPaymentNotice', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchBankFlow=function(keywords, options, pagination){
            console.log('预认领--银行流水查询');
            var _data={
                "webUserCode": keywords.webUserCode||'',
                "webComCode": keywords.webComCode||'',
                "webCenterCode": keywords.webCenterCode||'',
                "webTaskCode": keywords.webTaskCode||'',
                "unifySerialNum": keywords.unifySerialNum||'',
                "comCode": keywords.comCode||'',
                "bankAccount": keywords.bankAccount||'',
                "paymentName": keywords.paymentName||'',
                "paymentAccount": keywords.paymentAccount||'',
                "currency": keywords.currency||'',
                "amountFrom": keywords.amountFrom||'',
                "amountTo": keywords.amountTo||'',
                "transDateFrom": keywords.transDateFrom||'',
                "transDateTo": keywords.transDateTo||'',
                "claimStatus": keywords.claimStatus||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchBankFlow', _data);
            config.httpPackage.url =  ApiPath.api.searchBankFlowDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchBankFlow', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var confirmpreClaim=function(_data, options){
            console.log('预认领-新增认领');
            config.httpPackage.data = $$adapter.exports('confirmpreClaim', _data);
            config.httpPackage.url =  ApiPath.api.confirmpreClaimDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmpreClaim', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var revisePreClaim=function(_data, options){
            console.log('修改预认领-修改');
            config.httpPackage.data = $$adapter.exports('revisePreClaim', _data);
            config.httpPackage.url =  ApiPath.api.revisePreClaimDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('revisePreClaim', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var lookPreClaim=function(_data, options){
            console.log('预认领查看');
            config.httpPackage.data = $$adapter.exports('lookPreClaim', _data);
            config.httpPackage.url =  ApiPath.api.lookPreClaimDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('lookPreClaim', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var reviseLookPreClaim=function(_data, options){
            console.log('预认领修改查询');
            config.httpPackage.data = $$adapter.exports('reviseLookPreClaim', _data);
            config.httpPackage.url =  ApiPath.api.reviseLookPreClaimDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('reviseLookPreClaim', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //导入目标银行账号-币别
        var queryBankAcount=function(_data,options){
            var _data={
                "centerCode":_data||'',
            };
            config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
            config.httpPackage.url= ApiPath.api.queryBankAcount;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryBankAcount', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        var paymentNoticeListInfo=function(_data, options){
            console.log('查看单号列表查询');
            config.httpPackage.data = $$adapter.exports('paymentNoticeListInfo', _data);
            config.httpPackage.url =  ApiPath.api.paymentNoticeListDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('paymentNoticeListInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            searchPreClaim:function(keywords,options,pagination) {
                return searchPreClaim(keywords, options,pagination)
            },
            searchPaymentNotice:function(keywords,options,pagination) {
                return searchPaymentNotice(keywords, options,pagination)
            },
            searchBankFlow:function(keywords,options,pagination) {
                return searchBankFlow(keywords, options,pagination)
            },
            confirmpreClaim:function(_data,options,keywords) {
                return confirmpreClaim(_data, options,keywords)
            },
            revisePreClaim:function(_data,options,keywords) {
                return revisePreClaim(_data, options,keywords)
            },
            lookPreClaim:function(_data,options,keywords) {
            return lookPreClaim(_data, options,keywords)
            },
            reviseLookPreClaim:function(_data,options,keywords) {
            return reviseLookPreClaim(_data, options,keywords)
            },
            queryBankAcount: function (_data,options) {
                return queryBankAcount(_data,options);
            },
            paymentNoticeListInfo:function(_data,options) {
                return paymentNoticeListInfo(_data, options)
            }
        }
    }
    moduleApp.factory('$$preClaim',['$http','$$adapter','ApiPath',preClaimHandler]);

});
