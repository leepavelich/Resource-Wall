
const renderLikes = (data) => {
  const resourceLikes = data.resources;
  const currentUserId = Number(document.cookie.split("=")[1]);

  for (const item of resourceLikes) {
    const resourceId = item.id;
    $.get(`/api/resources/${resourceId}/likes`)
      .then((response) => {
        if (response.resources.some(e => e.user_id === currentUserId)) {
          likesToggle(resourceId);
        }
      });
  }
};

// toggle like highlighting
const likesToggle = (id) => {
  // $(`#like-${id}`).css("color", LIKED_COLOUR)
  $(`#like-${id}`).addClass('highlighted');
};

const toggleLikes = () => {
  $("#likes-btn").click(() => {
    $(".resource").each(function() {
      if (!$(this).find('[id^="like"]').hasClass('highlighted')) {
        $(this).toggle();
      };
    })
  })
}
