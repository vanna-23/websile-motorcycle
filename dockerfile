# Use Nginx as a lightweight web server
FROM nginx:alpine

# Copy your website files into Nginx default directory
COPY . /user/share/nginx/html

EXPOSE 81