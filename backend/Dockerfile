FROM node:18.13.0
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 8080
CMD npm start
# ENTRYPOINT [ "npm","start" ]