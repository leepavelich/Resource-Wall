const loadComments = (data) => {
  const { resources } = data;

  resources.forEach((item) => {
    addDisplayToggle(item.id);
    addComment(item.id);
    renderComments(item.id);
  });
};

// toggle comments visibility
const addDisplayToggle = (id) => {
  $(`#comment-${id}`).on("click", () => {
    console.log("click");

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
      $commentsContainer.append($comment);
      addDeleteCommentListener(comment);
    });

    $(`#comment-${id}`).children().html(`&nbsp; ${data.resources.length}`);
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

  const currentUserId = document.cookie.split("=")[1];
  let deleteBtn = "";
  if (user_id == currentUserId) {
    deleteBtn = `
    <i class="fa-regular fa-circle-xmark delete-comment" id="delete-comment-${comment_id}" ></i>`;
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
        <p>${timeago.format(created_at)}</p>
      </div>
    </div>
  `;
  return $comment;
};

const addComment = (id) => {
  $(`#${id}-comment-btn`).on("click", () => {
    const currentUserId = document.cookie.split("=")[1];
    const $comment = $(`#${id}-comment`).val();

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
