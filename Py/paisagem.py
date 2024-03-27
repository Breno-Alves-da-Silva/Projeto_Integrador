from PIL import Image, ImageDraw

# Define as dimensões da imagem
largura = 800
altura = 600

# Cria uma nova imagem RGB
imagem = Image.new("RGB", (largura, altura), color="lightblue")

# Cria um objeto ImageDraw para desenhar na imagem
desenho = ImageDraw.Draw(imagem)

# Desenha o chão
desenho.rectangle([(0, 500), (largura, altura)], fill="saddlebrown")

# Desenha o sol
desenho.ellipse([(700, 50), (750, 100)], fill="yellow")

# Desenha as montanhas
desenho.polygon([(0, 500), (200, 200), (400, 500)], fill="gray")
desenho.polygon([(300, 500), (500, 200), (700, 500)], fill="dimgray")

# Desenha as árvores
desenho.rectangle([(60, 400), (110, 500)], fill="saddlebrown")  # Tronco
desenho.ellipse([(30, 300), (140, 400)], fill="forestgreen")  # Copa
desenho.rectangle([(610, 400), (660, 500)], fill="saddlebrown")  # Tronco
desenho.ellipse([(580, 300), (690, 400)], fill="forestgreen")  # Copa

# Salva a imagem
imagem.save("paisagem.png")

# Mostra a imagem
imagem.show()
