FROM python:latest

# install Python 3
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install psycopg2-binary


COPY scripts db/scripts


COPY entrypoint.sh /entrypoint.sh


EXPOSE 5432

ENTRYPOINT [ "/entrypoint.sh" ]