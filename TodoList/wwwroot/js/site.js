"use strict";

const uri = 'api/TodoList';
let todos = []

const getItems = () => {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

const addItem = () => {
    const taskTitleTextBox = document.getElementById('add-task');

    const todoItem = {
        task: taskTitleTextBox.value.trim(), status: 1, userId: "a24b2911-31c0-43ed-8657-4878e3abe626"
    };

    fetch(uri, {
        method: 'post', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify(todoItem)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            taskTitleTextBox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

const deleteItem = (id) => {
    fetch(`${uri}/${id}`, {
        method: 'delete'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

const displayEditForm = (id) => {
    const todoItem = todos.find(item => item.id === id);

    document.getElementById('edit-id').value = todoItem.id;
    document.getElementById('edit-task').value = todoItem.task;
    document.getElementById('edit-status').value = todoItem.status;
    document.getElementById('user-id').value = todoItem.userId;
    document.getElementById('editForm').style.display = 'block';
}

const updateItem = () => {
    const itemId = document.getElementById('edit-id').value;
    const userId = document.getElementById('user-id').value
    const status = document.getElementById('edit-status').value;
    const task = document.getElementById('edit-task').value.trim();
    const item = {
        id: parseInt(itemId, 10),
        task: task,
        status: parseInt(status, 10),
        userId: userId
    };

    fetch(`${uri}/${itemId}`, {
        method: 'put', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

const closeInput = () => {
    document.getElementById('editForm').style.display = 'none';
}

const _displayCount = (itemCount) => {
    const name = (itemCount === 1) ? 'task' : 'tasks';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

const _displayItems = (data) => {
    const tBody = document.getElementById('tasks');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const icon = document.createElement('i');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.classList.add("form-check-input");
        isCompleteCheckbox.disabled = true;

        let editButton = icon.cloneNode(false);
        editButton.classList.add("btn", "btn-outline-primary", "bi", "bi-pen-fill");
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = icon.cloneNode(false);
        deleteButton.classList.add("btn", "btn-outline-danger", "bi", "bi-trash-fill");
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let status = document.createElement("p");
        status.classList.add("btn", `${(item.status === 1) ? "btn-success" : (item.status === 2) ? "btn-warning" : "btn-secondary"}`, "m-0");
        status.innerText = item.status === 1 ? "Todo" : item.status === 2 ? "In Progress" : "Completed"

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let taskNode = document.createTextNode(item.task);
        item.status === 3 ? td1.classList.add("text-decoration-line-through") : ""
        td1.appendChild(taskNode);

        let td2 = tr.insertCell(1);
        td2.appendChild(status);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    todos = data;
}

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
}

