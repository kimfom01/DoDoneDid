const registerUser = () => {
    const email = document.getElementById("r_email").value;
    const password = document.getElementById("r_password").value;

    const registerMessage = document.getElementById("registerMessage");
    const registerModal = document.getElementById("registerModal");

    fetch("/account/register", {
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
                    throw new Error(Object.values(err.errors).map(er => er).join(","))
                }).catch(error => {
                    registerMessage.innerText = error.message;
                    console.error(error)
                });
            } else {
                registerMessage.innerText = "Successfully Registered";
                location.href = "auth/login.html";
                const modal = bootstrap.Modal.getInstance(registerModal);
                setTimeout(() => {
                    modal.hide()
                }, 1_500)
            }
        });
}

const loginUser = () => {
    const email = document.getElementById("l_email").value;
    const password = document.getElementById("l_password").value;

    console.table({email, password});

    const loginMessage = document.getElementById("loginMessage");
    const loginModal = document.getElementById("loginModal");

    fetch("/account/login", {
        method: "post", headers: {
            "Accept": "application/json", "Content-Type": "application/json"
        }, body: JSON.stringify({
            email, password
        })
    })
        .then(response => {
            if (response.status !== 200) {
                throw new Error("Unable to login user.")
            } else {
                return response.json()
            }
        })
        .then(res => {
            loginMessage.innerText = "Login Success";

            sessionStorage.setItem("tokenType", res.tokenType);
            sessionStorage.setItem("accessToken", res.accessToken);
            sessionStorage.setItem("expiresIn", res.expiresIn);
            sessionStorage.setItem("refreshToken", res.refreshToken);

            location.href = "/";

            const modal = bootstrap.Modal.getInstance(loginModal);
            setTimeout(() => {
                modal.hide()
            }, 1_500)
        })
        .catch(error => {
            loginMessage.innerText = error.message;
            console.error(error)
        });
}

const logoutUser = () => {
    sessionStorage.clear()
    location.href = "/auth/login.html"
}