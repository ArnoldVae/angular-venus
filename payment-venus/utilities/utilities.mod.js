/**
 * Created by martin on 2017/4/14.
 * api模块总入口
 */
define([
    'angular',
    'config',
    'constants',
    'utilities/constant/ApiPathConstant',
    'utilities/factory/venus',
    'utilities/factory/adapter'

], function (angular, config, constants, ApiPathConstant, venusFactoryHandler, adapterFactoryHandler) {
    console.log("load utilities module");

    angular.module('utilities', [])

        .factory('$$venus',["$rootScope", '$q', '$$adapter', '$http', 'ApiPath',venusFactoryHandler])
        .factory('$$adapter',["$rootScope",adapterFactoryHandler])
        .constant('constants',constants)
        .constant('ApiPath',ApiPathConstant)

});


