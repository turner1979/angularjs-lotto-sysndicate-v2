
app.controller('ViewMembersCtrl', ['$scope','MembersService',function($scope,MembersService) {
 
	$scope.members = MembersService.getMemberData();

	$scope.deleteMember = function(index){

		MembersService.deleteMember(index);

	}

}]);