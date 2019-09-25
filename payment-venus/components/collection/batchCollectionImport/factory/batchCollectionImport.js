/**
 * 批量收款-批量收款导入
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function batchCollectionImportHandler($http,$$adapter,ApiPath) {

        var importCondition=function(keywords,options,pagination){
            var _data={
                "impFileNum":keywords.impFileNum||"",
                "appliName":keywords.appliName||'',//投保人
                "impNum":keywords.impNum||"",//导入笔数
                "currenCY":keywords.currenCY||'',//币种
                "remark":keywords.remark||'',//备注
                "impAmount":keywords.impAmount||'',
                "webUserCode":keywords.webUserCode||'',
                "webComCode":keywords.webComCode||''
            };
            config.httpPackage.data= $$adapter.exports('importCondition', _data);
            config.httpPackage.url= ApiPath.api.importCondition;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('importCondition', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var Account=function(){
            this.infoToView={
                "checkStatus":{
                    "checkedAccountAll":false,
                    "checkedClaimAll":false,
                    "checkedCommonAll":false,
                    "checkedChecksAll":false
                },
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                //查询条件
                "importCondition":{
                    impFileNum:'',
                    appliName:"",//投保人
                    currency:"",//币种
                    impNum:"",//本次导入笔数
                    impAmount:"",//本次导入金额
                    businessNos:""//备注
                },
                //弹框表格绑定
                "accountRecList":[
                    {
                        "currenCy2":'CNY',
                        "payWay":'01',
                        "accountNo":'',
                        "payrefFee":'',
                        "itemCode":"",
                        "centerCode":'11999000'
                    }
                ],
                //弹框表格绑定初始化
                "accountRecInitList":[
                    {
                        "currenCy2":'CNY',
                        "payWay":'01',
                        "accountNo":'',
                        "itemCode":"",
                        "payrefFee":'',
                        "centerCode":'11999000'
                    }
                ]
            }
        };
        //成功清单查看
        var showImptMassage=function(data, options, pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "impFileNum":data.impFileNum||"",
                "sign":data.sign||'',
                "transactionNo":data.transactionNo||''
            };
            config.httpPackage.data= $$adapter.exports('ShowImptMassage', _data);
            config.httpPackage.url= ApiPath.api.showImptMassage;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('ShowImptMassage', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        return {
            importCondition: function (keywords, options, pagination) {
                return importCondition(keywords, options, pagination);
            },
            Account:function(){
                return new Account()
            },
            showImptMassage:function(data,options,pagination) {
            return showImptMassage(data, options,pagination)
            }
        }

    }
    moduleApp.factory('$$batchCollectionImport',['$http','$$adapter','ApiPath',batchCollectionImportHandler]);

});
