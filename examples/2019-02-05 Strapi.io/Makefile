
########## API #################
init::
	$(MAKE) _up
	strapi new strapi
	$(MAKE) _strapi-start

up::
	$(MAKE) _up
	$(MAKE) _strapi-start

up-example::
	$(MAKE) _up
	$(MAKE) _strapi-example-start

down::
	docker-compose down

cleanup::
	$(MAKE) down
	rm -Rf ./strapi
	rm -Rf ./example


init-example::
	$(MAKE) _up
	strapi new example --dbclient=postgres --dbhost=0.0.0.0 --dbport=8086 --dbname=strapi --dbusername=toor --dbpassword=toor --dbforce
	cd example && strapi install graphql
	cd example && strapi install documentation
	cd example && strapi generate:api product name:string description:text price:integer
	cd example && strapi generate:api order orderid:integer address:text price:integer
	cd example && strapi generate:api customer name:string email:email password:password
	$(MAKE) _strapi-example-start


########## Commands ############
_up::
	docker-compose up -d

_strapi-start::
	cd strapi && strapi start

_strapi-example-start::
	cd example && strapi start
