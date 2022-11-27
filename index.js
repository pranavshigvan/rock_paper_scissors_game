let ruleButton = document.querySelector(".rule_button");
let modal = document.querySelector(".modal")
let close = document.querySelector(".close")
let home = document.querySelector(".home")
let userChoice = document.querySelector(".user_choice")
let compChoice = document.querySelector(".comp_choice")
let step2 = document.querySelector(".step2")
let playAgain = document.querySelector(".play_again")
let scoreElem = document.querySelector(".score_count")
let btnNames = ["rock","paper","scissors"]
let status = document.querySelector(".status")
let userSelection = ""
let compSelection = ""
let score = 0

ruleButton.onclick = ()=>{
    modal.classList.add("show")
}
close.onclick = ()=>{
    modal.classList.remove("show")
}
playAgain.onclick = ()=>{
    home.classList.remove("hide")
    step2.classList.add("hide")
    compChoice.classList.add("button")
    compChoice.style.backgroundColor = "hsl(0, 11%, 74%)"
    userChoice.innerHTML = ""
    compChoice.innerHTML = ""
    step2.querySelector(".result").style.width = "0"
}   
let createChoicebtn =(name)=>{
    let btn = document.createElement("button")
    btn.classList = `button ${name}`
    let div = document.createElement("div")
    let img = document.createElement("img")
    img.setAttribute("src",`images/icon-${name}.svg`)
    div.appendChild(img)
    btn.appendChild(div)
    if(home.classList[1]==="hide"){
        btn.onclick = null
    }else{
        btn.onclick = (e)=>{
            userSelection = name 
            compSelection = createRandomChoice(userSelection)
            console.log(userSelection,compSelection)
            home.classList.add("hide")
            step2.classList.remove("hide")
            userChoice.appendChild(createChoicebtn(userSelection))
            setTimeout(()=>{
                compChoice.classList.remove("button")
                compChoice.style.backgroundColor = "transparent"
                compChoice.appendChild(createChoicebtn(compSelection))
                let result = findResult(btnNames.indexOf(userSelection), btnNames.indexOf(compSelection))
                if(result==="user"){
                    status.innerHTML="you won"
                    userChoice.classList.add("win")
                    compChoice.classList.remove("win")
                    score+=1
                    
                }
                else{
                    status.innerHTML="you lost"
                    compChoice.classList.add("win")
                    userChoice.classList.remove("win")
                    score-=1
                }
                scoreElem.innerHTML = score
                step2.querySelector(".result").style.width = "auto"
                
            },1000)
            
        } 
    }
    
    return btn;
}

let createRandomChoice = (name)=>{
    let compSelect = btnNames[Math.floor(Math.random()*3)]
    if (compSelect === name) {
       return createRandomChoice(name)
    }
    return compSelect
}

let findResult = (userSelectionIndex,compSelectionIndex)=>{
    let diff = userSelectionIndex - compSelectionIndex
    if((0<diff && diff<2)||(0>diff && Math.abs(diff)>1)){
        return "user"
    }
}
let rock = createChoicebtn("rock")
let paper = createChoicebtn("paper")
let scissors = createChoicebtn("scissors")

home.appendChild(rock)
home.appendChild(paper)
home.appendChild(scissors)