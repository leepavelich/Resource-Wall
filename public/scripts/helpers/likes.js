
const renderLikes = (data) => {
  const resourceLikes = data.resources;

  for (const item of resourceLikes) {
    const resourceId = item.id;
    $.get(`/api/resources/${resourceId}/likes`)
      .then((response) => {
        if (response.resources.some(e => e.username === 'gollum')) {  // TODO: pass in user_id
          likesToggle(resourceId);
        }
      });
  }
};

const LIKED_COLOUR = "rgb(255, 0, 0)";

// toggle like highlighting
const likesToggle = (id) => {
  $(`#like-${id}`).css("color", LIKED_COLOUR)
};

const toggleLikes = () => {
  $("#likes-btn").click(() => {
    $(".resource").each(function() {
      // if ($(this).attr('[id^="like"]').css("color") === "red") {
      //   console.log(j);
      // }
      if ($(this).find('[id^="like"]').css("color") !== LIKED_COLOUR) {
        $(this).toggle();
      };
      // console.log('test');
      // console.log($('[id^="like"]', this))
      // console.log(obj);
      // $(this).toggle()
    })
  })
}
