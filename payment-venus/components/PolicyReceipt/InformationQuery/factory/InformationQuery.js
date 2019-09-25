/**
 * Created on 2017-11-19.
 *保单收付信息查询api
 */
define(['../module','config','constants'], function (moduleApp, config, constants) {
    'use strict';
    function InformationQueryHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var informationQueryNew=function(){
            this.info={
                "carId":"",
                "identifyNumber":"",
                "agentName":"",
                "certiNo":"",
                "certiNoList":"",
                "riskCode":"",
                "currency1":"",
                "comCode":"",
                "agentCode":"",
                "businessNature":"",
                "appliName":"",
                "insuredName":"",
                "contractNo":"",
                "startDate":"",
                "policyType":"",
                "userDto":{"userCode":'',"userName":'',"comCode":''},
                "handler1Name":"",
                "taskCode":'payment.integrated.policypayment'
            };
            this.PolicyReceiptList=[];//查询的数据
            this.status={
                "moreFlag":false//展开高级查询flag
            };
            //分页
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
        //保单收付信息查询
        var InformationQuery = function(keywords, options, pagination){
            var _data={
                "carId":keywords.carId||'',
                "identifyNumber":keywords.identifyNumber||'',
                "agentName":keywords.agentName||'',
                "certiNo":keywords.certiNo||'',
                "certiNoList":keywords.certiNoList||'',
                "riskCode":keywords.riskCode||'',
                "currency1":keywords.currency1||'',
                "comCode":keywords.comCode||'',
                "agentCode":keywords.agentCode||'',
                "businessNature":keywords.businessNature||'',
                "appliName":keywords.appliName||'',
                "insuredName":keywords.insuredName||'',
                "contractNo":keywords.contractNo||'',
                "startDate":keywords.startDate||'',
                "policyType":keywords.policyType||'',
                "taskCode":keywords.taskCode||'',
                "userDto":keywords.userDto||{},
                "handler1Name":keywords.handler1Name||'',
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
        //保单收付信息详情
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
        //凭证信息
        var payLossInfo=function(keywords,options,pagination){
            var _data={
                "voucherNo":keywords,
                "pageNo":pagination.pageNo,
                "pageSize":pagination.pageSize
            };
            config.httpPackage.data= $$adapter.exports(constants.TARGET.QUERYCHECKCONDITION, _data);
            config.httpPackage.url= ApiPath.api.queryCheckCondition;//（客户化查询、保单收付信息查询公共接口）
            console.log(config.httpPackage.data);
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
            informationQueryNew:function () {
                return new informationQueryNew();
            },
            InformationQuery: function (_data, options, keywords) {
                return InformationQuery(_data, options, keywords)
            },
            findDetail: function (_data, options, keywords) {
                return findDetail(_data, options, keywords)
            },
            payLossInfo:function (keywords,options,pagination) {
                return payLossInfo(keywords,options,pagination)
            }
        }
    }
    moduleApp.factory('$$InformationQuery',['$http','$$adapter','ApiPath',InformationQueryHandler]);
});
