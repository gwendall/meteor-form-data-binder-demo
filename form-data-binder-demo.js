if (Meteor.isClient) {
	
	// (1) Sets default data in session
	var defaultSessionData = { name: "Jac", nationality: [ "french" ] };
	Session.set('formData', defaultSessionData);
	
	var items = [
		{ name: "Nikola", nationality: "hungarian" }, 
		{ name: "Steve", nationality: "american" }, 
		{ name: "Jacques", nationality: "french" },
		{ name: "Leonardo", nationality: "italian" }
	];
	var nationalities = _.pluck(items, "nationality");
	
	Template.page.rendered = function() {
		// (2) Automatically fills the form with data set in (1)
		$("#aCoolForm").bindSessionToElement();
	}
	
	Template.page.helpers({
		items: function() {
			return items;
		},
		nationalities: function() {
			return nationalities;
		},
		formData: function () {
			return Session.get('formData');
		},
		defaultSessionData: function() {
			return defaultSessionData;
		}
	});
	
	Template.page.events = {
		'submit form': function(e) {
			return false;
		},
		'click .resetSessionToDefault': function(e) {
			// (3) Resets the session and binds the form to session
			Session.set('formData', defaultSessionData);
			$("#aCoolForm").bindSessionToElement();
		},
		'click .resetFormToDefault': function(e) {
			// (4) Binds the form to default values only (no session change) picking Name only
			$("#aCoolForm").bindDataToElement(defaultSessionData, ['name']);			
		}

	}
	
	Template.item.helpers({
		isSelected: function() {
			var self = this,
				selectedName = Session.get('formData').name || '',
				selectedNameRegex = new RegExp(selectedName, 'i'),
				nameMatches = self.name ? self.name.match(selectedNameRegex) : false,
				selectedNationalities = Session.get('formData').nationality || nationalities,
				nationalityMatches = _.contains(selectedNationalities, self.nationality),
				selected = nameMatches && nationalityMatches;
			return selected;
		}
	})
	
	UI.registerHelper("prettyPrint", function (data) {
	    return "<pre>" + JSON.stringify(data, undefined, 2) + "</pre>";
	});
}