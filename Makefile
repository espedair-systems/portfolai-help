.PHONY: help install dev build preview check clean distclean push

# Default goal
.DEFAULT_GOAL := help

# Path to the main project's public/help directory
HELP_DEST := ../portfolai/frontend/public/help

help:
	@echo "🚀 Portfolai Help - Available Commands:"
	@echo "  make install  - Install project dependencies"
	@echo "  make dev      - Start local development server (astro dev)"
	@echo "  make build    - Build production-ready site to ./dist/"
	@echo "  make preview  - Preview production build locally"
	@echo "  make check    - Run astro check for diagnostics"
	@echo "  make push     - Build and copy results to Portfolai main project"
	@echo "  make clean    - Remove build artifacts and cache (.astro, dist)"
	@echo "  make distclean - Remove all generated files including node_modules"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

check:
	npm run astro -- check

push: build
	mkdir -p $(HELP_DEST)
	rm -rf $(HELP_DEST)/*
	cp -rv dist/* $(HELP_DEST)/

clean:
	rm -rf dist .astro

distclean: clean
	rm -rf node_modules
