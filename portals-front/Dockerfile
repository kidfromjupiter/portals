FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 4000
CMD ["npm","start"]

