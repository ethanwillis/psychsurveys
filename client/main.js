if (Meteor.isClient) {
	Template.dashboard.rendered = function() {
		this.$('.ui.checkbox').checkbox();
	}
	Template.dashboard.events({
		'click [data-action=create-survey]': function() {
			Router.go('/management/create/survey');
		}
	});

	Template.create_survey.events({
		'click [data-action=create-survey]': function() {
			var survey_name = $('#surveyname').val();
			var project_name = $('#projectname').val();

			Meteor.call("createSurvey", survey_name, project_name, function(error, surveyid) {
				if(error) {
					// TODO: Error Handling
					// There was an error creating the survey
					console.log("ERROR Creating Survey: " + error);
				} else {
					Router.go('/management/update/survey/'+surveyid);			
				}
			});
		},
		'click [data-action=cancel]': function() {
			Router.go('/management/view/dashboard')
		}
	});

	Template.update_survey.rendered = function() {
		this.$('ui.dropdown').dropdown();
	}
}
