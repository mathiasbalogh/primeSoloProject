app.controller('FormController', function(FormService){
    console.log('FormController is loaded');

  var form=this;

  form.todaysMood;
  form.todaysEntry = '';

  form.submitForm = function(){
    FormService.submitForm(form.todaysMood, form.todaysEntry).then(function(){
      console.log('this is form data', form.todaysMood, form.todaysEntry);
    });
  }
});
