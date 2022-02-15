const addDeleteListener = (resource) => {
  $(`#delete-resource-${resource.id}`).on("click", function () {
    const currentUserId = document.cookie.split("=")[1];
    if (Number(resource.user_id) === Number(currentUserId)) {
      const { id } = resource;
      $.post("/api/resources/remove", { id }).then(() => {
        $(this).closest("article").hide();
      });
    }
  });
};
