define([
    'app',
    'route',
    'constants',
    'layer'
], function (app,route,constants,layer) {

    /**
     * @desc 主模块的运行块
     */
    app.run(['$couchPotato', '$state', '$stateParams', '$rootScope', '$translate',
        function ($couchPotato, $state, $stateParams, $rootScope, $translate) {

            app.lazy = $couchPotato;//懒装载
            $rootScope.$state = $state;//根scope获取路由信息
            $rootScope.$stateParams = $stateParams;//根scope获取路由参数信息

            $rootScope.lang =  window.localStorage.lang||'zh-cn';//记录用户上一次访问是英文还是中文，如果undefined默认为中文

            //每次加载语言包需要刷新
            $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
                $translate.refresh();
            });

        }
    ]);

    /**
     * layer弹窗配置
     */
    layer.config({
        path: 'lib/layer/'      //layer.js所在的目录，可以是绝对目录，也可以是相对目录
    });
    //layer弹框提示
    Window.prototype.layerMsg = function(data,target){
        var icon = target == 'success'?"1":"2";
        layer.alert(data, {
            icon: icon,
            skin: 'layer-ext-moon' //该皮肤由layer.seaning.com友情扩展。关于皮肤的扩展规则，去这里查阅
        });
    };
    //layer询问弹框
    Window.prototype.layerConfirm = function (content, title, option) {
        layer.confirm(content, {
            title: title ,
            btn: ['确定','取消'], //按钮
            icon: '3',
            skin: 'layer-ext-moon'
        }, function(index){
            //点确定回调方法
            layer.close(index);
            option.sure();
        }, function () {
            option.cancel();
        });
    };

    //返回按钮带回调函数
    Window.prototype.layerOpen = function (content, option) {
        layer.open({
            content: content
            ,btn: ['确定','取消'] //按钮
            ,yes: function(index, layero){
                //按钮【按钮一】的回调
                layer.close(index);
                option.sure();
            },btn2: function(index, layero){
                //按钮【按钮二】的回调
                option.cancel();
            },cancel: function(){
                //右上角关闭回调
                option.cancel();
            }
        });
    };

    /**
     * @desc 主模块的初始配置
     */
    app.config(['$httpProvider', 'localStorageServiceProvider', '$translateProvider', function ($httpProvider, localStorageServiceProvider, $translateProvider) {

        //解决跨域问题
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        //本地缓冲前缀
        localStorageServiceProvider.setPrefix('venus');

        //拦截器
        var pendingNum=0;//请求中接口数量
        $httpProvider.interceptors.push(function ($rootScope,$location,$window,$timeout) {

            return {
                'request': function (config) {
                    //post请求时添加loading样式
                    if(config.method=='POST'&&config.url){
                        pendingNum++;
                        $(".loading").addClass("splash-loading");
                    }

                    return config;
                },
                'requestError': function (rejection) {
                    return rejection;
                },
                'response': function (response) {
                    //post请求为0时移除loading
                    if(response.config.method=='POST'){
                        pendingNum--;
                        if(pendingNum==0){
                            $(".loading").removeClass("splash-loading");

                        }
                    }
                    return response;
                },
                'responseError': function (rejection) {
                    //post请求为0时移除loading
                    if(rejection.config){
                        if(rejection.config.method=='POST'){
                            pendingNum--;
                            if(pendingNum==0){
                                $(".loading").removeClass("splash-loading");

                            }
                        }
                    }

                    if (rejection.status == '401'){
                        var redirectUrl = rejection.headers(constants.HEADERS.AUTH_URL_NAME);
                            if(redirectUrl != null) {
                                console.log("未被授权的操作,准备跳转:"+redirectUrl+ $location.absUrl());
                                $window.location.href = redirectUrl+ $location.absUrl();
                            }else{
                                angular.alert("未被授权的操作");
                            }

                    }else if(rejection.status === 300) {
                        var redirectUrl = rejection.headers(constants.HEADERS.REDIRECT_URL_NAME);
                        if(!redirectUrl) {
                            console.log("未提供跳转地址");
                        }else{
                            //此判断为了做版本兼容
                            if(redirectUrl.indexOf("?") > 0){
                                redirectUrl = redirectUrl+ $location.absUrl() +"&c=0";
                            }
                            //等待本地资源清理
                            $timeout(function(){
                                $window.location.href = redirectUrl;
                            },500);
                        }
                    }
                    // 服务器异常
                    //if(rejection.status){
                    //    $rootScope.$broadcast(constants.EVENTS.BACKEND_EXCEPTION, {code:-2,message:rejection.status+'服务器系统异常，请联系管理员'});
                    //
                    //}

                    return rejection;
                }
            };
        });
        // Initialize get if not there
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        //禁用IE对ajax的缓存
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


        //国际化
        var lang = window.localStorage.lang||'zh-cn';
        $translateProvider.preferredLanguage(lang);//默认加载语言包
        //MessageFormat 插值服务
        $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
        //异步加载，部分装载机制
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'lib/translate/i18n/{- `ytpart}/{lang}.json'
        });

        /*
         * 如果英语包没加载，则回退加载中文包
         * 参数可以放数组
         * 如果加载包中没有相应字段将在回退包中找到并加载
         */
        $translateProvider.fallbackLanguage('zh-cn');

    }]);

});
