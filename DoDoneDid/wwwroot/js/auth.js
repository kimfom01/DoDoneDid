const registerUser = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const registerMessage = document.getElementById("registerMessage");

    fetch("/api/Auth/register", {
        method: "post", headers: {
            "Accept": "application/json", "Content-Type": "application/json"
        }, body: JSON.stringify({
            email, password
        })
    })
        .then(response => {
            if (response.status !== 200) {
                const errorResponse = response.json();
                errorResponse.then(err => {
                    throw new Error(Object.values(err.errors).map(er => er).join("\n"))
                }).catch(error => {
                    registerMessage.innerHTML = "<div class='text-danger'>Registration Failed</div>";
                    console.error(error)
                });
            } else {
                registerMessage.innerText = "Successfully Registered";
                location.href = "/auth/login.html";
            }
        });
}

const loginUser = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginMessage = document.getElementById("loginMessage");

    fetch("/api/Auth/login?useCookies=true", {
        method: "post", headers: {
            "Accept": "application/json", "Content-Type": "application/json"
        }, body: JSON.stringify({
            email, password
        })
    })
        .then(response => {
            if (response.status !== 200) {
                const errorResponse = response.json();
                errorResponse.then(err => {
                    throw new Error(`Login ${err.detail}`)
                }).catch(error => {
                    loginMessage.innerHTML = "<div class='text-danger'>Email or password incorrect</div>";
                    console.error(error)
                });
            } else {
                loginMessage.innerText = "Login Success";
                location.href = "/";
            }
        });
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});