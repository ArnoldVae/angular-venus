/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function invoiceRegisterHandler($http,$$adapter,ApiPath) {
        var invoiceRegister=function(){
            //储存查到的数据
            this.invoiceRegisterList=[];
            //普通、高级状态
            this.moreFlag=false;
            this.query={
                    "invoiceCode":"",//发票代码
                    "visaSerialNo":"",//发票号码
                    "certiNo1":"",//从
                    "certiNo2":"",//到
                    "certiNoList":"",//保/批单号列表
                    "chargeType":"ALL",//费用类型
                    "invoiceRegistStartDate":"",//发票登记起期
                    "invoiceRegistEndDate":""//发票登记止期
            };
            this.info={
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
            this.data={
                prpJInputInvoiceRegistMainDto:{},
                prpjVatInputInvoiceDtoList:[],
                printType:"1"
            };
            this.modalQuery={
                "coinsName":'',
                "chargeType":'ALL',
                "certiNoList":'',
                "certiNo1":'',
                "certiNo2":'',
                "printType":'1',        //区别进项登记还是部分转出
                "containsHisData":'2'
            };
            //总复选框
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
         * 查询
         */
        var invoiceQuery=function(keywords,options){
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
                url: ApiPath.api.invoiceRegisterQuery,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.INVOICEREGISTERQUERY, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 导出EXCEL
         */
        var downExcel = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.DOWNEXCEL, _data);
            config.httpPackage.url =  ApiPath.api.downExcel;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.DOWNEXCEL, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        /**
         * modal确定
         */
        var confirm = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.CONFIRM, _data);
            config.httpPackage.url =  ApiPath.api.confirm;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.CONFIRM, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //modal2查询
        var search = function (_data,options) {
            config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCH, _data);
            config.httpPackage.url =  ApiPath.api.search;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.SEARCH, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };

        return {
            invoiceRegister:function(){
                return new invoiceRegister();
            },
            invoiceQuery:function(keywords,options){
                return invoiceQuery(keywords,options);
            },
            confirm:function (_data,options) {
                return confirm(_data,options);
            },
            downExcel:function(_data,options) {
                return downExcel(_data,options);
            },
            search:function (_data,option) {
                return search(_data,option);
            }
        }
    }
    moduleApp.factory('$$invoiceRegister',['$http','$$adapter','ApiPath',invoiceRegisterHandler]);

});
