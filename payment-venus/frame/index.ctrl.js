/**
 * 主控制器
 */
define([
    'app',
    'config',
    'constants',
    '_'
], function (app,config,constants,_) {
    'use strict';
    app.registerController('IndexCtrl', ['$scope', '$rootScope','$$venus','$$user','$state','$timeout','$$adapter','ApiPath','$http',
        function ($scope, $rootScope,$$venus,$$user,$state,$timeout,$$adapter,ApiPath,$http) {


            //公共方法
            $scope.version=window.VENUS.version;
            $scope.runMode=window.VENUS.runMode;


            /**
             * 获取浏览器版本信息
             * @returns {Array|{index: number, input: string}}
             */
            function getBrowserInfo() {
                var agent = navigator.userAgent.toLowerCase() ;

                var regStr_ie = /msie [\d.]+;/gi ;
                var regStr_ff = /firefox\/[\d.]+/gi
                var regStr_chrome = /chrome\/[\d.]+/gi ;
                var regStr_saf = /safari\/[\d.]+/gi ;
                //IE
                if(agent.indexOf("msie") > 0)
                {
                    return agent.match(regStr_ie) ;
                }

                //firefox
                if(agent.indexOf("firefox") > 0)
                {
                    return agent.match(regStr_ff) ;
                }

                //Chrome
                if(agent.indexOf("chrome") > 0)
                {
                    return agent.match(regStr_chrome) ;
                }

                //Safari
                if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
                {
                    return agent.match(regStr_saf) ;
                }

            }
            $scope.verinfo = getBrowserInfo() ;
            /**
             * 如果数组中存在某个对象则删除
             * @param obj
             * @param array
             */
            $scope.deleteObj = function(obj,array,id){

                if($scope.findObj(obj,array)){
                    $.each(array,function(index,target){
                        if(obj[id] == target[id]){
                            array.splice(index,1);
                            return false;
                        }
                    })
                }
            };

            /**
             * 判断数组中是否存在某个对象
             * @param target
             * @param array
             * @returns {boolean}
             */
            $scope.findObj = function(obj,array){

                var flag=false;
                var objCopy=angular.copy(obj);
                delete objCopy.checked;
                delete objCopy.selectedClass;

                flag = angular.isUndefined(_.find(array,objCopy)) ? false : true;

                return flag;
            };

            /**
             * 获取菜单
             */
            var getMenus = function () {
                $$venus.getMenus({
                    "usercode":$scope.usercode
                },{
                    success:function(menus){
                        $scope.menus=menus.content;
                        $scope.menusInitSuccess = true;//菜单数据加载完毕才展示菜单页面

                    },
                    error:function(e){

                    }
                })

            };

            /**
             * 设置eventListener
             */
            var setupEventListeners = function(){

                //下拉初始化完成后才展示页面
                $rootScope.$on(constants.EVENTS.VENUS_READY,function(){
                    $scope.dataInitSuccess = true;
                });

                //后端异常
                $rootScope.$on(constants.EVENTS.BACKEND_EXCEPTION, function(event, data){
                    layerMsg(data.message);
                });

            };
            /**
             * 获取用户已登录信息
             */
            var getLoginUser=function(){
                $$user.getLoginUser({
                    success: function (user) {
                        console.info("login success:",user.userCode);
                        $scope.user=user;
                        $scope.usercode = user.userCode;
                        // $scope.comCode = user.comCode;
                        $scope.userName = user.userName;
                        $scope.token = user.token;
                        $scope.centerCode = user.centerCode;
                        $scope.centerName = user.centerName;
                        $scope.userComName = user.userComName;
                        $rootScope.$broadcast(constants.EVENTS.LOADCODETYPE);//登陆成功之后开始获取数据字典
                        getMenus();//登陆成功之后开始获取菜单数据

                    }
                });
            };

            var init = function () {
                console.log('主控制器加载完成');
                getLoginUser();
                setupEventListeners();
                //TODO:暂时设置默认值默认退出
                $scope.isLogout = false;

            };
            init();



            //401后重新登陆
            $rootScope.$on(constants.AUTH.UNAUTHORIZED, function () {
                console.log('401');
                getLoginUser();
            });

            $scope.logout=function(){
                $$user.logout();
            };

            $scope.account = {
                userCode: '',
                password: '',
                rememberMe: true
            };

            $scope.login = function(){
                //TODO：暂时写死
                $timeout(function () {
                    $scope.$apply(function () {
                        $rootScope.isLogout = $scope.isLogout=false;
                    });
                },100);


                // $$user.login($scope.account,{
                //
                //     success: function (answer) {
                //         if (answer.status) {
                //             console.log("login success");
                //             $scope.isLogout=false;
                //
                //
                //             // $location.path('/console');
                //         } else {
                //             console.log("login fail");
                //             $scope.loginmessage = answer.statusText;
                //         }
                //     },
                //     error: function (error) {
                //         console.log(error);
                //         $scope.loginmessage = "系统异常,请联系管理员";
                //
                //         //对常见的服务器端语言异常，做处理
                //         if(error.status==400){
                //             alert("服务器不理解请求的语法。")
                //         }else if (error.status==404){
                //             alert('服务器找不到请求的网页。')
                //         }else if (error.status==408){
                //             alert('服务器等候请求时发生超时')
                //         }else if (error.status==500){
                //             alert('服务器遇到错误，无法完成请求。')
                //         }else if (error.status==501){
                //             alert('服务器不具备完成请求的功能。')
                //         }else if (error.status==502){
                //             alert('错误网关。')
                //         }else if (error.status==503){
                //             alert('服务器目前无法使用(由于超载或停机维护)。')
                //         }else if (error.status==504){
                //             alert('网关超时。')
                //         }else if (error.status==505){
                //             alert('服务器不支持请求中所用的 HTTP 协议版本。')
                //         }
                //     }
                // });
            };
        }]);
});