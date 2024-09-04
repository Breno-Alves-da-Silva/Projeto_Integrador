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
    const colorSquare = document.getElementById('colorSquare');

    // Desenhar o vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Capturar um pixel no centro do canvas
    const x = Math.floor(canvas.width / 2);
    const y = Math.floor(canvas.height / 2);
    const pixelData = context.getImageData(x, y, 1, 1).data;

    // Converter os dados do pixel para uma cor em formato RGB
    const red = pixelData[0];
    const green = pixelData[1];
    const blue = pixelData[2];
    const color = `rgb(${red}, ${green}, ${blue})`;

    // Obter o nome da cor
    const colorName = getColorName(red, green, blue);

    // Exibir a cor detectada
    colorDisplay.textContent = colorName;
    colorSquare.style.backgroundColor = color;
    colorSquare.style.width = "50px"
    colorSquare.style.height = "50px"
}

function getColorName(r, g, b) {
    const colors = [
        { name: "Red", rgb: [255, 0, 0] },
        { name: "Green", rgb: [0, 255, 0] },
        { name: "Blue", rgb: [0, 0, 255] },
        { name: "Yellow", rgb: [255, 255, 0] },
        { name: "Cyan", rgb: [0, 255, 255] },
        { name: "Magenta", rgb: [255, 0, 255] },
        { name: "White", rgb: [255, 255, 255] },
        { name: "Black", rgb: [0, 0, 0] },
        { name: "Gray", rgb: [128, 128, 128] },
        { name: "Orange", rgb: [255, 165, 0] },
        { name: "Pink", rgb: [255, 192, 203] },
        { name: "Purple", rgb: [128, 0, 128] },
        { name: "Brown", rgb: [165, 42, 42] },
        { name: "Lime", rgb: [0, 255, 0] },
        { name: "Navy", rgb: [0, 0, 128] },
        { name: "Teal", rgb: [0, 128, 128] }
    ];

    let closestColor = "Unknown";
    let minDistance = Infinity;

    colors.forEach(color => {
        const distance = Math.sqrt(
            Math.pow(color.rgb[0] - r, 2) +
            Math.pow(color.rgb[1] - g, 2) +
            Math.pow(color.rgb[2] - b, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestColor = color.name;
        }
    });
    return closestColor;

}

// Iniciar a câmera ao carregar a página
window.addEventListener('load', () => {
    startCamera();
    setInterval(getColorFromVideo, 1000); // Verificar a cor a cada segundo
});
