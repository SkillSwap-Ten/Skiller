# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa final
FROM node:18-alpine

WORKDIR /app

# Copiamos la build de Next.js desde la etapa anterior
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]
