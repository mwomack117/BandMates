
$(document).ready(function () {

    var $results = $("#results");

    var musicians;

    // Show all users on page load
    displayAllUsers();

    // Function to display all musicians in the database
    function displayAllUsers() {
        $.get("/api/musicians/all/all/all", function (data) {
            musicians = data;

            initializeUsers();
        })
    }

    // Function to shuffle array 
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // Loop through musicians/users and display results on cards
    function initializeUsers() {
        $results.empty();
        var usersToAdd = [];
        for (let i = 0; i < musicians.length; i++) {
            usersToAdd.push(createUserCard(musicians[i]));
        }
        shuffle(usersToAdd);
        $results.append(usersToAdd);
    }

    // Create musician/user card
    function createUserCard(musician) {
        
        var newUserCard = $("<div>");
        newUserCard.addClass("card");

        var userImg = $("<img>");
        userImg.addClass("card-img-top");
        userImg.attr("src", musician.img);

        var newUserCardHeading = $("<div>");
        newUserCardHeading.addClass("card-body");

        var newUserName = $("<h5>");
        newUserName.addClass("card-title");
        newUserName.text(musician.name);

        var newUserInfo = $('<ul><li class="card-text">Instrument: ' + musician.instrument + 
        "</li><li>Genre: " + musician.genre + "</li><li>Status: " + musician.soloOrBand + "</li>");
        
        var userButton = $("<button>");
        userButton.addClass("btn btn-primary btn-sm");
        userButton.text("More Info");
        userButton.attr("data-toggle", "modal");
        userButton.attr("data-target", "#thisModal")
        userButton.attr("type", "button");

        newUserCard.append(userImg);
        newUserCard.append(newUserCardHeading);
        newUserCardHeading.append(newUserName);
        newUserCardHeading.append(newUserInfo);
        newUserCardHeading.append(userButton);
        newUserCard.data("musician", musician);

        return newUserCard;
    }

    // Event listener to return results based on search paramaters
    $("#search-filter").on("submit", function (event) {
        event.preventDefault();
        $results.empty();

        var instrument = $("#form-instrument").val().toLowerCase();
        var genre = $("#form-genre").val().toLowerCase();
        var soloOrBand = $("#form-solo-band").val().toLowerCase();

        $.get("/api/musicians/" + genre + "/" + instrument + "/" + soloOrBand, function (data) {
            musicians = data;
            initializeUsers();
        })
       
    })



})


