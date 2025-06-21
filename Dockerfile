FROM oven/bun:1

WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias con bun
RUN bun install

# Copia el resto del código
COPY . .

# Expone el puerto
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["bun", "run", "start"] 