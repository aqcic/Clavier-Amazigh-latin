
//time
const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
const timeDisplay = document.querySelector("#time")
const styleSheet = document.querySelector("#toggleMode")

currentTime = new Date().getHours()
if(currentTime < 18 && currentTime > 8){
    styleSheet.setAttribute("href", "keyboard-light.css")
} else {
    styleSheet.setAttribute("href", "keyboard-night.css")
}

setInterval(() => {
    window.time = new Date()
    timeDisplay.innerHTML = time.toLocaleDateString("fr-FR", options)
}, 1000)

//myMess & Txt
const myTxt = document.querySelector("#myTxt")
const myDiv = document.querySelector("#myMess")

//Observer
observer = new MutationObserver(function (mutationsList, observer) {
    if (myTxt.innerHTML.length < 1) {
        myDiv.style.display = "none"
    } else {
        myDiv.style.display = "block"
    }
    if (shiftAct === true) {
        divP.forEach(el => {
            el.style.textTransform = "lowercase"
        })
        specP.forEach(el => {
            el.innerHTML = el.parentNode.classList[1]
        })
        shiftAct = false
        shiftLed.style.backgroundColor = "transparent"
    }
});
observer.observe(myTxt, { characterData: false, childList: true, attributes: false })

//keys
const keys = document.querySelectorAll(".key")
for (i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", (e) => {
        window.audio1 = new Audio("./assets/typeSound1.mp3")
        audio1.play()
        const key = e.target
        //caps lock / shift ?
        if (capsAct || shiftAct) {
            const keyItem = key.classList[2]
            myTxt.innerHTML += keyItem
        } else {
            const keyItem = key.classList[1]
            myTxt.innerHTML += keyItem
        }
    })
}

//bigKeys
const capsLed = document.querySelector(".capsLed")
const shiftLed = document.querySelector(".shiftLed")
let capsAct = false
let shiftAct = false
const divP = document.querySelectorAll(".key p")
const specP = document.querySelectorAll(".spec p")
const chat = document.querySelector(".chat")

const bigKeys = document.querySelectorAll(".bigKey")
for (i = 0; i < bigKeys.length; i++) {
    bigKeys[i].addEventListener("click", (e) => {
        bigKeysClick(e)
    })
}

function bigKeysClick(e) {
    window.audio2 = new Audio("./assets/typeSound2.mp3")
    audio2.play()
    const key = e.target
    const keyItem = key.classList[1]

    switch (keyItem) {

        //suppr
        case "del":
            const length = myTxt.innerHTML.length
            const lastChar = myTxt.innerHTML.slice(length - 4, length)
            if (lastChar === "<br>") {
                const newText = myTxt.innerHTML.slice(0, -4)
                myTxt.innerHTML = newText
            } else {
                const newText = myTxt.innerHTML.slice(0, -1)
                myTxt.innerHTML = newText
            }
            break

        //entrée
        case "etr":
            myTxt.innerHTML += '</br>'
            break

        //shift
        case "shift":
            if (shiftAct === false && capsAct === false) {
                divP.forEach(el => {
                    el.style.textTransform = "capitalize"
                })
                specP.forEach(el => {
                    el.innerHTML = el.parentNode.classList[2]
                    el.style.textTransform = "lowercase"
                })
                shiftAct = true
                shiftLed.style.backgroundColor = "rgb(65, 98, 187)"
            } else if(shiftAct === false && capsAct === true){
                capsAct = false
                capsLed.style.backgroundColor = "transparent"
                shiftAct = true
                shiftLed.style.backgroundColor = "rgb(65, 98, 187)"
            } else {
                divP.forEach(el => {
                    el.style.textTransform = "lowercase"
                })
                specP.forEach(el => {
                    el.innerHTML = el.parentNode.classList[1]
                })
                shiftAct = false
                shiftLed.style.backgroundColor = "transparent"
            }
            break

        //caps
        case "caps":
            if (capsAct === false && shiftAct === false) {
                divP.forEach(el => {
                    el.style.textTransform = "capitalize"
                })
                specP.forEach(el => {
                    el.innerHTML = el.parentNode.classList[2]
                    el.style.textTransform = "lowercase"
                })
                capsAct = true
                capsLed.style.backgroundColor = "rgb(100, 240, 80)"
            } else if(capsAct === false && shiftAct === true){
                shiftAct = false
                shiftLed.style.backgroundColor = "transparent"
                capsAct = true
                capsLed.style.backgroundColor = "rgb(100, 240, 80)"
            } else {
                divP.forEach(el => {
                    el.style.textTransform = "lowercase"
                })
                specP.forEach(el => {
                    el.innerHTML = el.parentNode.classList[1]
                })
                capsAct = false
                capsLed.style.backgroundColor = "transparent"
            }
            break

        //emojis
        // case "emojis":
        //     console.log(keyItem)
        //     break

        //send
        case "send":
            if(myTxt.innerHTML.length > 0 && myTxt.innerHTML != " "){
                const locTime = time.toLocaleDateString("fr-FR", options)
                chat.innerHTML += "<div class='message'><p>" + myTxt.innerHTML + "</p></div>"
                myTxt.innerHTML = " "
            } else {
                alert("Message vide")
            }
            break

        //night/light
        case "toggleButton":
            if (styleSheet.getAttribute("href") === "keyboard-light.css") {
                styleSheet.setAttribute("href", "keyboard-night.css")
                document.querySelector(".toggleButton img").src = "./assets/sun.svg"
            } else {
                styleSheet.setAttribute("href", "keyboard-light.css")
                document.querySelector(".toggleButton img").src = "./assets/moon.svg"
            }
            break
    }
}

//hold del
let mouseDown = false
const del = document.querySelector("div .del")
del.addEventListener('mousedown', function () {
    mouseDown = true
    holding = setTimeout(function () {
        if (mouseDown) {
            myTxt.innerHTML = " "
        }
    }, 1000)
});
del.addEventListener('mouseup', function () {
    clearTimeout(holding);
    mouseIsDown = false
});

//space
const space = document.querySelector(".space")
space.addEventListener("click", () => {
    const audio = new Audio("./assets/typeSound2.mp3")
    audio.play()

    myTxt.innerHTML += " "
})

//reset
const reset = document.querySelector(".reset button")
reset.addEventListener("click", () => {
    chat.innerHTML = ""
})

// copie texte

var btncopy = document.querySelector('.copy');
if(btncopy) {
    btncopy.addEventListener('click', docopy);
}

function docopy() {
    var range = document.createRange();
    var target = this.dataset.target;
    var fromElement = document.querySelector(target);
    var selection = window.getSelection();

    range.selectNode(fromElement);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        var result = document.execCommand('copy');
        if (result) {
            // La copie a réussi
            alert('Copié !');
        }
    }
    catch(err) {
        // Une erreur est surevnue lors de la tentative de copie
        alert(err);
    }

    selection = window.getSelection();

    if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === 'function') {
        selection.removeAllRanges();
    }
}