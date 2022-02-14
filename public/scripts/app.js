/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

$(() => {
  loadResources(); // initial page load
  prepareSubmit();
  // newTweetIconClick();  // top-right compose button
  // resourceSubmission();  // compose tweet box
  scrollToTopButton(); // bottom-right scroll-to-top button
});

// load resources
const loadResources = () => {
  let resources = [];
  $.get("/api/resources", renderResources).then((data) => {
    loadComments(data);

    resources = data.resources;
    console.log(resources);
  });

  const searchInput = document.querySelector("[data-search]");

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    resources.forEach((rsc) => {
      const isVisible =
        rsc.title.toLowerCase().includes(value) ||
        rsc.description.toLowerCase().includes(value) ||
        rsc.topic.toLowerCase().includes(value) ||
        rsc.title.includes(value) ||
        rsc.description.includes(value) ||
        rsc.topic.includes(value);
      !isVisible ? $(`#${rsc.id}`).hide() : $(`#${rsc.id}`).show();
    });
  });
};

const renderResources = (resourcesObj) => {
  const $resourcesContainer = $(".resource-container");
  $resourcesContainer.empty();

  resourcesObj.resources.forEach((resource) => {
    const $resource = createResourceElement(resource);
    $resourcesContainer.prepend($resource);
  });
};

const prepareSubmit = () => {
  const currentUserId = document.cookie.split("=")[1];

  $("#new-resource-owner-id").val(currentUserId);
  console.log($("#new-resource-owner-id").val());

  $(".new-resource-footer button").on("click", () => {
    loadResources();
  });
};

const createResourceElement = (resource) => {
  const timeAgo = timeago.format(resource.created_at);
  const $resource = `
  <article class="resource" id="${resource.id}">
    <header>
      <div class="title">${resource.title}</div>
      <div class="handle">${resource.username}</div>
    </header>
    <div class="resource-content">
      <p class="resource-content-text">${resource.description}</p>
      <p class="resource-url"><a href="${resource.url}" target="_blank">${resource.url}</a></p>
    </div>
    <div class="comments-section">
      <p>Comments</p>
      <section id="resource-${resource.id}-comments"></section>
      <form action="/api/resources/comments" method="POST">
        <input type="text" name="comment">
        <button type="button">Comment</button>
      </form>
    </div>
    <footer>
      <div class="days-ago">Created ${timeAgo}</div>
      <div class="icons">
        <button><i class="fas fa-heart"> 3</i></button>
        <button id="comment-${resource.id}"><i class="fa-solid fa-comment"> 4</i></button>
        <button><i class="fa-solid fa-star"> 3.7</i></button>
      </div>
    </footer>
  </article>
  `;
  return $resource;
};

// escape XSS
// const escape = function (str) {
//   let div = document.createElement("div");
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// };

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

const scrollToTopButton = () => {
  const $scrollToTop = $(".scroll-to-top");

  $(window).scroll(function () {
    $(this).scrollTop() > 200
      ? $scrollToTop.fadeIn().css("display", "flex")
      : $scrollToTop.fadeOut();
  });

  $scrollToTop.click(() => {
    $(".search-wrapper > input").focus();
  });
};
