const filterSubmissions = () => {
  const currentUserId = Number(document.cookie.split("=")[1]);
  if (!currentUserId) {
    return;
  }

  $.get(`/api/users/${currentUserId}`).then((data) => {
    $("#submissions-btn").click(() => {
      $(".resource").show();
      $(".search-wrapper input").val("");

      $(".resource").each(function () {
        if ($(this).find(".handle").text() !== `@${data.resources.username}`) {
          $(this).hide();
        }
      });
    });
  });
};
