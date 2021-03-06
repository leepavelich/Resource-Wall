const filterSubmissions = () => {
  const currentUserId = Number(document.cookie.split("=")[1]);
  if (!currentUserId) {
    return;
  }

  $.get(`/api/users/${currentUserId}`).then((data) => {
    $("#submissions-btn").click(() => {
      $(".search-wrapper input").val("");
      $(".resource").show();

      $(".resource").each(function () {
        if (
          $(this).find(".handle").text() !== `@${data.resources.username}` ||
          $(this).hasClass("deleted")
        ) {
          $(this).hide();
        }
      });
    });
  });
};
