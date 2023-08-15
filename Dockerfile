FROM node:latest
ENV NODE_ENV=production
WORKDIR /c/Users/Rakesh Kumar Sahoo/Desktop/social_media_API/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]