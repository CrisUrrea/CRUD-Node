# Usa la imagen oficial de Node.js
FROM node:latest

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Instala las dependencias de la aplicación
COPY package*.json ./
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que funciona tu aplicación
EXPOSE 3030

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
