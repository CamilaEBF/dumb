FROM ubuntu:14.04

RUN apt-get update && apt-get upgrade -y
RUN apt-get -y install python-setuptools
RUN easy_install pip

ADD requirements.txt /requirements.txt
RUN pip install -r requirements.txt

ADD . /

EXPOSE 5000

CMD ["python", "main.py"]
