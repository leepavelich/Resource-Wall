const loadRatings = (data) => {
  data.resources.forEach((rating) => {
    addRating(rating.id);
    renderStars(rating.id);
  });
};

// when a user submits a rating,
// add the rating to db and re-render stars for that particular resource
const addRating = (id) => {
  const currentUserId = document.cookie.split("=")[1];

  for (let i = 1; i <= 5; i++) {
    $(`#rate-${id} .star-${i}`).on("click", () => {
      const newRating = i;
      $.post(`/api/resources/rating`, {
        user_id: currentUserId,
        resource_id: id,
        rating: newRating,
      }).then(() => {
        renderStars(id);
      });
    });
  }
};

const renderStars = (id) => {
  $.get(`/api/resources/${id}/rating`).then((data) => {
    let avgRating = 0;
    let numRatings = 0;

    if (data.resources) {
      avgRating = Number(data.resources.average_rating);
      numRatings = Number(data.resources.num_ratings);
    }
    
    const $ratingsText = numRatings === 1 ? "rating" : "ratings";
    $(`#rate-${id} > p`).text(`${numRatings} ${$ratingsText}`);

    for (let i = 1; i <= 5; i++) {
      $(`#rate-${id} .star-${i}`).mouseover(() => animateHover(id, i));
      $(`#rate-${id}`).mouseout(() => removeColor(id, i));

      if (i <= avgRating) {
        $(`#rate-${id} .fa-regular.star-${i}`).hide();
        $(`#rate-${id} .fa-solid.star-${i}`).show();
      } else {
        $(`#rate-${id} .fa-regular.star-${i}`).show();

        $(`#rate-${id} .fa-solid.star-${i}`).hide();
      }
    }
  });
};

const animateHover = (resourceId, starIndex) => {
  for (let i = 1; i <= 5; i++) {
    if (i <= starIndex) {
      $(`#rate-${resourceId} .fa-solid.star-${i}`).css("color", "gold");
      $(`#rate-${resourceId} .fa-regular.star-${i}`).css("color", "gold");
    }
  }
};

const removeColor = (resourceId, starIndex) => {
  for (let i = 1; i <= 5; i++) {
    if (i <= starIndex) {
      $(`#rate-${resourceId} .fa-solid.star-${i}`).css("color", "goldenrod");
      $(`#rate-${resourceId} .fa-regular.star-${i}`).css("color", "goldenrod");
    }
  }
};
