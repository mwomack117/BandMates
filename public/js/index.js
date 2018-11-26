// ----- JS to handle new users -------- //

// Get references to page elements
var $name = $("#name");
var $instrument = $("#instrument");
var $genre = $("#genre");
var $experience = $("#experience");
var $bio = $("#bio");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");


// Create function to POST new user to database
function saveUser(user) {
  return $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/musicians",
    data: JSON.stringify(user)
  });
}

// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db 
var handleUserSubmit = function (event) {
  event.preventDefault();

  var Musician = {
    name: $name.val().trim(),
    soloOrBand: $('input[name="radAnswer"]:checked').val(),
    instrument: $instrument.val().trim(),
    genre: $genre.val().trim(),
    yearsExp: $experience.val().trim(),
    bio: $bio.val().trim()
  };

  console.log(Musician);

  if (Musician.name === "" || Musician.instrument === ""
  || Musician.genre === "" || Musician.yearsExp === "" || Musician.bio === "") {
    alert("Please fill out the entire form.");
    return;
  }
  
  saveUser(Musician)
    .then(function () {
      return Musician;
    });

  $name.val("");
  $('input[name="radAnswer"]').prop('checked', false);
  $instrument.val("");
  $genre.val("");
  $experience.val("");
  $bio.val("");

  window.location.href = 'dashboard';

};

// Add event listeners to the submit 
$submitBtn.on("click", handleUserSubmit);




