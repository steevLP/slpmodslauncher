# SLPMods Launcher
The SLPMods Launcher is officialy developed for the german gaming network [SLPNetwork](https://slpnetwork.tk).
This Repo will allways be the Development Repo of this launcher, this means it may contain major bugs and may not allways be stable.

## Features
1. It's Opensource! It means someone did the development work for you.
2. It's settings do contain everything the user will need and it's continuesly expanding.
3. Due to it's json server backend it's easy to create new modpack items

## Setting the launcher up
The setup is easy as nothing, all you need is the Github Repo and a Webserver. It requires only a few Steps and basicly no coding skill what so ever!

After having downloaded the launcher the first thing we will need is setting the correct github repo. This step is needed to configure the Autopatcher!
At the moment that field will contain 'https://github.com/your/repo' you will need create github repo for this Launcher and paste the link instead of the Placeholder.

when you have done that mostely every configuration is done. but you have to configure your host, it's needed for the launcher to even be able to download packs from somewhere.

you can configure that by going to this path `assets/config/app.json` in app.json, you will see the following entry `"host":"http://yourhost"` edit it to your domain or ip and you're good to go.
The last Thing we need to setup for the Launcher is installing it's dependencies. This is done by doing `npm install` and that's it.

each modpack needs at leaste a zipfile containing the modpack it self
what it realy will need is this structure `bin/forge.jar` wich is the universal jar of your used forge version
and every needed folder for mods and configs (only mods will be important if you  not edit anything)

The last thing we will need to setup is the Webserver. Create a Folder where you want your modpacks to be located.
Inside the created Folder creat a file called `packs.json`.
Inside `packs.json` paste the following
```json
{
	"all": "1",
	"1": {
		"name": "Title of Modpack",
		"imageLink": "http://path/to/modpacks/icon",
		"backgroundLink": "http://path/to/modpacks/background/image",
		"packLink": "http://path/to/zip",
		"gameVersion": "The Minecraft version",
		"recommended": "Recommended ram",
		"launcherBody": "<p style=\"background-color: rgba(0, 0, 0, 0.5); padding: 10px 10px 10px 10px; border-radius: 5px;\">Description.</p><h3>Mod Liste:</h3><ul><li>Past mod here</li></ul>",
		"packVersion": "1.0.0"
	}
}
```
Remember you do not need to create a Folder for each modpack but i would recommend to creat one to keep a clean Structure.
And now you're technically done.

## Updating and adding Packs
But wait.. there is something we need to talk about, adding more packs and updating them. You can add another pack by doing the following
first we need to edit the `"all":"1"` this is the number of all modpacks you have added so far and it is the latest pack added you will need to add 1 up on it each time you add another modpack.
```json
	"2": {
		"name": "Title of Modpack",
		"imageLink": "http://path/to/modpacks/icon",
		"backgroundLink": "http://path/to/modpacks/background/image",
		"packLink": "http://path/to/zip",
		"gameVersion": "The Minecraft version",
		"recommended": "Recommended ram",
		"launcherBody": "<p style=\"background-color: rgba(0, 0, 0, 0.5); padding: 10px 10px 10px 10px; border-radius: 5px;\">Description.</p><h3>Mod Liste:</h3><ul><li>Past mod here</li></ul>",
		"packVersion": "1.0.0"
	}
```
In this Case the id of the Modpack would be 2 but as you go it will be much higher. 
Updating the modpack is as easy as adding the updated contents to a new zipfile(with the same name) upload it and edit `"packVersion": "1.0.0"` to the fitting new version thats it

## Screenshots
### Main Window
![Main Window](https://slpnetwork.tk/upload/main.png)
### Settings Window
![Settings Window](https://slpnetwork.tk/upload/settings.png)

## Thanks to
pierce.harriz for Creating  MCLC the module that made this Project even possible.
Look at it here: https://www.npmjs.com/package/minecraft-launcher-core | https://github.com/Pierce01/MinecraftLauncher-core
