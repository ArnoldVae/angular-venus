/**
 * Created by Full Creators on 2017/11/13 0013.
 */
/**
 * 运维管理
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function dataConfigHandler($http,$$adapter,ApiPath) {
        var dataConfig=function(){
            this.info={
                "routingType":"",
                "routingCondition":"",
                "routingVal":"",
                "routingLevel":"",
                "valid":""
            };
            this.noChage=[];//储存修改数据
            this.editId='';//是否可编辑
            this.moreFlag=false;
            this.dataConfigList=[];//保存查询出来的数据
        };
        /**
         * 查询
         */
        var dataConfigSearch = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.DATACONFIGSEARCH, _data);
            config.httpPackage.url =  ApiPath.api.dataConfigSearch;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.DATACONFIGSEARCH, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        /**
         * 删除
         */
        var dataConfigRemove = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.DATACONFIGREMOVE, _data);
            config.httpPackage.url =  ApiPath.api.dataConfigRemove;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.DATACONFIGREMOVE, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        /**
         * 修改保存
         */
        var dataConfigModify = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.DATACONFIGMODIFY, _data);
            config.httpPackage.url =  ApiPath.api.dataConfigModify;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.DATACONFIGMODIFY, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        /**
         * 保存
         */
        var dataConfigSave = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.DATACONFIGSAVE, _data);
            config.httpPackage.url =  ApiPath.api.dataConfigSave;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.DATACONFIGSAVE, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        return {
            dataConfig:function () {
                return new dataConfig();
            },
            dataConfigSearch:function (_data,options) {
                return dataConfigSearch(_data,options);
            },
            dataConfigRemove:function (_data,options) {
                return dataConfigRemove(_data,options);
            },
            dataConfigModify:function (_data,options) {
                return dataConfigModify(_data,options);
            },
            dataConfigSave:function (_data,options) {
                return dataConfigSave(_data,options);
            }

        }

    }
    moduleApp.factory('$$dataConfig',['$http','$$adapter','ApiPath',dataConfigHandler]);

});
