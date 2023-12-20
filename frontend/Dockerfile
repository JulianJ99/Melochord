# pull official base image
FROM node:14 as build-stage

# set working directory
WORKDIR /frontend

# add `/frontend/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./



RUN npm install 
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

EXPOSE $REACT_LOCAL_PORT

# start app
CMD ["npm", "start"]