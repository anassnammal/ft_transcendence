
all:
	bash tools/init.sh
	docker-compose -f ./docker-compose.yml up #-d
	@echo ""
	@echo "\033[0;32m######################### \033[0m"
	@echo "\033[0;32mSERVER IS READY TO USE \033[0m"
	@echo "\033[0;32m######################### \033[0m"
	@echo ""
	@echo "\033[0;31mServer adress: https://127.0.0.1 \033[0m"
	@echo ""

start:
	docker-compose -f ./docker-compose.yml up

build:
	
	docker-compose -f ./docker-compose.yml build

down:
	
	docker-compose -f ./docker-compose.yml down

re:	down
	
	docker-compose -f ./docker-compose.yml up --build # -d

logs:
	docker-compose -f ./docker-compose.yml logs $(s)

test_waf:
	./nginx/tools/test_waf.sh

clean:
	docker-compose down --rmi all --volumes

oclean:
	docker-compose stop $(s)
	docker-compose rm -f $(s)
	docker-compose images -q $(s) | xargs -r docker rmi
	docker volume ls -qf dangling=true | xargs -r docker volume rm

fclean:
	rm -rf ./postgres_data  
	docker stop $$(docker ps -qa) 2>/dev/null || true
	docker rm $$(docker ps -qa) 2>/dev/null || true
	docker rmi -f $$(docker images -qa) 2>/dev/null || true
	docker volume rm $$(docker volume ls -q) 2>/dev/null || true
	docker network rm $$(docker network ls -q) 2>/dev/null || true

.PHONY	: all build down re clean fclean logs test_waf oclean