FROM node:18-alpine3.16

WORKDIR /api

COPY package*.json ./

RUN npm i

COPY . .





# CMD ["rm", "-rf", "node_modules"]

# EXPOSE 3000

# CMD [ "node", "run start" ]