/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function theDifferential($http,$$adapter, ApiPath) {
        /**
         *纳税人信息保存
         */
        var theDifferentialSubmit=function(keywords,options){
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url:  ApiPath.api.theDifferentialBlueInvoiceSubmit,
                headers: {},
                data: keywords
            })
                .success(function (data) {
                    data = $$adapter.imports('theDifferentialBlueInvoiceSubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         *
         */
        var theDifferentialObject=function () {
            this.basic={
                "date":"",
                "centerCode":""
            };
        };
        return{
            theDifferentialSubmit:function(keywords,options){
                return theDifferentialSubmit(keywords,options);
            },
            theDifferentialObject:function(){
                return new theDifferentialObject().basic;
            }
        }
    }
    moduleApp.factory('$$theDifferential',['$http','$$adapter','ApiPath',theDifferential]);

});