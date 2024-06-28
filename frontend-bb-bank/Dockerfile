FROM node:alpine
WORKDIR /frontend-bb-bank
COPY package.json ./
COPY package-lock.json ./
ENV PATH /frontend-bb-bank/node_modules/.bin:$PATH
RUN npm install
RUN npm install react-scripts -g
COPY . ./
CMD ["npm", "start"]