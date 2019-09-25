define([
    'config'
], function (config) {
    angular.module('mc.menu', [
        // 'venus.adapter'
    ])
        .directive('mcMenu', ['$state', '$parse','$$adapter',
            function ($state, $parse) {

                return {
                    restrict: 'AE',
                    require: 'mcMenu',
                    replace: true,
                    templateUrl: 'template/mc/menu/menu.directive.html',
                    controller:'menuCtrl',
                    controllerAs:'$menu',
                    compile: function () {
                        return function (scope, element, attrs, ctrl) {
                            var $menu = ctrl;
                            $menu.menus = $parse(attrs.data)(scope);
                            $menu.activeIndex = $parse(attrs.activeIndex)(scope) || -1;


                            $menu.onMenuSelect = function (menu) {
                                $parse(attrs.onMenuSelect)(scope,{menu:menu}) || angular.noop;
                            };

                            $menu.activeIndexSetter = attrs.activeIndex ? function (index) {
                                $parse(attrs.activeIndex).assign(scope, index);
                            } : angular.noop;

                            scope.$watch(attrs.activeIndex, function (menu, v) {
                                $menu.selectActive(menu, v)
                            });

                            $menu.callback = function (cbFn) {
                                $parse(cbFn)(scope);
                            }
                        }
                    }
                }

            }
        ])
        .controller('menuCtrl', ['$state', '$timeout', function ($state, $timeout) {
            var ctrl = this;
            ctrl.menus = [];
            ctrl.activeIndex = undefined;
            ctrl.lastActiveIndex = undefined;

            var findMenu = function(url) {
                var _index = -1;

                angular.forEach(ctrl.menus, function(menu, index) {
                    if (menu.uiSref == url) {
                        _index = index;
                        return
                    }
                });

                return _index;
            };

            ctrl.selectActive = function (index) {
                if (index == undefined || index<0)
                    return false;

                this.activeIndex = index;

                this.menus[index].active = true;

                if(this.lastActiveIndex>=0 && this.lastActiveIndex!=index){
                    this.menus[this.lastActiveIndex].active = false;
                }
                this.lastActiveIndex = index;
                this.activeIndexSetter(index);

                this.onMenuSelect(this.menus[index]);
            };

            $timeout(function(){
                ctrl.selectActive(findMenu($state.current.url.replace("/","")));
            },100);

        }])

        .factory('$$menu', ['$q', '$http',
            '$$adapter',
            function ($q, $http, $$adapter) {
                //通知实例
                var _menu = function (data) {
                    this.menus=[];
                    if(data){
                        this.menus=data
                    }
                };

                return {
                    /**
                     * 菜单获取接口
                     */
                    getMenu: function (options) {
                        // // 请求地址
                        //  config.httpPackage.url = config.backend.localIp + config.backend.GETUSER;
                        // // 后端入参适配
                        // config.httpPackage.data = $$adapter.export(constants.REQUEST_METHOD.GET_MENU,data);
                        // // 请求网络
                        // $http(config.httpPackage).then(
                        //     function (data) {
                        //         //后端回参适配
                        //         data = $$adapter.import(constants.REQUEST_METHOD.GET_MENU, data);
                        //         if (!data) {
                        //             options.error("适配器验证不通过");
                        //         } else {
                        //             var menu = new _menu(data);
                        //             options.success(menu);
                        //         }
                        //     },
                        //     function (error) {
                        //         if (options && options.error && typeof(options.error == 'function')) {
                        //             options.error(error);
                        //         }
                        //     }
                        // );
                        //模拟菜单数据
                        var data = [
                            {
                                "title": "摘要查询",
                                "menuIcon": "glyphicon glyphicon-adjust",
                                "uiSref": "digests"
                            },
                            {
                                "title": "客户查询",
                                "menuIcon": "glyphicon glyphicon-book",
                                "uiSref": "customers"
                            },
                            {
                                "title": "组织机构管理",
                                "menuIcon": "glyphicon glyphicon-list-alt",
                                "uiSref": "organizations"
                            },
                            {
                                "title": "人员管理",
                                "menuIcon": "glyphicon glyphicon-time",
                                "uiSref": "employees"
                            },
                            {
                                "title": "发票管理",
                                "menuIcon": "glyphicon glyphicon-credit-card",
                                "uiSref": "invoices"
                            },
                            {
                                "title": "结算管理",
                                "menuIcon": "glyphicon glyphicon-random",
                                "uiSref": "settlement"
                            }
                        ];
                        var menu = new _menu(data);
                        options.success(menu);

                    }
                }
            }]);
});

