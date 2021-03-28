FROM node:15.12.0-alpine3.10

# Set up dependencies
RUN ["mkdir", "-p",  "/dependencies"]
WORKDIR /dependencies
COPY package.json .
RUN npm install

ENV PATH=/dependencies/node_modules/:$PATH

# Run app
WORKDIR /app
EXPOSE 8000
CMD ["npm", "run", "start-docker"]
