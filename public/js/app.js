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
  const state = {
    email: '',
    password: '',
  };

$('.js-login').on('submit', event => {
  const email = $('#js-email').val() || state.email;
  const password = $('#js-password').val() || state.password;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
    var errorCode = error.code;
      var errorMessage = error.message;
    
  })
  .catch(function(error) {
      // Error Handling
  });
});
  $('.js-form').on('submit', event => {
    event.preventDefault();
    const email = $('#js-email').val() || state.email;
    const password = $('#js-password').val() || state.password;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      //example for the pushing to database, object is the JS variable that we want to send to the
      //sever . ref is the parent branch
      //firebase.database().ref('parentbranch').push({
      //  object
      // ...
    });
  });
});
