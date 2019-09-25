/**
 * Created by Full Creators on 2017/11/13 0013.
 */
/**
 * 联共保Api
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function invoiceStatusHandler($http,$$adapter,ApiPath) {
        var invoiceStatus=function(){
            this.go={
                    "invoiceCode":"",//发票代码
                    "visaSerialNo":"",//发票号码
                    "visaStatus":"1",//抵扣状态
                    "errorText":"",//原因
                    "statusDate":""//发票登记止期
            };
            this.obj={
                invoiceInfoList:[]
            }
        };
        /**
         * 确定
         */
        var deduction = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.DEDUCTION, _data);
            config.httpPackage.url =  ApiPath.api.deduction;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.DEDUCTION, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        return {
            invoiceStatus:function () {
                return new invoiceStatus();
            },
            deduction:function (_data,options) {
                return deduction(_data,options);
            }
        }

    }
    moduleApp.factory('$$invoiceStatus',['$http','$$adapter','ApiPath',invoiceStatusHandler]);

});
