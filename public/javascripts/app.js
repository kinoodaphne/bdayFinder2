// simple logout functionality
document.querySelector(".option__logout").addEventListener("click", e => {
    localStorage.removeItem("token");
    window.location.href = "/users/login";
    e.preventDefault();
});