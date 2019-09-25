/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function invoiceOutHandler($http,$$adapter, ApiPath) {
        var invoiceOut=function(){
            //储存查出来的数据
            this.invoiceOutList={};
            //储存modal传出的数据
            this.invoiceOutSomeList=[];
            //tab
            this.change='B';
            this.tapHeader=[
                {
                    'title': '全部转出',
                    'index': '1',
                    'active': true,
                    "btnStyle":{"border-radius":"50%"}
                },{
                    'title': '部分转出',
                    'index': '2',
                    'active': false,
                    "btnStyle":{"border-radius":"50%"}
                }
            ];
            //全部实例化
            this.invoiceOutQuery={
                    "visaSerialNo":"",
                    "invoiceCode":""
            };
            //部分实例化
            this.invoiceOutSome={
                "invoiceCode":"",
                "visaSerialNo":"",
                "printDate":"",
                "ntVisaFee":"",
                "vATaxFee":"",
                "vATaxRate":"0.06",
                "visaFee":"",
                "salePayerNo":"",
                "taxPayerNo":"",
                "queryBatchNo":"",
                "inputProject":"金融保险服务的进项-6%"
            };
            //部分modal
            this.someAdd={
                "coinsName":'',
                "chargeType":'ALL',
                "certiNoList":'',
                "certiNo1":'',
                "certiNo2":'',
                "printType":'2',   //区分进项和部分查询
                "containsHisData":'2'
            };
            //部分确认
            this.data={
                prpJInputInvoiceRegistMainDto:{},
                prpjVatInputInvoiceDtoList:[],
                printType:'2'
            };
            //全部勾选状态
            this.cck={
                "checkAll":false,
                "disabled":false
            };
            // 状态
            this.status={
                "coinsCode":"",//不同比别flag
                "disabled":true//复选框disabled flag
            };
        };
        /**
         * 全部--查询
         */
        var invoiceOutQuery=function(keywords,options,pagination){
            var _data={
                "visaSerialNo":keywords.visaSerialNo||'',
                "webCenterCode":keywords.webCenterCode,
                "webComCode":keywords.webComCode,
                "webTaskCode":keywords.webTaskCode,
                "webUserCode":keywords.webUserCode,
                "invoiceCode":keywords.invoiceCode||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.invoiceOutQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.INVOICEOUTQUERY, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         *全部--确认
         */
        var invoiceOutConfirm = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.INVOICEOUTCONFIRM, _data);
            config.httpPackage.url =  ApiPath.api.invoiceOutConfirm;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.INVOICEOUTCONFIRM, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        /**
         *部分--确认
         */
        var invoiceOutSomeConfirm = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.INVOICEOUTSOMECONFIRM, _data);
            config.httpPackage.url =  ApiPath.api.invoiceOutSomeConfirm;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.INVOICEOUTSOMECONFIRM, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        /**
         *部分--modal查询
         */
        var invoiceOutsearch = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.INVOICEOUTSEARCH, _data);
            config.httpPackage.url =  ApiPath.api.invoiceOutsearch;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.INVOICEOUTSEARCH, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        return {
            invoiceOut:function(){
                return new invoiceOut()
            },
            invoiceOutQuery:function(keywords,options){
                return invoiceOutQuery(keywords,options);
            },
            invoiceOutConfirm:function (data,options) {
                return invoiceOutConfirm(data,options);
            },
            invoiceOutSomeConfirm:function (data,options) {
                return invoiceOutSomeConfirm(data,options);
            },
            invoiceOutsearch:function (data,options) {
                return invoiceOutsearch(data,options);
            }
        }
    }
    moduleApp.factory('$$invoiceOut',['$http','$$adapter','ApiPath',invoiceOutHandler]);

});
