document.addEventListener('DOMContentLoaded',()=>{
    const todoinput= document.getElementById("taskInput");
    const addtaskbutton= document.getElementById("addtask");
    const todolist= document.getElementById("taskList");

    let tasks =JSON.parse(localStorage.getItem("tasks"))|| [];

    tasks.forEach((task) => rendertask(task));

    addtaskbutton.addEventListener('click',()=>{
        const taketask = todoinput.value.trim();
        if(taketask==="") return; 
    
    const newtask = {
        id: Date.now(),
        Text:taketask,
        completed:false,
    };
    tasks.push(newtask);
    rendertask(newtask); // automatic reloading
    savetasks();
    todoinput.value="";
    console.log(tasks);

    });

    function rendertask(task){
        const li = document.createElement("li");
        li.setAttribute("data-id",task.id);
        if(task.completed) li.classList.add("completed");
        li.innerHTML=`
        <span class="text-cyan-400">${task.Text}</span>
        <button class="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition absolute right-4">Delete</button>`
        ;
        li.addEventListener('click',(e)=>{
            if(e.target.tagName === "BUTTON") return;
            task.completed=!task.completed;
            li.classList.toggle('completed');
            savetasks();
        });
        li.querySelector("button").addEventListener('click',(e)=>{
            e.stopPropagation(); //prevent toggle firing
            tasks = tasks.filter((t)=>t.id != task.id);
                li.remove();
                savetasks();

        })
       
        todolist.appendChild(li);

        
    }

    function savetasks (){
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
});