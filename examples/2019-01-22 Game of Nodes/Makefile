#
# @author Wilhelm Behncke <behncke@sitegeist.de>
#

###############################################################################
#                                VARIABLES                                    #
###############################################################################
SHELL=/bin/bash
PHP=docker-compose exec php php
COMPOSER=docker-compose exec php composer
export MAKE:=$(MAKE) -s


list:
	@grep '^[^#[:space:]].*:' Makefile

###############################################################################
#                               APPLICATION                                   #
###############################################################################
install:
	@$(MAKE) up
	@$(COMPOSER) install
	@$(MAKE) populate

up:
	@docker-compose up -d

down:
	@docker-compose down --remove-orphans

restart:
	@$(MAKE) down
	@$(MAKE) up

ssh:
	@$(MAKE) up 2> /dev/null
	@docker-compose exec php sh

###############################################################################
#                               DEVELOPMENT                                   #
###############################################################################
populate:
	@$(MAKE) restart
	@sleep 20
	@$(PHP) /app/build/populate.php

###############################################################################
#                                 SCRIPTS                                     #
###############################################################################
example-friend-or-foe:
	@$(PHP) /app/src/friend-or-foe.php

example-family:
	@$(PHP) /app/src/family.php

example-friends:
	@$(PHP) /app/src/friends.php

example-enemies:
	@$(PHP) /app/src/enemies.php

example-welcome-in:
	@$(PHP) /app/src/welcome-in.php