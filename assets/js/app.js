let { ipcRenderer } = require("electron");
const fetch = require('node-fetch');

//HtmlToJs Definition
let body = document.getElementById('modLayout');
let title = document.getElementById('modHeader');
let btn_launch = document.getElementById('launch');
let modbody = document.getElementById('body_div');

let selected;

//Button Controller

//Pack Grabber
fetch('http://91.218.65.98/mods/packs.json').then(function(response){
    return response.json();
}).then(function(json){

    for(let i = 1; i <= json.all; i++){
        selected = json.all;
        //Definition of the specific mod Item
        let modItem = document.createElement("li");
        let modIcon = document.createElement("img");
        let modTitleTag = document.createElement("h2");
        let modTitle = document.createTextNode(json[i].name);
        let ul_modslist = document.getElementById('modList');
        modItem.addEventListener('click', () => {
            selected = modItem.dataset.mp_id;
        });


        modTitleTag.style.color = 'white';
        modIcon.src = json[i].imageLink;
        modIcon.width = 50;
        modIcon.height = 50;

        modTitleTag.appendChild(modTitle);
        modItem.appendChild(modIcon);
        modItem.appendChild(modTitleTag);
        ul_modslist.appendChild(modItem);

        modItem.classList.add('modItem');
        modItem.setAttribute("id","mp");
        modItem.dataset.mp_id = i;
    }
    console.log(json[selected].launcherBody);

    console.log(modbody)
    body.innerHTML = "<h2>"+json[selected].name+"</h2>"+"<small style=\"color: grey;\">Pack Version: "+json[selected].packVersion+"</small><br><small style=\"color: grey;\">Empfohlener Ram: "+json[selected].recommended+"</small><br>"+json[selected].launcherBody;

    //Launches the Instance
    btn_launch.addEventListener('click', (e) => {
        ipcRenderer.send('launch',[json[selected].name, json[selected].gameVersion, json[selected].packLink, json[selected].packVersion]);
    });    
});