Router.configure({
	layoutTemplate: "DefaultLayout"
});

// Common Routes
AccountsTemplates.configureRoute('signIn', {
	name: 'signIn',
	path: '/',
	template: 'signIn',
	layoutTemplate: 'DefaultLayout',
	redirect: function() {
		//TODO: Redirect users based on the roles
		Router.go('/management/view/dashboard');
	}
});

// Participant Routes
Router.route('/participant/view/survey', function() {
	this.render('view_survey');
});

// Management Routes
Router.route('/management/create/survey', function() {
	this.render('create_survey');
});

Router.route('/management/update/survey/:_id', function() {
	var params = this.params;
	this.render('update_survey', {
		data: {
			survey_id: params._id
		}
	});
});

Router.route('/management/view/dashboard', function() {
	this.render('dashboard', {
		data: {
			surveys: Surveys.find({})
		}				
	});
});

Router.route('/management/view/survey/stats', function() {
	this.render('survey_stats');
});
