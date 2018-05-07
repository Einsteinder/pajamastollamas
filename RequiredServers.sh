#! /bin/bash
if test ! $(which brew); then
    echo "Installing homebrew..."
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi
brew update

if brew ls --versions rabbitmq > /dev/null; then
  echo "rabbitmq up to date."
else
  brew install rabbitmq
  echo "rabbit mq installed."
fi

if brew ls --versions mongodb > /dev/null; then
  echo "mongodb up to date."
else
  brew install mongodb
  echo "mongodb installed."
fi

if brew ls --versions elasticsearch > /dev/null; then
  echo "elasticsearch up to date."
else
  brew install elasticsearch
  echo "elasticsearch installed."
fi

if brew ls --versions redis > /dev/null; then
  echo "redis up to date."
else
  brew install redis
  echo "redis installed."
fi


osascript -e 'tell app "Terminal" to do script "mongod"'
echo "mongod started"
osascript -e 'tell app "Terminal" to do script "rabbitmq-server"'
echo "rabbitmq started"
osascript -e 'tell app "Terminal" to do script "redis-server"'
echo "redis-server started"
osascript -e 'tell app "Terminal" to do script "elasticsearch"'
echo "elasticsearch started"

