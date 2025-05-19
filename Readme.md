## Instrucciones para ejecucion
# Clonar repositorio:
[git clone https://github.com/tuusuario/mi-proyecto-web.git](https://github.com/AleLoredo/PFO2DEVOPS.git)
cd PFO2DEVOPS

# Construir la imagen Docker
Ya desde la raíz del proyecto ejecutar: 
docker build -t mi-proyecto-web .

# Correr el contenedor
Ejecutar el contenedor y exponerlo al puerto 8080 (o el preferido) del host:
docker run -d -p 8080:80 mi-proyecto-web

Luego, abrir el navegador en http://localhost:8080


