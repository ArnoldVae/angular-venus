/**
 * 仲裁管理核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function arbitrationManageHandler($http,$$adapter,ApiPath) {
        console.log('仲裁管理模块api...');
        var searchArbitrationManage=function(keywords, options, pagination){
            console.log('仲裁管理查询');
            var _data={
                "appliName": keywords.appliName||'',
                "insuredName": keywords.insuredName||'',
                "packCode": keywords.packCode||'',
                "packDate": keywords.packDate||'',
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports('searchArbitrationManage', _data);
            config.httpPackage.url =  ApiPath.api.searchArbitrationManageDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchArbitrationManage', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var confirmArbitrationManage=function(_data, options){
            console.log('仲裁确认');
            config.httpPackage.data = $$adapter.exports('confirmArbitrationManage', _data);
            config.httpPackage.url =  ApiPath.api.confirmArbitrationDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('confirmArbitrationManage', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var returnArbitration=function(_data, options){
            console.log('仲裁退回');
            config.httpPackage.data = $$adapter.exports('returnArbitration', _data);
            config.httpPackage.url =  ApiPath.api.returnArbitrationDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('returnArbitration', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchArbitrationReturn=function(_data, options){
            console.log('仲裁撤销查询');
            config.httpPackage.data = $$adapter.exports('searchArbitrationReturn', _data);
            config.httpPackage.url =  ApiPath.api.searchArbitrationReturnDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('searchArbitrationReturn', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var arbitrationReturnResult=function(_data, options){
            console.log('撤销仲裁结果');
            config.httpPackage.data = $$adapter.exports('arbitrationReturnResult', _data);
            config.httpPackage.url =  ApiPath.api.arbitrationReturnResultDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('arbitrationReturnResult', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            searchArbitrationManage:function(keywords,options,pagination) {
                return searchArbitrationManage(keywords, options,pagination)
            },
            confirmArbitrationManage:function(_data,options,keywords) {
                return confirmArbitrationManage(_data, options,keywords)
            },
            returnArbitration:function(_data,options,keywords) {
                return returnArbitration(_data, options,keywords)
            },
            searchArbitrationReturn:function(_data,options,keywords) {
                return searchArbitrationReturn(_data, options,keywords)
            },
            arbitrationReturnResult:function(_data,options,keywords) {
                return arbitrationReturnResult(_data, options,keywords)
            }
        }
    }
    moduleApp.factory('$$arbitrationManage',['$http','$$adapter','ApiPath',arbitrationManageHandler]);

});
