// ----- JS to handle new users -------- //

// Get references to page elements
var $username =$("#username")
var $password =$("#password")
var $img = $("#img");
var $instrument = $("#instrument");
var $genre = $("#genre");
var $experience = $("#experience");
var $bio = $("#bio");
var $email = $("#email");
var $submitBtn = $("#submit");



// Create function to POST new user to database
function saveUser(user) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/musicians/all/all/all",
    data: JSON.stringify(user)
  });
}

// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db 
var handleUserSubmit = function (event) {
  event.preventDefault();

  var Musician = {
    username: $username.val().trim(),
    password: $password.val().trim(),
    img: $img.val().trim(),
    soloOrBand: $('input[name="radAnswer"]:checked').val(),
    instrument: $instrument.val().trim().toLowerCase(),
    genre: $genre.val().trim().toLowerCase(),
    yearsExp: $experience.val().trim(),
    bio: $bio.val().trim(),
    email: $email.val().trim()
  };

  console.log(Musician);

  if (Musician.name === "" || Musician.instrument === "" || Musician.email === ""
  || Musician.genre === "" || Musician.yearsExp === "" || Musician.bio === "") {
    alert("Please fill out the entire form.");
    return;
  }
  
  saveUser(Musician)
    .then(function () {
      return Musician;
    });
  
  $username.val(""),
  $password.val(""),
  $img.val("");
  $('input[name="radAnswer"]').prop('checked', false);
  $instrument.val("");
  $genre.val("");
  $experience.val("");
  $bio.val("");
  $email.val("");

  window.location.href = 'dashboard';

};

// Add event listeners to the submit 
$submitBtn.on("click", handleUserSubmit);


$("#login").on("click", function() {
  
})