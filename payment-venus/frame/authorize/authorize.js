/**
 *
 * user模块
 */

define(['angular', 'config', 'constants'], function (angular, config, constants) {

    angular.module('venus.user', [])

        .factory('$$user',['$rootScope','$$adapter','$http','localStorageService','$location','$stateParams','$state','$q','$timeout','ApiPath',
            function (
                $rootScope,$$adapter,$http,localStorageService,$location,$stateParams,$state,$q,$timeout,ApiPath
            ) {

                console.log('user.api加载完成');

                var User = function(){
                    this.userCode = '';
                    this.userName = '';
                    this.comCode = '';
                    this.roles = [];
                    this.rememberMe = false;
                    this.token = '';
                    this.centerCode = '';
                    this.centerName = '';
                    this.userComName = ''
                };

                User.prototype.logout = function(){
                    var _self = this;
                    if(!_self.rememberMe){
                        _self.userCode = _self.userName = _self.comCode =_self.centerCode =_self.centerName =_self.userComName= '';
                    }
                    _self.token = '';
                    updateUserInLocalStorage(_self);
                    clearCookies();
                    refreshUser(_self);
                    $rootScope.$broadcast(constants.AUTH.UNAUTHORIZED);
                };

                User.prototype.isLogin = function(){
                    getLocalStorage();
                    return (!this.userCode) ? false : true;
                };

                //清除缓存
                var clearCookies = function(){
                    console.log("清除cookie:"+localStorageService.cookie.get("venus"));
                    localStorageService.cookie.clearAll();
                    // localStorage.clear();
                };

                //更新本地缓存用户信息
                var updateUserInLocalStorage = function (_user) {
                    var _userInLocalStorage = {};
                    _userInLocalStorage.userCode = _user.userCode;
                    _userInLocalStorage.userName = _user.userName;
                    _userInLocalStorage.comCode = _user.comCode;
                    _userInLocalStorage.roles = _user.roles;
                    _userInLocalStorage.rememberMe = _user.rememberMe;
                    _userInLocalStorage.token = _user.token;
                    _userInLocalStorage.centerCode = _user.centerCode;
                    _userInLocalStorage.centerName = _user.centerName;
                    _userInLocalStorage.userComName = _user.userComName;

                    localStorageService.set(constants.LOCALSTORAGE.USER, _userInLocalStorage);
                };

                //调用后台注销接口，注销token
                var cancelToken = function(){
                    var url = ApiPath.api.logout;
                    var deferred = $q.defer();
                    var promise = $http({
                        method:'GET',
                        url:url
                    });
                    promise.then(
                        function(data){
                            deferred.resolve(data);
                        },function(error){
                            deferred.reject(error);
                        }
                    );
                    return deferred.promise;
                };


                var user = new User();

                //更新用户
                var refreshUser = function(_user){
                    if (_user) {
                        user.userCode = _user.userCode;
                        user.userName = _user.userName;
                        user.comCode = _user.comCode;
                        user.roles = _user.roles;
                        user.rememberMe = _user.rememberMe;
                        user.token = _user.token;
                        user.centerCode = _user.centerCode;
                        user.centerName = _user.centerName;
                        user.userComName = _user.userComName;
                    }
                    $rootScope.currentUser = user;
                    $rootScope.user = user;
                };



                //获取本地
                var getLocalStorage = function(){
                    var _userInLocalStorage = localStorageService.get(constants.LOCALSTORAGE.USER);
                    if (_userInLocalStorage) {
                        user.userCode = _userInLocalStorage.userCode;
                        user.userName = _userInLocalStorage.userName;
                        user.comCode = _userInLocalStorage.comCode;
                        user.roles = _userInLocalStorage.roles;
                        user.rememberMe = _userInLocalStorage.rememberMe;
                        user.token = _userInLocalStorage.token;
                        user.centerCode = _userInLocalStorage.centerCode;
                        user.centerName = _userInLocalStorage.centerName;
                        user.userComName = _userInLocalStorage.userComName;
                    }
                    $rootScope.user = user;
                };

                var init=function(){
                    // getLocalStorage();

                };
                init();

                return {

                    //配合单点登录，从后台获取已登录的用户信息
                    getLoginUser: function(options){
                        $http({
                            method:'GET',
                            url:ApiPath.api.getLoginUesr//调试单点登陆
                        }).then(
                            //通讯成功
                            function(data){
                                var _user = data.data.content.userInfo;
                                if(_user){
                                    user.userCode = _user.userCode;
                                    user.userName = _user.userName;
                                    user.comCode = _user.comCode;
                                    user.centerCode = _user.centerCode;
                                    user.centerName = _user.centerName;
                                    user.userComName = _user.userComName;
                                    user.roles = [constants.ROLE.NB];
                                    user.token = data.data.content.token;
                                    updateUserInLocalStorage(user);
                                    refreshUser(user);
                                    if(options && options.success && typeof(options.success=='function')){
                                        options.success(user);
                                    }
                                }
                            },
                            //通讯失败
                            function(error){
                                if(options && options.error && typeof(options.error=='function')){
                                    options.error(error);
                                }
                            }
                        );
                    },
                    //登出
                    logout: function(confirmLogout){
                        // _data = $$adapter.exports('logout', _data);
                        console.log("logout");
                        confirmLogout = confirmLogout || function(){
                                var deffer = $q.defer();
                                layerConfirm('确定要注销吗？','注销',{
                                    sure:function () {
                                        deffer.resolve();
                                    },
                                    cancel:function () {
                                        deffer.reject();
                                    }
                                });
                                return deffer.promise;
                            };
                        confirmLogout().then(
                            function(){
                                cancelToken().then(
                                    function(data){
                                        console.info("S-注销成功:");
                                        user.logout(); //清除本地存储
                                    },function(error){
                                        console.info("E-注销完成:",error.status);
                                        user.logout(); //清除本地存储
                                    }
                                );
                            }
                        );
                    },

                    //验证是否登录
                    isAuthenticated: function () {
                        var deferred = $q.defer();
                        if (user.isLogin()) {
                            deferred.resolve(constants.AUTH.OK);
                            // $rootScope.isLogout=false;
                        } else {
                            $rootScope.$broadcast(constants.AUTH.UNAUTHORIZED);
                            // $rootScope.isLogout=true;
                            deferred.reject(constants.AUTH.UNAUTHORIZED);
                        }
                        return deferred.promise;
                    },
                    //验证是否有权限
                    hasRoles: function(roles){
                        var deferred = $q.defer();
                        if(user.hasRoles(roles)){
                            deferred.resolve(constants.AUTH.OK);
                        } else {
                            $rootScope.$broadcast(constants.EVENTS.AUTH_REJECT);
                            deferred.reject(constants.AUTH.FORBIDDEN);
                        }
                        return deferred.promise;
                    },
                    getUserSession:function(){
                        return User;
                    }


                };
            }])
});