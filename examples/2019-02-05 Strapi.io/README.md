# Strapi.io 

__Usefull links:__

Website:
https://strapi.io

Documentation:
https://strapi.io/documentation/

Github:
https://github.com/strapi/strapi

Examples:
https://github.com/strapi/strapi-examples/

## depends on
* node >= 10
* npm >= 6
* docker >= 18.02.0
* make


## Setup

Install strapi cli
```
npm install strapi@alpha -g
```

Start docker und init new project

````
make init
````

Now two PostgreSQL container and one adminer container are running and a new strapi project is initialized.
Go to http://localhost:1337/admin to create your admin user. 


### Start and stop

````
make up
````

````
make down
````


## Setup example project

If needed do a cleanup:

````
make cleanup
````

Init example project:

````
make init-example
````

Now example Apis, graphql and automatic documentation are initialized

Admin: 
* http://localhost:1337/adminer

Static frontend: 
* http://localhost:1337

REST: 
* http://localhost:1337/products

GraphQL (Playground): 
* http://localhost:1337/graphql

Documentation (Swagger): 
* http://localhost:1337/documentation/v1.0.0

### Start and stop

````
make up-example
````

````
make down
````
