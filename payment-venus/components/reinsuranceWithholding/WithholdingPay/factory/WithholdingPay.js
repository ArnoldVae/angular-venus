/**
 * Created by Administrator on 2017-10-24.
 * 再保代扣代缴-代扣代缴实付api
 */
define(['../module','config', 'constants'], function (moduleApp,config,constants) {
    'use strict';
    function WithholdingPayHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var paymentVerifyQuery=function(_data, options, keywords){
            config.httpPackage.data = $$adapter.exports('paymentVerifyQuery', _data);
            config.httpPackage.url =  ApiPath.api.paymentVerifyQuery;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('paymentVerifyQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentVerifyResultQuery=function(_data, options, keywords){
            config.httpPackage.data = $$adapter.exports('paymentVerifyResultQuery', _data);
            config.httpPackage.url =  ApiPath.api.paymentVerifyResultQuery;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('paymentVerifyResultQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var voucherReview=function(_data, options, keywords){
            config.httpPackage.data = $$adapter.exports('voucherReview', _data);
            config.httpPackage.url =  ApiPath.api.voucherReview;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('voucherReview', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //凭证取消
        var voucherCancel=function(_data, options, keywords){
            config.httpPackage.data = $$adapter.exports('voucherCancel', _data);
            config.httpPackage.url =  ApiPath.api.voucherCancel;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('voucherCancel', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            paymentVerifyQuery:function(_data,options,keywords) {
                return paymentVerifyQuery(_data, options,keywords)
            },
            paymentVerifyResultQuery:function(_data,options,keywords) {
                return paymentVerifyResultQuery(_data, options,keywords)
            },
            voucherReview:function(_data,options,keywords) {
                return voucherReview(_data, options,keywords)
            },
            voucherCancel:function(_data,options,keywords) {
                return voucherCancel(_data, options,keywords)
            },
            find: function (target, keywords, options, pagination) {
                var _data={
                    "withHoldStatus1":"0",
                    "withHoldNoStart":keywords.withHoldNoStart||'',
                    "withHoldNoEnd":keywords.withHoldNoEnd||'',
                    "withHoldNoList":keywords.withHoldNoList||'',
                    "settleNoStart":keywords.settleNoStart||'',
                    "settleNoEnd":keywords.settleNoEnd||'',
                    "settleNoList":keywords.settleNoList||'',
                    "freinsName":keywords.freinsName||'',
                    "freinsNameSign":keywords.freinsNameSign||'',
                    "settleStartDate":keywords.settleStartDate||'',
                    "settleEndDate":keywords.settleEndDate||'',
                    "operateStartDate":keywords.operateStartDate||'',
                    "operateEndDate":keywords.operateEndDate||'',
                    "globalUserCode":keywords.globalUserCode||'',
                    "powerSystemCode":keywords.powerSystemCode||'',
                    "taskCode":keywords.taskCode||'',
                    "userDto":keywords.userDto,
                    "pageNo":pagination.pageNo||'',
                    "pageSize":pagination.pageSize||''
                };
                config.httpPackage.data = $$adapter.exports(constants.TARGET.QUERYBYCONDITIONS, _data);
                config.httpPackage.url =  ApiPath.api.queryByConditions;
                $http(config.httpPackage)
                    .success(function (data) {
                        data = $$adapter.imports(constants.TARGET.QUERYBYCONDITIONS, data);
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
    moduleApp.factory('$$WithholdingPay',['$http','$$adapter','ApiPath',WithholdingPayHandler]);

});