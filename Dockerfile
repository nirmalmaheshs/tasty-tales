FROM node:carbon
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
# ENV MONGODB_CONNECTION_URI=mongodb://mongodb/recipe-sharing-platform
CMD [ "npm", "start" ]