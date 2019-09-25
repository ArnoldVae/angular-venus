/**
 * 理赔费用发票核心逻辑
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function settlementInvoiceHandler($http,$$adapter,ApiPath) {
        /**
         * 理赔费用发票查询
         * @param keywords
         * @param options
         * @param pagination
         */
        var queryLossPlanForInvoice=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo-1 ||'',//分页当前页码
                "pageSize":pagination.pageSize||'',//分页当前总条数
                "compensateNo":keywords.compensateNo||'',//赔款计算书号
                "compensateNoList":keywords.compensateNoList||'',//赔款计算书列表
                "payRefReason":keywords.payRefReason||"",//赔付类型
                "policyNo":keywords.policyNo||'',//保单号
                "claimNo":keywords.claimNo||'',//立案号
                "comCode":keywords.comCode||'',//业务部门
                "handlerCode":keywords.handlerCode||'',//业务员
                "agentCode":keywords.agentCode||'',//代理人/经纪人
                "businessNature":keywords.businessNature||'',//业务渠道
                "currency1":keywords.currency1||'',//币种
                "appliName":keywords.appliName||'',//投保人名称
                "insuredName":keywords.insuredName||'',//被保险人名称
                "riskCode":keywords.riskCode||"",//险种
                "underWriteDate":keywords.underWriteDate||"",//核赔日期
                "payObjectName":keywords.payObjectName||"",//支付对象
                "webUserCode":keywords.webUserCode||"",//配置权限
                "webComCode":keywords.webComCode||"",
                "webCenterCode":keywords.webCenterCode||"",
                "webTaskCode":keywords.webTaskCode||"",
                "planFee":keywords.planFee||""//金额
            };
            config.httpPackage.data= $$adapter.exports('queryLossPlanForInvoice', _data);
            config.httpPackage.url= ApiPath.api.queryLossPlanForInvoice;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('queryLossPlanForInvoice', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        /**
         * 实例化
         * @constructor
         */
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
                //手续费发票查询条件
                "confirmQuery":{
                    "compensateNo":'',
                    "compensateNoList":'',
                    "payRefReason":"",
                    "policyNo":'',
                    "claimNo":'',
                    "comCode":'',
                    "handlerCode":'',
                    "agentCode":'',
                    "businessNature":'',
                    "currency1":'',
                    "appliName":'',
                    "insuredName":'',
                    "riskCode":"",
                    "underWriteDate":"",
                    "payObjectName":"",
                    "planFee":"",
                    "pageNo":'',
                    "pageSize":''
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
        /**
         * 理赔费用登记信息
         * @param data
         * @param options
         * @param pagination
         */
        var payComInfo=function(data,options,pagination){
            config.httpPackage.data= $$adapter.exports('payComInfo', data);
            config.httpPackage.url= ApiPath.api.payComInfo;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('payComInfo', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        /**
         * 理赔费用插入多条发票数据
         * @param data1
         * @param data
         * @param keywords
         * @param options
         * @param pagination
         */
        var payComVerify=function(keywords,options,pagination){
            config.httpPackage.data= $$adapter.exports('payComVerify',keywords);
            config.httpPackage.url= ApiPath.api.payComVerify;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('payComVerify', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        /**
         * 理赔手续费发票查询
         * @param keywords
         * @param options
         * @param pagination
         */
        var findAllInvoiceForCompensate=function(keywords,options,pagination){
            var _data={
                "pageNo":pagination.pageNo||'',//当前页码
                "pageSize":pagination.pageSize||'',//总条数
                "invoiceNo":keywords.invoiceNo||'',//发票号
                "invoiceCode":keywords.invoiceCode||'',//发票代码
                "certiNo":keywords.certiNo||'',//结算单号
                "webUserCode":keywords.webUserCode||"",//配置权限
                "webComCode":keywords.webComCode||"",
                "webCenterCode":keywords.webCenterCode||"",
                "webTaskCode":keywords.webTaskCode||"",
                "billingDate":keywords.billingDate||''//开票日期
            };
            config.httpPackage.data= $$adapter.exports('findAllInvoiceForCompensate', _data);
            config.httpPackage.url= ApiPath.api.findAllInvoiceForCompensate;
            $http(config.httpPackage)
                .success(function (data) {
                    data = $$adapter.imports('findAllInvoiceForCompensate', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        };
        return {
            queryLossPlanForInvoice: function (keywords, options, pagination) {
                return queryLossPlanForInvoice(keywords, options, pagination);
            },
            Account:function(){
                return new Account()
            },
            payComInfo: function (data, options, pagination) {
                return payComInfo(data, options, pagination);
            },
            payComVerify: function (keywords,options,pagination) {
                return payComVerify(keywords,options,pagination);
            },
            findAllInvoiceForCompensate: function (keywords, options, pagination) {
                return findAllInvoiceForCompensate(keywords, options, pagination);
            }
        }
    }
    moduleApp.factory('$$settlementInvoice',['$http','$$adapter','ApiPath',settlementInvoiceHandler]);
})