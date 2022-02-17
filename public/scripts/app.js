/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

// app.js require

$(() => {
  loadResources(); // initial page load
  reloadResources(); // reload home page on logo click
  prepareSubmit(); // prepare submit new form feature
  toggleNew(); // toggle form for submitting new resource
  toggleLikes(); // toggle liking/unliking a resource
  filterLikes(); // filter displayed resources via likes
  filterSubmissions(); // filter displayed resources via submitted
  scrollToTopButton(); // bottom-right scroll-to-top button
  showCurrentUser(); // show currently logged in username in nav
  logout(); // log user out
});

// clicking home tab will re-load all resources (escape from likes/submissions)
const reloadResources = () => {
  $("#all-resources-btn").on("click", () => {
    loadResources();
    $(".search-wrapper input").val("");
  });
};

// load resources
const loadResources = () => {
  let resources = [];
  $.get("/api/resources", renderResources).then((data) => {
    loadComments(data);
    loadRatings(data);
    renderLikes(data);

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
      if (isVisible) {
        $(`#${rsc.id}`).show();
      } else {
        $(`#${rsc.id}`).hide();
      }
    });
  });
};

const renderResources = (resourcesObj) => {
  const $resourceContainer = $(".resource-container");
  $resourceContainer.empty();

  resourcesObj.resources.forEach((resource) => {
    if (!resource.is_deleted) {
      const $resource = createResourceElement(resource);
      $resourceContainer.prepend($resource);
      addDeleteListener(resource);
    }
  });
};

const prepareSubmit = () => {
  const currentUserId = document.cookie.split("=")[1];
  if (currentUserId) {
    $("#auth-btn").html("Logout");
  } else {
    $(".show-if-auth").hide();
  }

  $("#new-resource-owner-id").val(currentUserId);
  $(".new-resource-footer button").on("click", (e) => {
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
  const currentUserId = document.cookie.split("=")[1];

  let deleteBtn = "";
  if (resource.user_id == currentUserId) {
    deleteBtn = `
    <i class="fa-regular fa-trash-can delete-resource" id="delete-resource-${resource.id}" ></i>`;
  }
  const $resource = `
  <article class="resource card" id="${resource.id}">
    <header>
      <div class="title">${resource.title}</div>
      <div class="handle">@${resource.username}</div>
      ${deleteBtn}
    </header>
    <div class="resource-content">
      <p class="resource-content-text">${resource.description}</p>
      <p class="resource-url"><a href="${resource.url}" target="_blank">${resource.url}</a></p>
    </div>
    <div class="comments-section">
      <p>Comments</p>
      <section id="resource-${resource.id}-comments"></section>
      <form>
        <input type="text" id="${resource.id}-comment">
        <button id="${resource.id}-comment-btn" class="btn" type="button">Comment</button>
      </form>
    </div>
    <footer>
      <div class="days-ago">Created ${timeAgo}</div>
      <div class="icons">
        <button id="like-${resource.id}"><i id="like-${resource.id}" class="fa-solid fa-heart"></i></button>
        <button id="comment-btn-${resource.id}"><i id="comments-toggle-${resource.id}" class="fa-regular fa-comment"></i></button>
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

const showCurrentUser = () => {
  const currentUserId = document.cookie.split("=")[1];
  if (currentUserId) {
    $.get(`/api/users/${currentUserId}`).then((data) => {
      const currentUsername = data.resources.username;
      $("#current-user").text(`@${currentUsername}`);
    });
  }
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
