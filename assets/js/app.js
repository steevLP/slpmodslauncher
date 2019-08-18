let { ipcRenderer } = require("electron");
const request = require('request');
var path = process.cwd();
const host = require(path + '/assets/config/app.json');

//HtmlToJs Definition
let body = document.getElementById('modLayout');
let title = document.getElementById('modHeader');
let btn_launch = document.getElementById('launch');
let modbody = document.getElementById('body_div');

let selected;

//Button Controller

//Pack Grabber
request({
    method:'GET',
    uri:host.host,
    json:true
}, function (error, response, body) {
    if(error) throw error;

    selected = (body.length - 1);
    for(let i = 0; i < body.length; i++){
        console.log(selected);
        console.log(i + ": " +  body[i].name);

        //Definition of the specific mod Item
        let modItem = document.createElement("li");
        let modIcon = document.createElement("img");
        let modTitleTag = document.createElement("h2");
        let modTitle = document.createTextNode(body[i].name);
        let ul_modslist = document.getElementById('modList');

        modItem.addEventListener('click', () => {
            selected = modItem.dataset.mp_id;
            console.log(selected);
        });

        modTitleTag.style.color = 'white';
        modIcon.src = body[i].imageLink;
        modIcon.width = 50;
        modIcon.height = 50;

        modTitleTag.appendChild(modTitle);
        modItem.appendChild(modIcon);
        modItem.appendChild(modTitleTag);
        ul_modslist.appendChild(modItem);
        modItem.classList.add('modItem');
        modItem.setAttribute("id","mp");
        modItem.dataset.mp_id = i;

        console.log(body[selected].launcherBody);

        console.log(modbody)
        body.innerHTML = "<h2>"+body[selected].name+"</h2>"+"<small style=\"color: grey;\">Pack Version: "+body[selected].packVersion+"</small><br><small style=\"color: grey;\">Empfohlener Ram: "+body[selected].recommended+"</small><br>"+body[selected].launcherBody;
    
        //Launches the Instance
        btn_launch.addEventListener('click', (e) => {
            ipcRenderer.send('launch',[body[selected].name, body[selected].gameVersion, body[selected].packLink, body[selected].packVersion]);
        });  
    }
})