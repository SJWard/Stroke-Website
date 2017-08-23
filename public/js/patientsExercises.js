$(function() {
//code from this point *
  const config = {
    apiKey: "AIzaSyB6UJIHWiRO7gv8S517cC6f9zlCviRMvNU",
    authDomain: "strokere-c60f6.firebaseapp.com",
    databaseURL: "https://strokere-c60f6.firebaseio.com",
    projectId: "strokere-c60f6",
    storageBucket: "strokere-c60f6.appspot.com",
    messagingSenderId: "900063170507"
  };
// * to this point is taken directly from Firebase, this configures the authentication.

//the following 3 lines of code constructs and instantiates a Firebase object to reference
  firebase.initializeApp(config);
  database = firebase.database();
  var ref = database.ref();
//refPatient and refExercises are the child of the database where the patients/exercises are to be inputted
  refPatient = ref.child('Patients');
  refExercises = ref.child('Exercises/Name');
//.on calls the functions listed with the 'value' of the  patients/exercises
  refPatient.on('value', patientData, errData);
  refExercises.on('value', exerciseData, errData);

 //function for producing the patients
  function patientData(data) {
//.val() gets the value of the input elements in firebase
    var patients = data.val();
//var keys is an object holding the keys of the parent node patients in firebase (name, email, password)
    var keys = Object.keys(patients);
//for each loop to iterate over all patients
    for(var i=0; i< keys.length; i++) {
//key is the specific key 
      var key = keys[i];
//email, name and surname being iterated over currently
      var email = patients[key].email;
      var name = patients[key].name;
      var surname = patients[key].surname;
//list of names to be held in array
      var namelist = [];
      namelist.push(name); 
//producing a table with the unique ID key, name, surname and email and a select button.
      document.getElementById("patientlist").innerHTML += ("<tr class='pData'>" + "<td id='keycolumn' class='sorting_1'>" +  key +  "</td>" + "<td>" + name + "</td>" + "<td>" + surname + "</td>" +  "<td>" + email + "</td>" + "<td>" +
            "<form> <button id='buttonname' type='button' class='btnSelect' > Select </button> </form>" + "</td>" + "</tr>");
//tableRows JQuery to get the data in the current table row.
               var tableRows = $('table').find('td#keycolumn').text();
    }
}
  
//currentRow to be instantiated by the row being clicked on
var currentRow;
//uniqueID to be instantiated by the ID of user clicked on
var uniqueID;
//a is used to iterate pushing to firebase
var a = 0;

//on click function for patientlist that will hide all but the patient selected
  $('#patientlist').on('click', '.btnSelect', function() {
    currentRow=$(this).closest("tr");
     uniqueID=currentRow.find("td:eq(0)").text();
     $('.pData').hide();
     $(currentRow).show(); 
    });

//on click of show patients button, all patients appear again
$('.showPatients').on('click', function() {
     $('.pData').show();
});

//same idea as patient data, getting all the exercises from the database
function exerciseData(data) {
  refExercises.once("value", function(snapshot) {
//for each loop of all the exercise data
    snapshot.forEach(function(child) {
//removes unwanted inbuilt 'Raw' file 
      if(child.val() != "serialVersionUID"){
        var valA =  child.val();
//removes unwanted underscores
        var valB = valA.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
//prints out the exercise name in a table with a checkbox next to it
        document.getElementById("exerciselist").innerHTML += ("<tr>" + "<td class='eData'>" + valB + "</td>" +  "<th class='css'>" +
            "<form> <input type='checkbox' class='excSelect'> </button> </form>" + "</th>" + "</tr>");  
      }
    });
  });
}

//On click sends data to Firebase
$(".setExercises").click(function(event){
//refExercises is instantiated by the parent node the data is to be sent to
    refExercises = ref.child("Testing");
//.remove() clears the old data
    refExercises.child(uniqueID).remove();
    event.preventDefault();
    //searchIDs maps all the checkboxes that have checkbox checked
    var searchIDs = $("#exerciselist input:checkbox:checked").map(function(){
     //exercise name taken from the table data in the first table row checked
     var currentRow=$(this).closest("tr");
     var exerciseName=currentRow.find("td:eq(0)").text();
     a++;
     //update the database, using iterating number (var) a as the unique ID, and the exercise name as value
     refExercises.child(uniqueID).update({
  [a]: exerciseName
     }); 
    });
});

  //prints an error if one occurs
  function errData(error){
  console.log('error!');
  console.log(error);
  }
});