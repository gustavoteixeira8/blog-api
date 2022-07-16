DOCKER_CONTAINERS_IDS := $(shell docker ps -q)

compose-stop: ; docker stop ${DOCKER_CONTAINERS_IDS}
compose-down: ; docker-compose down
compose-up: ; docker-compose up -d
dev: ; make compose-stop ; make compose-up ; clear ; npm run dev 