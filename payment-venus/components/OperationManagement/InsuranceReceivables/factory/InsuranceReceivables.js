/**
 * Created by Administrator on 2017-10-24.
 *运维管理-挂帐管理-应收保费挂帐api
 */
define(['../module','config','constants'], function (moduleApp, config, constants) {
    'use strict';
    function InsuranceReceivablesHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        /**
         * 应收保费查询
         * @param keywords
         * @param options
         */
        var queryGZ=function (keywords,options) {
            console.log('应收保费查询');
            var _data={
                "yearMonth":keywords.yearMonth||'',//日期
                "businessType":keywords.businessType||'',//挂账类型
                "userCode":keywords.userCode||'',//用户代码
                "centerCode":keywords.centerCode||''//机构代码
            };
            config.httpPackage.data =_data;
            config.httpPackage.url =  ApiPath.api.transaccount;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('transaccount', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
            
        };
        /**
         * 应收保费查询详情
         * @param _data
         * @param options
         */
        var queryGZDetail=function (_data,options) {
            console.log('应收保费查询')
            config.httpPackage.data =_data;
            config.httpPackage.url =  ApiPath.api.queryCheckCondition;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryCheckCondition', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            transaccount:function (keywords,options,pagination) {
              return queryGZ(keywords,options,pagination)
            },
            queryGZDetail:function (keywords,options,pagination) {
                return queryGZDetail(keywords,options,pagination)
            }
        }
    }
    moduleApp.factory('$$InsuranceReceivables',['$http','$$adapter','ApiPath',InsuranceReceivablesHandler]);
});
