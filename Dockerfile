FROM nginx:alpine

# Remove arquivos padrão
RUN rm -rf /usr/share/nginx/html/*

# Cria estrutura de diretórios como no Python server
WORKDIR /usr/share/nginx/html

# Copia TODOS os arquivos de public para a raiz do nginx
COPY public/ .

# Expõe porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]