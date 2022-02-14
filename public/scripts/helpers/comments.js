const loadComments = (data) => {
  const resourceComments = data.resources;

  for (const item of resourceComments) {
    const resourceId = item.id;
    $.get(`/api/resources/${resourceId}/comments`).then((response) => {
      addDisplayToggle(resourceId);
      renderComments(response, resourceId);
    });
  }
};

// toggle comments visibility
const addDisplayToggle = (id) => {
  $(`#comment-${id}`).on("click", () => {
    $(`#resource-${id}-comments`).parent().toggle();
  });
};

// append fetched comments
const renderComments = (commentsObj, id) => {
  const $commentsContainer = $(`#resource-${id}-comments`);
  $commentsContainer.empty();
  commentsObj.resources.forEach((comment) => {
    const $comment = createCommentElement(comment);
    $commentsContainer.append($comment);
  });
};

const createCommentElement = (data) => {
  const { username, comment, created_at, avatar_photo_url } = data;

  const $comment = `
  <div class="comment-container">
    <div class="user-info">
      <img class="avatar" alt="user avatar" src=${avatar_photo_url}></img>
      <p>@${username}</p>
    </div>
    <div class="comment-content">
      <p>${comment}</p>
      <p>${timeago.format(created_at)}</p>
    </div>
  </div>
  `;
  return $comment;
};
