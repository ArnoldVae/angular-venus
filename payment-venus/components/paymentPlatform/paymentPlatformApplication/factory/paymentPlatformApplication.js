/**
 * 赔款送支付平台核心逻辑
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function paymentPlatformApplicationHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var sendPaymentPlatformDto=function(_data, options){
            console.log('送支付平台');
            config.httpPackage.data = $$adapter.exports('sendPaymentPlatformDto', _data);
            config.httpPackage.url =  ApiPath.api.sendPaymentPlatformData;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('sendPaymentPlatformDto', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentPlatformApplication = function () {
            //分页信息
            this.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '5',//最大页数
                numPages: '',//共有多少页
                previousText: '上一页',
                nextText: '下一页',
                firstText: '首页',
                lastText: '末页'
            };
            this.reparationsCondition = {};
            this.status = {
                "reparationsCheckedAll":false,
                "moreFlag":false,
                "radio":""
            };
            this.reparationsList = [];
        };
        return {
            sendPaymentPlatformDto:function(_data,options) {
                return sendPaymentPlatformDto(_data, options)
            },
            paymentPlatformApplication:function () {
              return new paymentPlatformApplication()
            },
            find: function (target, keywords, options, pagination) {
                if(target==constants.TARGET.SEARCHREPARATIONS){
                    console.log('送支付平台查询');
                    var _data={
                        "compensateNo":keywords.compensateNo||'',
                        "policyNo":keywords.policyNo||'',
                        "compensateNoList":keywords.compensateNoList||'',
                        "riskCode":keywords.riskCode||'',
                        "currency1":keywords.currency1||'',
                        "comCode":keywords.comCode||'',
                        "handler1Code":keywords.handler1Code||'',
                        "appliName":keywords.appliName||'',
                        "insuredName":keywords.insuredName||'',
                        "signFlag":keywords.signFlag||'',
                        "certiType":keywords.certiType||'',
                        "certiID":keywords.certiID||'',
                        "globalUserCode":keywords.globalUserCode||'',
                        "powerSystemCode":keywords.powerSystemCode||'',
                        "taskCode":keywords.taskCode||'',
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||''
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHREPARATIONS, _data);
                    config.httpPackage.url =  ApiPath.api.searchReparationsDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHREPARATIONS, data);
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
    moduleApp.factory('$$paymentPlatformApplication',['$http','$$adapter','ApiPath',paymentPlatformApplicationHandler]);
});