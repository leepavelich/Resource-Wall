
const renderLikes = (data) => {
  const resourceLikes = data.resources;
  const currentUserId = Number(document.cookie.split("=")[1]);

  for (const item of resourceLikes) {
    const resourceId = item.id;
    $.get(`/api/resources/${resourceId}/likes`)
      .then((response) => {
        if (response.resources.some(e => e.user_id === currentUserId)) {
          likesSet(resourceId);
        }
      });
  }
};

// toggle like highlighting
const likesSet = (id) => {
  $(`#like-${id}`).addClass('highlighted');
};

const filterLikes = () => {
  $("#likes-btn").click(() => {
    $(".resource").each(function() {
      if (!$(this).find('[id^="like"]').hasClass('highlighted')) {
        $(this).toggle();
      };
    })
  })
}

const toggleLikes = () => {
  const currentUserId = Number(document.cookie.split("=")[1]);

  $.get("/api/resources", renderResources).then((data) => {
    for (let i = 1; i <= data.resources.length; i++) {
      $(`#like-${i}`).on("click", function() {
        if($(this).hasClass('highlighted')) {
          $(this).removeClass('highlighted')
          $.post(`/api/resources/unlike`, {
            user_id: currentUserId,
            resource_id: i,
          })
        } else {
          $(this).addClass('highlighted');
          $.post(`/api/resources/likes`, {
            user_id: currentUserId,
            resource_id: i,
          })
        }
      })
    }
  });
}
