/**
 * Created by martin on 2017/12/08.
 */
'use strict';

var gulp = require('gulp');
//合并文件
// var concat = require('gulp-concat');//文件合并
//压缩文件
var minifyCss = require('gulp-minify-css');//css压缩
var uglify = require("gulp-uglify");//js压缩
var htmlmin = require('gulp-htmlmin');//html压缩
var imagemin=require('gulp-imagemin');//图片压缩
var pngquant = require('imagemin-pngquant');//对png格式图片深压缩
var ngAnnotate = require('gulp-ng-annotate');//处理angularjs依赖注入

//js压缩
gulp.task('js', function () {
    var options = {
        preserveComments:'some',//保留部分注释
        mangle: false,// 默认true 是否修改变量名
        // mangle: {except: ['require' ,'exports' ,'module','jquery',
        //     '$']},//排除混淆关键字
        compress: true//默认true 是否完全压缩
    };
    return gulp.src(['payment-venus/**/*.js','!payment-venus/lib/**/*'])
        .pipe(ngAnnotate())
        .pipe(uglify(options))
        .pipe(gulp.dest('payment-venus-develop'));

});

//html压缩
gulp.task('html', function () {
    var options = {
        collapseWhitespace: true,//清除空格
        collapseBooleanAttributes: true,//省略布尔属性的值
        removeComments: true, //清除注释
        removeEmptyAttributes: true,//清除所有空的属性
        removeScriptTypeAttributes: true,//清除所有script标签中的type="text/javascript"属性
        removeStyleLinkTypeAttributes: true,//所有Link标签上的type属性
        minifyJS: true,//压缩html中的javascript代码
        minifyCSS: true//压缩html中的javascript代码
    };
    gulp.src(['payment-venus/**/*.html','!payment-venus/lib/**/*'])
        .pipe(htmlmin(options))
        .pipe(gulp.dest('payment-venus-develop'));
});

//图片压缩
gulp.task('images', function(){
    var options = {
        optimizationLevel: 5, //Number类型  默认：3  取值范围：0-7（优化等级）
        progressive: true, //默认false 无损压缩jpg图片
        interlaced: true, //默认false 隔行扫描gif进行渲染
        multipass: true, //默认false 多次优化svg直到完全优化
        svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
        use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
    };
    gulp.src(['payment-venus/images/**/*.{png,jpg,gif,svg,ico}','!payment-venus/lib/**/*'])
        .pipe(imagemin(options))
        .pipe(gulp.dest('payment-venus-develop/images'));

});

//css压缩
gulp.task('css', function() {
    var options = {
        advanced: false,//默认true [是否开启高级优化（合并选择器等）]
        compatibility: 'ie8',//类型String 默认''or'*' [启用兼容模式； 'ie7'：ie7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        // keepBreaks: true,//默认false [是否保留换行]
        keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    };
    gulp.src(['payment-venus/css/**/*.css','!payment-venus/css/**/*.min.css','!payment-venus/lib/**/*'])
        .pipe(minifyCss(options))
        .pipe(gulp.dest('payment-venus-develop/css'));
    // gulp.src('payment-venus/lib/layer/skin/default/layer.css')
    //     .pipe(gulp.dest('payment-venus-develop/lib/layer/skin/default'));

    gulp.src(['payment-venus/css/**/*.min.css'])
        .pipe(gulp.dest('payment-venus-develop/css'));
    gulp.src(['payment-venus/lib/**/*'])
        .pipe(gulp.dest('payment-venus-develop/lib'));
    gulp.src(['payment-venus/fonts/**/*'])
        .pipe(gulp.dest('payment-venus-develop/fonts'));


});

//运行Gulp时，默认的Task
gulp.task('default', ['html','js','images','css']);



