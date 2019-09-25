/**
 * Created by Administrator on 2017-10-24.
 *再保代扣代缴-代扣代缴实付信息api
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function WithholdingPaidInformationHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var queryInfo = function(_data, options, keywords){
            config.httpPackage.data = $$adapter.exports('keywords', _data);
            config.httpPackage.url =  ApiPath.api.queryInfo;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //导出
        var exportDataToExcel = function(keywords,options,pagination ){
            var _data={
                "withHoldNoStart":keywords.withHoldNoStart||'',
                "withHoldNoEnd":keywords.withHoldNoEnd||'',
                "withHoldNoList":keywords.withHoldNoList||'',
                "settleNoStart":keywords.settleNoStart||'',
                "settleNoEnd":keywords.settleNoEnd||'',
                "settleNoList":keywords.settleNoList||'',
                "freinsName":keywords.freinsName||'',
                "freinsNameSign":keywords.freinsNameSign||'',
                "currency":keywords.currency||'',
                "settleStartDate":keywords.settleStartDate||'',
                "settleEndDate":keywords.settleEndDate||'',
                "operateStartDate":keywords.operateStartDate||'',
                "operateEndDate":keywords.operateEndDate||'',
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',
                "withHoldStartDate":keywords.withHoldStartDate||'',//
                "withHoldEndDate":keywords.withHoldEndDate||'',//
                "withHoldStatus1":'1',//后端规定写死传1
                "withHoldEnd":keywords.withHoldEnd||'',
                "withHoldStart":keywords.withHoldStart||'',
                "taskCode":'payment.withholding.paymentinfo',
                "userDto":keywords.userDto||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('keywords', _data);
            config.httpPackage.url =  ApiPath.api.exportDataToExcel;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('exportDataToExcel', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var Vouchers = function(_data, options, keywords){
            config.httpPackage.data = $$adapter.exports('keywords', _data);
            config.httpPackage.url =  ApiPath.api.showReinsWithHoidingTaxQueryDetail;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('showReinsWithHoidingTaxQueryDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var voucherReview = function(_data, options, keywords){
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
        var voucherCancel = function(_data, options, keywords){
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
        var Settlements = function(_data, options, keywords){
            config.httpPackage.data = $$adapter.exports('keywords', _data);
            config.httpPackage.url =  ApiPath.api.showSettleDetail;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('showSettleDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var exportModel=function(_data, options){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.EXPORTMODEL, _data);
            config.httpPackage.url = ApiPath.api.exportModel;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.EXPORTMODEL, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var printOne = function(_data, options){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.PRINTONE, _data);
            config.httpPackage.url = ApiPath.api.printOne;
            $http(config.httpPackage)

                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.PRINTONE, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            queryInfo:function(_data,options,keywords) {
                return queryInfo(_data, options,keywords)
            },
            exportDataToExcel:function(_data,options,keywords) {
                return exportDataToExcel(_data, options,keywords)
            },
            Vouchers:function(_data,options,keywords) {
                return Vouchers(_data, options,keywords)
            },
            voucherReview:function(_data,options,keywords) {
                return voucherReview(_data, options,keywords)
            },
            voucherCancel:function(_data,options,keywords) {
                return voucherCancel(_data, options,keywords)
            },
            Settlements:function(_data,options,keywords) {
                return Settlements(_data, options,keywords)
            },
            exportModel:function(_data,options,keywords) {
                return exportModel(_data, options,keywords)
            },
            printOne:function(keywords,options){
                return printOne(keywords,options);
            },
            find: function (target, keywords, options, pagination) {
                var _data={
                    "withHoldNoStart":keywords.withHoldNoStart||'',
                    "withHoldNoEnd":keywords.withHoldNoEnd||'',
                    "withHoldNoList":keywords.withHoldNoList||'',
                    "settleNoStart":keywords.settleNoStart||'',
                    "settleNoEnd":keywords.settleNoEnd||'',
                    "settleNoList":keywords.settleNoList||'',
                    "freinsName":keywords.freinsName||'',
                    "freinsNameSign":keywords.freinsNameSign || '',
                    "currency":keywords.currency||'',
                    "settleStartDate":keywords.settleStartDate||'',
                    "settleEndDate":keywords.settleEndDate||'',
                    "operateStartDate":keywords.operateStartDate||'',
                    "operateEndDate":keywords.operateEndDate||'',
                    "withHoldStartDate":keywords.withHoldStartDate||'',//
                    "withHoldEndDate":keywords.withHoldEndDate||'',//
                    "globalUserCode":keywords.globalUserCode||'',
                    "powerSystemCode":keywords.powerSystemCode||'',
                    "withHoldStatus1":keywords.withHoldStatus1||'',
                    "withHoldEnd":keywords.withHoldEnd||'',
                    "withHoldStart":keywords.withHoldStart||'',
                    "taskCode":keywords.taskCode||'',
                    "userDto":keywords.userDto,//登入用户信息
                    "pageNo":pagination.pageNo||'',
                    "pageSize":pagination.pageSize||''
                };
                config.httpPackage.data = $$adapter.exports(constants.TARGET.QUERYINFO, _data);
                config.httpPackage.url =  ApiPath.api.queryInfo;
                $http(config.httpPackage)
                    .success(function (data) {
                        data = $$adapter.imports(constants.TARGET.QUERYINFO, data);
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
    moduleApp.factory('$$WithholdingPaidInformation',['$http','$$adapter','ApiPath',WithholdingPaidInformationHandler]);
});
