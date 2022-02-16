# pull official base image
FROM node:17-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies --silent
COPY package*.json ./
RUN npm install 

# copy all files
COPY ./client/package*.json ./client/
COPY ./client/src/ ./client/src/
COPY ./client/public/ ./client/public/
COPY ./server/  ./server/

# server build
RUN npm run build

# define external port
EXPOSE 3005

# start app
CMD ["npm", "start"]