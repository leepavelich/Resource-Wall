/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

$(() => {
  loadResources(); // initial page load
  // newTweetIconClick();  // top-right compose button
  // resourceSubmission();  // compose tweet box
  scrollToTopButton(); // bottom-right scroll-to-top button
});

const createResourceElement = (resource) => {
  const timeAgo = timeago.format(resource.created_at);
  const $resource = `
  <article class="resource">
    <header>
    <!-- <img class="avatar" alt="user avatar" src=${resource.avatar_photo_url}></img> -->
      <div class="title">${resource.title}</div>
      <div class="handle">${resource.username}</div>
    </header>
    <div class="resource-content">
      <p class="resource-content-text">${resource.description}</p>
      <p class="resource-url"><a href="${resource.url}">${resource.url}</a></p>
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
        <button><i class="fas fa-heart"></i></button>
        <button id="comment-${resource.id}"><i class="fa-solid fa-comment"></i></button>
      </div>
    </footer>
  </article>
  `;
  return $resource;
};

// escape XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// load resources
const loadResources = () => {
  $.get("/api/resources", renderResources).then((data) => {
    renderComments(data);
  });
};

const renderComments = (data) => {
  const resourceComments = data.resources;

  for (const item of resourceComments) {
    const resourceId = item.id;
    $.get(`/api/resources/${resourceId}/comments`).then((res) => {
      // toggle comments visibility
      $(`#comment-${resourceId}`).on("click", () => {
        $(`#resource-${resourceId}-comments`).parent().toggle();
      });

      // append fetched comments
      const $commentsContainer = $(`#resource-${resourceId}-comments`);
      $commentsContainer.empty();
      for (const item of res.resources) {
        $commentsContainer.append(
          `
          <div>
            <p>${item.username}: ${item.comment}</p>
            <p>${timeago.format(item.created_at)}</p>
          </div>
          `
        );
      }
    });
  }
};

const renderResources = (resourcesObj) => {
  const $resourcesContainer = $(".resource-container");
  $resourcesContainer.empty();

  resourcesObj.resources.forEach((resource) => {
    const $resource = createResourceElement(resource);
    $resourcesContainer.prepend($resource);
  });
};

const scrollToTopButton = () => {
  const $scrollToTop = $(".scroll-to-top");

  $(window).scroll(function () {
    $(this).scrollTop() > 200
      ? $scrollToTop.fadeIn().css("display", "flex")
      : $scrollToTop.fadeOut();
  });

  $scrollToTop.click(() => {
    const $new = $("#new-tweet-form");
    $new.slideDown("fast");
    $("#tweet-text").focus();
  });
};
