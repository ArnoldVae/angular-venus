/**
 *生成结缴单--控制器
 */

define([
    '../module',
    'app',
    'config'
], function (moduleApp,app,config) {
    'use strict';
    var payList = function ($scope, $$payList,FileUploader,$state,$$venus,mcMultiEditorCacheService,$timeout) {
        var init = function () {
            $scope.pagination = {
                totalItems: '',//总数
                pageIndex: '1',//当前页面
                pageSize: '20',//显示条数
                maxSize: '3',//最大页数
                numPages: '',//共有多少页
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            //上传
            $scope.importCondition={
                "localfileurl": "",
                "globalUserCode":"",
                "powerSystemCode":""
            }
            //实例化对象
            //判断上次是否有数据如果有则取记录值
            if(getData()){
                $scope.infoToView=getData();
                $scope.pagination=$scope.infoToView.pagination;
            }else {
                $scope.infoToView = $$payList.PayList().infoToView;
            }
            $scope.today=new Date().dateConversion();
            saveData();
        }
        /**
         * 临时数据管理
         * 存储临时数据
         */
        var saveData=function () {
            $scope.infoToView.pagination=$scope.pagination;//存取分页数据
            mcMultiEditorCacheService.localData('payList',$scope.infoToView);
        };
        /**
         * 获取存储数据
         */
        var getData=function () {
            return mcMultiEditorCacheService.localData('payList');
        };
        /**
         * 记录调用
         */
        $scope.saveInputData=function () {
            saveData();
        }

        /**
         *      勾选全选
         */
        $scope.selectedPayListAll = function () {
            angular.forEach($scope.infoToView.queryList, function (data) {
                if ($scope.infoToView.checkAll) {
                    data.checked = true;
                } else data.checked = false;
            });
        }
        /**
         *单选
         */
        $scope.selectedPayListOne = function () {
            $scope.infoToView.checkAll = $scope.infoToView.queryList.every(function (item, index, array) {
                return item.checked;
            })
        }
        /**
         *勾选改变状态
         */
        $scope.changePayListClass = function () {
            angular.forEach($scope.infoToView.queryList, function (data) {
                if (data.checked) {
                    if(!$scope.findObj(data,$scope.infoToView._queryList)){
                        $scope.infoToView._queryList.push(data);
                    }
                }
                else if($scope.findObj(data,$scope.infoToView._queryList)){
                    $scope.deleteObj(data,$scope.infoToView._queryList,'certino')
                    data.selectedClass=''
                } else {
                    data.selectedClass = ''
                }
            });
        }
        /**
         * 上传功能
         */
        $scope.uploadStatus = false; //定义两个上传后返回的状态，成功获失败
        var uploader = $scope.uploader = new FileUploader({
            url: '/comm-fileserver/uploadFile',
            formData:[{userCode:$scope.usercode,systemId:'gscore-pa-web',bussType:'payment'}],
            queueLimit: 1, //文件个数
            removeAfterUpload: true //上传后删除文件
        });
        $scope.clearCarItems = function(){ //重新选择文件时，清空队列，达到覆盖文件的效果
            uploader.clearQueue();
        }
        uploader.onAfterAddingFile = function(fileItem) {
            $scope.fileItem = fileItem._file; //添加文件之后，把文件信息赋给scope
            if($scope.fileItem.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
                layerMsg('上传文件必须为.xlsx类型文件！！')
                $scope.importCondition = {};
                $scope.fileItem = '';
                return false;
            }
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            $scope.uploadStatus = true; //上传成功则把状态改为true
            $scope.importCondition.localfileurl = response.resultObj.fileId;
            $scope.importCondition.globalUserCode =$scope.usercode;
            $scope.importCondition.powerSystemCode=$scope.centerCode;
            carImport($scope.importCondition);
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            $scope.uploadStatus = false;//上传失败则把状态改为false
            layerMsg('上传失败')
            //alert('上传失败！');
            //暂时功能
            //$scope.importCondition.impFileNum = '123456789';
        };
        var carImport=function(obj){
            $$payList.payListImport(obj,{
                success: function (data) {
                    if(data.resultCode == '0000'){
                        layer.msg(data.resultMsg,{icon:1});
                        $scope.importCondition = {};
                        return false;
                    }else{
                        $scope.uploadStatus=false;
                        layer.msg(data.resultMsg,{icon:1})
                        $scope.resetUploadFile();
                        return false;
                    }
                },
                error: function (e) {
                }
            })

        };
        $scope.resetUploadFile=function () {
            $scope.importCondition = {};
            $scope.fileItem = '';
        }

        /**
         * 下载模板
         */
        $scope.downLoadTem=function () {
            $scope.fileId = 'a0b2b9f8cfa54264af5b72a94f518ca6';
            window.open("/comm-fileserver/downloadFile?fileId="+$scope.fileId);
        }
        /**
         * 起保日期改变
         */
        $scope.changeInputDate=function () {
            if($scope.infoToView.queryConditions.startdate&&$scope.infoToView.queryConditions.enddate){
                if($scope.infoToView.queryConditions.enddate<$scope.infoToView.queryConditions.startdate){
                    layer.msg('起保终止日期不能小于交易起止日期')
                    $scope.infoToView.queryConditions.enddate=$scope.infoToView.queryConditions.startdate
                }
            }
            if($scope.infoToView.queryConditions.earlierMonth&&$scope.infoToView.queryConditions.laterMonth){
                if($scope.infoToView.queryConditions.laterMonth<$scope.infoToView.queryConditions.earlierMonth){
                    layer.msg('统计终止日期不能小于交易起止日期')
                    $scope.infoToView.queryConditions.laterMonth=$scope.infoToView.queryConditions.earlierMonth
                }
            }
        }
        /**
         * 导入上传
         */
        $scope.carShipUploadFile = function (target) {
            if(!$scope.fileItem){
                layerMsg('请选择上传文件');
                return false;
            }
            //先验证焦点定位
            $$venus.Focus(
                "premiumForm"
            ).then(
                function (Ele) {
                    if (angular.isDefined(Ele)) {
                        $timeout(function () {
                            Ele.focus();
                        },1000)
                    } else {
                        uploader.uploadAll();
                        if(target!='page'){
                            $scope.pagination.pageIndex=1;
                        }
                    }
                }
            );
        };
        /**
         * 重置上传表单
         */
        $scope.resetCarShipImport=function(){
            $scope.fileItem='';
        }

        /**
         * 重置表单
         */
        $scope.payListReset=function(){
            $scope.infoToView.queryConditions={
                "certinoStart":"",
                "certinoEnd":"",
                "centercode":"",
                "comcode":"",
                "certinoList":"",
                "startdate":"",
                "enddate":"",
                "licenseno":"",
                "identifynumber":"",
            }
        };
        /**
         *  判断查询条目是否可选
         */
        var checkListValue= function (list) {
            $.each(list,function (index,obj) {
                if(obj.writeoffflag=='0'||obj.attribute2=='0'||obj.attribute2=='1'){
                    obj.disabled=true;
                }
            })
        }
        /**
         * 判断全选标志
         */
        var checkListSelect=function (list) {
            var _resulet=false
            $.each(list,function (index,obj) {
              if(obj.disabled){
                  _resulet=true
              }
            });
            return _resulet
        }
        //结缴单查询
        $scope.payListQuery = function (target) {
            $scope.infoToView.checkAll=false;
            if(target!='page'){
                $scope.pagination.pageIndex=1;
            }
            $scope.infoToView.queryConditions.globalUserCode=$scope.usercode;
            $scope.infoToView.queryConditions.powerSystemCode=$scope.centerCode;
            $$payList.paySearCh($scope.infoToView.queryConditions, {
                success: function (data) {
                    $scope.infoToView.queryList = data.content;
                    if ($scope.infoToView.queryList.length < 1) {
                        layerMsg('暂无数据！')
                        return false
                    }
                    //判断查询条目是否可选
                    checkListValue($scope.infoToView.queryList);
                    $scope.infoToView.checkAllFlag=checkListSelect($scope.infoToView.queryList)
                    $scope.changePayListClass();
                    $scope.pagination.totalItems=data.totalCount;


                },
                error: function (e) {
                }
            }, {
                "pageIndex": $scope.pagination.pageIndex,
                "pageSize": $scope.pagination.pageSize
            })

        }
        /**
         * 生成结缴单
         */
        $scope.payLsitSubmit = function () {
            var newArray = [];
            $.each($scope.infoToView.queryList,function (index,obj) {
                if(obj.checked){
                    obj.globalUserCode=$scope.usercode;
                    obj.powerSystemCode=$scope.centerCode;
                    newArray.push(obj)
                }
            });
            if (newArray.length == 0){
                layerMsg('请选择！');
                return false;
            }
            $$payList.payLsitSubmit({
                "list": newArray
            }, {
                success: function (data) {
                    if(data.resultCode=='0000'){
                        layer.alert(data.resultMsg, {
                            icon: 1
                        });
                        $scope.payListQuery('page');
                        $scope.infoToView._queryList=[];
                    }else{
                        layerMsg(data.resultMsg)
                    }


                },
                error: function (e) {
                }
            });

        }
        init()

    };

    moduleApp.controller('CarShipTaxpayListCtrl', ['$scope', '$$payList', 'FileUploader','$state','$$venus','mcMultiEditorCacheService','$timeout', payList]);

});
