# pull official base image
FROM node:17-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# copy all files
COPY . ./

# server build
RUN npm run build

# define external port
EXPOSE 3005

# start app
CMD ["npm", "start"]