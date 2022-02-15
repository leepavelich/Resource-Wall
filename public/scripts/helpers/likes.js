// const isLiked = (resource, username) => {
//   $.get(`/api/resources/${resource.id}/likes`)
//     .then((data) => {
//       return data.resources.includes(username);
//     })
// }

const renderLikes = (data) => {
  const resourceLikes = data.resources;

  for (const item of resourceLikes) {
    const resourceId = item.id;
    $.get(`/api/resources/${resourceId}/likes`)
      .then((response) => {
        if (response.resources.some(e => e.username === 'gollum')) {  // TODO: pass in user_id
          console.log(response.resources);
          likesToggle(resourceId);
        }
      });
  }
};

// toggle like highlighting
const likesToggle = (id) => {
  $(`#like-${id}`).css("color", "red")
};
