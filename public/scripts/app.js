/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

// app.js require

$(() => {
  loadResources(); // initial page load
  prepareSubmit();
  toggleNew();
  scrollToTopButton(); // bottom-right scroll-to-top button
});

// load resources
const loadResources = () => {
  let resources = [];
  $.get("/api/resources", renderResources).then((data) => {
    loadComments(data);
    loadRatings(data);

    resources = data.resources;
  });

  $("[data-search]").on("input", (e) => {
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
  const $resourceContainer = $(".resource-container");
  $resourceContainer.empty();

  resourcesObj.resources.forEach((resource) => {
    const $resource = createResourceElement(resource);
    $resourceContainer.prepend($resource);
  });
};

const prepareSubmit = () => {
  const currentUserId = document.cookie.split("=")[1];

  $("#new-resource-owner-id").val(currentUserId);
  $(".new-resource-footer button").on("click", () => {
    loadResources();
  });
};

// hide/show new resource submission field
const toggleNew = () => {
  $("#new-btn").on("click", () => {
    const $displayProp = $(".new-resource").css("display");
    if ($displayProp === "none") {
      $(".new-resource").slideDown();
    } else {
      $(".new-resource").slideUp();
    }
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
        <div class="rate" id="rate-${resource.id}">
          <p></p>
          <div>
            <i class="fa-solid fa-star star-1"></i>
            <i class="fa-solid fa-star star-2"></i>
            <i class="fa-solid fa-star star-3"></i>
            <i class="fa-solid fa-star star-4"></i>
            <i class="fa-solid fa-star star-5"></i>
            <i class="fa-regular fa-star star-1"></i>
            <i class="fa-regular fa-star star-2"></i>
            <i class="fa-regular fa-star star-3"></i>
            <i class="fa-regular fa-star star-4"></i>
            <i class="fa-regular fa-star star-5"></i>
          </div>
        </div>
      </div>
    </footer>
  </article>
  `;
  return $resource;
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
