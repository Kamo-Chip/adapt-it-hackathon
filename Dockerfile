# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your Next.js app's source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "run", "start"]
