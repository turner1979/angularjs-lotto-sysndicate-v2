
app.controller('UpdateMembersCtrl', ['$scope','MembersService','$timeout','$stateParams','$location', function($scope,MembersService, $timeout, $stateParams,$location) {
 
	$scope.board 		= [];										// used for generating numbers board (1-59)
	$scope.states  		= [];										// holds the state of each number (true if selected)
	$scope.user_numbers = [];										// holds users chosen numbers
	$scope.picked  		= 0;										// how many numbers have been picked so far
	$scope.submitted	= false;									// whether the form has been submitted
	$scope.form_msg     = '';										// holds the form message
	$scope.mode         = $stateParams.memberId ? 'Edit' : 'Add';	// holds mode (either Add or Edit)


	// generates board array and sets states
	$scope.init = function(preventPopulateMember){

		for(var i=0;i<59;i++){
			$scope.board[i] = i+1;
			$scope.states[i] = false;
		}
		$scope.user_numbers = [];
		$scope.picked = 0;

		if($scope.mode == 'Edit' && !preventPopulateMember){
			$scope.populateMember();
		}

	}

	// for selecting / unselecting numbers
	$scope.pickNumber = function(index){

		if($scope.states[index] == true){
			$scope.states[index] = false;
			$scope.picked--;
		}
		else {

			if($scope.picked < 6){
				$scope.states[index] = true;
				$scope.picked++;
			}
		}

		if($scope.picked == 6){
			$scope.buildUserNumbers();
		}
	}

	// builds user_numbers array based on states array values
	$scope.buildUserNumbers = function(){

		$scope.user_numbers = [];
		for(var i=0;i<$scope.states.length;i++){
			if($scope.states[i]){
				$scope.user_numbers.push(i+1);
			}
		}

	}

	// for choosing random numbers
	$scope.randomNumbers = function(){

		var picked = 0;
		var number = 0;

		$scope.init(true);

		while(picked != 6){

			number = Math.floor((Math.random() * 59) + 0);

			if($scope.states[number] == false){
				$scope.states[number] = true;
				picked++;
			}

		}

		$scope.buildUserNumbers();
		$scope.picked = 6;

	}

	// clears the numbers on the board
	$scope.clearNumbers = function(){

		$scope.init(true);

	}

	// form submission event
	$scope.submitForm = function(){

		if($scope.first_name && $scope.surname){

			if($scope.picked == 6){

				var member = {
					first_name : $scope.first_name,
					surname: $scope.surname,
					numbers : $scope.user_numbers
				}

				if($scope.mode == 'Add'){
					MembersService.addMember(member);
					$scope.form_msg = 'New member has been added';
				}
				else{
					MembersService.editMember($stateParams.memberId,member);
					$scope.form_msg = 'Member has been updated';
				}
				
				$scope.clearForm();

			}

		}

	}

	// for clearing form fields
	$scope.clearForm = function(){

		$timeout(function(){
			$scope.first_name 	= '';
			$scope.surname 		= '';
			$scope.form_msg     = '';
			$scope.submitted    = false;
			$scope.init();

			if($scope.mode == 'Edit'){
				 $location.url('view-members');
			}
		},3000);	

	}

	// selects numbers and populates form fields based on memberId in $stateParams
	$scope.populateMember = function(){

		var intRegex = /^-?[0-9]+$/;

		if(intRegex.test($stateParams.memberId)){
			
			var obj = MembersService.getMemberById($stateParams.memberId);
			if(obj != undefined){

				$scope.first_name 	= obj.first_name;
				$scope.surname 		= obj.surname;
				$scope.title       	= 'Editing Member: ' + $scope.first_name + ' ' + $scope.surname;
				$scope.form_btn		= 'Edit Member';

				for(var i=0;i<obj.numbers.length;i++){
					var num = obj.numbers[i] - 1;
					$scope.states[num] = true;
				}

				$scope.buildUserNumbers();
				$scope.picked = 6;

			}

		}

	}

}]);