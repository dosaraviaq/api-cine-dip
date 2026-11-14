# ETAPA DE BUILD O CONSTRUCCIÓN
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build \
&& npm prune --omit=dev

# ====== CONSTRUCCIÓN DE PRODUCCION =======
FROM node:20-alpine AS production

ENV NODE_ENV=production

COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

RUN mkdir -p ./estatico/imagenes
COPY --chown=node:node --chmod=775 ./estatico/imagenes ./estatico/imagenes

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
CMD node -e "fetch('http://127.0.0.1:3000/documentacion-json').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node","dist/main"]