const logout = () => {
  $("#auth-btn").on("click", function () {
    $.get("/auth/logout").then(() => {
      $(this).html("Login");
      $("#current-user").html("");
      $(".show-if-auth").hide();
      loadResources();
    });
  });
};
