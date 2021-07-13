ARG NGINX_VERSION

### STAGE 1: Build ###
FROM harbor-repo.vmware.com/dockerhub-proxy-cache/library/node:12-alpine as builder
RUN mkdir -p ./src/lib/ 
COPY ./src/lib/angular-components-1.2.0.tgz ./src/lib/
ARG BUILD_ENV=dev
COPY package.json .
COPY package-lock.json .
RUN npm config set registry https://build-artifactory.eng.vmware.com/artifactory/api/npm/npm && npm i && mkdir /app && cp -R ./node_modules ./app
WORKDIR /app
COPY . .
RUN npm run build -- -c=$BUILD_ENV
RUN sed -i 's/${APP_CONFIG}/'"${APP_CONFIG}"'/' $(ls /app/dist/main*.js)

### STAGE 2: Nginx ###
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} as nginx

# https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
ARG TIME_ZONE
USER root
RUN mkdir -p /opt/var/cache/nginx && \
    cp -a --parents /usr/lib/nginx /opt && \
    cp -a --parents /usr/share/nginx /opt && \
    cp -a --parents /var/log/nginx /opt && \
    cp -aL --parents /var/run /opt && \
    cp -a --parents /etc/nginx /opt && \
    cp -a --parents /etc/passwd /opt && \
    cp -a --parents /etc/group /opt && \
    cp -a --parents /usr/sbin/nginx /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libpcre.so.* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libz.so.* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libc.so.* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libdl.so.* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libpthread.so.* /opt && \
    cp -a --parents /lib/x86_64-linux-gnu/libcrypt.so.* /opt && \
    cp -a --parents /usr/lib/x86_64-linux-gnu/libssl.so.* /opt && \
    cp -a --parents /usr/lib/x86_64-linux-gnu/libcrypto.so.* /opt && \
    cp /usr/share/zoneinfo/${TIME_ZONE:-UTC} /opt/etc/localtime

### STAGE 3: Setup on Distroless ###
FROM gcr.io/distroless/base-debian10
COPY --from=nginx /opt /
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html/
EXPOSE 8080
USER 1001
ENTRYPOINT ["nginx", "-g", "daemon off;"]

