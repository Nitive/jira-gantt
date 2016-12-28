# common

# see http://stackoverflow.com/questions/8941110/how-i-could-add-dir-to-path-in-makefile
SHELL := /bin/bash
PATH := ./node_modules/.bin:$(PATH)

clean:
	rm -rf dist/

server:
	supervisor -w server/ server/server.js

.PHONY: clean server


# dev

assets-watch: clean
	supervisor -w server/assets-server.js server/assets-server.js

start:
	concurrently --raw 'make assets-watch' 'make server'

.PHONY: assets-watch start


# tests

lint-js:
	eslint server/ *.js

lint-ts:
	tslint --project .

lint: lint-js lint-ts

test: lint
	jest

tdd:
	jest --watch

cover:
	jest --coverage --no-cache

.PHONY: lint-js lint-ts lint test tdd cover


# production

assets-build: clean
	webpack -p

production: assets-build server

.PHONY: assets-build production
