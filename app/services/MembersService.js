
app.service('MembersService', function($http){

	var members = [
		{ first_name : 'Scott', surname : 'Turner', numbers: [1,2,3,4,5,6] },
		{ first_name : 'Adam', surname : 'Sandler', numbers: [7,8,9,10,11,12] },
		{ first_name : 'Will', surname : 'Ferrell', numbers: [13,14,15,16,17,18] }
	];

	this.getMemberData = function(){
		
		return members;

	}

	this.getMemberById = function(memberId){

		return members[memberId];

	}

	this.addMember = function(member){

		members.push(member);

	}

	this.editMember = function(memberId, member){

		members[memberId] = member;

	}

	this.deleteMember = function(index){

		members.splice(index,1);

	}

});
