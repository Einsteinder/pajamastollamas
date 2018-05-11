# Pajamas to Llamas
Our project design will be to make something like an ecommerce website, specifically designed as a website that markets pajamas to llamas, and it will be called Llamas with Pajamas. It will allow Llama customers to view a wide variety of pajama selections, as well as the ability to review those selections, and a forum for discussion of llama-pajama topics. This will of course require that llamas be able to login to the website, and they will have information attached to their accounts. Our database will be constructed in mongoDB. It will handle storing the user information, comments, review, and any and all related information.

## Course Technologies
Redis: We will use redis as our session store.   
Workers: We will have a database of related information, which will be accessed by worker processes.   
React: The front end of the website will be built in react.   

## Independent Technologies
RabbitMQ: RabbitMQ is another version of PubSub technology, that we will use instead of using redis’ pubsub. It will handle the interaction between our server and our database worker.   
ElasticSearch will be used to search across the variety of pajamas that are available to the llamas.

## Initial Setup
You need an up-to-date version of Elastic Search (6.2)   
You need (of course) mongodb   
You need the redis server   
You need the rabbitmq-server   
We have provided a shell script "RequiredServers.sh", which can be run using "npm run installServers". It will install brew and use brew to download everything, so if you want to do it manually you are of course free to do so. It hasn't been tested very well, so use at your own risk.   

## Usage
You need to make sure that redis, mongo, the rabbitmq-server, and the elastic search service are all running before starting   
Then, seed the database using npm run seed   
Now start the server and worker using npm run server   
And start the client, using npm start (might take awhile)   
From this, you can navigate the front end client, and may interact with the database   
Your credentials for using the service are the username "prof@test.com" and the password "greatpassword"   