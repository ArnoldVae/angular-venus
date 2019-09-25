define([
    'angular',
    'app',
    'plupload',
    'base64',
    'md5'
], function (angular, app) {
    app.registerController("uploadCtrl",['$scope','$modal','$modalStack','$q','$$user','$http',
        function ($scope,$modal,$modalStack,$q,$$user,$http) {

            $scope.cancel = function () {
                //ui-bootstrap.min.js中有修改
                $modalStack.dismissAll();

            };

            var options = {
                'bucket': 'sinosig-underwriting',//又拍云域名
                'save-key': '/{year}/{mon}/{day}/'+ $scope.businessNo.proposalNo + '_{random}{.suffix}',//上传又拍云时存储的文件名
                'expiration': Math.floor(new Date().getTime() / 1000) + 86400//又拍云的超时时间
            };
            var policy = window.btoa(JSON.stringify(options));//又拍云需要的参数
            var form_api_secret = 'b1z9yZJK8BAST0mllqpID1n2h30=';
            var signature = md5(policy + '&' + form_api_secret);//进行MD5加密
            //云地址
            var upUrl = "http://v0.api.upyun.com/"+options.bucket;
            var extensions = "jpg,gif,png";
            var uploader = new plupload.Uploader({//在这里用的基本都是flash插件里面的方法,跟Ajax有相似之处，最大区别在于是反复调用
                runtimes: 'flash',
                browse_button: 'pickfiles',//选择文件按钮，插件中的方法会自动弹框选择文件
                container: document.getElementById('uploader'),
                url: upUrl,//请求地址
                multipart_params: {//参数
                    'Filename': '${filename}',//文件名
                    'Content-Type': '',
                    'policy': policy,
                    'signature': signature
                },
                flash_swf_url: 'common/js/plupload/Moxie.swf',//引用文件的地址
                filters: {
                    mime_types: [{
                        title: "Image files",
                        extensions: extensions
                    }]
                },

                init: {
                    PostInit: function () {
                        $("#uploadfiles").on('click', function () {
                            uploader.start();//为插件中的start方法，进行上传
                            return false;
                        });
                    },
                    FilesAdded: function (up, files) {
                        plupload.each(files, function (file) {//循环在页面中写选中文件的名字
                            $("#filelist").append(
                                '<input name=	"thumbimg" readonly  style="border:0px;background-color:transparent;border-style:none;" class="form-control ' + file.id + '" value="'
                                + file.name
                                + '"/>');
                            $("#filelist").append(
                                '<label for="none" readonly class="control-label processbar col-md-1 ' + file.id + '" ></label><br/>');
                        });
                    },
                    UploadProgress: function (up, file) {
                        $("label." + file.id).html(file.percent + '%');//上传进度条
                    },

                    FileUploaded : function(up, file, response) {//这里response为又拍云服务器返回的上传信息
                        var responseObj = JSON.parse(response.response);
                        methodN01 = "v0204"; //选择的方法
                        requestType = "010";
                        channe=JSON.stringify();
                        auth=JSON.stringify();
                        log=JSON.stringify();
                        version="";
                        if (responseObj.code == "200") {//解析response获取responsecode  200为交互成功，其他都为失败，具体信息参数又拍云帮助文档
                            $http({//这里交互成功后对上传成功的图片进行数据库存储信息
                                method: 'POST',
                                dataType: "JSON",
                                contentType: 'application/json; charset=UTF-8',
                                url: "prpservice/combineInputQuery",
                                headers: {},
                                data:{
                                    method :methodN01,
                                    channe:channe,
                                    auth:auth,
                                    log:log,
                                    version:version,
                                    param:{
                                        'businessNo':$scope.businessNo.proposalNo,
                                        'policyNo':'',
                                        'sessionvo':$$user.getUserSession(),
                                        'returnUrl':responseObj.url     //访问上传图片的URL地址
                                    }
                                }
                            })
                                .success(function (data) {

                                })
                                .error(function (e, code) {

                                });
                        }else{
                            $("label." + file.id).html("与又拍云交互失败");
                        }
                    },
                    Error: function (up, err) {
                        $('#condolences').val(
                            'Error : ' + err.code + '-' + err.message);
                    }
                }
            });

            uploader.init();

    }])
});