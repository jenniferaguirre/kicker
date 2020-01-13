$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var activityId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?activity_id=") !== -1) {
      activityId = url.split("=")[1];
      getActivityData(activityId);
    }
  
    // Getting jQuery references to the post body, title, form, and category select
    var howtoInput = $("#howto");
    var actInput = $("#act");
    var cmsForm = $("#cms");
    var activityCategorySelect = $("#category");
    // Giving the postCategorySelect a default value
    activityCategorySelect.val("Jiu Jitsu");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!actInput.val().trim() || !howtoInput.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newActivity = {
        act: actInput.val().trim(),
        howto: howtoInput.val().trim(),
        category: activityCategorySelect.val()
      };
  
      console.log(newActivity);
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newActivity.id = activityId;
        updateActivity(newActivity);
      }
      else {
        submitActivity(newActivity);
      }
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitActivity(Activity) {
      $.post("/api/activities/", Activity, function() {
        window.location.href = "/dashboard";
      });
    }
  
    // Gets post data for a post if we're editing
    function getActivityData(id) {
      $.get("/api/activities/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          actInput.val(data.act);
          howtoInput.val(data.howto);
          activityCategorySelect.val(data.category);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given post, bring user to the blog page when done
    function updateActivity(activity) {
      $.ajax({
        method: "PUT",
        url: "/api/activities",
        data: activity
      })
        .then(function() {
          window.location.href = "/dashboard";
        });
    }
  });