if(Meteor.isServer){
	Meteor.startup(function() {
		var users = [
			{first_name: "Admin", last_name: "User", email: "admin@example.com", roles:['site-admin']},
			{first_name: "Research", last_name: "Group", email: "rg@example.com", roles:['group-admin', 'create-surveys']},
			{first_name: "RG", last_name: "User", email: "rguser@example.com", roles:['group-user', 'create-surveys']}
		];

		if(Meteor.users.find({}).count() === 0) {
				_.each(users, function(user) {
					var id;
					id = Accounts.createUser({
						email: user.email,
						password: "testpassword",
						profile: { first_name: user.first_name, last_name: user.last_name }
					});
					if(user.roles.length > 0) {
						Roles.addUsersToRoles(id, user.roles);
					}
			});
		}
	});

	Meteor.methods({
			createSurvey: function(survey_name, project_name) {
				var survey = {isActive: false, survey_name: survey_name, project_name: project_name};
				Surveys.insert(survey, function(error, surveyid) {
					if(error) {
						// TODO: Error handling when survey can't be created
						console.log("SERVER ERROR CREATING SURVEY: " + error);
					} else {
						return surveyid;
					}
				});
			}

	});
}
