async function startCamera() {
    const constraints = {
        video: true
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
    } catch (error) {
        console.error('Erro ao acessar a câmera: ', error);
    }
}

function getColorFromVideo() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const colorDisplay = document.getElementById('color');

    // Desenhar o vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Capturar um pixel no centro do canvas
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const pixelData = context.getImageData(x, y, 1, 1).data;

    // Converter os dados do pixel para uma cor em formato RGB
    const red = pixelData[0];
    const green = pixelData[1];
    const blue = pixelData[2];
    const color = `rgb(${red}, ${green}, ${blue})`;

    // Exibir a cor detectada
    colorDisplay.textContent = color;
    colorDisplay.style.backgroundColor = color;
}

// Iniciar a câmera ao carregar a página
window.addEventListener('load', () => {
    startCamera();
    setInterval(getColorFromVideo, 1000); // Verificar a cor a cada segundo
});