var app = angular
            .module("Demo", ["ngRoute"])
            .config(function ($routeProvider) {
                 $routeProvider
                    .when("/home", {
                        templateUrl: "templates/home.html",
                        controller: "homeController"
                    })
                    .when("/about", {
                        templateUrl: "templates/about.html",
                        controller: "aboutController"
                    })
                    .when("/employees", {
                        templateUrl: "templates/employees.html",
                        controller: "employeesController"
                    })
					.when("/employee/:id", {
                        templateUrl: "templates/employeeDetails.html",
                        controller: "employeeDetailsController"
                    })
					.when("/addEmployee/:userName", {
                        templateUrl: "templates/addEmployee.html",
                        controller: "addEmployeeController"
                    })
					.otherwise({
						redirectTo: "/home"
					})
            })
            .controller("homeController", function ($scope) {
                $scope.home = "A Warm Welcome!";
            })
            .controller("aboutController", function ($scope) {
                $scope.about = "About Us";
            })
            .controller("employeesController", function ($scope, $http, $log) {
                $scope.students = "Employees details";
				$http({
					url: "http://poc-promiscuous-shadelessness.cfapps.io/getAllUsers",
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function(response) {
				    if(response.status==200){
						$log.info(response);
						$scope.response = response.data;
					}
				});
			})
			.controller("employeeDetailsController", function ($scope, $http, $routeParams, $log) {
                $scope.employeeDetails = "Employee Details";
				 $http({
						url: "http://poc-promiscuous-shadelessness.cfapps.io/getUserDetails?id="+$routeParams.id,
						method: "get",
						headers: {
						"Content-Type": "application/json"
						}
						}).then(function (response) {
							 if(response.status==200){
							$log.info(response);
							$scope.employee = response.data;
						}
					}) 
            })
			/* .controller("addEmployeeController", function ($scope, $http, $routeParams, $log) {
                $scope.employeeDetails = "Add Employee";
				 $http({
						url: "http://localhost:8080/addUser"
						method: "post",
						params:  "userName:$routeParams. "
						headers: {
						"Content-Type": "application/json"
						}
				}).then(function (response) {
						if(response.status==200){
							$log.info(response);
							$scope.addEmployeeStatus = "User added successfully...!";
						}
					}).then(function (error) {
							$log.info(error);
						})
					
			})  */