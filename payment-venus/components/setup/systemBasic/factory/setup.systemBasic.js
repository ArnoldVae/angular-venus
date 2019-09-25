/**
 * Created by dukang on 2017/5/4.
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function systemBasicHandler($http,$$adapter,ApiPath,constants) {
        console.log('系统基础设置api');
        var Preference=function(){
            var pagination={
                totalItems:'',//总数
                pageIndex:1,//当前页面
                pageSize:'15',//显示条数
                maxSize:'3',//最大页数
                numPages:'',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            }
            //基础信息信息模版
            this.infoToView = {
                //是否显示银行商户号设置页面
                isBankMerchantSetup:false,
                //业务基础信息设置模块菜单名称
                tapName:[
                    {
                        'title': '收付员设置',
                        'index': '1',
                        'active': true,
                        "btnStyle":{"border-radius":"50%","margin-left":"115px"}
                    },
                    {
                        'title': '会计期间设置',
                        'index': '2',
                        'active': false,
                        "btnStyle":{"border-radius":"50%"}
                    },
                    {
                        'title': '银行账户维护',
                        'index': '3',
                        'active': false,
                        "btnStyle":{"border-radius":"50%"}
                    },
                    {
                        'title': '账龄区间设置',
                        'index': '4',
                        'active': false,
                        "btnStyle":{"border-radius":"50%"}
                    },
                    {
                        'title': '兑换率设置',
                        'index': '5',
                        'active': false,
                        "btnStyle":{"border-radius":"50%"}
                    },
                    {
                        'title': '工作日管理',
                        'index': '6',
                        'active': false,
                        "btnStyle":{"border-radius":"50%"}
                    }
                ],
                //系统基础信息设置模块菜单
                "tapHeader":[
                    {
                        'title': '收付机构',
                        'index': '1',
                        'active': true,
                        "btnStyle":{"border-radius":"50%","margin-left":"115px"}
                    },{
                        'title': '操作员',
                        'index': '2',
                        'active': false,
                        "btnStyle":{"border-radius":"50%"}
                    },{
                        'title': '岗位权限',
                        'index': '3',
                        'active': false,
                        "btnStyle":{"border-radius":"50%"}
                    }
                ],
                //tab切换保存
                "tapFlagA":'1',
                "tapFlagB" :"1",
                //收付员
                "cashMember":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //收付员查询条件
                        "unitCode":"",//
                        "comCode":"",
                        "startDate":""
                    },
                    "queryList":[],//收付员查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //会计期间模块
                "accountPeriod":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //会计期间查询条件
                        "laterMonth":"",
                        "earlierMonth":"",
                        "centerCode":"",
                        "accMonthStat":""
                    },
                    "queryList":[],//会计期间查询结果存储
                    "pagination":angular.copy(pagination)


                },
                //银行账户模块
                "bankAccount":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //银行账户查询条件
                        "bankAccountName": "",
                        "bankCode": "",
                        "accountType": "",
                        "bankAccountNo": "",
                        "bankName": "",
                        "titleCode": "",
                        "titleName": "",
                        "validStatus": "",
                        "saveNature": "",
                        "centerCodeStr": "",
                        "currency": "",
                        "userCode":"",
                        "comCode":"",
                        "centerCode":""
                    },
                    "queryList":[],//银行账户查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //银行账户商户配置页面
                "bankMerchant":{
                    "mareFlag":false,//展示更多按钮
                    //银行账户商户查询条件
                    "queryConditions":{
                        "bankAccountName":'',
                        "bankCode": '',
                        "accountType": '',
                        "bankAccountNo": '',
                        "bankName": '',
                        "titleCode": '',
                        "titleName": '',
                        "validStatus": '',
                        "saveNature": '',
                        "centerCode": '',
                        "centerCodeStr": '',
                        "userCode": '',
                        "comCode": '',
                        "currency": '',
                    },
                    "queryList":[],//查询结果存储
                    "pagination":angular.copy(pagination)
                },
                // 账龄区间
                "ageRange":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //账龄区间查询条件
                        "comCode":'',
                        "comName": '',
                        "agingType":'',
                        "agingStart":'',
                        "agingEnd":'',
                        "agingInterval":'',
                        "createCode":'',
                        "createDate":'',
                        "webComCode":"",
                        "webTaskCode":"payment.basicinfo.systemdata.busisdata",
                        "webUserCode":"",
                    },
                    "queryList":[],//账龄区间查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //兑换率模块
                "exchangeRate":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //兑换率查询条件
                        "baseCurrency":"",
                        "exchCurrency":"",
                        "exchDate":"",
                        "validStatus":""
                    },
                    "queryList":[],//兑换率查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //收付机构模块
                "paymentInstitutions":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //收付机构查询条件
                        "comCode":"",
                        "comCName":"",
                        "upperComCode":"",
                        "comLevel":"",
                    },
                    "queryList":[],//收付机构查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //操作员模块
                "operator":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //操作员查询条件
                        "userCode":"",
                        "userName":"",
                        "comCode":"",
                        "flag":"",
                    },
                    "queryList":[],//操作员查询结果存储
                    "pagination":angular.copy(pagination)
                },
                //岗位权限-权限管理模块
                "permissions":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //权限管理查询条件
                        'userCode':"",
                        'userName':"",
                        'comCode':"",
                        'validStatus':"1",
                        "globalUserCode":""
                    },
                    "queryList":[],//权限管理查询结果存储
                    "pagination":angular.copy(pagination)
                },

                //岗位权限-岗位管理模块
                "postManage":{
                    "mareFlag":false,//展示更多按钮
                    "queryConditions":{ //岗位管理查询条件
                        "gradeCode":"",
                        "gradeCName":"",
                        "validStatus":"1",
                        "globalUserCode":"",
                        "powerSystemCode":"",
                    },
                    "queryList":[],//岗位管理查询结果存储
                    "pagination":angular.copy(pagination)
                },

                "postMoreFlag":false,
                "postAuthorityFlag":"1",//岗位权限管理展示标志
                // 工作日设置
                "taxFlag":{
                    "code":"1"
                },
                //工作日初始化
                "workCondition":{
                    "workYear":"",
                    "workMonth":""
                }
            };


            var hello=function(data){
                var that=this;
                that.hello=data;
            }.bind(this);

            hello();
        };
        /**
         * @ngdoc
         * @description
         * 基础信息列表查询接口
         * @example
         * $$systemBasic.find('proposal',keywords,options,pagination)
         * @param {string} type 查询类型
         * @param {object} keywords 入参数据
         * @param {object} options onSuccess/onError回调
         * @param {object} pagination 分页信息
         * @returns {httpPromise} resolve with fetched data, or fails with error description.
         */
        var find=function (target,keyWords,options,pagination) {
            var _data,_url;
            switch (target){
                case constants.FINDERCONFIG.TARGET.PAYMENTINSTITUTIONS:
                    console.log('收付机构查询');
                    _data={
                        "comCode":keyWords.comCode||'',
                        "comCName":keyWords.comCName||'',
                        "upperComCode":keyWords.upperComCode||'',
                        "comLevel":keyWords.comLevel||'',
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.searchPaymentInsDto
                    break;
                case  constants.FINDERCONFIG.TARGET.OPERATOR:
                    console.log('操作员查询');
                    _data={
                        "comCode":keyWords.comCode||'',
                        "userCode":keyWords.userCode||'',
                        "userName":keyWords.userName||'',
                        "flag":keyWords.flag||'',
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.searchOperatorDto
                    break;
                case constants.FINDERCONFIG.TARGET.PERMISSIONS:
                    console.log('权限管理查询');
                    _data={
                        "comCode":keyWords.comCode||'',
                        "userCode":keyWords.userCode||'',
                        "userName":keyWords.userName||'',
                        "validStatus":keyWords.validStatus||'',
                        "globalUserCode":keyWords.webUserCode||'',
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.searchPriManDto;
                    break;
                case constants.FINDERCONFIG.TARGET.POSTMANAGE:
                    console.log('岗位权限查询')
                    _data={
                        "gradeCode":keyWords.gradeCode||'',
                        "gradeCName":keyWords.gradeCName||'',
                        "validStatus":keyWords.validStatus||'',
                        "globalUserCode":keyWords.webUserCode||'',
                        "powerSystemCode":keyWords.powerSystemCode||'',
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.searchPostManageDto;
                    break;
                case constants.FINDERCONFIG.TARGET.CASHMEMBER:
                    console.log('收付员查询');
                    _data={
                        "unitCode": keyWords.unitCode||'',
                        "comCode": keyWords.comCode||'',
                        "startDate": keyWords.startDate||'',
                        "validStatus":'1',
                        "webComCode":keyWords.webComCode||'',
                        "webUserCode":keyWords.webUserCode||'',
                        "webTaskCode":"payment.basicinfo.systemdata.busisdata",
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.searchCashDto;
                    break;
                case constants.FINDERCONFIG.TARGET.ACCOUNTPERIOD:
                    console.log('会计期间查询');
                    _data={
                        "unitCode": keyWords.unitCode||'',
                        "comCode": keyWords.comCode||'',
                        "startDate": keyWords.startDate||'',
                        "validStatus":'1',
                        "webComCode":keyWords.webComCode||'',
                        "webUserCode":keyWords.webUserCode||'',
                        "webTaskCode":"payment.basicinfo.systemdata.busisdata",
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.searchAccountData;
                    break;
                case constants.FINDERCONFIG.TARGET.BANKACCOUNT:
                    console.log('银行账号查询')
                    _data={
                        "bankAccountName": keyWords.bankAccountName||'',
                        "bankCode": keyWords.bankCode||'',
                        "accountType": keyWords.accountType||'',
                        "bankAccountNo": keyWords.bankAccountNo,
                        "bankName": keyWords.bankName||'',
                        "titleCode": keyWords.titleCode||'',
                        "titleName": keyWords.titleName||'',
                        "validStatus": keyWords.validStatus||'',
                        "saveNature": keyWords.saveNature||'',
                        "centerCode": keyWords.webCenterCode||'',
                        "centerCodeStr": keyWords.centerCodeStr||'',
                        "userCode": keyWords.webUserCode||'',
                        "comCode": keyWords.webComCode||'',
                        "currency": keyWords.currency||'',
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.searchBank
                    break;
                case constants.FINDERCONFIG.TARGET.AGERANGE:
                    console.log('账龄区间查询')
                    _data={
                        "comCode":keyWords.comCode||'',
                        "comName": keyWords.comName||'',
                        "agingType":keyWords.agingType||'',
                        "agingStart":keyWords.agingStart||'',
                        "agingEnd":keyWords.agingEnd||'',
                        "agingInterval": keyWords.agingInterval||'',
                        "createCode": keyWords.createCode||'',
                        "createDate": keyWords.createDate||'',
                        "webComCode":keyWords.webComCode||'',
                        "webTaskCode":"payment.basicinfo.systemdata.busisdata",
                        "webUserCode":keyWords.webUserCode||'',
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.agingQuery;
                    break;
                case constants.FINDERCONFIG.TARGET.EXCHANGERATE:
                    console.log('兑换率查询');
                    _data={
                        "baseCurrency":keyWords.baseCurrency||'',
                        "exchCurrency":keyWords.exchCurrency||'',
                        "exchDate":keyWords.exchDate||'',
                        "validStatus":keyWords.validStatus||'',
                        "pageNo":pagination.pageNo-1,
                        "pageSize":pagination.pageSize||''
                    }
                    _url=ApiPath.api.searchExchangeDto;
                    break;
                case constants.FINDERCONFIG.TARGET.BANKMERCHANT:
                    console.log('银行商户查询')
                    _data={
                        "bankCode":keyWords.bankCode || '',// 银行编码
                        "bankName":keyWords.bankName || '',// 银行名称
                        "merchantNo":keyWords.merchantNo || '',// 商户编号
                        "payFlag":keyWords.payFlag || '',// 渠道代码
                        "sffComCode":keyWords.sffComCode || '',// 银行归属机构代码
                        "sffComName":keyWords.sffComName || '',
                        "accountCode":keyWords.accountCode || '',// 银行账号
                        "opCode":keyWords.opCode || '',// 操作员代码
                        "useFlag":keyWords.useFlag || '',// 使用标识
                        "insertTime":keyWords.insertTime || '',// 插入时间
                        "updateTime":keyWords.updateTime || '',// 更新时间
                        "operationSign":keyWords.operationSign || '',// 操作标识
                        "centerCode":keyWords.webCenterCode || '',// 当前登录账户的核算单位
                        "comCode":keyWords.webComCode || '',// 当前登录账户的机构代码
                        "pageNo":pagination.pageNo-1,// 页码
                        "pageSize":pagination.pageSize || '' // 每页条数
                    }
                    _url=ApiPath.api.searchBankMerchant
                    break;
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: _url,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports(target, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })

        }
        /**
         * 公共基础信息列表删除接口
         */
        var delItems=function (target,keyWords,options) {
            var _data,_url,delTarget;
            delTarget=target+'Del'
            switch (target){
                case constants.FINDERCONFIG.TARGET.CASHMEMBER:
                    console.log('收付员删除');
                    _data={
                        "unitType": keyWords.unitType||'',
                        "unitCode": keyWords.unitCode||''
                    }
                    _url=ApiPath.api.delCashDto
                    break;
                case constants.FINDERCONFIG.TARGET.BANKACCOUNT:
                    console.log('银行账户删除');
                    _data={
                        "bankAccountNo":keyWords.bankAccountNo||''
                    }
                    _url=ApiPath.api.deleteBankNo
                    break;
                case constants.FINDERCONFIG.TARGET.AGERANGE:
                    console.log('账龄删除');
                    _data={
                        "comCode":keyWords.comCode||'',
                        "agingType":keyWords.agingType||'',
                        "agingStart":keyWords.agingStart||'',
                        "agingEnd":keyWords.agingEnd||''
                    }
                    _url=ApiPath.api.agingDelete
                    break;
            }
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: _url,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports(delTarget, data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        }
        //收付机构详情
        var comDetail=function(_data,options){
            console.log('收付机构详情');
            var _data={
                "comCode": _data.comCode||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.comDetail,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('comDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //兑换率新增
        var saveNewExc = function(_data,options){
            console.log('兑换率新增');
            var _data={
                "validStatus":_data.validStatus||'',
                "exchDate":_data.exchDate||'',
                "exchRate":_data.exchRate||'',
                "exchCurrency":_data.exchCurrency||'',
                "baseCurrency":_data.baseCurrency||'',
                "base":_data.base||''
            };
             _data = $$adapter.exports('addNewExc', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveNewExchange,
                headers: {},
                data:  _data
            })
                .success(function (data) {
                     data = $$adapter.imports('addNewExc', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //兑换率修改
        var saveReviseExc = function(_data,options){
            console.log('兑换率修改');
            var _data={
                "validStatus":_data.validStatus||'',
                "exchDate":_data.exchDate||'',
                "exchRate":_data.exchRate||'',
                "exchCurrency":_data.exchCurrency||'',
                "baseCurrency":_data.baseCurrency||'',
                "base":_data.base||''
            }
             _data = $$adapter.exports('modifyExc', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveReviseExchange,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('modifyExc', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //收付员修改
        var modifyCash = function(_data,options){
            console.log('收付员设置修改查询');
            var _data={
                "unitType":_data.unitType||'',
                "unitCode":_data.unitCode||''
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.modifyCash,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('modifyCash', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //收付员新增
        var saveNewCh = function(_data, options){
            console.log('收付员新增');
             _data = $$adapter.exports('saveNewCh', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveNewCasher,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('saveNewCh', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //收付员联动
        var selChange =function(_data,options){
            console.log('收付员联动');
            _data = $$adapter.exports('selChange', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.selChange,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('selChange', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        }
        //收付员修改保存
        var saveReviseCh = function(_data, options){
            console.log('收付员修改保存');
             var data1 = $$adapter.exports('saveNewCh', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveReviseCasher,
                headers: {},
                data: data1
            })
                .success(function (data) {
                     data = $$adapter.imports('saveRevise', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //工作日初始化
        var initWork = function(_data,options){
            console.log('工作日初始化');
            var _data=_data;
             _data = $$adapter.exports('initWork', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.initWorker,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('initWork', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //会计期间修改
        var changeAccount = function(_data, options){
            console.log('会计期间设置修改');
             _data = $$adapter.exports('changeAccount', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.changeAccountDto,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('changeAccount', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //银行账号详情
        var bankNoDetail=function(_data,options){
            console.log('银行账号详情');
            var _data= {
                "bankAccountNo": _data
            }
            _data = $$adapter.exports('bankDetail', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.bankDetail,
                headers: {},
                data:_data
            })
                .success(function (data) {
                    data = $$adapter.imports('bankDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //银行账号新增
        var bankNewAdd=function(_data,options){
            console.log('银行账号新增');
            var _data= _data;
            _data = $$adapter.exports('bankNewAdd', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.bankNewAdd,
                headers: {},
                data:_data
            })
                .success(function (data) {
                    data = $$adapter.imports('bankNewAdd', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //银行账号保存
        var saveBankAccount=function ( _data,options) {
            console.log('银行账号保存');
            var _data=_data;
             _data = $$adapter.exports('bankNoSave', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.saveBank,
                headers: {},
                data:_data
            })
                .success(function (data) {
                     data = $$adapter.imports('bankNoSave', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //银行账号---新增商户配置
        var operationBankMerchant = function (keywords,options) {
            console.log('银行账号---新增商户配置');
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.operationBankMerchant,
                headers: {},
                data:keywords
            })
                .success(function (data) {
                    data = $$adapter.imports('operationBankMerchant', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //账龄新增
        var agingAdd=function(_data,options){
            console.log('账龄新增');
            var _data= _data;
            _data = $$adapter.exports('agingAdd', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.agingAdd,
                headers: {},
                data:_data
            })
                .success(function (data) {
                    data = $$adapter.imports('agingAdd', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //账龄修改查询
        var agingModify=function(_data,options){
            console.log('账龄修改查询');
            var _data={
                "comCode":_data.comCode||'',
                "agingType":_data.agingType||'',
                "agingStart":_data.agingStart||'',
                "agingEnd":_data.agingEnd||''
            };
            _data = $$adapter.exports('agingModify', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.agingModify,
                headers: {},
                data:_data
            })
                .success(function (data) {
                    data = $$adapter.imports('agingModify', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //账龄修改保存
        var agingSave=function(_data,options){
            console.log('账龄修改保存');
            var _data= _data;
            _data = $$adapter.exports('agingSave', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.agingSave,
                headers: {},
                data:_data
            })
                .success(function (data) {
                    data = $$adapter.imports('agingSave', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //工作日设置--提交
        var workDaySubmit=function (_data, options) {
            console.log('工作日设置--提交');
             _data = $$adapter.exports('workDaySubmit', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.submitWorkDay,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('workDaySubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //工作日设置--查询某月工作日
        var searchWorkDay=function (_data, options) {
            console.log('工作日设置--查询某月工作日');
             _data = $$adapter.exports('workDaySearch', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.searchWorkMonth,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('workDaySearch', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //工作日设置--重置
        var resetWorkDay=function (_data, options) {
            console.log('工作日设置--重置');
             _data = $$adapter.exports('workDatReset', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.resetWorkDayData,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('workDatReset', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        /**
         * 岗位配置查询
         */
        var postConfigQuery=function(_data,options){
            console.log('权限管理-岗位配置查询');
            var _data={
                "userCode":_data.userCode||'',
                "userName":_data.userName||'',
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.searchPostConfigDto,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('postConfigQuery', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        }
        //权限管理-岗位配置保存
        var savePostConfig=function (_data, options) {
            console.log('权限管理-岗位配置保存');
             _data = $$adapter.exports('savePostConfig', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.savePostConfigDto,
                headers: {},
                data: _data
            })
                .success(function (data) {
                     data = $$adapter.imports('savePostConfig', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //岗位查询-详情
        var postManageDetail=function(_data,options){
            console.log('岗位管理-岗位详情查询');
            var _data={
                "gradeID":_data.gradeId||'',
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.getPostDetailsTreeDto,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('postManageDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        //岗位管理-删除
        var deletePostManage=function (_data, options) {
            console.log('岗位管理-删除');
            var data1={
                "iD": _data.iD||''
            }
             data1 = $$adapter.exports('deletePost', data1);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.deletePostManageDto,
                headers: {},
                data: data1
            })
                .success(function (data) {
                     data = $$adapter.imports('deletePost', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //岗位管理-岗位详细信息保存
        var savePostDetails=function (_data, options) {
            console.log('岗位管理-岗位详细信息保存');
            var data= $$adapter.exports('savePostDetail', _data);
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.savePostDetailsDto,
                headers: {},
                data: data
            })
                .success(function (data) {
                     data = $$adapter.imports('savePostDetail', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                });
        };
        //导入目标银行账号-币别
        var queryBankAcount=function(_data,options){
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
        return{
            Preference:function(){
                return new Preference();
            },
            modifyCash:function(_data,options){
               return modifyCash(_data,options);
            },
            saveNewExc:function(_data,options){
                return saveNewExc(_data,options);
            },
            saveReviseExc:function(_data,options){
                return saveReviseExc(_data,options);
            },
            saveNewCh:function(_data,options){
                return saveNewCh(_data,options);
            },
            saveReviseCh:function(_data,options){
                return saveReviseCh(_data,options);
            },
            initWork:function(_data,options){
                return initWork(_data,options);
            },
            changeAccount:function(_data,options){
                return changeAccount(_data,options);
            },
            agingAdd:function(_data,options){
                return agingAdd(_data,options);
            },
            agingModify:function(_data,options){
                return agingModify(_data,options);
            },
            agingSave:function(_data,options){
                return agingSave(_data,options);
            },
            bankNoDetail:function(_data,options){
                return bankNoDetail(_data,options);
            },
            bankNewAdd:function(_data,options){
                return bankNewAdd(_data,options);
            },
            bankNoModify:function(_data,options){
                return  bankNoDetail(_data,options);
            },
            saveBankAccount:function (_data,options) {
                return saveBankAccount(_data,options)
            },
            operationBankMerchant:function (keywords, options) {
                return operationBankMerchant(keywords, options)
            },
            workDaySubmit:function (_data, options) {
                return workDaySubmit(_data, options)
            },
            searchWorkDay:function (_data, options) {
                return searchWorkDay(_data, options)
            },
            resetWorkDay:function (_data, options) {
                return resetWorkDay(_data, options)
            },
            postConfigQuery:function(_data,options){
                return postConfigQuery(_data,options);
            },
            postManageDetail:function(_data,options){
                return postManageDetail(_data,options);
            },
            savePostConfig:function (_data, options) {
                return savePostConfig(_data, options)
            },
            deletePostManage:function (_data, options) {
                return deletePostManage(_data, options)
            },
            savePostDetails:function (_data, options) {
                return savePostDetails(_data, options)
            },
            comDetail:function(_data,options){
                return comDetail(_data,options);
            },
            selChange:function(_data,options){
                return selChange(_data,options);
            },
            queryBankAcount:function (_data,options) {
                return queryBankAcount(_data,options)
            },
            find:function (target,keyWords,options,pagination) {
                return find(target,keyWords,options,pagination)
            },
            delItems:function (target,keyWords,options) {
                return delItems(target,keyWords,options)
            }
        }

    }
    moduleApp.factory('$$systemBasic',['$http','$$adapter','ApiPath','constants',systemBasicHandler]);

});