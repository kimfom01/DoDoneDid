const logoutUser = () => {
    localStorage.clear();
    fetch("/api/Auth/logout", {
        method: "get",
        credentials: "include"
    })
        .then(() => {
            location.href = "/auth/login.html"
        })
}