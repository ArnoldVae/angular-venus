/**
 * 税率维护模块
 */
define(['../module','config', 'constants'], function (moduleApp,config,constants,ApiPath) {
    'use strict';
    function paymentMaintainHandler($http,$$adapter,ApiPath) {
        console.log('税率维护模块api...');
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var preservationTaxRateData=function(_data, options){
            console.log('税率维护保存');
            config.httpPackage.data = $$adapter.exports('preservationTaxRateData', _data);
            config.httpPackage.url =  ApiPath.api.preservationTaxRateDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('preservationTaxRateData', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var paymentMaintain = function () {
          this.taxRateCondition = {};
          this.taxRateDto = {
              "comCode":""
          }
        };
        return {
            preservationTaxRateData:function(_data,options,keywords) {
                return preservationTaxRateData(_data, options,keywords)
            },
            paymentMaintain:function(_data,options,keywords) {
                return new paymentMaintain();
            },
            find: function (target, keywords, options) {
                if (target == constants.TARGET.SEARCHTAXRATE) {
                    console.log('税率维护查询');
                    var _data = {
                        "comCode": keywords.comCode || '',
                        "webUserCode":keywords.webUserCode||'',//当前登录人代码
                        "webComCode":keywords.webComCode||'',//当前登录机构代码
                        "webCenterCode":keywords.webCenterCode||'',//当前核算单位代码
                        "webTaskCode":'payment.paymanager.commission.taxrate'//当前操作菜单代码
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHTAXRATE, _data);
                    config.httpPackage.url =  ApiPath.api.searchTaxRateDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHTAXRATE, data);
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
    moduleApp.factory('$$paymentMaintain',['$http','$$adapter','ApiPath',paymentMaintainHandler]);
});