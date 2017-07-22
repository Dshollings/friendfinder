

 $(".submit").on("click", function(event) {
    event.preventDefault();

    // Creates a new profile using form responses and jQuery
    var newFriend = {
      name: $("#friend-name").val().trim(),
      photo: $("#friend-photo").val().trim(),
      phoneNumber: $("#friend-phone").val().trim(),
      age: $("#friend-age").val().trim(),
      scores: [
       $("#friend-going-out").val().trim(),
       $("#friend-outdoors").val().trim(),
       $("#friend-travel").val().trim(),
       $("#friend-home").val().trim(),
       $("#friend-dating").val().trim(),
       $("#friend-education").val().trim(),
       $("#friend-night").val().trim(),
       $("#friend-reading").val().trim(),
       $("#friend-concerts").val().trim(),
       $("#friend-movies").val().trim()
      ]
    };

    var friends;
    // AJAX call to get all friends as JSON - adds to variable friends
    $.ajax({
      url: "/api/friends",
      method: "GET"
    }).done(function(response) {
      friends = JSON.stringify(response);
    });

    // Posts newFriend to API
    $.post("/api/friends", newFriend,
    function(data) {

    	// Turns JSON into js objects
      friends = JSON.parse(friends);
      
      // creates placeholder for bestFriend comparison
      var bestFriend = {
        friend: friends[0],
        compatability: 50
      };
      console.log("pre: " + bestFriend.friend)

      // loops through all friends
      for (var i = 0; i < friends.length; i++) {
        // creates variable to track compatibility scores
        var compatability = 0;
        // loops through all scores for each friends
        for(var j = 0; j < newFriend.scores.length; j++){
          // updates compatibilty with difference between scores of user and each friend
          compatability += Math.abs(newFriend.scores[j] - friends[i].scores[j]);
        }
        // compares compatibility with bestFriend. If a better match, the current friend becomes the best
        if(compatability < bestFriend.compatability){
          bestFriend.friend = friends[i];
          bestFriend.compatability = compatability;
        }
      }
      // creates a variable holding the the friend property fo bestFriend
      var picked = bestFriend.friend;

      // passes the picked friend to a modal and opens modal
      showModal(picked);
      function showModal(data){
      	// jquery to fill in modal
        $(".modal-body #bfName").html("Name: " + data.name);
        $(".modal-body #bfPhoto").html("<img src=" + data.photo + " alt='profile picture' height='300' width='150'>");
        $(".modal-body #bfAge").html("Age: " + data.age);
        $(".modal-body #bfPhoneNumber").html("Phone: " + data.phoneNumber);
        $ ("#myModal").modal();
      }
 

      // Clear the form when submitting
      $("#friend-name").val("");
      $("#friend-photo").val("");
      $("#friend-phone").val("");
      $("#friend-age").val("");
      $("#friend-going-out").val("");
      $("#friend-outdoors").val("");
      $("#friend-travel").val("");
      $("#friend-home").val("");
      $("#friend-dating").val(""),
      $("#friend-education").val(""),
      $("#friend-night").val(""),
      $("#friend-reading").val(""),
      $("#friend-concerts").val(""),
      $("#friend-movies").val("")
    });

  
  });
  