const registerUser = () => {
    const email = document.getElementById("r_email").value;
    const password = document.getElementById("r_password").value;

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
                    throw new Error(Object.values(err.errors).map(er => er).join(","))
                }).catch(error => {
                    registerMessage.innerText = error.message;
                    console.error(error)
                });
            } else {
                registerMessage.innerText = "Successfully Registered";
                location.href = "/auth/login.html";
            }
        });
}

const loginUser = () => {
    const email = document.getElementById("l_email").value;
    const password = document.getElementById("l_password").value;

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
                    loginMessage.innerText = error.message;
                    console.error(error)
                });
            } else {
                loginMessage.innerText = "Login Success";
                location.href = "/";
            }
        });
}