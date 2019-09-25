/**
 * 暂收款存取核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function collectionTemporaryAccessHandler($http,$$adapter,ApiPath) {
        var searchReparations=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "preBillNo":keywords.preBillNo||'',
                "unifySerialNum":keywords.unifySerialNum||'',
                "accountCode":keywords.accountCode||'',
                "prePayFeeMin":keywords.prePayFeeMin||'',
                "prePayFeeMax":keywords.prePayFeeMax||'',
                "availableFeeMin":keywords.availableFeeMin||'',
                "availableFeeMax":keywords.availableFeeMax||'',
                "operatecode":keywords.operatecode||'',
                "comCode":keywords.comCode||'',
                "payRefDateStart":keywords.payRefDateStart||'',
                "customName":keywords.customName||'',
                "payRefDateEnd":keywords.payRefDateEnd||keywords.payRefDateStart||'',
                "currency":keywords.currency||'',
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',

            };
            config.httpPackage.data= $$adapter.exports('temporary', _data);
            config.httpPackage.url= ApiPath.api.temporary;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('temporary', data);
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
                "pagination" : {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '15',//显示条数
                maxSize: '3',//最大页数
                numPages: '',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            },
                "moreFlag":false,//展示更多按钮
                "newmoreFlag":false,//展示更多按钮
                "infoFlag":true,
                "showflag": false,
                "showflag2": false,
                "selectfalg":false,
                "tinfoFlag":true,
                "tapFlag":1,
                "TmoreFlag":false,
                "newTmoreFlag":false,
                "checkStatus":{
                    "checkedAccountAll":false,
                    "checkedClaimAll":false,
                    "checkedCommonAll":false,
                    "checkedChecksAll":false
                },
                "commonType":"0",
                "accountMenuFlag":'1',
                "claimsType":'0',
                "colRegCondition":{
                    "preBillNo":'',
                    "unifySerialNum":'',
                    "prePayFeeMin":'',
                    "prePayFeeMax":'',
                    "availableFeeMin":'',
                    "availableFeeMax":'',
                    "operatecode":'',
                    "comCode":'',
                    "payRefDateStart":'',
                    "payRefDateEnd":'',
                    "currency":'',
                    "globalUserCode":'',
                    "powerSystemCode":''
                },
                "newcolRegCondition":{
                    "unifySerialNum":'',
                    "serialNum":'',
                    "comCode":'',
                    "bankAccount":'',
                    "paymentName":'',
                    "paymentAccount":'',
                    "amountMin":'',
                    "amountMax":'',
                    "transDateStart":'',
                    "transDateEnd":'',
                    "currency":'',
                    "claimStatus":'',
                    "globalUserCode":'',
                    "powerSystemCode":''
                },
                "tapName" : [
                {
                    'title': '转无单预收',
                    'index': '1',
                    'active': true,
                    "btnStyle":{"width":"150px"}
                },
                {
                    'title': '退无单预收',
                    'index': '2',
                    'active': false,
                    "btnStyle":{"width":"150px"}

                }
            ],
                "newtcolRegCondition":{
                    "preBillNo":'',
                    "comCode":'',
                    "customName":'',
                    "accountCode":'',
                    "prePayFeeMin":'',
                    "prePayFeeMax":'',
                    "availableFeeMin":'',
                    "availableFeeMax":'',
                },
                "tcolRegCondition":{
                    "returnBillNo":'',
                    "preBillNo":'',
                    "paymentName":'',
                    "paymentAccount":'',
                    "operatecode":'',
                    "operateDateStart":'',
                    "operateDateEnd":''
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
        var tonyisearchReparations=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "serialNum":keywords.serialNum||'',
                "unifySerialNum":keywords.unifySerialNum||'',
                "comCode":keywords.comCode||'',
                "bankAccount":keywords.bankAccount||'',
                "paymentName":keywords.paymentName||'',
                "currency":keywords.currency||'',
                "transDateStart":keywords.transDateStart||'',
                "transDateEnd":keywords.transDateEnd||keywords.transDateStart||'',
                "amountMin":keywords.amountMin||'',
                "amountMax":keywords.amountMax||'',
                "claimStatus":keywords.claimStatus||0,
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',

            };
            config.httpPackage.data= $$adapter.exports('tonyisearchReparations', _data);
            config.httpPackage.url= ApiPath.api.tonyisearchReparations;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('tonyisearchReparations', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var unifySerialNum=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "globalUserCode":keywords.confirmunifySerialNum.globalUserCode||'',
                "powerSystemCode":keywords.confirmunifySerialNum.powerSystemCode||'',
                "unifySerialNum":keywords.preBillNoList2||'',
                "prpJNoBillFeeDetailDto":keywords.lisr2||''
            };
            config.httpPackage.data= $$adapter.exports('unifySerialNum', _data);
            config.httpPackage.url= ApiPath.api.unifySerialNum;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('unifySerialNum', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var noneusedie=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "unifySerialNum":keywords||'',

            };
            config.httpPackage.data= $$adapter.exports('noneusedie', _data);
            config.httpPackage.url= ApiPath.api.noneusedie;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('noneusedie', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var tsearchReparations=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "preBillNo":keywords.preBillNo||'',
                "returnBillNo":keywords.returnBillNo||'',
                "operatecode":keywords.operatecode||'',
                "operateDateStart":keywords.operateDateStart||'',
                "operateDateEnd":keywords.operateDateEnd||'',
                "globalUserCode":keywords.globalUserCode||'',
                "paymentName":keywords.paymentName||'',
                "paymentAccount":keywords.paymentAccount||'',
                "powerSystemCode":keywords.powerSystemCode||'',

            };
            config.httpPackage.data= $$adapter.exports('tsearchReparations', _data);
            config.httpPackage.url= ApiPath.api.tsearchReparations;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('tsearchReparations', data);
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
                "centerCode":_data.centerCode||'',
                "webUserCode":_data.webUserCode||'',
                "currency":_data.currency||'',
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
        //退无单预收-收付方式查银行账号
        var queryNoBillBankAcount=function(_data,options,pagination){
            var _data={
                "centerCode":_data.centerCode||'',
                "webUserCode":_data.webUserCode||'',
                "currency":_data.currency||'',
            };
            config.httpPackage.data= $$adapter.exports('queryBankAcount', _data);
            config.httpPackage.url= ApiPath.api.queryNoBillBankAcount;
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
        var addsearchReparations=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',
                "pageSize":pagination.pageSize||'',
                "preBillNo":keywords.preBillNo||'',
                "comCode":keywords.comCode||'',
                "prePayFeeMin":keywords.prePayFeeMin||'',
                "prePayFeeMax":keywords.prePayFeeMax||'',
                "availableFeeMin":keywords.availableFeeMin||'',
                "availableFeeMax":keywords.availableFeeMax||'',
                "customName":keywords.customName||'',
                "accountCode":keywords.accountCode||'',
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',

            };
            config.httpPackage.data= $$adapter.exports('addsearchReparations', _data);
            config.httpPackage.url= ApiPath.api.addsearchReparations;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('addsearchReparations', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var availableFee=function(keywords,data,options,pagination){
            var _data={
                "preBillNo":data
            };
            config.httpPackage.data= $$adapter.exports('availableFee', _data);
            config.httpPackage.url= ApiPath.api.availableFee;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('availableFee', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        var lisr=function(keywords,data,options,pagination){
            var _data={
                "preBillNo":data.preBillNo||'',
                "unifySerialNum":data.unifySerialNum||'',
                "availableFee":data.availableFee||'',
                "currency":data.currency||'',
                "prePayFee":data.prePayFee||'',
                "remark":data.remark||'',
                "customCode":keywords.customCode||'',
                "customName":keywords.customName||'',
                "ownerPhoneNo":keywords.ownerPhoneNo||'',
                "cankCode":keywords.cankCode||'',
                "bankProvince":keywords.bankProvince||'',
                "bankCity":keywords.bankCity||'',
                "customBankCode":keywords.customBankCode||'',
                "unionBank":keywords.unionBank||'',
                "accountCode":keywords.accountCode||'',
                "accountFlag":keywords.accountFlag||'',
                "accountType":keywords.accountType||'',
                "certificateType":keywords.certificateType||'',
                "certificateCode":keywords.certificateCode||'',
                "currency2":keywords.currency||'',
                "payWayCode":keywords.payWayCode||'',
                "accountCodeS":keywords.accountCodeS||'',
                "prePayFeeS":keywords.prePayFeeS||'',
                "globalUserCode":keywords.globalUserCode||'',
                "powerSystemCode":keywords.powerSystemCode||'',
            };
            config.httpPackage.data= $$adapter.exports('lisr', _data);
            config.httpPackage.url= ApiPath.api.lisr;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('lisr', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        return {
            searchReparations: function (keywords, options, pagination) {
                return searchReparations(keywords, options, pagination);
            },
            Account:function(){
                return new Account()
            },
            tonyisearchReparations: function (keywords, options, pagination) {
                return tonyisearchReparations(keywords, options, pagination);
            },
            unifySerialNum: function (keywords, options, pagination) {
                return unifySerialNum(keywords, options, pagination);
            },
            noneusedie: function (keywords, options, pagination) {
                return noneusedie(keywords, options, pagination);
            },
            tsearchReparations: function (keywords, options, pagination) {
                return tsearchReparations(keywords, options, pagination);
            },
            queryBankAcount: function (_data,options,pagination) {
            return queryBankAcount(_data,options,pagination);
            },
            addsearchReparations: function (keywords, options, pagination) {
                return addsearchReparations(keywords, options, pagination);
            },
            availableFee: function (keywords,data, options, pagination) {
                return availableFee(keywords,data, options, pagination);
            },
            lisr: function (keywords, options, pagination) {
                return lisr(keywords, options, pagination);
            },
            queryNoBillBankAcount: function (keywords, options, pagination) {
                return queryNoBillBankAcount(keywords, options, pagination);
            },
        }
    }
    moduleApp.factory('$$collectionTemporaryAccess',['$http','$$adapter','ApiPath',collectionTemporaryAccessHandler]);

});
