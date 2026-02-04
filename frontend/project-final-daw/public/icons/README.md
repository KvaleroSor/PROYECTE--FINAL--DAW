# Iconos PWA

Para generar los iconos necesarios para la PWA, puedes usar una de estas opciones:

## Opción 1: Generador online
1. Ve a https://www.pwabuilder.com/imageGenerator
2. Sube tu logo (mínimo 512x512px)
3. Descarga los iconos generados
4. Colócalos en esta carpeta `/public/icons/`

## Opción 2: Usar ImageMagick (línea de comandos)
```bash
# Instalar ImageMagick
brew install imagemagick  # macOS
# o
sudo apt-get install imagemagick  # Linux

# Generar iconos desde tu logo
convert logo.png -resize 72x72 icon-72x72.png
convert logo.png -resize 96x96 icon-96x96.png
convert logo.png -resize 128x128 icon-128x128.png
convert logo.png -resize 144x144 icon-144x144.png
convert logo.png -resize 152x152 icon-152x152.png
convert logo.png -resize 192x192 icon-192x192.png
convert logo.png -resize 384x384 icon-384x384.png
convert logo.png -resize 512x512 icon-512x512.png
```

## Tamaños necesarios:
- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

## Nota temporal
Mientras no tengas los iconos, la app funcionará pero mostrará advertencias en la consola.
Puedes usar un placeholder temporal o el logo de tu app.
