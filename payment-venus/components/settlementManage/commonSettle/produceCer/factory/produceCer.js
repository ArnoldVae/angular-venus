/**
 * Created by Full Creators on 2017/11/13 0013.
 */
/**
 * 联共保Api
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function produceCerHandler($http,$$adapter,ApiPath) {
        var produceCer=function(){
            this.go={
                "date":""//发票登记止期
            };
        };
        /**
         * 确定
         */
        var produce = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.PRODUCE, _data);
            config.httpPackage.url =  ApiPath.api.produce;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.PRODUCE, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        return {
            produceCer:function () {
                return new produceCer();
            },
            produce:function (_data,options) {
                return produce(_data,options);
            }
        }

    }
    moduleApp.factory('$$produceCer',['$http','$$adapter','ApiPath',produceCerHandler]);

});
