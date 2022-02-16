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

const addDeleteCommentListener = (comment) => {
  const currentUserId = document.cookie.split("=")[1];
  $(`#delete-comment-${comment.comment_id}`).on("click", function () {
    if (Number(comment.user_id) === Number(currentUserId)) {
      const { comment_id } = comment;
      $.post("/api/resources/comments/remove", { comment_id }).then(() => {
        $(this).closest(".comment-container").hide();
      });
    }
  });
};
