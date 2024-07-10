from PIL import Image, ImageDraw

# Define as dimensões da imagem
largura = 800
altura = 600

# Cria uma nova imagem RGB
imagem = Image.new("RGB", (largura, altura), color="white")

# Cria um objeto ImageDraw para desenhar na imagem
desenho = ImageDraw.Draw(imagem)

# Desenha a maçã vista de lado
desenho.ellipse([(300, 200), (600, 500)], fill="red")  # Corpo da maçã

# Define as coordenadas do triângulo (folha) com sua nova posição e tamanho
pontos = [(420, 200), (620, 200), (520, 100)]
desenho.polygon(pontos, fill="green")

# Salva a imagem
imagem.save("maca_perfeita_lado.png")

# Mostra a imagem
imagem.show()

