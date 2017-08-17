$(function() {

  const config = {
    apiKey: "AIzaSyB6UJIHWiRO7gv8S517cC6f9zlCviRMvNU",
    authDomain: "strokere-c60f6.firebaseapp.com",
    databaseURL: "https://strokere-c60f6.firebaseio.com",
    projectId: "strokere-c60f6",
    storageBucket: "strokere-c60f6.appspot.com",
    messagingSenderId: "900063170507"
  };
  firebase.initializeApp(config);
  database = firebase.database();
  var ref = database.ref();
  refChild = ref.child('Exercises/Name');
  
  ref.on('value', gotData, errData);
  const state = {
    name: '',
  };

  $('.js-form').on('submit', event => {
    event.preventDefault();
    const exercise = $('#js-Name').val() || state.Name;
    firebase.auth().createName(name).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      //example for the pushing to database, object is the JS variable that we want to send to the
      //sever . ref is the parent branch
      //firebase.database().ref('parentbranch').push({
      //  object



      // ...
    });
  });

  function gotData(data) {

refChild.once("value", function(snapshot) {
  snapshot.forEach(function(child) {
        console.log(child.key+": "+child.val());
        var a =  child.val();
        var b = a.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
        document.getElementById("exerciselist").innerHTML += ("<tr>" + "<td>" + b + "</td>" +  "<th>" +
            "<form> <button type='radio'> </button> </form>" + "</th>" + "<tr>");
  });
});

    //var patientlistings = selectAll('.patientlisting');
    //for (var i = 0; i < patientlistings.length ; i++) {
      //patientlistings[i].remove();
    //}
    //console.log(data.val());
    //var exercises = data.val();
  //  var keys = Object.keys(exercises);
   // console.log(keys);
    //data is parameter, .val is the value of it (inbuilt function)
    //you make a variable of patients to hold this data value from console
    //then you make a variable to hold an object of this to make into array
    //then console.log puts this array into the console
    //for loop below start at 0, go through all of them, end when it reaches length
    //make a variable key to hold they number of the keys
    //make a variable name, surname, email to hold the patients and their keys
    //then console puts this all into the console, commented out as want to put into html
    //the list creates a list using the name surname and email
    //list.parent then says that this will attach the to the list in html file
/*
    for(var i=0; i< keys.length; i++) {
      var key = keys[i];
      var exercise = exercises[key].exercise;
      console.log(exercise);
      }
    */
  }
//NOTE NOTE NOTE NOTE make new variable called fullName and make it name+surname and then just have that as a columm so can search whole name



  function errData(err){
  console.log('error!');
  console.log(err);
}
//just says there's an error in the console if one comes up



});
