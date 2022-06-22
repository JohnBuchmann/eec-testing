# For build: docker build --tag dcentriq-web-app:0.0.1 .
# For running: docker run -p 3100:80 -e TARGET_ENV=dev --name dcentriq-web-app dcentriq-web-app:0.0.1

FROM nginxinc/nginx-unprivileged

# COPY build /var/www/
COPY build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN ls /usr/share/nginx/html/*

EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]
