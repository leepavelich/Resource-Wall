const addDeleteListener = (resource) => {
  $(`#delete-resource-${resource.id}`).on("click", function () {
    const currentUserId = Number(document.cookie.split("=")[1]);
    const resourceOwnerId = Number(resource.user_id);

    if (currentUserId === resourceOwnerId) {
      const { id } = resource;
      $.post("/api/resources/remove", { id }).then(() => {
        $(this).closest("article").hide();
      });
    }
  });
};

const addDeleteCommentListener = (comment) => {
  $(`#delete-comment-${comment.comment_id}`).on("click", function () {
    const currentUserId = Number(document.cookie.split("=")[1]);
    const resourceOwnerId = Number(comment.user_id);

    if (currentUserId === resourceOwnerId) {
      const { comment_id } = comment;
      $.post("/api/resources/comments/remove", { comment_id }).then(() => {
        $(this).closest(".comment-container").hide();
      });
    }
  });
};
