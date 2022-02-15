const loadRatings = (data) => {
  const { resources } = data;
  resources.forEach((item) => {
    const resourceId = item.id;
    addRating(resourceId);
    $.get(`/api/resources/${resourceId}/rating`).then((data) => {
      let avgRating = "0";
      let numRatings = "0";
      if (data.resources) {
        avgRating = data.resources.average_rating;
        numRatings = data.resources.num_ratings;
      }
      $(`#rate-${resourceId}`).prepend(`<p>ratings: ${numRatings}</p>`);
      console.log(resourceId, avgRating);
      switch (avgRating) {
        case "0":
          $(`#rate-${resourceId} > .fa-regular.star-1`).show();
          $(`#rate-${resourceId} > .fa-regular.star-2`).show();
          $(`#rate-${resourceId} > .fa-regular.star-3`).show();
          $(`#rate-${resourceId} > .fa-regular.star-4`).show();
          $(`#rate-${resourceId} > .fa-regular.star-5`).show();
          break;
        case "1":
          $(`#rate-${resourceId} > .fa-solid.star-1`).show();
          $(`#rate-${resourceId} > .fa-regular.star-2`).show();
          $(`#rate-${resourceId} > .fa-regular.star-3`).show();
          $(`#rate-${resourceId} > .fa-regular.star-4`).show();
          $(`#rate-${resourceId} > .fa-regular.star-5`).show();
          break;
        case "2":
          $(`#rate-${resourceId} > .fa-solid.star-1`).show();
          $(`#rate-${resourceId} > .fa-solid.star-2`).show();
          $(`#rate-${resourceId} > .fa-regular.star-3`).show();
          $(`#rate-${resourceId} > .fa-regular.star-4`).show();
          $(`#rate-${resourceId} > .fa-regular.star-5`).show();
          break;
        case "3":
          $(`#rate-${resourceId} > .fa-solid.star-1`).show();
          $(`#rate-${resourceId} > .fa-solid.star-2`).show();
          $(`#rate-${resourceId} > .fa-solid.star-3`).show();
          $(`#rate-${resourceId} > .fa-regular.star-4`).show();
          $(`#rate-${resourceId} > .fa-regular.star-5`).show();
          break;
        case "4":
          $(`#rate-${resourceId} > .fa-solid.star-1`).show();
          $(`#rate-${resourceId} > .fa-solid.star-2`).show();
          $(`#rate-${resourceId} > .fa-solid.star-3`).show();
          $(`#rate-${resourceId} > .fa-solid.star-4`).show();
          $(`#rate-${resourceId} > .fa-regular.star-5`).show();
          break;
        case "5":
          $(`#rate-${resourceId} > .fa-solid.star-1`).show();
          $(`#rate-${resourceId} > .fa-solid.star-2`).show();
          $(`#rate-${resourceId} > .fa-solid.star-3`).show();
          $(`#rate-${resourceId} > .fa-solid.star-4`).show();
          $(`#rate-${resourceId} > .fa-solid.star-5`).show();
          break;
      }
    });
  });
};

const addRating = (id) => {
  const currentUserId = document.cookie.split("=")[1];

  for (let i = 1; i <= 5; i++) {
    $(`#rate-${id} .star-${i}`).on("click", () => {
      const newRating = i;
      $.post(`/api/resources/rating`, {
        user_id: currentUserId,
        resource_id: id,
        rating: newRating,
      });
    });
  }
};
