#!/usr/bin/env bash

# update advanced packaging tool (apt)
sudo apt-get update

# install add-apt-repository
sudo apt-get install -y python-software-properties

# add updated nodejs repo
sudo add-apt-repository ppa:chris-lea/node.js

# add updated git repo
sudo add-apt-repository ppa:git-core/ppa

# install curl
sudo apt-get install -y curl

# install git
sudo apt-get install -y git

# install rvm
sudo gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | bash -s $1
source /etc/profile.d/rvm.sh
rvm install $2

# install nodejs
sudo apt-get install -y nodejs

# install apache2
sudo apt-get install -y apache2
if ! [ -L /var/www ]; then
  rm -rf /var/www
  ln -fs /vagrant /var/www
fi

# install sass
gem install sass

# install grunt
npm install -g grunt-cli

# install bower
npm install -g bower