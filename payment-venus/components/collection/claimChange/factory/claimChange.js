/**
 * 认领变更核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function claimChangeHandler($http,$$adapter,ApiPath) {
        console.log('认领变更模块api...');
        var searchClaimChange=function(keywords, options, pagination){
            console.log('认领变更查询');
            var _data={
                "webUserCode": keywords.webUserCode||'',
                "webComCode": keywords.webComCode||'',
                "webCenterCode": keywords.webCenterCode||'',
                "webTaskCode": keywords.webTaskCode||'',
                "claimOperatorComCode": keywords.claimOperatorComCode||'',
                "claimOperatorCode": keywords.claimOperatorCode||'',
                "transactionNo": keywords.transactionNo||'',
                "tradingNo": keywords.tradingNo||'',
                "certiNo": keywords.certiNo||'',
                "paymentName": keywords.paymentName||'',
                "currency": keywords.currency||'',
                "sumFeeCnyFrom": keywords.sumFeeCnyFrom||'',
                "sumFeeCnyTo": keywords.sumFeeCnyTo||'',
                "inputDateFrom": keywords.inputDateFrom||'',
                "inputDateTo": keywords.inputDateTo||'',
                "claimStatus": keywords.claimStatus||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchClaimChange', _data);
            config.httpPackage.url =  ApiPath.api.searchClaimChangeDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchClaimChange', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var changeClaim=function(_data, options){
            console.log('认领替换');
            config.httpPackage.data = $$adapter.exports('changeClaim', _data);
            config.httpPackage.url =  ApiPath.api.changeClaimDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('changeClaim', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var claimReturn=function(_data, options){
            console.log('认领撤销');
            config.httpPackage.data = $$adapter.exports('claimReturn', _data);
            config.httpPackage.url =  ApiPath.api.claimReturnDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('claimReturn', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchBankFlow=function(keywords, options, pagination){
            console.log('银行流水查询');
            var _data={
                "webUserCode": keywords.webUserCode||'',
                "webComCode": keywords.webComCode||'',
                "webTaskCode":"payment.collection.claimmanagement.claimchange",
                "unifySerialNum": keywords.unifySerialNum||'',
                "comCode": keywords.comCode||'',
                "bankAccount": keywords.bankAccount||'',
                "paymentName": keywords.paymentName||'',
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
        var lookClaimChange=function(_data, options){
            console.log('认领变更-详情');
            config.httpPackage.data = $$adapter.exports('lookClaimChange', _data);
            config.httpPackage.url =  ApiPath.api.lookClaimChangeDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('lookClaimChange', data);
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
            searchClaimChange:function(keywords,options,pagination) {
                return searchClaimChange(keywords, options,pagination)
            },
            changeClaim:function(_data,options,keywords) {
                return changeClaim(_data, options,keywords)
            },
            claimReturn:function(_data,options,keywords) {
                return claimReturn(_data, options,keywords)
            },
            searchBankFlow:function(keywords,options,pagination) {
                return searchBankFlow(keywords, options,pagination)
            },
            lookClaimChange:function(_data,options,keywords) {
                return lookClaimChange(_data, options,keywords)
            },
            queryBankAcount: function (_data,options) {
                return queryBankAcount(_data,options);
            },
            paymentNoticeListInfo:function(_data,options) {
                return paymentNoticeListInfo(_data, options)
            }
        }
    }
    moduleApp.factory('$$claimChange',['$http','$$adapter','ApiPath',claimChangeHandler]);

});
