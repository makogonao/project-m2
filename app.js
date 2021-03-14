const addButton = document.querySelector(".add-button");
const sortButton = document.querySelector(".sort");
let tasksZone = document.querySelector(".tasks");
let emptyTask = document.querySelector("#task1");
let delList = document.querySelectorAll('.task-del-btn');
let inputList = document.querySelectorAll('input');
inputList.forEach((elem) => {elem.addEventListener("blur", editTask);});
let taskCounter = 2;
let varSortWay = 1;

let tasksArray = [{   
    index: 1,
    id: "task1",
    task: "",
    done: false,},];

class Task {
    constructor(indexNumber) {
        this.index = indexNumber;
        this.id = "task" + taskCounter;
        this.task = "";
        this.done = false;
    }
}

// добавление пустой записи в конец списка
addButton.addEventListener("click", () => {
    tasksArray.push(new Task(tasksArray.length + 1))
    tasksZone.appendChild(newEmptyTask(tasksArray.length + 1));
    console.log([...tasksArray]); // проверяем массив из объектов 

    delList = document.querySelectorAll('.task-del-btn');  // обновляем лист с кнопками удаления тасков
    delList.forEach((elem) => {
        elem.addEventListener("click", delTask);
    });
    inputList = document.querySelectorAll('input'); // обновляем лист с текстовыми полями тасков
    inputList.forEach((elem) => {
        elem.addEventListener("blur", editTask);
    });
});

function newEmptyTask (indexNumber) {
    taskCounter += 1; 
    let newEmptyTask = emptyTask.cloneNode(true);
    newEmptyTask.id = `task${taskCounter - 1}`;
    newEmptyTask.querySelector(".task-number").innerText = `${indexNumber - 1}`;
    newEmptyTask.querySelector("input").value = ""
    return newEmptyTask;
}

function delTask (elem) {
    tasksArray  = tasksArray.filter((e) => {
        return (e.index !== Number(elem.target.parentElement.parentElement.querySelector(".task-number").innerText))
    })
    elem.target.parentElement.parentElement.remove()
    tasksArray.forEach((e, i) => {
        e.index = i + 1;
        document.querySelector(`#${e.id}`).querySelector(".task-number").innerText = i + 1
    });
    
    console.log([...tasksArray]) // проверяем массив из объектов 
};

function editTask (elem) {
    tasksArray.find ((e) => {
      if (e.id === elem.target.parentElement.parentElement.id) {
          e.task = elem.target.value
      }
    })
    console.log([...tasksArray]) // проверяем массив из объектов 
};

sortButton.addEventListener("click", () => {
    sort(tasksArray, "task", varSortWay)
    varSortWay === -1 ? sortButton.firstChild.src = "./img/sort_down.png" : sortButton.firstChild.src = "./img/sort_up.png";
    varSortWay = -varSortWay;
});

function sort (arr, rowName, sortWay) {
    arr.sort((a, b) => {
            const first = a[rowName];
            const second = b[rowName];
                if (first < second) {
                    return -sortWay;
                } else if (first > second) {
                    return sortWay;
                } else {
                    return 0;
                }
    });
    for (let i=0; i < arr.length; i++) {
        arr[i].index = i + 1;
        tasksZone.children[i].querySelector(".task-number").innerText = arr[i].index;
        tasksZone.children[i].querySelector("input").value = arr[i].task;
        tasksZone.children[i].id = arr[i].id;
    }
   console.log([...tasksArray]) // проверяем массив из объектов 
}
