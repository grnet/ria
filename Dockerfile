FROM node:14-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN apk add --no-cache bash
RUN apk add --no-cache python3 py3-pip
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install requests
RUN python3 -m pip install bs4
RUN npm audit fix

COPY . .
EXPOSE 3000

CMD [ "node", "app.js" ]
