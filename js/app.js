var app = angular.module('myApp', ['ngRoute'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'pages/page/home.html',
          controller: 'myctrl'
        })
        .when('/add-phong-ban', {
          templateUrl: 'pages/phong_ban/add_phong_ban.html',
          controller: 'AddphongbanCtrl'
        })
        .when('/list-phong-ban', {
          templateUrl: 'pages/phong_ban/list_phong_ban.html',
          controller: 'phongbanCtrl'
        })
        .when('/add-cong-viec', {
          templateUrl: 'pages/cong_viec/add_cong_viec.html',
          controller: 'addcongviecCtrl'
        })
        .when('/list-cong-viec', {
          templateUrl: 'pages/cong_viec/list_cong_viec.html',
          controller: 'phongbanCtrl'
        })
        .when('/add-user', {
          templateUrl: 'pages/user/add_user.html',
          controller: 'adduserCtrl'
        })
        .when('/list-user', {
          templateUrl: 'pages/user/list_user.html',
          controller: 'phongbanCtrl'
        })
        .when('/add-thong-bao', {
          templateUrl: 'pages/thong_bao/add_thong_bao.html',
          controller: 'addthongbaoCtrl'
        })
        .when('/list-thong-bao', {
          templateUrl: 'pages/thong_bao/list_thong_bao.html',
          controller: 'phongbanCtrl'
        })
        .when('/list-gop-y', {
          templateUrl: 'pages/gop_y/list_gop_y.html',
          controller: 'phongbanCtrl'
        })
        .when('/update', {
          templateUrl: 'pages/phong_ban/update_phong_ban.html',
          controller: 'update'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
app.controller("phongbanCtrl",function($scope,$http){
  $http.get("http://localhost:3000/loaiphongban").then(function(response){
  $scope.list_phongban = response.data;
  $scope.prop = "name";
  $scope.sortBy = function(prop){
    $scope.prop = prop;
  }
  $scope.begin = 0;
  $scope.pageCount = Math.ceil($scope.list_phongban.length / 8);
  $scope.first = function(){
    $scope.begin = 0;
  }
  $scope.prev = function(){
    if ($scope.begin>0) {
      $scope.begin -=8;
    }
  }
  $scope.next = function(){
    if ($scope.begin < ($scope.pageCount - 1)*8) {
      $scope.begin +=8;
    }
  }
  $scope.last = function(){
    $scope.begin = ($scope.pageCount - 1)*8;
  }
  $scope.xoa =  function(id){
    var id = $scope.list_phongban.id;
    $http.delete('http://localhost:3000/loaiphongban/'+id).then(function(response){
  alert("DELETE thành công");
    }).catch(function(error){
        alert("DELETE thất bại");
    })
}
  $scope.update =  function(){
    $http.put('http://localhost:3000/loaiphongban'+$scope.id,{
        name: $scope.name,
        phongban: $scope.phongban,
        decs: $scope.decs
    }).then(function(response){
  alert("Update thành công");
  sessionStorage.removeItem('login');
    }).catch(function(error){
        alert("Update thất bại");
    })
  }
});
});
app.filter('percentage',function($filter){
  return function(input, decimals){
    return $filter('number')(input * 100,decimals) + '%';	
  };
});
app.controller("AddphongbanCtrl",function($scope,$http){
  $scope.add_phongban =  function(){
      $http.post('http://localhost:3000/loaiphongban',{
        name: $scope.name
      }).then(function(response){
    alert("Thêm phòng ban thành công");
      }).catch(function(error){
          alert("Thêm phòng ban thất bại");
      })
  }
});
app.controller("addcongviecCtrl",function($scope,$http){
  $scope.add_congivec =  function(){
      $http.post('http://localhost:3000/loaiphongban',{
        name: $scope.name,
        phongban: $scope.phongban,
        decs:$scope.decs,
        date:$scope.date
      }).then(function(response){
    alert("Thêm công việc thành công");
      }).catch(function(error){
          alert("Thêm công việc thất bại");
      })
  }
});
app.controller("adduserCtrl",function($scope,$http){
  $scope.add_user =  function(){
      $http.post('http://localhost:3000/loaiphongban',{
        name: $scope.name,
        email: $scope.email,
        password: $scope.password,
        stress: $scope.stress,
        phone:$scope.phone,
        phongban:$scope.phongban,
        level:$scope.level,
        linkhangout:$scope.linkhangout
      }).then(function(response){
    alert("Thêm nhân viên thành công");
      }).catch(function(error){
          alert("Thêm nhân viên thất bại");
      })
  }
});
app.controller("addthongbaoCtrl",function($scope,$http){
  $scope.add_thongbao =  function(){
      $http.post('http://localhost:3000/loaiphongban',{
        name: $scope.name,
        phongban: $scope.phongban,
        decs:$scope.decs
      }).then(function(response){
    alert("Thêm thông báo thành công");
      }).catch(function(error){
          alert("Thêm thông báo thất bại");
      })
  }
});
app.controller("loginCtrl",function($scope,$http){
  $scope.loginCtrl = false;
	if(sessionStorage.getItem('login')){
        $scope.loginCtrl = true;
        $scope.info = angular.fromJson(sessionStorage.getItem('login'));
    }
    $scope.list_products = loaiphongban;
    $http.get("http://localhost:3000/loaiphongban").then(function(res){
		$scope.nhanvien = res.data;
        $scope.login = function(){

			var user = check_login($scope.name,$scope.password);
			if(user){
				sessionStorage.setItem('login',angular.toJson(user));	
				$scope.loginCtrl = true;
			}
		}	
		function check_login(name,pass){
			for(var i = 0; i < $scope.nhanvien.length;i++){
                if(name == $scope.nhanvien[i].name && pass == $scope.nhanvien[i].password){
          $scope.info = $scope.nhanvien[i];
          window.location.href='index.html';
          return $scope.nhanvien[i];
				}
      }
      alert('đăng nhập thất bại');
			return $scope.loginCtrl = false;
		}
		$scope.logout   = function(){
      sessionStorage.removeItem('login');
      window.location.href='login.html';
			$scope.loginCtrl = false;
    }
		// $scope.repas = function(){
    //         for(var i = 0; i < $scope.nhanvien.length;i++){
    //            if($scope.email != ""){
    //                if($scope.email == $scope.nhanvien[i].email)
		// 				alert('mật khẩu là:'+$scope.nhanvien[i].password);
		// 				sessionStorage.removeItem('login');
    //             }
    //         }
    //     }

	})
	
})