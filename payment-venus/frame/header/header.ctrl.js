define([
    'app','constants','codes'
], function (app,constants,codes) {
    'use strict';
    app.registerController('HeaderCtrl', ['$scope', '$$header','$rootScope','$modal',
        function ($scope, $$header,$rootScope,$modal) {
            $scope.showHeaderOther = {
                state:false
            };//是否显示头部隐藏的信息
            $scope.noticeHide = {
                state:false
            };//弹出通知信息


            var localCodes = codes;//本地数据字典

            //点击弹出通知信息
            $scope.lookInfo = function () {
                $scope.noticeHide.state = true;
            };
            $scope.hideInfo = function () {
                $scope.noticeHide.state = false;
            };
            //头部下拉信息
            $rootScope.$on(constants.EVENTS.LOADCODETYPE,function(){
                $scope.headerSearch()
            });
            $scope.headerCondition = {
                "headerDto":""
            };
            $scope.chgCenterCode =function (target) {
                if(target!=""){
                    $rootScope.comCode = $scope.headerCondition.headerDto;
                }
            };
            $scope.headerSearch = function () {
                $$header.queryCenterCode({"token": $scope.token}, {
                    success: function (data) {
                        console.log(data);
                        var headerObj = {};
                        var headerList = [];
                        $.each(data.content.content, function (index, obj) {
                            headerObj['code'] = obj.comCode;
                            headerObj['value'] = '-'+obj.codeCName;
                            headerList.push(angular.copy(headerObj));
                            if ($scope.user.comCode == obj.comCode) {
                                $scope.headerCondition.headerDto = obj.comCode;
                            }
                        });
                        $scope.headerList = headerList;
                        $scope.headerCondition.headerCenterCode = $scope.centerCode+"-"+$scope.centerName;
                        $rootScope.comCode = $scope.headerCondition.headerDto;
                        $rootScope.headerList = data.content.content;
                        var headerListCopy=angular.copy(headerList);
                        $.each(headerListCopy,function(index,target){
                            target.value=target.value.split("-").join("")
                        });
                        localCodes['loginComCode'] = headerListCopy;//存储到本地数据字典
                    },
                    error: function (e) {
                    }

                })

            };

            /**
             * 查看头部其他信息
             */
            $scope.goHeaderOther = function () {
                $scope.showHeaderOther.state = true;
            };
            $scope.closeHeaderOther = function () {
                $scope.showHeaderOther.state = false;
            };
        }])
});