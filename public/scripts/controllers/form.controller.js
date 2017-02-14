app.controller('FormController', function(FormService){
    console.log('FormController is loaded');

  var form=this;


  form.submitForm = function(){
    FormService.submitForm(form.todaysMood, form.todaysEntry).then(function(){
      console.log('this is form data', form.todaysMood, form.todaysEntry);
    });
  }

  form.searchForms = function(searchQuery){
    FormService.searchForms(searchQuery).then(function(res){
      console.log('these are the forms your requested', res);
    });
  }
});
