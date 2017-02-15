app.controller('FormController', function(FormService){
    console.log('FormController is loaded');

  var form=this;
  form.searchType = 0;
  form.placeHolder = "Choose a search type."

  form.updateType = function(){
    switch (form.searchType) {
      case '1': //date
        form.placeHolder = "yyyy-mm-dd";
        break;
      case '2': //keyword
        form.placeHolder = "Any word or phrase";
        break;
      case '3': //month
        form.placeHolder = "October";
        break;
      case '4': //rating
        form.placeHolder = "1-10"
        break;
      case '5': //timespan
        form.placeHolder = "Month Year-Month Year";
        break;
      default:
        form.placeHolder = "Choose a search type."
    }
  }
  form.submitForm = function(){
    FormService.submitForm(form.todaysMood, form.todaysEntry).then(function(){
      console.log('this is form data', form.todaysMood, form.todaysEntry);
    });
  }

  form.searchForms = function(searchType, searchQuery){
    FormService.searchForms(searchType, searchQuery).then(function(res){
      console.log('these are the forms your requested', res);
    });
  }
});
