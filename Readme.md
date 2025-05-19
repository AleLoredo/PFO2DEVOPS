# Instrucciones para ejecucion
## Clonar repositorio:
[git clone https://github.com/AleLoredo/PFO2DEVOPS.git](https://github.com/AleLoredo/PFO2DEVOPS.git)

Luego ingresar en la carpeta del repositorio local: 
cd PFO2DEVOPS

## Construir la imagen Docker
Ya desde la raíz del proyecto ejecutar: 

docker build -t pfo2devops .

## Correr el contenedor
Ejecutar el contenedor y exponerlo al puerto 8080 (o el preferido) del host:
docker run -d --name pfo2devops -p 8080:80 pfo2devops

Luego, abrir el navegador en http://localhost:8080


