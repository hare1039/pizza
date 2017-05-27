//inject ngFileUpload and ngImgCrop directives and services.
var app2 = angular.module("pizza_app", ['ngFileUpload', 'angular-img-cropper', "ngDialog", "webcam"]);

app2.controller('ctrl_fileupload', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.upload = function (dataUrl, name) {
    	Upload.upload({
    	    url: "https://hare1039.ddns.net/webapps/pizza/upload",
    	    data: {
    		    file: Upload.dataUrltoBlob(dataUrl, name)
    	    },
    	}).then(function (response) {
    	    $timeout(function () {
    		$scope.result = response.data;
                if($scope.picFile != null){
                    $scope.ngDialogData.img2 = "//hare1039.ddns.net/webapps/pizza/img_up/" + $scope.picFile.name;
                }
    	    });
    	}, function (response) {
    	    if (response.status > 0)
                $scope.error_msg = response.status + ": " + response.data;
    	}, function (evt) {
    	    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
    	});
    };
}]);

app2.controller("ctrl_webcam", ["$scope", "Upload", "$timeout", 
				function ($scope, Upload, $timeout) {
    $scope.on_error   = function (err) {};
    $scope.on_stream  = function (stream) {};
    $scope.on_success = function (){};
    $scope.channel_0  = {
	videoWidth: 500,
	video: null 
    };
    $scope.show_webcam = true;
    $scope.make_snapshot = function(){	
	if ($scope.channel_0.video) {
	    var pat_canvas = document.createElement("canvas");
	    if (!pat_canvas) return;

	    pat_canvas.width  = $scope.channel_0.video.width;
	    pat_canvas.height = $scope.channel_0.video.height;
	    let ctxPat = pat_canvas.getContext("2d");

	    hidden_canvas        = document.createElement("canvas");
	    hidden_canvas.width  = $scope.channel_0.video.width;
	    hidden_canvas.height = $scope.channel_0.video.height;
	    var ctx = hidden_canvas.getContext("2d");
	    ctx.drawImage($scope.channel_0.video, 0, 0, $scope.channel_0.video.width, $scope.channel_0.video.height);
	    let idata = ctx.getImageData(0, 0, $scope.channel_0.video.width, $scope.channel_0.video.height);
	    ctxPat.putImageData(idata, 0, 0);

//	    $scope.webcam_canvas = pat_canvas.toDataURL();
	    $scope.snap = pat_canvas.toDataURL();
//	    $scope.snapout = idata;
	    $scope.show_webcam = false;
	    console.log("capture done");
	}
    };

    $scope.upload = function (dataUrl, name) {
    	Upload.upload({
    	    url: "https://hare1039.ddns.net/webapps/pizza/upload",
    	    data: {
    		    file: Upload.dataUrltoBlob(dataUrl, name)
    	    },
    	}).then(function (response) {
    	    $timeout(function () {
    		$scope.result = response.data;
                if($scope.snap != null){
                    $scope.ngDialogData.img2 = "//hare1039.ddns.net/webapps/pizza/img_up/blob";
                }		
    	    });
    	}, function (response) {
    	    if (response.status > 0)
                $scope.error_msg = response.status + ': ' + response.data;
    	}, function (evt) {
    	    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
    	});
    };    
}]);

app2.controller("ctrl_main", ["$scope", "ngDialog", function($scope, ngDialog){
    
    $scope.img1      = './img/pizza.png';
    $scope.img1width = 30;
    $scope.img2      = 'https://wonderopolis.org/wp-content/uploads//2015/03/203_f.jpg';
    $scope.article   = `
 *Experiment Instructions*
hello
woo





10









20









30`;
    $scope.cropper       = {};
    $scope.bounds        = {};
    $scope.bounds.left   = 0;
    $scope.bounds.right  = 0;
    $scope.bounds.top    = 0;
    $scope.bounds.bottom = 0;

    $scope.ng_del = function () {
	ngDialog.openConfirm({
	    template: "./pop_up.html",
	    className: "ngdialog-theme-default",
	    scope: $scope,
	    data: $scope,
	    width: 530	     
	});
	
    };
    $scope.ng_webcam = function () {
	ngDialog.openConfirm({
	    template: "./pop_up_webcam.html",
	    className: "ngdialog-theme-default",
	    scope: $scope,
	    data: $scope,
	    width: 530	     
	});
	
    };
}]);
