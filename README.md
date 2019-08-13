# SLPMods Launcher
The SLPMods Launcher is officially developed for the german gaming network [SLPNetwork](https://slpnetwork.tk).
This Repo will always be the Development Repo of this launcher, this means it may contain major bugs and may not always be stable.

## Features
1. It's Opensource! It means someone did the development work for you.
2. Its settings do contain everything the user will need and are continuously expanding.
3. Due to its JSON server backend, it's easy to create new mod pack items.

## Setting the launcher up
The setup is easy as nothing, all you need is the Github Repo and a Webserver. It requires only a few Steps and basically no coding skill what so ever!

After having downloaded the launcher the first thing we will need is setting the correct GitHub repo. This step is needed to configure the Autopatcher!
At the moment that field will contain 'https://github.com/your/repo' you will need to create GitHub repo for this Launcher and paste the link instead of the Placeholder.

when you have done that mostly every configuration is done. but you have to configure your host, it's needed for the launcher to even be able to download packs from somewhere.

you can configure that by going to this path `assets/config/app.json` in app.json, you will see the following entry `"host": "http://yourhost"` edit it to your domain or IP and you're good to go.
The Last thing we need to set up for the Launcher is installing its dependencies. This is done by doing `npm install` and that's it.

each mod pack needs at least a zip file containing the mod pack itself
what it really will need is this structure `bin/forge.jar` which is the universal jar of your used forge version
and every needed folder for mods and configs (only mods will be important if you  not edit anything)

The last thing we will need to set up is the Webserver. Create a folder where you want your mod packs to be located.
Inside the created Folder create a file called `packs.json`.
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
first we need to edit the `"all": "1"` this is the number of all mod packs you have added so far and it is the latest pack added you will need to add 1 upon it each time you add another mod pack.
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
Updating the mod pack is as easy as adding the updated contents to a new zip file(with the same name) upload it and edit `"packVersion": "1.0.0"` to the fitting new version that's it

## Screenshots
### Main Window
![Main Window](https://slpnetwork.tk/upload/main.png)
### Settings Window
![Settings Window](https://slpnetwork.tk/upload/settings.png)

## Thanks to
pierce.harriz for Creating  MCLC the module that made this project even possible.
Look at it here: https://www.npmjs.com/package/minecraft-launcher-core | https://github.com/Pierce01/MinecraftLauncher-core
