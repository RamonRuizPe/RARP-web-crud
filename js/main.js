import app from "./index.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

const db = getFirestore(app);
const taskform = document.getElementById("task-form");
const tasktitle = document.getElementById("task-title");
const taskdescr = document.getElementById("task-description");
const taskcontainer = document.getElementById("tasks-container");

let editstatus = false;
let id = "";

const savetask = (title, description) =>
  addDoc(collection(db, "tasks"), {
    title: title,
    description: description
  });

// const gettask = () => getDocs(collection(db, "tasks"));

const onGetTask = (callback) => onSnapshot(collection(db, "tasks"), callback);

const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

const getTask = (id) => getDoc(doc(db, "tasks", id));

const updateTask = (id, updatedTask) =>
  updateDoc(doc(db, "tasks", id), updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTask((querySnapshot) => {
    taskcontainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id;
      taskcontainer.innerHTML += `<div class="card card-body mt-2 border-primary">
        <h4>${task.title}</h4>
        <p>${task.description}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${task.id}">Delete</button>
          <button class="btn btn-secondary btn-edit" data-id="${task.id}">Edit</button>
        </div>
      </div>`;

      const btnDelete = document.querySelectorAll(".btn-delete");
      btnDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteTask(e.target.dataset.id);
        });
      });

      const btnEdit = document.querySelectorAll(".btn-edit");
      btnEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          editstatus = true;
          id = doc.id;
          console.log(editstatus);
          console.log(id);
          document.getElementById("btn-task-form").innerText = "update";
          document.getElementById("task-title").value = task.title;
          document.getElementById("task-description").value = task.description;
        });
      });
    });
  });
});

taskform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = tasktitle.value;
  const description = taskdescr.value;
  if (!editstatus) {
    await savetask(title, description);
  } else {
    await updateTask(id, {
      title: title,
      description: description
    });
    editstatus = false;
    document.getElementById("btn-task-form").innerText = "save";
    id = "";
  }

  taskform.reset();
  tasktitle.focus();
});
