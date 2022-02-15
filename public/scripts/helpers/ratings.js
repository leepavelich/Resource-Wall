const loadRatings = (data) => {
  const { resources } = data;
  resources.forEach((item) => {
    const resourceId = item.id;
    addRating(resourceId);
    renderStars(resourceId);
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
    let avgRating = "0";
    let numRatings = "0";
    if (data.resources) {
      avgRating = data.resources.average_rating;
      numRatings = data.resources.num_ratings;
    }
    const $ratingsText = numRatings === "1" ? "rating" : "ratings";
    $(`#rate-${id} > p`).text(`${numRatings} ${$ratingsText}`);

    switch (avgRating) {
      case "0":
        $(`#rate-${id} > .fa-regular.star-1`).show();
        $(`#rate-${id} > .fa-regular.star-2`).show();
        $(`#rate-${id} > .fa-regular.star-3`).show();
        $(`#rate-${id} > .fa-regular.star-4`).show();
        $(`#rate-${id} > .fa-regular.star-5`).show();

        $(`#rate-${id} > .fa-solid.star-1`).hide();
        $(`#rate-${id} > .fa-solid.star-2`).hide();
        $(`#rate-${id} > .fa-solid.star-3`).hide();
        $(`#rate-${id} > .fa-solid.star-4`).hide();
        $(`#rate-${id} > .fa-solid.star-5`).hide();
        break;
      case "1":
        $(`#rate-${id} > .fa-solid.star-1`).show();
        $(`#rate-${id} > .fa-regular.star-2`).show();
        $(`#rate-${id} > .fa-regular.star-3`).show();
        $(`#rate-${id} > .fa-regular.star-4`).show();
        $(`#rate-${id} > .fa-regular.star-5`).show();

        $(`#rate-${id} > .fa-regular.star-1`).hide();
        $(`#rate-${id} > .fa-solid.star-2`).hide();
        $(`#rate-${id} > .fa-solid.star-3`).hide();
        $(`#rate-${id} > .fa-solid.star-4`).hide();
        $(`#rate-${id} > .fa-solid.star-5`).hide();
        break;
      case "2":
        $(`#rate-${id} > .fa-solid.star-1`).show();
        $(`#rate-${id} > .fa-solid.star-2`).show();
        $(`#rate-${id} > .fa-regular.star-3`).show();
        $(`#rate-${id} > .fa-regular.star-4`).show();
        $(`#rate-${id} > .fa-regular.star-5`).show();

        $(`#rate-${id} > .fa-regular.star-1`).hide();
        $(`#rate-${id} > .fa-regular.star-2`).hide();
        $(`#rate-${id} > .fa-solid.star-3`).hide();
        $(`#rate-${id} > .fa-solid.star-4`).hide();
        $(`#rate-${id} > .fa-solid.star-5`).hide();
        break;
      case "3":
        $(`#rate-${id} > .fa-solid.star-1`).show();
        $(`#rate-${id} > .fa-solid.star-2`).show();
        $(`#rate-${id} > .fa-solid.star-3`).show();
        $(`#rate-${id} > .fa-regular.star-4`).show();
        $(`#rate-${id} > .fa-regular.star-5`).show();

        $(`#rate-${id} > .fa-regular.star-1`).hide();
        $(`#rate-${id} > .fa-regular.star-2`).hide();
        $(`#rate-${id} > .fa-regular.star-3`).hide();
        $(`#rate-${id} > .fa-solid.star-4`).hide();
        $(`#rate-${id} > .fa-solid.star-5`).hide();
        break;
      case "4":
        $(`#rate-${id} > .fa-solid.star-1`).show();
        $(`#rate-${id} > .fa-solid.star-2`).show();
        $(`#rate-${id} > .fa-solid.star-3`).show();
        $(`#rate-${id} > .fa-solid.star-4`).show();
        $(`#rate-${id} > .fa-regular.star-5`).show();

        $(`#rate-${id} > .fa-regular.star-1`).hide();
        $(`#rate-${id} > .fa-regular.star-2`).hide();
        $(`#rate-${id} > .fa-regular.star-3`).hide();
        $(`#rate-${id} > .fa-regular.star-4`).hide();
        $(`#rate-${id} > .fa-solid.star-5`).hide();
        break;
      case "5":
        $(`#rate-${id} > .fa-solid.star-1`).show();
        $(`#rate-${id} > .fa-solid.star-2`).show();
        $(`#rate-${id} > .fa-solid.star-3`).show();
        $(`#rate-${id} > .fa-solid.star-4`).show();
        $(`#rate-${id} > .fa-solid.star-5`).show();

        $(`#rate-${id} > .fa-regular.star-1`).hide();
        $(`#rate-${id} > .fa-regular.star-2`).hide();
        $(`#rate-${id} > .fa-regular.star-3`).hide();
        $(`#rate-${id} > .fa-regular.star-4`).hide();
        $(`#rate-${id} > .fa-regular.star-5`).hide();
        break;
    }
  });
};
