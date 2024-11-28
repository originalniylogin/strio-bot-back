FROM node:lts AS dist

WORKDIR /usr/src/app
# Copy package.json and pnpm-lock.yaml
COPY pnpm-lock.yaml package.json ./
# Install app dependencies using PNPM
RUN npm install -g pnpm
# Install dependencies
RUN pnpm i
# Copy the application code
COPY . .
# Build the TypeScript code
RUN pnpm run build
# Expose the app
EXPOSE 3000
# Start the application
CMD ["pnpm", "start", "--unhandled-rejections=warn-with-error-code"]