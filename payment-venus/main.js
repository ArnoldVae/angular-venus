require.config({
    baseUrl: '',
    urlArgs: 'v=' + window.VENUS.version,
    paths: {
        'jquery':'lib/jquery/jquery.min',
        'angular':'lib/angular/angular1.2.20',
        'ui-bootstrap':'lib/ui-bootstrap/ui-bootstrap-0.12.0',
        'mc-bakery':'lib/mc-bakery/mc-bakery-tpls-0.0.2',
        'angular-ui-router':'lib/angular-ui-router/angular-ui-router.min',
        'angular-couch-potato':'lib/angular-couch-potato/angular-couch-potato',
        'angular-ui-router-styles' : 'lib/angular-ui-router-styles/ui-router-styles',
        'angular-local-storage':'lib/angular-local-storage/angular-local-storage',
        'plupload':'lib/plupload/plupload.full.min',
        'app':'app',
        'app-init':'app-init',
        'route':'route',
        'indexCtrl':'frame/index.ctrl',
        'codes':'mock/data/codes.' + window.VENUS.runMode,
        'config':'config',
        'jsonDB':'mock/data/data',
        'jsonDB2':'mock/data/data2',
        'constants':'utilities/constant/constants',
        'backend-mocks':'mock/backend-mocks.'+ window.VENUS.runMode,
        'mc-validator':'widgets/mc.validator',
        'jedate':'lib/angular-jedate/jedate',
        'angular-jedate':'lib/angular-jedate/angular-jedate',
        'angular-sanitize':'lib/angular-sanitize/angular-sanitize',
        'ui-select':'lib/angular-ui-select/select',
        'angular-mocks':'lib/angular-mocks/angular-mocks',
        'base64':'lib/plupload/Base64',
        'json2':'lib/plupload/json2',
        'md5':'lib/plupload/md5',
        'layer':'lib/layer/layer',
        '_':'lib/lodash',

        'html5shiv':'lib/Flat-UI/html5shiv',
        'respond':'lib/Flat-UI/respond.min',
        'video':'lib/Flat-UI/video',
        'flat-ui':'lib/Flat-UI/flat-ui',
        'application':'lib/Flat-UI/application',
        'angular-ui-tree':'lib/angular-ui-tree/angular-ui-tree',
        'angular-file-uplaod':'lib/angular-file-upload/angular-file-upload.min',
        'angular-drag':'lib/angular-drag/angular-drag',

        'eChart': 'lib/echarts',

        //国际化
        'ngTranslate':'lib/translate/angular-translate-2.9.0.1/angular-translate.min',
        'ngTranslateLoaderPartial':'lib/translate/angular-translate-loader-partial-2.12.1/angular-translate-loader-partial.min',
        'messageformat':'lib/translate/messageformat/messageformat',
        'ngTranslateMessageFormat':'lib/translate/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.min',
        'i18n': 'mc.i18n',
        'ngTranslateStorageCookie':'lib/translate/angular-translate-storage-cookie/angular-translate-storage-cookie.min',
        'ngTranslateStorageLocal':'lib/translate/angular-translate-storage-local/angular-translate-storage-local.min',
        'ngTranslateLoaderStaticFiles':'lib/translate/angular-translate-loader-static-files-2.12.1/angular-translate-loader-static-files.min',

        //placeholder兼容ie9
        'modernizr' : 'lib/modernizr/modernizr-2.0.6.min',
        'placeholder' : 'lib/placeholder',

        /*框架模块入口文件*/
        'framework':'frame/frame.mod',
        'utility':'utilities/utilities.mod',
        'widget': 'widgets/widgets.mod',
        /*业务模块入口文件*/
        'business': 'components/business.mod'
    },
    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'angular': {
            exports: 'angular'
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-couch-potato': {
            deps: ['angular']
        },
        'angular-ui-router-styles':{
            deps:['angular']
        },
        'angular-local-storage': {
            deps: ['angular']
        },
        'ui-bootstrap': {
            deps: ['angular']
        },
        'mc-bakery': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'ui-select': {
            deps: ['angular-sanitize']
        },
        'angular-mocks': {
            deps: ['angular']
        },
        'jedate':{
            deps:['jquery']
        },
        'application':{
            deps:['jquery']
        },
        'angular-ui-tree': {
            deps: ['angular']
        },
        'angular-file-uplaod': {
            deps: ['angular']
        },
        'angular-drag': {
            deps: ['angular']
        },
        'eChart': {
            // deps: ['angular']
        },
        'ngTranslate': {
            deps: ['angular']
        },
        'ngTranslateLoaderPartial': {
            deps: ['ngTranslate']
        },
        'ngTranslateLoaderStaticFiles': {
            deps: ['ngTranslate']
        },
        'ngTranslateStorageLocal': {
            deps: ['angular']
        },
        'ngTranslateStorageCookie': {
            deps: ['angular']
        },
        'i18n': {
            deps: ['ngTranslate']
        },
        'ngTranslateMessageFormat':{
            deps:['ngTranslate']
        }
    },
    priority: [
        'jquery',
        'angular',
        'app-init',
        'indexCtrl'
    ],
    waitSeconds: 250
});

require([
    'jquery',
    'angular',
    'app-init',
    'indexCtrl',
    'eChart',
    'ngTranslate',
    'placeholder'
], function ($, angular) {
    angular.element().ready(function () {
        angular.bootstrap($("#ng-app"), ["mc.venus"]);
        $(".splash-window").removeClass("splash-window");
    })
});