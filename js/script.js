const typingText = document.querySelector(".typing-text p");
const inputText = document.querySelector(".input-text");
const time = document.querySelector(".time span b");
const wpm = document.querySelector(".wpm span ");
const cpm = document.querySelector(".cpm span ");
const retryBtn = document.querySelector(".content button");



let charIndex = 0;
let timer,maxTime = 60,timeLeft = maxTime,isTyping=false;


retryBtn.onclick = ()=>{
    window.location.reload(true);
}


function randomParagraph(){
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown",( )=> inputText.focus());
    typingText.addEventListener("click",( )=> inputText.focus());


    return paragraphs[randIndex];
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    const mistake = document.querySelector(".mistake span");
    let mistakesNbr = 0;
    let typedChar = inputText.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer,1000);
            isTyping=true;
        }
        
    
        if (typedChar == null) {//backspace delete
            charIndex--;
            characters[charIndex].classList.remove("correct","incorrect");
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        
        characters.forEach(span => span.classList.remove("active"));
        characters.forEach(span => {
            if (span.classList.contains("incorrect")) {
                mistakesNbr++;
            }
        });
        characters[charIndex].classList.add("active");
        mistake.innerText = mistakesNbr;
        cpm.innerText = charIndex - mistakesNbr;
        let wpmVal = Math.round((((charIndex - mistakesNbr) / 5) / 60) * (maxTime - timeLeft));
        wpmVal = wpmVal < 0 || !wpmVal || wpmVal === Infinity ? 0 : wpmVal ;
        console.log(wpmVal)
        wpm.innerText = wpmVal;
    } else {
        inputText.value = "";
        clearInterval(time);
    }
}
randomParagraph();
// console.log(characters[charIndex].innerText);const mistake = parseInt(document.querySelector(".mistake span").innerText,10);

function initTimer(){
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}



inputText.addEventListener("input",initTyping);



