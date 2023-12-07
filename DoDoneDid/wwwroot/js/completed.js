"use strict";

const completedUri = '/api/TodoList/completed';
let completedTodos = [];
const userId = localStorage.getItem("userId");

const getCompletedItems = () => {
    fetch(`${completedUri}?userId=${userId}`)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

const displayEditForm = (id) => {
    const todoItem = completedTodos.find(item => item.id === id);

    document.getElementById('edit-id').value = todoItem.id;
    document.getElementById('edit-task').value = todoItem.task;
    document.getElementById('edit-status').value = todoItem.status;
    document.getElementById('editForm').style.display = 'block';
}

const updateCompletedItem = () => {
    const itemId = document.getElementById('edit-id').value;
    const status = document.getElementById('edit-status').value;
    const item = {
        id: parseInt(itemId, 10), status: parseInt(status, 10), userId: userId
    };

    fetch(`${completedUri}`, {
        method: 'put', headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify(item)
    })
        .then(() => getCompletedItems())
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

    _displayCount(data.length ?? 0);

    const icon = document.createElement('i');

    data.length && data.forEach(item => {
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

    completedTodos = data;
}

getCompletedItems();
