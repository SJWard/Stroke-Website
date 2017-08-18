
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
  refPatient = ref.child('Patients');
  
  refChild = ref.child('Exercises/Name');
  refPatient.on('value', patientData, errData);
 
  refChild.on('value', exerciseData, errData);
  const state = {
    email: '',
    password: '',
    name: '',
};

$('.js-login').on('submit', event => {
  const email = $('#js-email').val() || state.email;
  const password = $('#js-password').val() || state.password;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
    window.open("https://www.google.com"); 
    
  })
  .catch(function(error) {
      // Error Handling
  });
});

  $('.js-form').on('submit', event => {
    event.preventDefault();
    const email = $('#js-email').val() || state.email;
    const password = $('#js-password').val() || state.password;

    const exercise = $('#js-Name').val() || state.Name;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
         });
        firebase.auth().createName(name).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
  });
      //example for the pushing to database, object is the JS variable that we want to send to the
      //sever . ref is the parent branch
      //firebase.database().ref('parentbranch').push({
      //  object

  function patientData(data) {
    //var patientlistings = selectAll('.patientlisting');
    //for (var i = 0; i < patientlistings.length ; i++) {
      //patientlistings[i].remove();
    //}
    //console.log(data.val());
   
    //console.log(keys);
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
    var patients = data.val();
    var keys = Object.keys(patients);
    //console.log(keys);
    for(var i=0; i< keys.length; i++) {
      var key = keys[i];
      var email = patients[key].email;
      var name = patients[key].name;
      var namelist = [];
      namelist.push(name);
      //patientChosen(name);
      var surname = patients[key].surname;
      //console.log(name, surname, email);
      document.getElementById("patientlist").innerHTML += ("<tr class='pData'>" + "<td id='keycolumn' class='sorting_1'>" +  key +  "</td>" + "<td>" + name + "</td>" + "<td>" + surname + "</td>" +  "<td>" + email + "</td>" + "<th>" +
            "<form> <button id='buttonname' type='button' class='btnSelect' > Select </button> </form>" + "</th>" + "</tr>");
               var tableRows = $('table').find('td#keycolumn').text();
               console.log(tableRows);
            
    //console.log($(this).text());
}}

  $('#patientlist').on('click', '.btnSelect', function() {
     var currentRow=$(this).closest("tr");
     var uniqueID=currentRow.find("td:eq(0)").text();
     $('.pData').hide();
     $(currentRow).show();
     console.log(uniqueID);
    });
     
$('.showPatients').on('click', function() {
     $('.pData').show();
    });

            
  

  


  
                      /*$("#"+i+"").on("click", function(){
                        console.log(name);*/
    

  
 
/*
$("#patientlist").on("click", "tr", function(event){
    alert($(this).index());
    alert($(this).siblings("td:first").text());
}); 
   $("#patientlist").on("click", function(){
console.log(name);
     });
  } */
//NOTE NOTE NOTE NOTE make new variable called fullName and make it name+surname and then just have that as a columm so can search whole name
        
              var i = 1;

function exerciseData(data) {
  
refChild.once("value", function(snapshot) {
  snapshot.forEach(function(child) {
    if(child.val() != "serialVersionUID"){
        //console.log(child.key+": "+child.val());
        var a =  child.val();
        var b = a.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
        document.getElementById("exerciselist").innerHTML += ("<tr class='eData'>" + "<td>" + b + "</td>" +  "<th>" +
            "<form> <input type='checkbox' class='excSelect'> </button> </form>" + "</th>" + "<tr>");
             
            
          
    }
  });
});
}
$(".setExercises").click(function(event){
    event.preventDefault();
    var searchIDs = $("#exerciselist input:checkbox:checked").map(function(){
   return $(this).val();
    }).get(); // <----
    console.log(searchIDs);
});
/*
$('#exerciselist').on('click', '.excSelect', function() {
    
     var currentRow=$(this).closest("tr");
     var excName=currentRow.find("td:eq(0)").text();
     exercisesChosen.push(excName);
     console.log(exercisesChosen);

    });
    */
var patientID = "";
var exercisesChosen = [];

  function errData(err){
  console.log('error!');
  console.log(err);
}
//just says there's an error in the console if one comes up

});
 
  /*
  $("#patientlist").on("click", function(){
var databaseRef =  ref.child('Testing');
databaseRef.push({
  Name: name
     });
     });
  } */
/*
  $("#submitButton").on("click", function(){
var databaseRef =  ref.child('Testing');
databaseRef.push({
  Name: name
  for(i=0, i<exercisesChosen.length, i++) {
  Exercises: exercisesChosen[i]
  }
     });
  });

   */
    


