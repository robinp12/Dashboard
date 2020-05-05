FROM node:10

COPY . /app
WORKDIR /app

RUN apt-get install php7 \
    php7-curl \
    php7-json \
    php7-openssl \
    php7-phar \
    php7-posix
RUN /usr/bin/php7 -r "readfile('https://getcomposer.org/installer');" | \
    /usr/bin/php7 -- --install-dir=/usr/local/bin --filename=composer

RUN composer install --no-scripts
RUN npm install

EXPOSE 9000

CMD npm env && npm install & npm run dev-server
CMD [ "php-fpm", "-F", "-O" ]
