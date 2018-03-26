FROM node:9-alpine

# Install dependencies
COPY package.json /
RUN npm install

# Copy src
COPY . /

EXPOSE 4000

CMD [ "node", "index.js" ]
