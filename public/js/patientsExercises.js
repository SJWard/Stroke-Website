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
 
  function patientData(data) {
    var patients = data.val();
    var keys = Object.keys(patients);
    for(var i=0; i< keys.length; i++) {
      var key = keys[i];
      var email = patients[key].email;
      var name = patients[key].name;
      var namelist = [];
      namelist.push(name);
      var surname = patients[key].surname;
      document.getElementById("patientlist").innerHTML += ("<tr class='pData'>" + "<td id='keycolumn' class='sorting_1'>" +  key +  "</td>" + "<td>" + name + "</td>" + "<td>" + surname + "</td>" +  "<td>" + email + "</td>" + "<td>" +
            "<form> <button id='buttonname' type='button' class='btnSelect' > Select </button> </form>" + "</td>" + "</tr>");
               var tableRows = $('table').find('td#keycolumn').text();
    }
}

var currentRow;
var uniqueID;
var i = 1;
var a = 0;

  $('#patientlist').on('click', '.btnSelect', function() {
     currentRow=$(this).closest("tr");
     uniqueID=currentRow.find("td:eq(0)").text();
     $('.pData').hide();
     $(currentRow).show();
    });
     
$('.showPatients').on('click', function() {
     $('.pData').show();
});

function exerciseData(data) {
  refChild.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      if(child.val() != "serialVersionUID"){
        var a =  child.val();
        var b = a.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
        document.getElementById("exerciselist").innerHTML += ("<tr>" + "<td class='eData'>" + b + "</td>" +  "<th class='css'>" +
            "<form> <input type='checkbox' class='excSelect'> </button> </form>" + "</th>" + "</tr>");  
      }
    });
  });
}

$(".setExercises").click(function(event){
    event.preventDefault();
    var searchIDs = $("#exerciselist input:checkbox:checked").map(function(){
     var currentRow=$(this).closest("tr");
     var exerciseName=currentRow.find("td:eq(0)").text();
     refChild = ref.child("Testing");
     a++;
     refChild.child(uniqueID).push({
  [a]: exerciseName

     }); 
    });
});

var patientID = "";
var exercisesChosen = [];

  function errData(err){
  console.log('error!');
  console.log(err);
  }

});