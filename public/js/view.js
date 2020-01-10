$(document).ready(function() {

  var $newItemInput = $("input.new-item");

  var $activityContainer = $(".activity-container");

  $(document).on("click", "button.delete", deleteActivity);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".activity-item", editActivity);
  $(document).on("keyup", ".activity-item", finishEdit);
  $(document).on("blur", ".activity-item", cancelEdit);
  $(document).on("submit", "#activity-form", insertActivity);

  var activities = [];


  getActivities();


  function initializeRows() {
    $activityContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < activities.length; i++) {
      rowsToAdd.push(createNewRow(activities[i]));
    }
    $activityContainer.prepend(rowsToAdd);
  }

  function getActivities() {
    $.get("/api/activities", function(data) {
      activities = data;
      initializeRows();
    });
  }

 
  function deleteActivity(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/activities/" + id
    }).then(getActivities);
  }


  function editActivity() {
    var currentActivity = $(this).data("activity");
    $(this).children().hide();
    $(this).children("input.edit").val(currentActivity.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }


  function toggleComplete(event) {
    event.stopPropagation();
    var activity = $(this).parent().data("activity");
    activity.complete = !activity.complete;
    updateActivity(activity);
  }


  function finishEdit(event) {
    var updatedActivity = $(this).data("activity");
    if (event.which === 13) {
      updatedActivity.text = $(this).children("input").val().trim();
      $(this).blur();
      updateActivity(updatedActivity);
    }
  }


  function updateActivity(activity) {
    $.ajax({
      method: "PUT",
      url: "/api/activities",
      data: activity
    }).then(getActivities);
  }


  function cancelEdit() {
    var currentActivity = $(this).data("activity");
    if (currentActivity) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentActivity.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }


  function createNewRow(activity) {
    var $newInputRow = $(
      [
        "<li class='list-group-item activity-item'>",
        "<span>",
        activity.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", activity.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("activity", activity);
    if (activity.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }


  function insertActivity(event) {
    event.preventDefault();
    var activity = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/todos", activity, getActivities);
    $newItemInput.val("");
  }
});
