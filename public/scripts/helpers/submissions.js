const toggleSubmissions = () => {
  const currentUserId = Number(document.cookie.split("=")[1]);
  $.get(`/api/users/${currentUserId}/`)
    .then((data) => {
      $("#submissions-btn").click(() => {
        $(".resource").each(function() {
          if ($(this).find('.handle').text() !== data.resources.username) {
            $(this).toggle();
          };
        })
      })
    })
}
