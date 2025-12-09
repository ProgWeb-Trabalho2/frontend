FROM python:3.11-alpine

WORKDIR /app

# Copia TODOS os arquivos (incluindo TypeScript e configurações)
COPY . /app/

# Instala dependências se houver requirements.txt (opcional)
# COPY requirements.txt .
# RUN pip install -r requirements.txt

# Expõe a porta 5500
EXPOSE 5500

# Comando para servir a pasta public
CMD ["python", "-m", "http.server", "5500", "--directory", "public"]