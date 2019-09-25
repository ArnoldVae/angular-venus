/**
 * 头部信息
 */
define(['angular','config','constants'], function (angular,config) {
    'use strict';
    function headerHandler($http,$$adapter,ApiPath) {
        var queryCenterCode=function(_data, options){
            console.log('头部下拉核算单位查询');
            config.httpPackageGet.data = $$adapter.exports('queryCenterCode', _data);
            config.httpPackageGet.url =  ApiPath.api.queryCenterCodeDto;
            $http(config.httpPackageGet)
                .success(function (data) {
                    data = $$adapter.imports('queryCenterCode', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            queryCenterCode: function (_data, options) {
                return queryCenterCode(_data, options);
            }
        }

    }
    angular.module('venus.centerCode', [])
        .factory('$$header',['$http','$$adapter','ApiPath',headerHandler]);

});
