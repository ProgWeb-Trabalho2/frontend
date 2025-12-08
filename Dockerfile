# Usando Nginx para servir arquivos estáticos
FROM nginx:alpine

# Remove arquivos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia APENAS a pasta public (que contém os arquivos compilados)
COPY public /usr/share/nginx/html

# Expõe porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]