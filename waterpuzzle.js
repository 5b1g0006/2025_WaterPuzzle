document.addEventListener("DOMContentLoaded",()=>{
    const gameContainer = document.getElementById("game-container");
    const playButton = document.getElementById("play-button");
    const levelSelect = document.getElementById("level-select");

    const tubes = [];
    const colors = [
        "red", "blue", "green", "yellow", "purple", "orange", 
        "pink", "brown", "cyan", "lime", "magenta", "teal", 
        "indigo", "violet", "gold", "silver", "maroon", "navy", 
        "olive", "coral",
    ];
    let selectedTube = null;
    let levelCount = 1;

    function chossLevel(level){
        levelCount = level;
        document.getElementById("level-count").textContent = levelCount;

    }
    levelSelect.addEventListener("change",(event)=>{
        const selectedLevel = parseInt(event.target.value,10);
        chossLevel(selectedLevel);
    });

    function checkGameState(){
        const allSameColor = (tube) => {
            const selectesLevel = parseInt(event.target.value,10);
            return (
                waters.length === 4 &&
                waters.every(
                    (water) =>
                        water.style.backgroundColor === waters[0].style.backgroundColor
                )
            );
        };
        let completeTubes =0;
        tubes.forEach((tube) => {
            if (allSameColor(tube)) {
                completeTubes++;
            }
        });
    }

    function pourWater(fromTube, toTube){
        let fromWater = fromTube.querySelector(".water:last-child");
        let toWater = toTube.querySelector(".water:last-child");

        if(!toWater){
            const color = fromWater ? fromWater.style.backgroundColor : null;
            while(fromWater && fromWater.style.backgroundColor === color && toTube.childElementCount < 4){
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child");
            }
        }
        else{
            while (
                fromWater &&
                fromWater.style.backgroundColor === toWater.style.backgroundColor &&
                toTube.childElementCount < 4
            ) {
                toTube.appendChild(fromWater);
                fromWater = fromTube.querySelector(".water:last-child");
                toWater = toTube.querySelector(".water:last-child");
            }
        }
        checkGameState();
    }


    function selectTube(tube){
        if(selectedTube){
            if(selectedTube !== tube){
                pourWater(selectedTube,tube);
            }
            selectedTube.classList.remove("selected");
            selectedTube = null;
        }
        else{
            selectedTube = tube;
            selectedTube.classList.add("selected");
        }
    }

    function createTubes(){
        //gameContainer.innerHTML = "產生試管";
        gameContainer.innerHTML = "";
        tubes.length = 0; //清空試管

        for(let i=0; i < levelCount + 1; i++){
            const tube = document.createElement("div");
            tube.classList.add("tube");
            tube.addEventListener("click",()=>selectTube(tube));
            gameContainer.appendChild(tube);
            tubes.push(tube);  
        }

        //新增兩管空的試管當作緩衝使用
        for (let i = 0; i < 2; i++) {
            const empytTube = document.createElement("div");
            empytTube.classList.add("tube");
            empytTube.addEventListener("click",()=>selectedTube(empytTube));
            gameContainer.appendChild(empytTube);
            tubes.push(empytTube);
          }
    }

    function fillTubes(){
        // 填滿試管顏色
        const gameColors = colors.slice(0, Math.min(levelCount + 1, colors.length));
        const waterBlocks = [];

        //對於每一種顏色，產生4個block
        gameColors.forEach(color => {
            for(let i=0; i < 4; i++){
                waterBlocks.push(color);
            }
        });

        //將顏色打亂
        waterBlocks.sort(()=>0.5 - Math.random());

        //將waterBlock分散在不同的試管內
        let blockIndex = 0;
        tubes.slice(0, levelCount + 1).forEach((tube) => {

            for (let i = 0; i < 4; i++) {

                if (blockIndex < waterBlocks.length) {

                    const water = document.createElement("div");
                    water.classList.add("water");
                    water.style.backgroundColor = waterBlocks[blockIndex];
                    water.style.height = "20%";
                    tube.appendChild(water);
                    blockIndex++;
                }
            }
        });
    }

    playButton.addEventListener("click",()=>{
        //實作開始玩遊戲
        //alert("開始玩遊戲");
        tubes.length = 0; //清空試管
        createTubes(); //產生試管
        fillTubes(); //填滿試管顏色
    });
});