const loadComments = (data) => {
  const { resources } = data;

  resources.forEach((resource) => {
    const { id } = resource;
    addDisplayToggle(id);
    onSubmitNewComment(id);
    renderComments(id);
  });
};

// toggle comments visibility
const addDisplayToggle = (id) => {
  $(`#comments-toggle-${id}`).on("click", () => {
    $(`#resource-${id}-comments`).parent().toggle();
  });
};

// append fetched comments
const renderComments = (id) => {
  $.get(`/api/resources/${id}/comments`).then((data) => {
    const $commentsContainer = $(`#resource-${id}-comments`);
    $commentsContainer.empty();

    data.resources.forEach((comment) => {
      const $comment = createCommentElement(comment);
      $commentsContainer.prepend($comment);
      addDeleteCommentListener(comment);
    });

    $(`#comment-btn-${id}`).children().html(`&nbsp; ${data.resources.length}`);
  });
};

const createCommentElement = (data) => {
  const {
    username,
    comment,
    created_at,
    avatar_photo_url,
    comment_id,
    user_id,
  } = data;

  console.log(comment);

  const currentUserId = document.cookie.split("=")[1];
  let deleteBtn = "";
  if (user_id == currentUserId) {
    deleteBtn = `
    <i class="fa-solid fa-trash-can delete-comment" id="delete-comment-${comment_id}" ></i>`;
  }

  const $comment = `
    <div class="comment-container">
      <div class="user-info">
        <img class="avatar" alt="user avatar" src=${avatar_photo_url}></img>
        <p>@${username}</p>
        ${deleteBtn}
      </div>
      <div class="comment-content">
        <p>${comment}</p>
        <p>Posted ${timeago.format(created_at)}</p>
      </div>
    </div>
  `;
  return $comment;
};

const onSubmitNewComment = (id) => {
  const currentUserId = document.cookie.split("=")[1];

  $(`#${id}-comment-btn`).on("click", () => {
    const $comment = $(`#${id}-comment`).val();
    if (!$comment) {
      return;
    }

    $.post("/api/resources/comments", {
      user_id: currentUserId,
      resource_id: id,
      comment: $comment,
    }).then(() => {
      $(`#${id}-comment`).val("");
      renderComments(id);
    });
  });
};
