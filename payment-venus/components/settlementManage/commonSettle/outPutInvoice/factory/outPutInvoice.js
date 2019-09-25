/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function outPutInvoice($http,$$adapter, ApiPath) {
        /**
         *纳税人信息保存
         */
        var outPutInvoiceSubmit=function(keywords,options){
            var result={"invoiceInfoXDtoList":[keywords]};//纳税人信息集合
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url:  ApiPath.api.outPutBuleInvoiceSubmit,
                headers: {},
                data: result
            })
                .success(function (data) {
                    data = $$adapter.imports('outPutBuleInvoiceSubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 对象实例化
         */
        var outPutInvoiceObject=function () {
            this.basic={
                "batchNo":"",
                "operateDate":"",
                "invoiceCode":"",
                "visaSerialNo":"",
                "printerCode":"",
                "printerName":"",
                "invoiceType":"",
                "visaPrintStatus":"11"
            };
        };
        return{
            outPutInvoiceSubmit:function(keywords,options){
                return outPutInvoiceSubmit(keywords,options);
            },
            outPutInvoiceObject:function(){
                return new outPutInvoiceObject().basic;
            }
        }
    }
    moduleApp.factory('$$outPutInvoice',['$http','$$adapter','ApiPath',outPutInvoice]);

});