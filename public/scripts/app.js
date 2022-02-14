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
  console.log(resource);
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
    <footer>
      <div class="days-ago">Created ${timeAgo}</div>
      <div class="icons">
      <button><i class="fas fa-heart" id="like"></i></button>
      <button><i class="fa-solid fa-comment" id="comment"></i></button>
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
  $.get("/api/resources", renderResources);
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
