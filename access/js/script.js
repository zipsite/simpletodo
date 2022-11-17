let arrElemList = document.getElementsByClassName("elem-list");
console.log(arrElemList)
for(let i = 1; i < arrElemList.length; i++) {
    console.log(arrElemList[i]);
    arrElemList[i].addEventListener("click", (event)=>{
        console.log(event)
        if(event.path[1].className == "checkbox") {
            console.log("checkbox");
        }
        else if(event.path[1].className == "remove") {
            console.log("remove");
        }
    });
}