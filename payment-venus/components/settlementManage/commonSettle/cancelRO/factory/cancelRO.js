/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function cancelROHandler($http,$$adapter, ApiPath) {
        var Cancel=function(){
            //储存查询出的数据
            this.cancelROList=[];
            //普通、高级状态
            this.moreFlag=false;
            this.cancelQuery={
                    "invoiceCode":"",//发票代码
                    "visaSerialNo":"",//发票号码
                    "certiNo1":"",//从
                    "certiNo2":"",//到
                    "certiNoList":"",//保/批单号列表
                    "chargeType":"ALL",//费用类型
                    "invoiceRegistStartDate":"",//发票登记起期
                    "invoiceRegistEndDate":""//发票登记止期
            };
            //全部勾选状态
            this.status={
                "checkAll":false,
                "selectNum":0//勾选条数
            };
            this.select={
                "prpjInputInvoiceRegistMainDtoList":[]
            }
        };
        /**
         * 查询
         */
        var cancelROQuery=function(keywords,options,pagination){
            var _data={
                "invoiceCode":keywords.invoiceCode||'',//发票代码
                "visaSerialNo":keywords.visaSerialNo||'',//发票号码
                "certiNo1":keywords.certiNo1||'',//从
                "certiNo2":keywords.certiNo2||'',//到
                "certiNoList":keywords.certiNoList || '',//保/批单号列表
                "chargeType":keywords.chargeType||'',//费用类型
                "invoiceRegistStartDate":keywords.invoiceRegistStartDate||'',//发票登记起期
                "webCenterCode":keywords.webCenterCode,
                "webComCode":keywords.webComCode,
                "webTaskCode":keywords.webTaskCode,
                "webUserCode":keywords.webUserCode,
                "invoiceRegistEndDate":keywords.invoiceRegistEndDate||''//发票登记止期
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.cancelROQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.CANCELROQUERY, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };

        /**
         *转出
         */
        var cancelOut = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.CANCELOUT, _data);
            config.httpPackage.url =  ApiPath.api.cancelOut;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.CANCELOUT, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };

        return {
            Cancel:function(){
                return new Cancel()
            },
            cancelROQuery:function(keywords,options){
                return cancelROQuery(keywords,options);
            },
            cancelOut:function (_data,options) {
                return cancelOut(_data,options);
            }
        }
    }
    moduleApp.factory('$$cancelRO',['$http','$$adapter','ApiPath',cancelROHandler]);

});
