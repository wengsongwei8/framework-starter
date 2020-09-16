FROM anapsix/alpine-java:8_server-jre_unlimited

MAINTAINER wengzhonghui4@163.com

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

RUN mkdir -p /apps
WORKDIR /apps
EXPOSE 6028
ADD ./target/api-cloud-starter.zip ./
RUN unzip ./api-cloud-starter.zip
CMD ["/apps/api-cloud-starter/bin/start.sh"]
