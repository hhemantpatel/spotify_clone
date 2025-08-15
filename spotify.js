// chatgpt code 
let songPlaying=false;

// document.addEventListener("click",function(e){
//     if(e.target.closest("#play_pause")){
//         songPlaying=false
//     }
// })

function Time(duration) {
    let d= document.getElementById("duration")
    if(duration > 60){
        t=duration/60
        t=Math.trunc(t);
    }
    sec=duration%60
    sec=Math.round(sec);
    d.textContent=`${t}:${sec}`
}

function Name(songName){
    let d= document.getElementById("songName")
    d.textContent=songName
}

document.addEventListener("click", function(e) {
    if (e.target.closest(".playlistBox svg")) {
        let playlistBox = e.target.closest(".playlistBox");
        let audio = playlistBox.querySelector("audio");

        // Pause all other songs
        document.querySelectorAll("audio").forEach(a => {
            if (a !== audio) {
                a.pause();
                a.currentTime = 0;
            }
        });
        let duration=audio.duration;
        Time(duration)
        let nam=playlistBox.querySelector(".songName")
        Name(nam.textContent)
        // Play the clicked one
        songPlaying=true
        audio.play();
    }
});


document.addEventListener("mouseover",function(e){
    if (e.target.closest(".playlistBox")  && songPlaying==false){
        let playlistBox=e.target.closest(".playlistBox")
        let audio = playlistBox.querySelector("audio")
        document.querySelectorAll("audio").forEach(a=>{
            if(a !== audio){
                a.pause();
                a.currentTime = 0
            }
        })

        audio.play()
        
    }
})

document.addEventListener("mouseout",function(e){
    if (e.target.closest(".playlistBox")  && songPlaying==false){
        let playlistBox=e.target.closest(".playlistBox")
        let audio = playlistBox.querySelector("audio")

        audio.pause()
        
    }
})


// my code

// let svgButton = document.querySelector('svg[role="button"]');

// svgButton.addEventListener("click", () => {
//     console.log("SVG clicked!");
// });


async function playlistData() {
    let a = await fetch("http://127.0.0.1:3000/d:/New%20folder%20(2)/webD/song/");
    let text = await a.text();


    let div = document.createElement("div");
    div.innerHTML = text;

    let playlistNodelist = div.querySelectorAll("td a")
    let playlistName = [];
    let playlistlink = [];
    for (let link of playlistNodelist) {
        if (link.textContent != "../") {
            let href = link.href
            playlistlink.push(href)
            playlistName.push(link.textContent)
        }
    }
    console.log("what the hell")
    return [playlistName, playlistlink]
}




async function songData(playlistlink) {
    console.log(playlistlink)
    let a = await fetch(playlistlink);
    let text = await a.text();
    // console.log(text)
    let div = document.createElement("div");
    div.innerHTML = text;
    
    let songName = [];
    let songlink = [];
    let songNode = div.querySelectorAll("td a")
    console.log(songNode)
    for (let name of songNode) {
        if (name.textContent != "../") {
            let href = name.href
            songName.push(name.innerText)
            songlink.push(href)
        }

    }

return [songName,songlink]
}






function playlistCreate(name,num){
    let right=document.getElementsByClassName("right")[0];

    let html=`<div class="fullSlot ${num}">
                <h1>${name}</h1>
                <div class="slot">
                </div>
            </div>`

    right.insertAdjacentHTML("beforeend", html); 


}


function createBox(songName,audioLink,num){
    let slot = document.querySelector(`.${num} .slot`);
    let html=`<div class="playlistBox pointer">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm2-IiCQnnEHH1dk5HN2K60xrv8Wyu8VRW7Q&s"
                            alt="${songName}"></img>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44" fill="none">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path
                                    d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                    fill="black">
                                </path>
                            </svg>
                        <audio src="${audioLink}"></audio>
                        <h2 class="songName">${songName}</h2>
                        <p class="artistName">Nahi pata</p>
                    </div>`

    slot.insertAdjacentHTML("beforeend", html);



}

async function main() {
    
    let [playlistName,playlistlink] = await playlistData();
    console.log(playlistName)
    console.log(playlistlink)

    for (let i = 0; i < playlistName.length; i++) {
        playlistCreate(playlistName[i] ,`p${i}`)
        let [songName,songlink]=await songData(playlistlink[i])
        for (let j = 0; j < songName.length; j++) {
            createBox(songName[j],songlink[j],`p${i}`)
            
        }
    }
}

 main()