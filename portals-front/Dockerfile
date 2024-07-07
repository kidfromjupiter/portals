FROM node:22-bookworm-slim
ARG NEXT_PUBLIC_WS_HOST
ENV NEXT_PUBLIC_WS_HOST $NEXT_PUBLIC_WS_HOST
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
RUN npm run build
EXPOSE 4000
CMD ["npm","start"]

