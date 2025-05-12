FROM node:20

WORKDIR /app

COPY package*.json ./

RUN rm -rf package-lock.json node_modules \
    && npm install
    
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]