# CRUD Node Express

## Ejecucion Local
Para ejecutar el CRUD de manera local se debe empezar por instalar los modulos de node para ello empezamos por

```bash
npm install
```

### Configuracion de base de datos
Despues de que los modulos se instalen se debe ingresar a el directorio database y configurar sus propios valores de base de datos

### Ejecucion
Al terminar esto se puede pasar a correr el programa con
```bash
node app.js
```

## Ejecucion en contenedor Docker
Si desea mejor tener el programa gestionado en un contenedor una opcion es utilizar docker, para ello estan los dos archivos dockerfile y docker-compose

#### Dockerfile
Es el archivo donde esta configurado el entorno de Docker juntos con las dependencias necesarias. En este caso ya estaria configurado

#### Docker-compose
Docker Compose es el archivo donde este definido los múltiples contenedores. Esta simplificado el proceso de definición, configuración y ejecución de aplicaciones que constan de varios servicios interconectados.

### Uso de docker
En primero te recomiendo tener docker para poder trabajar con lo siguiente sino lo tienes descargalo aca: https://www.docker.com/products/docker-desktop/

Para que docker identifique los contenedores recordar los archivos anteriormente nombrados, dentro tienen la configuracion de puertos, servicios requeridos, y como instalar las depencias. Para subir el contenedor y se quede en docker se debe utilizar el siguiente comando en la terminal
```bash
docker compose up --build
```

Aclaracion esto es para MAC Intel
Si por casualidad tienes docker descargado, pero al ingresar el comando te muestra que no entiende los comandos de docker puedes ingresar esto:
```bash
export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
```
