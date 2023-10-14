var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*

Available code commands:

new Activate
new Command
new Key
new Settings
new Easy
new DevLog
new UserMessage(username, innerHTML, button, count)
new BackgroundImage(src)
new DevMessage(innerHTML, button, count)
new Key(key)
new IconBar
new Text(innerHTML)
new TextImage(src, backgroundColor, shadow)
new Space(height)
new Iframe(src)
new Icon(src, link, backgroundColor, left)
new Version
new Blocked(pass)
new Announcement(innerHTML)
new Message(innerHTML)
new Particle(src0, src1, src2, src3, src4, size, fade, positionX)
new ParticleEffect(src0, src1, src2, src3, src4, size, fade, amount)
new Presettings

*/

//version
const version = "3.2"
// font siye
var size = 2.2
// announcement font size 
var aSize = "5vh"
// cursor style
var cursor = "crosshair"
// true if device height >= width
var mobile = false
// enables terminal
var dev = false
// forces the command input field to be shown 
var force = false
// adds the number of action behind the commands
var time = 0
// true if user types in the command input, disables key detection
var typeFocus = false
// true when user enabled particle commands
var userParticle = false
// set this only to true wuen your script is applied on the resurviv main site
var mainSite = false

//Creates an element
function create(value) {
	return document.createElement(value)
}

//Appends the created element
function add(nodeObject) {
	return document.body.appendChild(nodeObject)
}

//Gets an element
function get(id) {
	return document.getElementById(id)
}

//Writes the command help page
function writeCommands() {
	devLog("/clear---Clears the DevLog", "purple", "command")
	devLog("/client [type]---Enables client resources", "purple", "command")
	devLog("/github---Opens the ReHelper github page", "purple", "command")
	devLog("/hide---Hides the DevLog", "purple", "command")
	devLog("/message [content]---Writes a developer message", "purple", "command")
	devLog("/fps---Shows FPS", "purple", "command")
	devLog("/counters---Shows health/adrenaline counters", "purple", "command")
	devLog("/borders---Adds color borders around weapons", "purple", "command")
	devLog("/opacity [opacity in %]---Changes the DevLog's opacity", "purple", "command")
	devLog("/particle create---Enables the season's particle effect", "purple", "command")
	devLog("/particle kill---Disables the season's particle effect", "purple", "command")
	devLog("/say [content]---Writes a message", "purple", "command")
	devLog("/show---Shows the DevLog", "purple", "command")
	devLog("/storage clear---Clears the local storage", "purple", "command")
}

//Adds a message to the developer log
function devLog(text, color, type) {
	if (get("devMessage") && typeFocus == false) {
		var message = get("devMessage")
		var date = new Date()
		var say = create("plaintext")
		say.style.width = "1.5vw"
		say.style.fontSize = "1.5vw"
		say.innerHTML = text + "----(" + time + ")"
		if (color == undefined) {
			say.style.color = "lightgreen"
		}
		if (color != undefined) {
			if (color == "blue") {
				say.style.color = "#0071fd"
			}
			else if (color == "purple") {
				say.style.color = "#e031d4"
			}
			else {
				say.style.color = color
			}
		}
		if (type == undefined) {
			message.appendChild(say)
		}
		if (type != undefined) {
			if (type == "command") {
				get("commandHelp").appendChild(say)
			}
		}
		async function scroll() {
			message.style.visibility = "hidden"
			message.style.display = "block"
			message.scrollBy(0, 10000)
			message.style.display = "hidden"
			message.style.visibility = "visible"
			time = time + 1
		}
		scroll()
	}
}

//enables specific client resources
function client(name) {
	name = name.toLocaleLowerCase()
	const clients = ["normal", "snow"]
	if (mainSite == true && clients.includes(name) == true) {
		get("background").style.backgroundImage = "url(" + "https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/clients/" + name + "/background.svg" + ")"
		get("start-row-header").style.backgroundImage = "url(" + "https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/clients/" + name + "/title.svg" + ")"
		devLog("Loading client " + name.toLocaleLowerCase())
	}
	if (mainSite == false) {
		devLog("Clients are not supported on this site", "red")
	}
	if (clients.includes(name) == false) {
		devLog("Client " + name + " does not exist", "red")
		devLog("Current client types are: " + clients, "red")
	}
}

var kruffer_fpsExecuted = false;
function kruffer_fps() {

var refresh = true;
const times = [];
let fps;

function refreshLoop() {
window.requestAnimationFrame(() => {
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
	times.shift();
    }
    times.push(now);
    fps = times.length;
    if (refresh) {
	var obj = document.createElement("P");
	var text = document.createTextNode(Math.round(fps).toString() + " FPS");
	obj.appendChild(text);
	obj.setAttribute("id", "fps");
	document.getElementById("ui-top-left").appendChild(obj);
	refresh = false;
    } else {
	document.getElementById("fps").innerHTML = Math.round(fps).toString() + " FPS";
    }
    refreshLoop();
});
}
refreshLoop();
};

function kruffer_counters() {
const healthContainer = document.querySelector('#ui-health-container');

// Create health element
const health = document.createElement('span');
health.style.cssText = `
    display: block;
    position: fixed;
    z-index: 2;
    margin: 6px 0 0 0;
    right: 15px;
    mix-blend-mode: difference;
    font-weight: bold;
    font-size: large;
  `;
healthContainer.appendChild(health);

// Create adr element
const adr = document.createElement('span');
adr.style.cssText = `
    display: block;
    position: fixed;
    z-index: 2;
    margin: 6px 0 0 0;
    left: 15px;
    mix-blend-mode: difference;
    font-weight: bold;
    font-size: large;
  `;
healthContainer.appendChild(adr);

setInterval(function() {
    // Update health
    const hp = document.getElementById('ui-health-actual').style.width.slice(0, -1);
    health.innerHTML = Math.round(hp);

    // Calculate and update adr
    const boost0 = document.getElementById('ui-boost-counter-0').querySelector('.ui-bar-inner').style.width.slice(0, -1);
    const boost1 = document.getElementById('ui-boost-counter-1').querySelector('.ui-bar-inner').style.width.slice(0, -1);
    const boost2 = document.getElementById('ui-boost-counter-2').querySelector('.ui-bar-inner').style.width.slice(0, -1);
    const boost3 = document.getElementById('ui-boost-counter-3').querySelector('.ui-bar-inner').style.width.slice(0, -1);
    const adr0 = boost0 * 25 / 100 + boost1 * 25 / 100 + boost2 * 37.5 / 100 + boost3 * 12.5 / 100;
    adr.innerHTML = Math.round(adr0);
});
};

function kruffer_borders() {

var colorweaponsbox = document.getElementsByClassName('ui-weapon-name')
    console.log(colorweaponsbox);
    for (var ii = 0; ii < colorweaponsbox.length; ii++) {
        colorweaponsbox[ii].addEventListener('DOMSubtreeModified', function() {
            var weaponInfo = this.textContent;
            var border = 'solid';
            switch (weaponInfo) {
                default:
                    border = '#9e9e9e';
                    border = 'solid';
                    break;
                case "Fists":
                    border += '#9e9e9e';
                    break;
                case "Karambit":
                    border +='#9e9e9e';
                    break;
                case "Karambit Rugged":
                    border +='#9e9e9e';
                    break;
                case "Karmabit Prismatic":
                    border +='#9e9e9e';
                    break;
                case "Karmabit Drowned":
                    border +='#9e9e9e';
                    break;
                case "Bayonet":
                    border +='#9e9e9e';
                    break;
                case "Bayonet Rugged":
                    border +='#9e9e9e';
                    break;
                case "Bayonet Woodland":
                    border +='#9e9e9e';
                    break;
                case "Huntsman":
                    border +='#9e9e9e';
                    break;
                case "Huntsman Rugged":
                    border +='#9e9e9e';
                    break;
                case "Huntsman Burnished":
                    border +='#9e9e9e';
                    break;
                case "Bowie":
                    border +='#9e9e9e';
                    break;
                case "Bowie Vintage":
                    border +='#9e9e9e';
                    break;
                case "Bowie Frontier":
                    border +='#9e9e9e';
                    break;
                case "Wood Axe":
                    border +='#9e9e9e';
                    break;
                case "Blood Axe":
                    border +='#9e9e9e';
                    break;
                case "Fire Axe":
                    border +='#9e9e9e';
                    break;
                case "Katana":
                    border +='#9e9e9e';
                    break;
                case "Katana Rusted":
                    border +='#9e9e9e';
                    break;
                case "Katana Orchid":
                    border +='#9e9e9e';
                    break;
                case 'Naginata':
                    border += '#9e9e9e';
                    break;
                case "Machete":
                    border +='#9e9e9e';
                    break;
                case "Kukri":
                    border +='#9e9e9e';
                    break;
                case "Stone Hammer":
                    border +='#9e9e9e';
                    break;
                case "Sledgehammer":
                    border +='#9e9e9e';
                    break;
                case "Hook":
                    border +='#9e9e9e';
                    break;
                case "Pan":
                    border +='#9e9e9e';
                    break;
                case "Knuckles":
                    border +='#9e9e9e';
                    break;
                case "Knuckles Rusted":
                    border +='#9e9e9e';
                    break;
                case "Knuckles Heroic":
                    border +='#9e9e9e';
                    break;
                case "Bonesaw":
                    border += '#9e9e9e';
                    break;
                case "Spade":
                    border +='#9e9e9e';
                    break;
                case "Crowbar":
                    border +='#9e9e9e';
                    break;
                case "Kukri":
                    border +='#9e9e9e';
                    break;
                case "Bonesaw":
                    border +='#9e9e9e';
                    break;
                case "Katana":
                    border +='#9e9e9e';
                    break;
                case "War Hammer":
                    border +='#9e9e9e';
                    break;
                case 'CZ-3A1':
                case 'G18C':
                case 'M9':
                case 'M93R':
                case 'MAC-10':
                case 'MP5':
                case 'P30L':
                case 'Dual P30L':
                case 'UMP9':
                case 'Vector':
                case 'VSS':
                    border += '#ab832c';
                    break;
                case 'M1100':
                case 'M870':
                case 'MP220':
                case 'Saiga-12':
                case 'SPAS-12':
                case 'Super 90':
                case 'USAS-12':
                case 'Hawk 12G':
                    border += '#4a0000';
                    break;
                case 'AK-47':
                case 'M134':
                case 'AN-94':
                case 'BAR M1918':
                case 'BLR 81':
                case 'DP-28':
                case 'Groza':
                case 'Groza-S':
                case 'M1 Garand':
                case 'M39 EMR':
                case 'Mosin-Nagant':
                case 'OT-38':
                case 'OTs-38':
                case 'PKP Pecheneg':
                case 'SCAR-H':
                case 'SV-98':
                case 'SVD-63':
                    border += '#003687';
                    break;
                case 'FAMAS':
                case 'L86A2':
                case 'M249':
                case 'M416':
                case 'M4A1-S':
                case 'Mk 12 SPR':
                case 'QBB-97':
                case 'Scout Elite':
                    border += '#025c00';
                    break;
                case 'M1911':
                case 'M1A1':
                case 'Mk45G':
                case 'Model 94':
                case 'Peacemaker':
                case 'Vector 45':
                    border += '#7900FF';
                    break;
                case 'M79':
                    border += '#0CDDAB';
                    break;
                case 'Flare Gun':
                    border += '#D44600';
                    break;
                case 'DEagle 50':
                    border += '#292929';
                    break;
                case 'AWM-S':
                case 'Mk 20 SSR':
                    border += '#465000';
                    break;
                case 'Potato Cannon':
                case 'Spud Gun':
                    border += '#935924';
                    break;
                case 'M9 Cursed':
                    border += '#323232';
                    break;
                case 'Bugle':
                    border += '#F2BC21';
                    break;
                case 'Frag':
                    border += '#9e9e9e';
                    break;
                case 'Mine':
                    border += '#9e9e9e';
                    break;
                case 'MIRV':
                    border += '#9e9e9e';
                    break;
                case 'Potato':
                    border += '#9e9e9e';
                    break;
                case 'Smoke':
                    border += '#9e9e9e';
                    break;
                case 'Snowball':
                    border += '#9e9e9e';
                    break;
                case 'Strobe':
                    border += '#9e9e9e';
                    break;
                case 'Iron Bomb':
                    border += '#9e9e9e';
                    break;
            }
            console.log(border);
            this.parentNode.style.border = border;
        }, false);
    }
}

//Enables specific eventlisteners
class Activate {
	constructor() {
		window.addEventListener("keypress", (key) => {new Key(key)})
	}
}

//Detects what key is pressed
class Key {
	constructor(key) {
		if (window.innerHeight >= window.innerWidth) {
			mobile = true
		}
		if (window.innerWidth >= window.innerHeight) {
			mobile = false
		}
		this.Check(key)
		devLog("pressed '" + key.key + "'")
	}
	Check(key) {
		var $ = key.key.toLocaleLowerCase()
		if ($ == "$" && dev == false) {
			dev = true
			devLog("ReHelper Admin Version " + version, "blue")
			devLog("Main Developer: Xu Xialing", "blue")
			devLog("Developers: Kruffer, Soy Milk", "blue")
			writeCommands()
			return
		}
		if ($ == "$" && dev == true) {
			dev = false
			return
		}
		if ($ == "enter" && dev == true) {
			if (get("commands").value.match("/") && typeFocus == true) {
				new Command(get("commands").value)
			}
		}
	}
}

//Runs commands
class Command {
	constructor(content) {
		this.RunSlash(content)
	}
	RunSlash(content) {
		if (content.slice(1, 1000).match("say")) {
			typeFocus = false
			devLog("Saying '" + content.slice(5, content.length) + "'")
			alert(content.slice(5, content.length))
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, 1000).match("message")) {
			typeFocus = false
			devLog("Telling '" + content.slice(9, content.length) + "'")
			new DevMessage(content.slice(9, content.length), "OK", Math.random())
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, 1000) == "clear") {
			typeFocus = false
			devLog("Clearing Devlog")
			get("devMessage").innerHTML = ""
			devLog("ReHelper Admin Version " + version, "blue")
			devLog("Main Developer: Xu Xialing", "blue")
			devLog("Developers: Kruffer, Soy Milk", "blue")
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, 1000).match("particle create")) {
			typeFocus = false
			devLog("Starting particle effect")
			userParticle = true
			new ParticleEffect("https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/particles/green_leaf.svg", "https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/particles/lotus.svg", "https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/particles/red_leaf.svg", "https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/particles/yellow_leaf.svg", "https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/particles/orange_leaf.svg", 4, 1, 25, "up")
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, 1000).match("particle kill")) {
			typeFocus = false
			devLog("Killing particle effect")
			userParticle = false
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, 1000).match("storage clear")) {
			typeFocus = false
			devLog("Clearing localStorage")
			localStorage.clear()
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, 1000).match("opacity")) {
			typeFocus = false
			devLog("Changing opacity to: " + content.slice(9, 1000) + "%")
			get("devLog").style.opacity = content.slice(9, content.length) + "%"
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, 1000).match("github")) {
			typeFocus = false
			devLog("Connecting to GitHub")
			window.open("https://web.archive.org/web/20230418122154/https://github.com/rehelper/rehelper.github.io")
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, content.length).match("hide")) {
			typeFocus = false
			devLog("Hiding DevLog")
			force = true
			get("commandBox").style.top = "2vw"
			get("commands").placeholder = "Type /show to show the DevLog"
			get("devLog").style.display = "none"
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, content.length).match("show")) {
			typeFocus = false
			devLog("Showing DevLog")
			force = false
			get("commandBox").style.top = "36vw"
			get("commands").placeholder = "Slash commands enabled..."
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, content.length).match("client")) {
			typeFocus = false
			client(content.slice(8, content.length))
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, content.length) == "fps") {
			if(kruffer_fpsExecuted == false) {
			typeFocus = false
			if (mainSite == true) {
				kruffer_fps()
			}
			devLog("Enabled FPS Count")
			get("commands").value = ""
			typeFocus = true
			return
			}
			if(kruffer_fpsExecuted == true) {
			devLog("FPS already shown!")}
		}
		if (content.slice(1, content.length) == "borders") {
			typeFocus = false
			if (mainSite == true) {
				kruffer_borders()
			}
			devLog("Enabled weapon borders")
			get("commands").value = ""
			typeFocus = true
			return
		}
		if (content.slice(1, content.length) == "counters") {
			typeFocus = false
			if (mainSite == true) {
				kruffer_counters()
			}
			devLog("Enabled counters")
			get("commands").value = ""
			typeFocus = true
			return
		}
		else {
			typeFocus = false
			devLog("'" + content + "' does not exist", "red")
			get("commands").value = ""
			typeFocus = true
		}
	}
}

//Creates the basic site
class Settings {
	constructor() {
		this.Draw()
		devLog("running Settings")
	}
	Draw() {
		const content = create("div")
		content.id = "content"
		const background = create("div")
		background.id = "background"
		add(content)
		add(background)
		document.body.style.fontSize = size + "vh"
		document.body.style.backgroundColor = "#81b245"
		document.body.style.fontFamily = "Roboto Condensed"
		document.body.style.whiteSpace = "pre-line"
		document.body.onmouseover = () => {document.body.style.cursor = cursor}
	}
}

//Creates the minimum of code needed
class Easy {
	constructor() {
		this.Draw()
	}
	Draw() {
		const content = create("div")
		content.id = "content"
		const background = create("div")
		background.id = "background"
		add(content)
		add(background)
	}
}

//Creates the background's image
class BackgroundImage {
	constructor(src) {
		this.Draw(src)
		devLog("drawing BackgroundImage")
	}
	Draw(src) {
		const backgroundImage = create("img")
		backgroundImage.src = src
		backgroundImage.style.height = "100vh"
		backgroundImage.style.position = "fixed"
		backgroundImage.style.top = "0vh"
		backgroundImage.style.left = "0vw"
		backgroundImage.style.minWidth = "100vw"
		backgroundImage.style.minHeight = "100vh"
		backgroundImage.style.zIndex = "1"
		const background = document.getElementById("background")
		background.style.height = "100vh"
		background.style.position = "fixed"
		background.style.top = "0vh"
		background.style.left = "0vw"
		background.style.pointerEvents = "none"
		background.style.zIndex = "1"
		background.appendChild(backgroundImage)
	}
}

//Creates the bar for the icons at the top of the screen
class IconBar {
	constructor() {
		this.Draw()
		devLog("creating IconBar")
	}
	Draw() {
		const iconBar = create("div")
		iconBar.style.backgroundColor = "rgba(0, 0, 0, .6)"
		iconBar.id = "mainIcons"
		iconBar.style.width = "100vw"
		iconBar.style.minWidth = "100%"
		iconBar.style.maxWidth = "100%"
		iconBar.style.height = "7vh"
		iconBar.style.top = "0vh"
		iconBar.style.left = "0vw"
		iconBar.style.position = "fixed"
		iconBar.style.zIndex = "20"
		add(iconBar)
	}
}

//Creates a simple text
class Text {
	constructor(innerHTML) {
		this.Draw(innerHTML)
		this.Space()
		devLog("writing Text: '" + innerHTML + "'")
	}
	Draw(innerHTML) {
		const box = create("div")
		box.style.width = "70vw"
		box.style.position = "relative"
		box.style.left = 15 - size / 2 + "vw"
		box.style.backgroundColor = "rgba(0, 0, 0, .6)"
		box.style.border = "1vw solid transparent"
		box.style.borderWidth = "0.2vw 1vw 0.2vw 1vw"
		box.style.pointerEvents = "none"
		box.style.borderRadius = size / 2 + "vw"
		box.style.zIndex = "10"
		
		const text = create("h5")
		text.style.fontWeight = "normal"
		text.innerHTML = innerHTML
		text.style.color = "#dcdcdc"
		text.style.textAlign = "justify"
		text.style.textOverflow = "ellipsis"
		text.style.pointerEvents = "none"
		text.style.zIndex = "11"
		
		const content = document.getElementById("content")
		add(box)
		box.appendChild(text)
	}
	Space() {
		const text = create("h5")
		text.innerHTML = ""
		text.style.color = "white"
		text.style.width = "70vw"
		text.style.textAlign = "justify"
		text.style.textOverflow = "ellipsis"
		text.style.pointerEvents = "none"
		text.style.left = "15vw"
		add(text)
	}
}

//Adds an image
class TextImage {
	constructor(src, backgroundColor, shadow) {
		this.Draw(src, backgroundColor, shadow)
		this.Space()
		devLog("adding TextImage from '" + src + "'")
	}
	Draw(src, backgroundColor, shadow) {
		const textImage = create("img")
		textImage.src = src
		textImage.style.width = "50vw"
		textImage.style.position = "relative"
		textImage.style.left = "25vw"
		textImage.style.backgroundColor = backgroundColor
		if (shadow == "shadow") {
			textImage.style.boxShadow = "1vw 1vw 3vw black"
		}
		textImage.style.zIndex = "11"
		textImage.style.pointerEvents = "none"
		add(textImage)
	}
	Space() {
		const text = create("h5")
		text.innerHTML = ""
		text.style.color = "white"
		text.style.width = "70vw"
		text.style.textAlign = "justify"
		text.style.pointerEvents = "none"
		text.style.textOverflow = "ellipsis"
		text.style.left = "15vw"
		add(text)
	}
}

//Creates a space between different objects
class Space {
	constructor(height) {
		this.Draw(height)
		devLog("adding Space")
	}
	Draw(height) {
		const text = create("plaintext")
		text.innerHTML = " "
		text.style.color = "white"
		text.style.width = "70vw"
		text.style.fontSize = height + "vh"
		text.style.textAlign = "justify"
		text.style.textOverflow = "ellipsis"
		text.style.left = "15vw"
		add(text)
	}
}

//Creates an iframe
class Iframe {
	constructor(src) {
		this.Draw(src)
		devLog("adding Iframe from '" + src + "'")
	}
	Draw(src) {
		const iframe = create("iframe")
		iframe.src = src
		iframe.style.width = "50vw"
		iframe.style.height = "50vw"
		iframe.style.position = "relative"
		iframe.style.left = "25vw"
		iframe.style.border = "none"
		iframe.style.borderRadius = "none"
		iframe.style.zIndex = "11"
		add(iframe)
	}
}

//Creates an icon which will be displayed in the iconbar
class Icon {
	constructor(src, link, backgroundColor, left) {
		this.Draw(src, link, backgroundColor, left)
		devLog("creating Icon linked to: '" + src + "'")
	}
	Draw(src, link, backgroundColor, left) {
		const icon = create("img")
		icon.src = src
		icon.style.height = "5vh"
		icon.style.width = "5vh"
		icon.style.position = "absolute"
		icon.style.top = "1vh"
		icon.style.left = left * 5 + "vh"
		icon.style.zIndex = "21"
		const protection = create("div")
		protection.style.height = "5vh"
		protection.style.width = "5vh"
		protection.style.position = "absolute"
		protection.style.top = "1vh"
		protection.style.left = left * 5 + "vh"
		protection.style.zIndex = "22"
		protection.onclick = () => {window.open(link)}
		const mainIcons = document.getElementById("mainIcons")
		mainIcons.appendChild(icon)
		mainIcons.appendChild(protection)
	}
}

//Displays the current version at the bottom of the screen
class Version {
	constructor() {
		this.Draw()
		devLog("displaying Version " + version)
	}
	Draw() {
		const text = create("h5")
		text.style.fontWeight = "normal"
		text.innerHTML = "ReHelper Version " + version
		text.style.color = "#dcdcdc"
		text.style.width = "15vw"
		text.style.height = "2.2vh"
		text.style.textAlign = "center"
		text.style.fontStyle = "none"
		text.style.position = "absolute"
		text.style.left = "42.5vw"
		text.style.top = "93vh"
		text.style.zIndex = "21"
		text.onclick = () => {window.open("https://web.archive.org/web/20230418122154/https://github.com/rehelper/ReHelper")}
		const mainIcons = document.getElementById("mainIcons")
		mainIcons.appendChild(text)
	}
}

//Resets everything to the Presettings
class Blocked {
	constructor(pass) {
		this.Draw(pass)
	}
	Draw(pass) {
		if (pass == "true") {
			document.body.innerHTML = ""
			document.body.style = ""
			document.body.style.backgroundColor = "transparent"
			new Presettings
			devLog("blocking content")
			return
		}
		else {
			return
		}
	}
}

//Creates a permanent announcement
class Announcement {
	constructor(innerHTML) {
		this.Draw(innerHTML)
		this.Space()
		devLog("writing Announcement: '" + innerHTML + "'")
	}
	Draw(innerHTML) {
		const box = create("div")
		box.style.width = "70vw"
		box.style.position = "relative"
		box.style.left = 15 - size / 2 + "vw"
		box.style.backgroundColor = "rgba(0, 0, 0, .6)"
		box.style.border = "1vw solid transparent"
		box.style.borderWidth = "0.2vw 1vw 0.2vw 1vw"
		box.style.pointerEvents = "none"
		box.style.borderRadius = size / 2 + "vw"
		box.style.zIndex = "10"
		
		const text = create("h5")
		text.style.fontSize = aSize
		text.style.fontWeight = "normal"
		text.innerHTML = innerHTML
		text.style.color = "#dcdcdc"
		text.style.textAlign = "center"
		text.style.textOverflow = "ellipsis"
		text.style.pointerEvents = "none"
		text.style.zIndex = "11"
	
		add(box)
		box.appendChild(text)
	}
	Space() {
		const text = create("h5")
		text.innerHTML = ""
		text.style.color = "white"
		text.style.width = "70vw"
		text.style.textAlign = "justify"
		text.style.pointerEvents = "none"
		text.style.textOverflow = "ellipsis"
		text.style.left = "15vw"
		add(text)
	}
}

//Creates a message the user can close by clicking the "X"
class Message {
	constructor(innerHTML) {
		this.Draw(innerHTML)
		this.Space()
		devLog("writing Message: '" + innerHTML + "'")
	}
	Draw(innerHTML) {
		const box = create("div")
		box.style.width = "70vw"
		box.style.position = "relative"
		box.style.left = 15 - size / 2 + "vw"
		box.style.backgroundColor = "rgba(0, 0, 0, .6)"
		box.style.border = "1vw solid transparent"
		box.style.borderWidth = "0.2vw 1vw 0.2vw 1vw"
		box.style.borderRadius = size / 2 + "vw"
		box.style.zIndex = "10"
		
		const text = create("h5")
		text.style.fontSize = aSize
		text.style.fontWeight = "normal"
		text.innerHTML = innerHTML
		text.style.color = "#dcdcdc"
		text.style.textAlign = "center"
		text.style.textOverflow = "ellipsis"
		text.style.zIndex = "11"

		const closeButton = create("h5")
		closeButton.style.fontWeight = "normal"
		closeButton.style.fontSize = "3vh"
		closeButton.innerHTML = "X"
		closeButton.style.color = "white"
		closeButton.style.position = "absolute"
		closeButton.style.top = "2%"
		closeButton.style.right = "0"
		closeButton.style.margin = "0"
		closeButton.onclick = () => {
			box.style.display = "none"
		}
		
		add(box)
		box.appendChild(text)
		box.appendChild(closeButton)
	}
	Space() {
		const text = create("h5")
		text.innerHTML = ""
		text.style.color = "white"
		text.style.width = "70vw"
		text.style.textAlign = "justify"
		text.style.pointerEvents = "none"
		text.style.textOverflow = "ellipsis"
		text.style.left = "15vw"
		add(text)
	}
}

//Creates a developer message
class DevMessage {
	constructor(innerHTML, button, count, position) {
		if (!localStorage.getItem("resurviv_dev_message")) {
			localStorage.setItem("resurviv_dev_message", 0)
		}
		if (localStorage.getItem("resurviv_dev_message") != count) {
			this.Draw(innerHTML, button, count, position)
			localStorage.setItem("resurviv_dev_message", count)
		}
		devLog("writing DevMessage: '" + innerHTML + "'")
	}
	Draw(innerHTML, button, count, position) {	
		const shadow = create("div")
		shadow.style.width = "100vw"
		shadow.style.height = "100vh"
		shadow.style.position = "fixed"
		shadow.style.top = "0vh"
		shadow.style.left = "0vw"
		shadow.style.backgroundColor = "rgba(0, 0, 0, 0.6)"
		shadow.style.zIndex = "1001"
		
		const box = create("div")
		if (!mobile) {
			box.style.width = "50vw"
			box.style.height = "50vh"
			box.style.left = 25 - size / 2 + "vw"
			box.style.top = 25 - size / 2 + "vh"
		}
		if (mobile) {
			box.style.width = "65vw"
			box.style.height = "65vh"
			box.style.left = 17.5 - size / 2 + "vw"
			box.style.top = 17.5 - size / 2 + "vh"
		}
		box.style.position = "fixed"
		box.style.backgroundColor = "#5b7f32"
		box.style.border = "0.5vw solid black"
		box.style.overflowY = "scroll"
		box.style.zIndex = "1002"
		
		const text = create("h5")
		text.style.fontSize = size * 1.5 + "vh"
		text.style.width = "40vw"
		text.style.position = "relative"
		text.style.left = "5vw"
		text.style.fontWeight = "normal"
		text.innerHTML = innerHTML
		text.style.whiteSpace = "pre-line"
		text.style.color = "#dcdcdc"
		if (position == "left") {
			text.style.textAlign = "left"
		}
		if (position != "left") {
			text.style.textAlign = "center"
		}
		text.style.textOverflow = "ellipsis"
		text.style.zIndex = "1003"

		const closeButton = create("button")
		closeButton.style.fontSize = size * 1.5 + "vh"
		closeButton.style.width = "20vw"
		closeButton.style.overflow = "hidden"
		closeButton.style.fontWeight = "normal"
		closeButton.innerHTML = button
		closeButton.style.position = "relative"
		if (mobile) {
			closeButton.style.left = 50 / 15 * 6.5 + "vw"
		}
		if (!mobile) {
			closeButton.style.left = "15vw"
		}
		closeButton.style.top = "0vh"
		closeButton.style.color = "#dcdcdc"
		closeButton.style.backgroundColor = "#356400"
		closeButton.style.border = "0.5vw solid black"
		closeButton.style.textAlign = "center"
		closeButton.style.textOverflow = "ellipsis"
		closeButton.style.zIndex = "1003"
		closeButton.onclick = () => {
			text.remove()
			closeButton.remove()
			shadow.remove()
			box.remove()
		}
		add(shadow)
		add(box)
		box.appendChild(text)
		box.appendChild(closeButton)
	}
}

//Creates a single particle
class Particle {
	constructor(src0, src1, src2, src3, src4, size, fade, type, positionX) {
			this.Draw(src0, src1, src2, src3, src4, size, fade, type, positionX)
	}
	Draw(src0, src1, src2, src3, src4, size, fade, type, positionX,) {
		var image = Math.floor((Math.random() * 5) + 1)
		var random = Math.random() * 20
		if (type == "down") {
			var positionY = -5
		}
		if (type == "up") {
			var positionY = 105
		}
		var particle = create("img")
		if (image == 5) {
			particle.src = src4
		}
		if (image == 4) {
			particle.src = src3
		}
		if (image == 3) {
			particle.src = src2
		}
		if (image == 2) {
			particle.src = src1
		}
		if (image == 1) {
			particle.src = src0
		}
		particle.style.width = size + "vw"
		particle.style.height = size + "vw"
		particle.style.position = "fixed"
		particle.style.pointerEvents = "none"
		particle.style.top = positionY + "vh"
		particle.style.left = positionX + "vw"
		particle.style.zIndex = "2000"
		add(particle)
		var gravity = 0.9
		var rotation = 0
		async function move() {
			rotation = rotation + Math.random() * 1.5 + 0.5
			gravity = gravity * 1.00005
			if (userParticle == false) {
				clearInterval(moveParticle)
				particle.style.display = "none"
				particle.remove()
			}
			if (type == "down") {
				positionY =+ positionY + 0.15 / gravity
				particle.style.opacity = 100 - positionY * fade + "%"
			}
			if (type == "up") {
				positionY =+ positionY - 0.15 / gravity
				particle.style.opacity = 20 + positionY * fade + "%"
			}
			particle.style.top = positionY + "vh"
			particle.style.rotate = rotation + "deg"
			particle.style.width = size + "vw"
			particle.style.height = size + "vw"
			if (positionY >= window.innerHeight + 10 && type == "down" || positionY <= -window.innerHeight *  0 - 10 && type == "up") {
				clearInterval(moveParticle)
				particle.style.display = "none"
				particle.remove()
				positionX = Math.floor((Math.random() * 95) + 0)
				rotation = rotation + Math.random() * 2 + 1
				new Particle(src0, src1, src2, src3, src4, size, fade, type, positionX)
			}
		}
		var moveParticle = setInterval(move, random)
	}
}

//Creates an effect with multiple particles
class ParticleEffect {
	constructor(src0, src1, src2, src3, src4, size, fade, amount, type) {
		var positionX = Math.floor((Math.random() * 100) + 0)
		for (var i = 0; i < amount; i++) {
			new Particle(src0, src1, src2, src3, src4, size, fade, type, positionX)
			positionX = Math.floor((Math.random() * 100) + 0)
		}
		devLog("creating ParticleEffect with type: '" + type + "'")
	}
}

//Creates the developer log
class DevLog {
	constructor() {
		this.Log()
	}
	Log() {
		const devLog = create("div")
		devLog.id = "devLog"
		devLog.style.width = "30vw"
		devLog.style.height = "30vw"
		devLog.style.backgroundColor = "black"
		devLog.style.boxShadow = "1vw 1vw 1vw black"
		devLog.style.border = "1vw solid lightgrey"
		devLog.style.position = "fixed"
		devLog.style.top = "2vw"
		devLog.style.left = "63vw"
		devLog.style.zIndex = "3000"
		devLog.style.display = "none"
		devLog.style.whiteSpace = "pre-line"
		add(devLog)
		
		const say = create("div")
		say.id = "devMessage"
		say.style.color = "lightgreen"
		say.style.position = "relative"
		say.style.width = "26vw"
		say.style.height = "24vw"
		say.style.left = "2vw"
		say.style.top = "0vw"
		say.style.overflow = "hidden"
		say.style.textAlign = "left"
		say.style.fontSize = "1vw"
		say.style.whiteSpace = "pre-line"
		devLog.appendChild(say)
		
		const help = create("div")
		help.id = "commandHelp"
		help.style.color = "lightgreen"
		help.style.position = "relative"
		help.style.width = "26vw"
		help.style.height = "24vw"
		help.style.left = "2vw"
		help.style.top = "0vw"
		help.style.overflow = "scroll"
		help.style.textAlign = "left"
		help.style.fontSize = "1vw"
		help.style.whiteSpace = "pre-line"
		devLog.appendChild(help)
		
		const box = create("div")
		box.id = "commandBox"
		box.style.top = "36vw"
		box.style.left = "63vw"
		box.style.width = "30vw"
		box.style.height = "2vw"
		box.style.position = "fixed"
		box.style.backgroundColor = "transparent"
		box.style.display = "none"
		box.style.zIndex = "3000"
		add(box)
		
		const type = create("input")
		type.id = "commands"
		type.type = "text"
		type.placeholder = "Slash commands enabled..."
		type.style.width = "30vw"
		type.style.height = "2vw"
		type.style.color = "lightgrey"
		type.style.border = "0.5vw solid lightgrey"
		type.style.borderRadius = "0vw"
		type.style.borderWidth = "0.5vw"
		type.style.backgroundColor = "black"
		type.style.display = "none"
		type.style.zIndex = "3001"
		type.addEventListener("focus", () => {typeFocus = true})
		type.addEventListener("blur", () => {typeFocus = false})
		box.appendChild(type)
		
		if (mainSite == true) {
			get("btn-start-mode-0").onclick = () => {
				force = true
				type.style.display = "none"
			}
			get("btn-game-quit").onclick = () => {
				force = false
				type.style.display = "block"
			}
		}
		
		async function checkCommand() {
			type.style.pointerEvents = "auto"
			type.readonly = "false"
			if (get("commands").value.match("/")) {
				say.style.display = "none"
				help.style.display = "block"
			}
			if (!get("commands").value.match("/")) {
				help.style.display = "none"
				say.style.display = "block"
			}
		}
		
		setInterval(checkCommand, 4)

		async function showDevLog() {
			if (dev == true && force == false) {
				devLog.style.display = "block"
				box.style.display = "block"
				type.style.display = "block"
			}
			if (dev == false && force == false) {
				devLog.style.display = "none"
				box.style.display = "none"
				type.style.display = "none"
			}
		}

		setInterval(showDevLog, 1000)
	}
}

class UserMessage {
	constructor(username, innerHTML, button, count) {
		if (mainSite == true) {
			setInterval( () => {
				this.Check(username, innerHTML, button, count)
			}, 1000)
		}
	}
	Check(username, innerHTML, button, count) {
		if (!localStorage.getItem("resurviv_user_message")) {
			localStorage.setItem("resurviv_user_message", 0)
		}
		if (playerNameInput.value.toLocaleLowerCase() == username.toLocaleLowerCase()) {
			if (localStorage.getItem("resurviv_user_message") == count) {
				return
			}
			if (localStorage.getItem("resurviv_user_message") != count) {
				this.Draw(innerHTML, button, count)
				devLog("User '" + username + "' = true, announcing '" + innerHTML + "'")
				localStorage.setItem("resurviv_user_message", count)
			}
		}
	}
	Draw(innerHTML, button, count) {
		const shadow = create("div")
		shadow.style.width = "100vw"
		shadow.style.height = "100vh"
		shadow.style.position = "fixed"
		shadow.style.top = "0vh"
		shadow.style.left = "0vw"
		shadow.style.backgroundColor = "rgba(0, 0, 0, 0.6)"
		shadow.style.zIndex = "1001"
		
		const box = create("div")
		if (!mobile) {
			box.style.width = "50vw"
			box.style.height = "50vh"
			box.style.left = 25 - size / 2 + "vw"
			box.style.top = 25 - size / 2 + "vh"
		}
		if (mobile) {
			box.style.width = "65vw"
			box.style.height = "65vh"
			box.style.left = 17.5 - size / 2 + "vw"
			box.style.top = 17.5 - size / 2 + "vh"
		}
		box.style.position = "fixed"
		box.style.backgroundColor = "#5b7f32"
		box.style.border = "0.5vw solid black"
		box.style.overflowY = "scroll"
		box.style.zIndex = "1002"
		
		const text = create("h5")
		text.style.fontSize = size * 1.5 + "vh"
		text.style.fontWeight = "normal"
		text.innerHTML = innerHTML
		text.style.color = "#dcdcdc"
		text.style.textAlign = "center"
		text.style.textOverflow = "ellipsis"
		text.style.zIndex = "1003"

		const closeButton = create("button")
		closeButton.style.fontSize = size * 1.5 + "vh"
		closeButton.style.width = "20vw"
		closeButton.style.overflowX = "scroll"
		closeButton.style.fontWeight = "normal"
		closeButton.innerHTML = button
		closeButton.style.position = "relative"
		if (mobile) {
			closeButton.style.left = 50 / 15 * 6.5 + "vw"
		}
		if (!mobile) {
			closeButton.style.left = "15vw"
		}
		closeButton.style.top = "0vh"
		closeButton.style.color = "#dcdcdc"
		closeButton.style.backgroundColor = "#356400"
		closeButton.style.border = "0.5vw solid black"
		closeButton.style.textAlign = "center"
		closeButton.style.textOverflow = "ellipsis"
		closeButton.style.zIndex = "1003"
		closeButton.onclick = () => {
			text.remove()
			closeButton.remove()
			shadow.remove()
			box.remove()
		}
		add(shadow)
		add(box)
		box.appendChild(text)
		box.appendChild(closeButton)
	}
}

//Creates a full styled page
class Presettings {
	constructor() {
		this.Draw()
		devLog("running Presettings")
	}
	Draw() {
		new DevLog
		new Settings
		new BackgroundImage("https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/presettings/main_background.svg")
		new IconBar()
		new Icon("https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/presettings/discord_logo.svg", "https://web.archive.org/web/20230418122154/https://discord.resurviv.io/", "","0")
		new Icon("https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/presettings/github_logo.svg","https://web.archive.org/web/20230418122154/https://github.com/SurvivReloaded", "", "1")
		new Icon("https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/presettings/reddit_logo.svg", "https://web.archive.org/web/20230418122154/https://www.reddit.com/r/SurvivReloaded", "", "2")
		new Icon("https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/presettings/twitter_logo.svg", "https://web.archive.org/web/20230418122154/https://twitter.com/SurvivReloaded", "", "3")
		new Icon("https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/presettings/resurviv_logo.svg","https://web.archive.org/web/20230418122154/https://resurviv.io", "", "4")
		new Space("2.4")
		new TextImage("https://web.archive.org/web/20230418122154/https://rehelper.github.io/resources/presettings/resurviv_title.svg")
		new UserMessage
		new Version
	}
}


}
/*
     FILE ARCHIVED ON 12:21:54 Apr 18, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:46:22 Oct 14, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 92.75
  exclusion.robots: 0.216
  exclusion.robots.policy: 0.199
  cdx.remote: 0.095
  esindex: 0.013
  LoadShardBlock: 62.58 (3)
  PetaboxLoader3.datanode: 61.141 (5)
  load_resource: 154.23 (2)
  PetaboxLoader3.resolve: 80.19 (2)
*/
