
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
            let herf = link.href
            let cleaned = herf.replace(/^https?:\/\//, ""); 
            playlistlink.push(cleaned)
            playlistName.push(link.textContent)
        }
    }
    console.log("what the hell")
    return [playlistName, playlistlink]
}

function playlistCreate(name){
    let right=document.getElementsByClassName("right")[0];

    let html=`<div class="fullSlot">
                <h1>${name}</h1>
                <div class="slot">
                </div>
            </div>`

    right.insertAdjacentHTML("beforeend", html);       
}


function createBox(songName,artist,imgLink){
    let slot=document.getElementsByClassName("slot")[0];
    let html=`<div class="playlistBox pointer">
                        <img src="${imgLink}"
                            alt="${songName}"></img>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44" fill="none">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path
                                d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                fill="black">
                            </path>
                        </svg>
                        <h2 class="songName">${songName}</h2>
                        <p class="artistName">${artist}</p>
                    </div>`
}

async function main() {
    
    let [playlistName,playlistlink] = await playlistData();
    console.log(playlistName)
    console.log(playlistlink)
    for( let l of playlistName){
        playlistCreate(l)
    }
}
 main()