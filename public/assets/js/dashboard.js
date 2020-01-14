$(document).ready(function() {
    // display holds all of our posts
    var display = $(".display-act");
    var activityCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleActivityDelete);
    $(document).on("click", "button.edit", handleActivityEdit);
    activityCategorySelect.on("change", handleCategoryChange);
    var activities;
  
    // This function grabs posts from the database and updates the view
    function getActivities(category) {
      var categoryString = category || "";
      if (categoryString) {
        categoryString = "/category/" + categoryString;
      }
      $.get("/api/activities" + categoryString, function(data) {
        console.log("Activities", data);
        activities = data;
        if (!activities || !activities.length) {
          displayEmpty();
        }
        else {
          initializeRows();
        }
      });
    }
  
    // This function does an API call to delete posts
    function deleteActivity(id) {
      $.ajax({
        method: "DELETE",
        url: "/api/activities/" + id
      })
        .then(function() {
          getActivities(activityCategorySelect.val());
        });
    }
  
    // Getting the initial list of posts
    getActivities();
    // InitializeRows handles appending all of our constructed post HTML inside
    // blogContainer
    function initializeRows() {
      display.empty();
      var activitiesToAdd = [];
      for (var i = 0; i < activities.length; i++) {
        activitiesToAdd.push(createNewRow(activities[i]));
      }
      display.append(activitiesToAdd);
    }
  
    // This function constructs a post's HTML
    function createNewRow(activity) {
      var newActivityCard = $("<div>");
        newActivityCard.addClass("card");
      var newActivityCardHeading = $("<div>");
      newActivityCardHeading.addClass("card-header");
      var deleteBtn = $("<button>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-default");
      var newActivityAct = $("<h2>");
      var newActivityDate = $("<small>")
      var newActivityCategory = $("<h5>");
        newActivityCategory.text(activity.category);
        newActivityCategory.css({
        float: "right",
        "font-weight": "700",
        "margin-top":
        "-15px"
      });
      var newActivityCardhowto = $("<pre>");
      newActivityCardhowto.addClass("card-body");
      var newActivityhowto = $("<p>");
      newActivityAct.text(activity.act + " ");
      newActivityhowto.text(activity.howto);
    //   var formattedDate = new Date(activity.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    // newActivityDate.text(formattedDate);
    // newActivityAct.append(newActivityDate)
      newActivityCardHeading.append(deleteBtn);
      newActivityCardHeading.append(editBtn);
      newActivityCardHeading.append(newActivityAct);
      newActivityCardHeading.append(newActivityCategory);
      newActivityCardhowto.append(newActivityhowto);
      newActivityCard.append(newActivityCardHeading);
      newActivityCard.append(newActivityCardhowto);
      newActivityCard.data("activity", activity);
      return newActivityCard;
    }
  
    // This function figures out which post we want to delete and then calls
    // deletePost
    function handleActivityDelete() {
      var currentActivity = $(this)
        .parent()
        .parent()
        .data("activity");
      deleteActivity(currentActivity.id);
    }
  
    // This function figures out which post we want to edit and takes it to the
    // Appropriate url
    function handleActivityEdit() {
      var currentActivity = $(this)
        .parent()
        .parent()
        .data("activity");
      window.location.href = "/cms?activity_id=" + currentActivity.id;
    }
  
    // This function displays a message when there are no posts
    function displayEmpty() {
      display.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No activity yet for this category, navigate <a href='/cms'>here</a> in order to create a new post.");
      display.append(messageH2);
    }
  
    // This function handles reloading new posts when the category changes
    function handleCategoryChange() {
      var newActivityCategory = $(this).val();
      getActivities(newActivityCategory);
    }
  
  });
  