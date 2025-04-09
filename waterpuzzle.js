document.addEventListener("DOMContentLoaded",()=>{
    const gameContainer = document.getElementById("game-container");
    const playButton = document.getElementById("play-button");
    const levelSelect = document.getElementById("level-select");

    const tubes = [];
    let levelCount = 1;

    function chossLevel(level){
        levelCount = level;
        document.getElementById("level-count").textContent = levelCount;

    }
    levelSelect.addEventListener("change",(event)=>{
        const selectedLevel = parseInt(event.target.value,10);
        chossLevel(selectedLevel);
    });

    function createTubes(){
        //gameContainer.innerHTML = "產生試管";
        gameContainer.innerHTML = "";
        tubes.length = 0; //清空試管

        for(let i=0; i < levelCount + 1; i++){
            const tube = document.createElement("div");
            tube.classList.add("tube");
            //要新增tube的事件處理樣式
            gameContainer.appendChild(tube);
            tubes.push(tube);
        }
    }

    function fillTubes(){
        gameContainer.innerHTML = "填滿試管顏色";
    }

    playButton.addEventListener("click",()=>{
        //實作開始玩遊戲
        alert("開始玩遊戲");
        tubes.length = 0; //清空試管
        createTubes(); //產生試管
        fillTubes(); //填滿試管顏色

    });
});