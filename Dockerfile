FROM registry.access.redhat.com/ubi8/nodejs-14:latest
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]