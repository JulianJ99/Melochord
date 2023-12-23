# pull official base image
FROM node:20 as build-stage

# set working directory
WORKDIR /frontend

# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --no-optional && npm cache clean --force

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start", "--host=0.0.0.0", "--disable-host-check"]