# Start with Docker's node base image
FROM node
MAINTAINER Justin Thareja <justinthareja@gmail.com>

# Install app dependencies
COPY package.json src/package.json
RUN cd /src; npm install

# Bundle app source code inside Docker image
COPY . /src

# Set environmental variables
ENV PORT 5000
ENV NODE_ENV production

# Expose port to the docker daemon
# Does not make port accessible to host, make sure to include -P flag on docker run
EXPOSE $PORT

# Define runtime and entry point 
CMD ["node", "src/app.js"]
