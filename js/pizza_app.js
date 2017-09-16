//inject ngFileUpload and ngImgCrop directives and services.
var app2 = angular.module("pizza_app", ['ngFileUpload', 'angular-img-cropper', "ngDialog", "webcam", "base64"]);

app2.controller('ctrl_fileupload', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.upload = function (dataUrl, name) {
	var blob = Upload.dataUrltoBlob(dataUrl, name);
	$scope.ngDialogData.img2 = URL.createObjectURL(blob);
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
        var blob = Upload.dataUrltoBlob(dataUrl, name);
        $scope.ngDialogData.img2 = URL.createObjectURL(blob);
    };    
}]);

app2.controller("ctrl_main", ["$scope", "ngDialog", "$http", "$base64",
      			      function($scope, ngDialog, $http, $base64){
    $http.get("./img/chuchu.png", {responseType: "arraybuffer"}
	).then(function(response) {
            var blob = new Blob([response.data], {type: "image"});           
            $scope.img2 = URL.createObjectURL(blob);
	}).catch(function (error) {
	    console.log("ERROR: " + error);
	    throw error;
	}
    );
    $scope.img1      = "./img/pizza.png";
    $scope.img1width = 30;
    $scope.article   = `
 *Instructions*

Imagine the left side of the screen is your smartphone screen. 
You are scrolling thorugh your phone as usual when you see 
this new filter on the app you are using. You decide to try it
out and take a selfie using your phone.

What you need to do is:
1. Provide a picture as what you would do in real life.
2. You can upload a picture of yourself using the "Picture" button.
Or, take a selfie using the "Webcam" option.
3. Make sure the picture shows your face clearly.
4. Take a screen shot of the screen after you finish.
5. You will be asked to upload the screenshot later in the 
survey for validation purposes.


Any picture you upload will be seen by the researchers only for 
reseach purposes and will not be diseminated in anyway. After 
the researcher verified your compliance of the task instructions,
all pictures will be deleted immediately.
If you have any concerns, please contact the reseacher:




`;
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
