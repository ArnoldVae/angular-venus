/**
 * 银行流水导入核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function bankStatementImportHandler($http,$$adapter,ApiPath) {

        var submitImportDataAdd=function(_data,options,pagination){
            var data={
                "comCode":_data.comCode||'',
                "impTargetBankAccount":_data.impTargetBankAccount.bankAccountNo||'',
                "impNum":_data.impNum||'',
                "impAmount":_data.impAmount||'',
                "payMentMehtod":_data.payMentMehtod||'',
                "bankCode":_data.bankCode||'',
                "signRequest":_data.signRequest,
                "impFileNum":_data.impFileNum,
                "impFileName":_data.impFileName,
                "currency":_data.impTargetBankAccount.currency||'',
                "globalUserCode":_data.globalUserCode
            };
            config.httpPackage.data= $$adapter.exports('submitImportDataAddV2X', data);
            config.httpPackage.url= ApiPath.api.submitImportDataAddV2X;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('submitImportDataAddV2X', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //导入目标银行账号-币别
        var queryBankAcount=function(_data,options,pagination){
            var _data={
                "centerCode":_data||'',
            };
            config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
            config.httpPackage.url= ApiPath.api.queryBankAcount;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryBankAcount', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        return {
            submitImportDataAdd: function (_data,options,pagination) {
                return submitImportDataAdd(_data,options,pagination);
            },
            queryBankAcount: function (_data,options,pagination) {
                return queryBankAcount(_data,options,pagination);
            }
        }
    }
    moduleApp.factory('$$bankStatementImport',['$http','$$adapter','ApiPath',bankStatementImportHandler]);

});
