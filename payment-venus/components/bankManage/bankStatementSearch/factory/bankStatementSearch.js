/**
 * 银行流水查询核心逻辑
 */
define(['../module','config','constants'], function (moduleApp,config,constants) {
    'use strict';
    function bankStatementSearchHandler($http,$$adapter,ApiPath) {
        angular.extend(constants.TARGET, constants.FINDERCONFIG.TARGET);
        var deleteSerialData=function(_data, options){
            console.log('银行流水查询删除');
            config.httpPackage.data = $$adapter.exports('deleteSerialData', _data);
            config.httpPackage.url =  ApiPath.api.deleteSerialDto;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('deleteSerialData', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        var queryMain=function(_data, options){
            var _data = {"impFileNum":_data};
            config.httpPackage.data = $$adapter.exports('queryMain', _data);
            config.httpPackage.url =  ApiPath.api.queryMain;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryMain', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //导入目标银行账号-币别
        var queryBankAcount=function(_data,options,pagination){
            var _data={
                "centerCode":_data||''
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
        var bankStatementSearch=function(){
            // 分页信息
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
            };
            // 状态
            this.status={
                "moreFlag":false//展开高级查询flag
            };
            this.serialList=[];// 列表数据
            //查询条件
            this.serialCondition={};
        };
        return {
            deleteSerialData:function(_data, options, keywords){
                return deleteSerialData(_data, options, keywords);
            },
            queryBankAcount: function (_data,options,pagination) {
                return queryBankAcount(_data,options,pagination);
            },
            queryMain:function(_data, options, keywords){
                return queryMain(_data, options, keywords);
            },
            bankStatementSearch:function(){
                return new bankStatementSearch();
            },
            find: function (target, keywords, options, pagination) {
                if(target==constants.TARGET.SEARCHSERIAL){
                    console.log('银行流水查询');
                    var _data={
                        "comCode":keywords.comCode||'',
                        "impTargetBankAccount":keywords.impTargetBankAccount||'',
                        "impFileName":keywords.impFileName||'',
                        "impDate":keywords.impDate||'',
                        "globalUserCode":keywords.globalUserCode||'',
                        "impDateEnd":keywords.impDateEnd||'',
                        "processStatus":keywords.processStatus||'',
                        "pageNo":pagination.pageNo||'',
                        "pageSize":pagination.pageSize||''
                    };
                    config.httpPackage.data = $$adapter.exports(constants.TARGET.SEARCHSERIAL, _data);
                    config.httpPackage.url =  ApiPath.api.searchSerialDto;
                    $http(config.httpPackage)
                        .success(function (data) {
                            data = $$adapter.imports(constants.TARGET.SEARCHSERIAL, data);
                            if (options && options.success && typeof(options.success) == 'function')
                                options.success(data);
                        })
                        .error(function (e, code) {
                            if (options && options.error && typeof(options.error) == 'function')
                                options.error(e);
                        })
                }
            }
        }

    }
    moduleApp.factory('$$bankStatementSearch',['$http','$$adapter','ApiPath',bankStatementSearchHandler]);

});
