/**
 * 认领确认核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function claimConfirmHandler($http,$$adapter,ApiPath) {
        console.log('认领确认模块api...');
        var searchClaimConfirm=function(keywords, options, pagination){
            console.log('认领确认查询');
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
            config.httpPackage.data = $$adapter.exports('searchClaimConfirm', _data);
            config.httpPackage.url =  ApiPath.api.searchClaimConfirmDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchClaimConfirm', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var confirmClaim=function(_data, options){
            console.log('确认认领');
            config.httpPackage.data = $$adapter.exports('confirmClaim', _data);
            config.httpPackage.url =  ApiPath.api.confirmClaimDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmClaim', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var claimRepulse=function(_data, options){
            console.log('认领打回');
            config.httpPackage.data = $$adapter.exports('claimRepulse', _data);
            config.httpPackage.url =  ApiPath.api.claimRepulseDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('claimRepulse', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var lookClaimConfirm=function(_data, options){
            console.log('认领确认-详情');
            config.httpPackage.data = $$adapter.exports('lookClaimConfirm', _data);
            config.httpPackage.url =  ApiPath.api.lookClaimConfirmDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('lookClaimConfirm', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
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
            searchClaimConfirm:function(keywords,options,pagination) {
                return searchClaimConfirm(keywords, options,pagination)
            },
            confirmClaim:function(_data,options,keywords) {
                return confirmClaim(_data, options,keywords)
            },
            claimRepulse:function(_data,options,keywords) {
                return claimRepulse(_data, options,keywords)
            },
            lookClaimConfirm:function(_data,options,keywords) {
                return lookClaimConfirm(_data, options,keywords)
            },
            paymentNoticeListInfo:function(_data,options) {
                return paymentNoticeListInfo(_data, options)
            }
        }
    }
    moduleApp.factory('$$claimConfirm',['$http','$$adapter','ApiPath',claimConfirmHandler]);

});
