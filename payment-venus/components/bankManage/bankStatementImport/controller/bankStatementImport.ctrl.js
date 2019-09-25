/**
 *银行流水导入控制器
 */
define([
    '../module'
],function (moduleApp) {
    'use strict';
    var bankStatementImport=function($scope,$$bankStatementImport,FileUploader,$modal,$$venus,$timeout){
        /**
         *初始化
         */
        var init=function () {
            //分页信息
            $scope.importCondition = {};
            //$scope.accountcomCode = $scope.comCode;
        }
        init();
            //上传
        $scope.uploadStatus = false; //定义两个上传后返回的状态，成功获失败
        var uploader = $scope.uploader = new FileUploader({
            url: '/comm-fileserver/uploadFile',
            formData:[{userCode:$scope.usercode,systemId:'gscore-pa-web',bussType:'payment'}],
            queueLimit: 1, //文件个数
            removeAfterUpload: false //上传后删除文件
        });
        $scope.clearItems = function(){ //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        }
        uploader.onAfterAddingFile = function(fileItem) {
            $scope.fileItem = fileItem.file; //添加文件之后，把文件信息赋给scope
            $scope.name=fileItem.file.name
            //if($scope.fileItem.type !== 'text/plain'){
            //    layerMsg('上传文件必须为.txt类型文件！！')
            //}
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.uploadStatus = true;
            $scope.fileItem = '';
            $scope.importCondition.impFileNum = response.resultObj.fileId;
            $scope.importCondition.signRequest = '0';
            $scope.importCondition.impFileName = $scope.name;
            $scope.importCondition.globalUserCode = $scope.usercode;
            $scope.importCond = function(){
                    $$bankStatementImport.submitImportDataAdd($scope.importCondition,{
                        success: function (data) {
                            if(data.content.resultCode == 1){
                                layer.confirm('数据已存在，是否重复导入！',{btn: ['确定','取消'],icon: '3'},function(index){
                                    //点确定回调方法
                                    $scope.importCondition.signRequest = '1';
                                    $$bankStatementImport.submitImportDataAdd($scope.importCondition,{
                                        success:function (data) {
                                            if(data.content.resultCode == '0000'){
                                                layer.msg(data.content.resultMsg,{icon:1});
                                                $scope.importCondition = {};
                                                return false;
                                            }else{
                                                layer.alert(data.content.resultMsg,{icon:2})
                                                return false;
                                            }
                                        },error: function (e) {
                                            layer.alert(data.content.resultMsg,{icon:2})
                                            return false;
                                        }
                                    })
                                })
                            }else if(data.content.resultCode == '0000'){
                                layer.msg(data.content.resultMsg,{icon: 1})
                                $scope.importCondition = {};
                                return false;
                            }else{
                                layer.alert(data.content.resultMsg,{icon:2})
                                return false;
                            }
                            angular.forEach($scope.confirmList,function(data){
                                $scope.queryNum++;
                                data.checked=false;
                                data.selectedClass=''
                            })
                        },
                        error: function (e) {
                            layer.alert(data.content.resultMsg,{icon:2})
                            return false;
                        }
                    });
            }
            $scope.importCond();


        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            $scope.uploadStatus = false;//上传失败则把状态改为false
            $scope.fileItem = '';
            alert('上传失败！');
        };
        //导入银行账号
        $scope.myFunc = function(){
            $scope.comcodes = $scope.importCondition.comCode;
            //导入目标银行账号-币别
            $$bankStatementImport.queryBankAcount($scope.comcodes,{
                success: function (data) {
                    var payWayObj = {};
                    var payWaySelList = [];
                    $.each(data.content,function(index,obj){
                        payWayObj['code'] = obj;
                        payWayObj['value'] = obj.bankAccountNo+'-'+obj.currency;
                        payWaySelList.push(angular.copy(payWayObj));
                    })
                    $scope.bankTypeCNY = payWaySelList;
                },
                error: function (e) {

                }
            });
        }
        /**
         *提交
         */
        $scope.submitImport = function(target){
            //先验证焦点定位
            $scope.uploadStatus = false;
            $$venus.Focus(
                "premiumForm"
            ).then(
                function (Ele) {
                    if (angular.isDefined(Ele)) {
                        $timeout(function () {
                            Ele.focus();
                        },1000)
                    } else {
                        //uploader.uploadAll();
                        //if($scope.fileItem== undefined){
                        //    layerMsg('请选择上传文件')
                        //}
                        if($scope.importCondition.comCode == undefined||$scope.importCondition.comCode == ''){
                            layer.msg("请选择账户归属机构");
                        }else if($scope.importCondition.impTargetBankAccount == undefined||$scope.importCondition.impTargetBankAccount == ''){
                            layer.msg("请录入导入目标银行账号");
                        }else if($scope.importCondition.payMentMehtod == undefined||$scope.importCondition.payMentMehtod == ''){
                            layer.msg("请选择收款方式");
                        }else if($scope.importCondition.bankCode == undefined||$scope.importCondition.bankCode == ''){
                            layer.msg("请录入银行类型");
                        }else{
                            uploader.uploadAll();
                            if($scope.fileItem== undefined||$scope.fileItem== ''){
                                layerMsg('请选择上传文件')
                            }
                        }
                    }
                }
            );
        };
        /**
         *重置
         */
            $scope.resetImport = function () {
                $scope.importCondition = {};
                $scope.fileItem = '';
            };




    };

    moduleApp.controller('BankStatementImportCtrl',['$scope','$$bankStatementImport','FileUploader','$modal','$$venus','$timeout',bankStatementImport]);


});
