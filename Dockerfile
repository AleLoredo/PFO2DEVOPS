# Usa una imagen de Nginx ligera
FROM nginx:alpine

# Elimina la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia el contenido del proyecto al directorio web de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80 del contenedor
EXPOSE 80