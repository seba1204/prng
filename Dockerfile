ARG PORT=6095

FROM node:latest AS node


# Builder stage

FROM node AS builder

# Use /app as the CWD
WORKDIR /app            

# Copy package.json and package-lock.json to /app
COPY package*.json ./   

# Install all dependencies
RUN npm i               

# Copy the rest of the code
COPY . .                

# Invoke the build script to transpile ts code to js
RUN npm run build    

# Open desired port
EXPOSE ${PORT}

# Run development server
ENTRYPOINT [ "npm", "start" ]

# Final stage

FROM node AS final

# Set node environment to production
ENV NODE_ENV production

# Update the system
RUN apt-get update
RUN apt-get upgrade -y

# Prepare destination directory and ensure user node owns it
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app

# Set CWD
WORKDIR /home/node/app

# Install PM2
RUN npm i -g pm2

# Copy package.json, package-lock.json and process.yml
COPY package*.json process.yml ./

# Install libraries as user node
RUN npm i --only=production

# Copy js files and change ownership to user node
COPY --chown=node:node --from=builder /app/dist ./dist

# Switch to user node
USER node

# Open desired port
EXPOSE ${PORT}

# Use PM2 to run the application as stated in config file
ENTRYPOINT ["pm2-runtime", "./process.yml"] 