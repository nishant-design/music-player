
const canvas = document.getElementById("canvas1");

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

const canvasContext = canvas.getContext("2d");

let audioSrc;
let analyser;


const file = document.getElementById("file-upload");

file.addEventListener("change",function(){
    const files = this.files;
    const audio1 = document.getElementById("audio1");
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();

    const audioContext = new AudioContext();

    audioSrc = audioContext.createMediaElementSource(audio1);  //getting source info from audio1 and assigning it to audioSrc
    analyser = audioContext.createAnalyser();  // creating analyzer that helps in getting time frequencies of audio
    audioSrc.connect(analyser);  //connecting audio source to analyser
    analyser.connect(audioContext.destination);  //connecting analyser to destination i.e output speakers
    
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount;
    const dataArr = new Uint8Array(bufferLength);

    const barWidth = (canvas.width/2) / bufferLength;
    // const barWidth = canvas.width/bufferLength;
    let barHeight;
    let x ;

    function animate(){
        x = 0
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArr);

        drawBar(bufferLength, x, barWidth, barHeight, dataArr);

        requestAnimationFrame(animate);
    }

    animate();
    

})

function drawBar(bufferLength, x , barWidth, barHeight, dataArr){
    for(let i = 0; i < bufferLength; i++){
        const hue = barHeight/i;

        if(screen.width > 1200){

            barHeight = dataArr[i] * 3;

        }else if(screen.width > 800){

            barHeight = dataArr[i] * 2;

        }else if(screen.width > 600){

            barHeight = dataArr[i];
            
        }else{
            barHeight = dataArr[i] / 1.2;
        }

        canvasContext.fillStyle = `hsl(${hue}, 100%, 50%)`;
        canvasContext.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }

    for(let i = 0; i < bufferLength; i++){
        const hue = barHeight/i;

        if(screen.width > 1200){

            barHeight = dataArr[i] * 3;

        }else if(screen.width > 800){

            barHeight = dataArr[i] * 2;

        }else if(screen.width > 600){

            barHeight = dataArr[i];
            
        }else{
            barHeight = dataArr[i] / 1.2;
        }

        canvasContext.fillStyle = `hsl(${hue}, 100%, 50%)`;
        canvasContext.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth;
    }
}

// function drawCircle(bufferLength, x , barWidth, barHeight, dataArr){
//     for(let i = 0; i < bufferLength; i++){
//         const hue = i;
//         const red = 250 * (i/bufferLength);
//         const green = 0;
//         const blue = barHeight + (2 * (i/bufferLength));

//         canvasContext.save();
//         canvasContext.translate(canvas.width/2, canvas.height/2);
//         canvasContext.rotate(i + Math.PI * 2/bufferLength);

//         barHeight =  dataArr[i]*2;
//         canvasContext.fillStyle = `hsl(${hue}, 100%, 50%)`;
//         canvasContext.fillRect(0, 0, barWidth, barHeight);
//         x += barWidth;
//         canvasContext.restore();
//     }
// }