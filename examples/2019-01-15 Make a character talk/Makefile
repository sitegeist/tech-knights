#
# @author Wilhelm Behncke <behncke@sitegeist.de>
#

###############################################################################
#                                VARIABLES                                    #
###############################################################################
SHELL=/bin/bash
export PATH := ./node_modules/.bin:./bin:$(PATH)
export TS_NODE_PROJECT := ./tsconfig.json

###############################################################################
#                               FRONTEND BUILD                                #
###############################################################################
start:
	webpack-dev-server --mode development --open

build:
	webpack --mode production
