/**
 * Created by Administrator on 2017/9/20 0020.
 */
/**
 * 联共保Api
 */
define(['../module','config'], function (moduleApp,config) {
    'use strict';
    function taxpayerInformationCollect($http,$$adapter, ApiPath) {

        /**
         *纳税人信息查询
         */
        var taxpayerNext=function(keywords,options){
            var _data={
                "certiNo":keywords.certiNo,//保/批单号
                "invoiceType":keywords.handler1Code,//开票对象类型
                "webUserCode":keywords.webUserCode,//权限配置
                "webComCode":keywords.webComCode,
                "webCenterCode":keywords.webCenterCode,
                "webTaskCode":keywords.webTaskCode
            };
            $http({
                method: "POST",
                dataType: "JSON",
                contentType: "application/json; charset=UTF-8",
                url: ApiPath.api.taxpayerNext,
                headers: {},
                data: _data
            })
                .success(function (data) {
                    data = $$adapter.imports('taxpayerNext', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         *纳税人信息保存
         */
        var taxpayerSubmit=function(keywords,options,flag){
            var _data={
                "customerName":keywords.customerName,//购方名称
                "taxPayerNo":keywords.taxPayerNo,//纳税人识别号/统一社会信用代码
                "address":keywords.address,//注册地址
                "phoneNo":keywords.phoneNo,//注册电话
                "bankName":keywords.bankName,//开户银行
                "accountCode":keywords.accountCode,//银行账号
                "customerCode":keywords.customerCode//客户代码
            };
            if(flag==0){
                var _url=ApiPath.api.taxpayerSubmit;
            }else if(flag==1)
            {
                var _url=ApiPath.api.taxpayerUpdate;
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
                    data = $$adapter.imports('taxpayerSubmit', data);
                    if (options && options.success && typeof(options.success) == 'function')
                        options.success(data);
                })
                .error(function (e, code) {
                    if (options && options.error && typeof(options.error) == 'function')
                        options.error(e);
                })
        };
        /**
         * 实例化对象后数据存储
         */
        var taxpayerObject=function () {
          this.basic={
            "certiNo":"",//单号
            "handler1Code":"1"
          };
        };
        return{
            taxpayerNext:function(keywords,options){
                return taxpayerNext(keywords,options);
            },
            taxpayerSubmit:function(keywords,options,flag){
                return taxpayerSubmit(keywords,options,flag);
            },
            taxpayerObject:function(){
                return new taxpayerObject().basic;
            }
        }
    }
    moduleApp.factory('$$taxpayerInformationCollect',['$http','$$adapter','ApiPath',taxpayerInformationCollect]);

});