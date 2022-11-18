async function CreateTask(textTask) {
    const response = await fetch("api/tasks", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            text: textTask
        })
    });
    location.reload()
}
async function CheckTask(taskId, taskCheck) {
    const response = await fetch("api/tasks", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: taskId,
            check: taskCheck
        })
    });
    location.reload()
}
async function DeleteTask(id) {
    const response = await fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    location.reload()
}

let arrElemList = document.getElementsByClassName("elem-list");
let input = document.getElementsByClassName("input-task")[0];
input.addEventListener("click", (event)=>{
    if(event.path[1].className == "add") {
        console.log(event.currentTarget.children[0].innerHTML)
        let text = event.currentTarget.children[0].innerHTML;
        CreateTask(text);
    }
});
for(let i = 1; i < arrElemList.length; i++) {
    arrElemList[i].addEventListener("click", (event)=>{
        if(event.path[1].className == "checkbox true") {
            console.log("checkbox true");
            CheckTask(event.path[2].id, false);
        }
        else if(event.path[1].className == "checkbox false") {
            console.log("checkbox false");
            CheckTask(event.path[2].id, true);
        }
        else if(event.path[1].className == "remove") {
            console.log("remove");
            DeleteTask(event.path[2].id)
        }
    });
}