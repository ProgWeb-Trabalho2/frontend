FROM nginx:stable

# Copia todo o conteúdo estático para dentro do container
COPY public /usr/share/nginx/html

# Porta HTTP padrão
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
