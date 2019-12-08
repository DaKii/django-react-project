# Start with Ubuntu image
FROM ubuntu:18.04

LABEL maintiner=JustineQuiapos

# Install everything that you need except libraries specific to your Django project - these come later.
RUN apt-get -y update && apt-get -y upgrade && \
    apt-get -y install python3 python3-dev python3-setuptools python3-pip libgdal-dev
RUN pip3 install --upgrade pip setuptools wheel

# Make a new direcctory on your target image and set it as your working dorectory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

