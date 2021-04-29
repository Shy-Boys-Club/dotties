FROM node:15.12.0-alpine3.10

# Run app
WORKDIR /app
EXPOSE 8000
COPY . .
RUN npm install && npm cache clean --force
CMD ["npm", "run", "start-docker"]
