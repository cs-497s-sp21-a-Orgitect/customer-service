FROM node:latest
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --only=production
COPY . .
CMD ["npm", "start"]