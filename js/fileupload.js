//inject ngFileUpload and ngImgCrop directives and services.
var app2 = angular.module('fileupload_app', ['ngFileUpload', 'ngImgCrop', 'angular-img-cropper', "ngDialog"]);

app2.controller('ctrl_fileupload', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.upload = function (dataUrl, name) {
    	Upload.upload({
    	    url: 'https://hare1039.ddns.net/webapps/pizza/upload',
    	    data: {
    		    file: Upload.dataUrltoBlob(dataUrl, name)
    	    },
    	}).then(function (response) {
    	    $timeout(function () {
    		    $scope.result = response.data;
                if($scope.picFile != null){
                    $scope.img2 = "//hare1039.ddns.net/webapps/pizza/img_up/" + $scope.picFile.name;
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


app2.controller("ctrl_main", ["$scope", function($scope){
    
    $scope.img1      = './img/pizza.png';
    $scope.img1width = 30;
    $scope.img2      = 'http://wonderopolis.org/wp-content/uploads//2015/03/203_f.jpg';
    $scope.article   = `
L1







10









20









30`;
    $scope.cropper = {};
    $scope.bounds = {};
    $scope.bounds.left = 0;
    $scope.bounds.right = 0;
    $scope.bounds.top = 0;
    $scope.bounds.bottom = 0

}]);
