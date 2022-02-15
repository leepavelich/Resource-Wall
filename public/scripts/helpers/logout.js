const logout = () => {
  $("#auth-btn").on("click", function () {
    $.get("/auth/logout").then(() => {
      $(this).html("Login");
    });
  });
};
