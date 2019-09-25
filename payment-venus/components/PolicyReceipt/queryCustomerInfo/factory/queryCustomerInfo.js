/**
 * Created on 2017-11-19.
 *客户化查询api
 */
define(['../module','config','constants'], function (moduleApp, config, constants) {
    'use strict';
    function queryCustomerInfoHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var queryCustomerInfoNew=function () {
            this.info={
                "customerType":"",
                "customerKind":"",
                "customerCode":"",
                "customerName":"",
                "mobile":"",
                "appliName":"",
                "carId":"",
                "userDto":{"userCode":'',"userName":'',"comCode":''},
                "taskCode":'payment.integrated.customQuery'
            };
            this.CustomerInfoList=[];//储存查询的数据
            this.status={
                "moreFlag":false//展开高级查询flag
            };
            this.pagination={
                totalItems:'',//总数
                pageIndex:'1',//当前页面
                pageSize:'15',//显示条数
                maxSize:'5',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            }
        };


        var queryCustomerInfo = function(keywords, options, pagination){
            var _data={
                "customerType":keywords.customerType||'',
                "customerKind":keywords.customerKind||'',
                "customerName":keywords.customerName||'',
                "customerCode":keywords.customerCode||'',
                "identifyNumber":keywords.identifyNumber||'',
                "userDto":keywords.userDto||'',
                "mobile":keywords.mobile||'',
                "appliName":keywords.appliName||'',
                "carId":keywords.carId||'',
                "taskCode":keywords.taskCode||'',
                "pageNo":pagination.pageNo,
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports(constants.TARGET.QUERYCUSTOMERINFO, _data);
            config.httpPackage.url =  ApiPath.api.queryCustomerInfo;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.QUERYCUSTOMERINFO, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var searchReparations=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo,
                "pageSize":pagination.pageSize||'',
                "customName":keywords.customName||'',
                "customCode":keywords.customCode||''
            };
            config.httpPackage.data= $$adapter.exports(constants.TARGET.TEMPORARY, _data);
            config.httpPackage.url= ApiPath.api.temporary;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.TEMPORARY, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var findDetail = function(_data, options, keywords){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.FINDDETAIL, _data);
            config.httpPackage.url =  ApiPath.api.findDetail;//（客户化查询、保单收付信息查询公共接口）
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.FINDDETAIL, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var PolicyInfoQuery = function(keywords, options, pagination){
            var _data={
                "appliCode":keywords.appliCode||'',
                "insuredCode":keywords.insuredCode||'',
                "agentCode":keywords.agentCode||'',
                "coinsCode":keywords.coinsCode||'',
                "userDto":keywords.userDto||'',
                "taskCode":'payment.integrated.policypayment',
                "pageNo":pagination.pageNo,
                "pageSize":pagination.pageSize||''
            };
            config.httpPackage.data = $$adapter.exports(constants.TARGET.INFORMATIONQUERY, _data);
            config.httpPackage.url =  ApiPath.api.InformationQuery;//（客户化查询、保单收付信息查询公共接口）
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.INFORMATIONQUERY, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var payLossInfo=function(keywords,options,pagination){
            var _data={
                "voucherNo":keywords,
                "pageNo":pagination.pageNo,
                "pageSize":pagination.pageSize
            };
            config.httpPackage.data= $$adapter.exports(constants.TARGET.QUERYCHECKCONDITION, _data);
            config.httpPackage.url= ApiPath.api.queryCheckCondition;//（客户化查询、保单收付信息查询公共接口）
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.QUERYCHECKCONDITION, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        return {
            queryCustomerInfoNew:function () {
                return new queryCustomerInfoNew();
            },
            queryCustomerInfo: function (_data, options, keywords) {
                return queryCustomerInfo(_data, options, keywords)
            },
            findDetail: function (_data, options, keywords) {
                return findDetail(_data, options, keywords)
            },
            PolicyInfoQuery: function (_data, options, keywords) {
                return PolicyInfoQuery(_data, options, keywords)
            },
            searchReparations: function (keywords, options, pagination) {
                return searchReparations(keywords, options, pagination)
            },
            payLossInfo:function (keywords,options,pagination) {
                return payLossInfo(keywords,options,pagination)
            }
        }
    }
    moduleApp.factory('$$queryCustomerInfo',['$http','$$adapter','ApiPath',queryCustomerInfoHandler]);
});
