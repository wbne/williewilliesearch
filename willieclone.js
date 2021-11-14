const willieArmy = [
    "williehead_transparent.gif",
    "williehead.gif",
    "williejudge.png",
    "williekite.png",
    "williesus.png",
    "williethanos.jpg",
    "williethumb.jpg"
]
window.onload = wait()

function wait() {
    setTimeout(() => {chaos()}, 10000)
}

function chaos() {
    var evillie = document.createElement("div")
    var y = window.innerHeight * Math.random()
    var x = window.innerWidth * Math.random()
    var size = Math.ceil(Math.random() * 100) + 10
    var val = Math.round(Math.random() * willieArmy.length)
    evillie.style.backgroundImage = "url(./img/" + willieArmy[val] +")"
    evillie.style.left = x
    evillie.style.top = y
    console.log(size)
    evillie.style.width = ""+size
    evillie.style.height = ""+size
    evillie.setAttribute("class", "chaos")
    var root = document.getElementsByTagName("html")[0]
    root.append(evillie)   
    setTimeout(() => {chaos()}, 2500)
}