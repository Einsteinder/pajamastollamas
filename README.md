# Pajamas to Llamas
Our project design will be to make something like an ecommerce website, specifically designed as a website that markets pajamas to llamas, and it will be called Llamas with Pajamas. It will allow Llama customers to view a wide variety of pajama selections, as well as the ability to review those selections, and a forum for discussion of llama-pajama topics. This will of course require that llamas be able to login to the website, and they will have information attached to their accounts. Our database will be constructed in mongoDB. It will handle storing the user information, comments, review, and any and all related information.

## Course Technologies
Redis: We will use redis as our session store.
Workers: We will have a database of related information, which will be accessed by worker processes.
React: The front end of the website will be built in react.

## Independent Technologies
RabbitMQ: RabbitMQ is another version of PubSub technology, that we will use instead of using redis’ pubsub. It will handle the interaction between our server and our database worker.
ElasticSearch will be used to search across the variety of pajamas that are available to the llamas.