/**
 * Created by Administrator on 2017-10-24.
 * 再保代扣代缴-代扣代缴报表api
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function WithholdingStatementHandler($http,$$adapter,ApiPath,$scope) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        //代扣代缴报表查询
        var queryStatements=function(keywords,options,pagination){
            var _data={
                "withHoldNoStart":keywords.withHoldNoStart||'',//代扣代缴单号 从
                "withHoldNoEnd":keywords.withHoldNoEnd||'',//代扣代缴单号 到
                "withHoldNoList":keywords.withHoldNoList||'',//代扣代缴单号列表
                "settleNoStart":keywords.settleNoStart||'',//结算单号 从
                "settleNoEnd":keywords.settleNoEnd||'',//结算单号 到
                "settleNoList":keywords.settleNoList||'',//结算单号列表
                "currency":keywords.currency||'',//结算单币种
                "freinsName":keywords.freinsName||'',//代扣代缴对象名称
                "freinsNameSign":keywords.freinsNameSign||'',//代扣代缴关系符
                "settleStartDate":keywords.settleStartDate||'',//结算单生成起期
                "settleEndDate":keywords.settleEndDate,//结算单生成止期
                "operateStartDate":keywords.operateStartDate||'',//报表生成日期起期
                "operateEndDate":keywords.operateEndDate||'',//报表生成日期止期
                "withHoldStatus":keywords.withHoldStatus||'',//报表生成状态
                "globalUserCode":keywords.globalUserCode||'',//用户编码（即当前登录账户）
                "powerSystemCode":keywords.powerSystemCode||'',//系统代码
                "taskCode":keywords.taskCode||'',//系统代码
                "userDto":keywords.userDto,//登入信息对象
                "pageNo": pagination.pageIndex||'',//页码
                "pageSize": pagination.pageSize||''//每页条数
            };
            console.log(_data);
            config.httpPackage.data = $$adapter.exports(constants.TARGET.QUERYWITHHOLDINGSTATEMENTS, _data);
            config.httpPackage.url = ApiPath.api.queryWithHoldingStatements;
            $http(config.httpPackage)

                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.QUERYWITHHOLDINGSTATEMENTS, data);
                    if (data && options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        //生成报表
        var geneReports=function(_data,options){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.GENEREPORTS, _data);
            config.httpPackage.url = ApiPath.api.geneReports;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.GENEREPORTS, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //作废报表
        var invalidStatement=function(_data, options){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.INVALIDSTATEMENT, _data);
            config.httpPackage.url = ApiPath.api.invalidStatement;
            $http(config.httpPackage)

                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.INVALIDSTATEMENT, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //导出报表
        var exportModel=function(_data, options){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.EXPORTMODEL, _data);
            config.httpPackage.url = ApiPath.api.exportModel;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.EXPORTMODEL, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //打印
        var printOne =function(_data, options){
            config.httpPackage.data = $$adapter.exports(constants.TARGET.PRINTONE, _data);
            config.httpPackage.url = ApiPath.api.printOne;
            $http(config.httpPackage)

                .success(function (data) {
                    data = $$adapter.imports(constants.TARGET.PRINTONE, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            queryStatements:function(keywords,options,pagination){
                return queryStatements(keywords,options,pagination);
            },
            invalidStatement:function(_data, options, keywords){
                return invalidStatement(_data, options, keywords);
            },
            geneReports:function(keywords,options){
                return geneReports(keywords,options);

            },
            exportModel:function(keywords,options){
                return exportModel(keywords,options);

            },
            printOne:function(keywords,options){
                return printOne(keywords,options);

            }
        }
    }
    moduleApp.factory('$$WithholdingStatement',['$http','$$adapter','ApiPath',WithholdingStatementHandler]);

});
