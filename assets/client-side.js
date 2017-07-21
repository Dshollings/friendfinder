

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

    $.ajax({
      url: "/api/friends",
      method: "GET"
    }).done(function(response) {
      friends = JSON.stringify(response);
    });

    // Posts newFriend to API
    $.post("/api/friends", newFriend,
    function(data) {


      friends = JSON.parse(friends);
      var bestFriend = {
        friend: friends[0],
        compatability: 50
      };
      console.log("pre: " + bestFriend.friend)


      for (var i = 0; i < friends.length; i++) {
        var compatability = 0;
        for(var j = 0; j < newFriend.scores.length; j++){
          compatability += Math.abs(newFriend.scores[j] - friends[i].scores[j]);
        }
        if(compatability < bestFriend.compatability){
          bestFriend.friend = friends[i];
          bestFriend.compatability = compatability;
        }
      }
      console.log(bestFriend.friend)
      picked = bestFriend.friend;
      
      console.log(picked.name + " " + picked.photo + " " + picked.age + " " + picked.phoneNumber)

      showModal(picked);
      function showModal(data){
        $(".modal-body #bfName").html("Name: " + data.name);
        $(".modal-body #bfPhoto").html("<img src=" + data.photo + " alt='profile picture' height='300' width='150'>");
        $(".modal-body #bfAge").html("Age: " + data.age);
        $(".modal-body #bfPhoneNumber").html("Phone: " + data.phoneNumber);
        $ ("#myModal").modal();
      }
 

      // Clear the form when submitting
      $("#friend-name").val("");
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
  