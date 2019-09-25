/**
 * 付款管理-非见费业务缴费核心逻辑
 */
define(['../module','config', 'constants'], function (moduleApp,config,constants) {
    'use strict';
    function nonFeesCollectionHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var deleteMessage=function(_data, options, keywords){
            console.log('单号作废');
            config.httpPackage.data = $$adapter.exports('deleteNumMessage', _data);
            config.httpPackage.url =  ApiPath.api.deleteCollectionDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('deleteNumMessage', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentNoticeListInfo=function(_data, options, keywords){
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
        var savePayNot=function(_data, options, keywords){
            console.log('非见费业务缴费--修改保存');
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
        var saveCollectionDto=function(_data, options, keywords){
            console.log('非见费业务缴费--新增保存');
            config.httpPackage.data = $$adapter.exports('saveCollectionDto', _data);
            config.httpPackage.url =  ApiPath.api.saveCollectionInfo;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('saveCollectionDto', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentNoticeListPrint=function(_data, options, keywords){
            console.log('非见费业务缴费-打印');
            config.httpPackage.data = $$adapter.exports('paymentNoticeListPrint', _data);
            config.httpPackage.url =  ApiPath.api.paymentNoticeListPrint;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('paymentNoticeListPrint', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchPaymentInfo=function(_data, options){
            console.log('缴费页面初始化查询');
            config.httpPackage.data = $$adapter.exports('searchPaymentInfo', _data);
            config.httpPackage.url =  ApiPath.api.searchPaymentInfoDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchPaymentInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            deleteMessage:function(_data,options,keywords) {
                return deleteMessage(_data, options,keywords)
            },
            paymentNoticeListInfo:function(_data,options,keywords) {
            return paymentNoticeListInfo(_data, options,keywords)
            },
            savePayNot:function(_data,options,keywords) {
            return savePayNot(_data, options,keywords)
            },
            saveCollectionDto:function(_data,options,keywords) {
                return saveCollectionDto(_data, options,keywords)
            },
            paymentNoticeListPrint:function(_data,options,keywords) {
            return paymentNoticeListPrint(_data, options,keywords)
            },
            searchPaymentInfo:function(_data,options) {
                return searchPaymentInfo(_data, options)
            },
            find: function (target, keywords, options, pagination) {
                if(target==constants.TARGET.SEARCHCOLLECTIONREG){
                        console.log('非见费业务缴费查询');
                        var _data={
                            "transactionNo":keywords.transactionNo||'',
                            "certiNo":keywords.certiNo||'',
                            "earlierMonth":keywords.earlierMonth||'',
                            "laterMonth":keywords.laterMonth||'',
                            "earlierSumFee":keywords.earlierSumFee||'',
                            "laterSumFee":keywords.laterSumFee||'',
                            "tranoStatus":keywords.tranoStatus||'',
                            "currenCY":keywords.currenCY||'',
                            "appliName":keywords.appliName||'',
                            "printFlag":keywords.printFlag||'',
                            "globalUserCode":keywords.globalUserCode||'',
                            "powerSystemCode":keywords.powerSystemCode||'',
                            "webUserCode":keywords.webUserCode||'',
                            "webComCode":keywords.webComCode||'',
                            "webCenterCode":keywords.webCenterCode||'',
                            "webTaskCode":keywords.webTaskCode||'',
                            "pageNo":pagination.pageNo||'',
                            "pageSize":pagination.pageSize||''
                        };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHCOLLECTIONREG, _data);
                    config.httpPackage.url =  ApiPath.api.searchCollectionRegDto;
                    $http(config.httpPackage)
                            .success(function (data) {
                                data = $$adapter.imports(constants.TARGET.SEARCHCOLLECTIONREG, data);
                                if (options && options.success && typeof(options.success) == 'function')
                                    options.success(data);
                            })
                            .error(function (e, code) {
                                if (options && options.error && typeof(options.error) == 'function')
                                    options.error(e);
                            })
                    }
                if(target==constants.TARGET.SEARCHCOLLECTIONREGADD){
                        console.log('非见费业务缴费--新增查询');
                        var _data={
                            "certiNo":keywords.certiNo||'',
                            "agentName":keywords.agentName||'',
                            "certiNoList":keywords.certiNoList||'',
                            "riskCode":keywords.riskCode||'',
                            "currenCY1":keywords.currenCY1||'',
                            "makeCom":keywords.makeCom||'',
                            "handler1Name":keywords.handler1Name||'',
                            "appliName":keywords.appliName||'',
                            "insuredName":keywords.insuredName||'',
                            "inputDate":keywords.inputDate||'',
                            "globalUserCode":keywords.globalUserCode||'',
                            "powerSystemCode":keywords.powerSystemCode||'',
                            "webUserCode":keywords.webUserCode||'',
                            "webComCode":keywords.webComCode||'',
                            "webCenterCode":keywords.webCenterCode||'',
                            "webTaskCode":keywords.webTaskCode||'',
                            "pageNo":pagination.pageNo,
                            "pageSize":pagination.pageSize||''
                        };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHCOLLECTIONREGADD, _data);
                    config.httpPackage.url =  ApiPath.api.searchColRegAddDto;
                    $http(config.httpPackage)
                            .success(function (data) {
                                data = $$adapter.imports(constants.TARGET.SEARCHCOLLECTIONREGADD, data);
                                if (options && options.success && typeof(options.success) == 'function')
                                    options.success(data);
                            })
                            .error(function (e, code) {
                                if (options && options.error && typeof(options.error) == 'function')
                                    options.error(e);
                            })
                    }
                if(target==constants.TARGET.NOBILLSEARCH){
                        console.log('非见费业务缴费--无单预收查询');
                        var _data={
                            "customtype":keywords.customtype||'',
                            "comcode":keywords.comcode||'',
                            "accountcode":keywords.accountcode||'',
                            "accountname":keywords.accountname||'',
                            "handlercode":keywords.handlercode||'',
                            "currency":keywords.currency||'',
                            "globalUserCode":keywords.globalUserCode||'',
                            "pageNo":pagination.pageNo||'',
                            "pageSize":pagination.pageSize||''
                        };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.NOBILLSEARCH, _data);
                    config.httpPackage.url =  ApiPath.api.searchNoBillDto;
                    $http(config.httpPackage)
                            .success(function (data) {
                                data = $$adapter.imports(constants.TARGET.NOBILLSEARCH, data);
                                if (options && options.success && typeof(options.success) == 'function')
                                    options.success(data);
                            })
                            .error(function (e, code) {
                                if (options && options.error && typeof(options.error) == 'function')
                                    options.error(e);
                            })
                    }
                }
        }

    }
    moduleApp.factory('$$nonFeesCollection',['$http','$$adapter','ApiPath',nonFeesCollectionHandler]);

});
