FROM node:9-alpine

# Install dependencies
COPY package.json /
RUN npm install

# Copy src
COPY . /

CMD [ "node", "index.js" ]
