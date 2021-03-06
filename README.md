# Services Architecture / API / Mobile Architecture

## Sobre
Projeto que simula uma arquitetura da Netflix com o objetivo de fixar aprendizado no desenvolvimento de microservices.

## Detalhes
Todos os microservices foram desenvolvidos em Python e o banco de dados escolhido foi o MongoDB.

A aplicacao esta dividida em 3 microservices: Movies, Users e ServiceDesk
- Movies: 
	- Possibilidade de visualizar os filmes de um determinado gênero;
	- Possibilidade de visualizar os detalhes de cada filme;
	- Possibilidade de buscar um filme por palavra-chave;
	- Possibilidade de exibir os filmes mais vistos por categorias;
- Users:
	- Possibilidade de votar nos filmes que mais gostei;
	- Possibilidade de marcar um filme ou série para ser visto no futuro;
	- Possibilidade de visualizar os filmes e séries que já foram assistidos;
- ServiceDesk
	- Possibilidade de abrir um chamado técnico de algum problema que está acontecendo;

As APIs de cada microservice estao documentadas em Swagger nas seguintes portas.
- Movies: port 5000
- Users: port 5001
- ServiceDesk: port 5002

Os microservices de Movies e Users se comunicam entre si atraves do Kafka em 3 de suas APIs cuja explicacao de funcionamento esta no Swagger.
- /users/liked/{login}/{movie_name}
- /users/toWatch/{login}/{movie_name}
- /users/watched/{login}/{movie_name}

No Kafka utilizamos 2 topicos para comunicacao entre Movies e Users, "movies" e "users", onde e passado um json com o "type" da mensagem a ser tratada e o "payload" com os dados desejados.

Para teste foi utilizado uma imagem do Kafka baixada do DockerHub. Para funcionar precisa-se entrar com alguns comandos:
```
// Entrar na linha de comando do container
> docker exec -ti kafka bash

// Para criacao dos topicos
# $KAFKA_HOME/bin/kafka-topics.sh --create --topic movies --partitions 1 --replication-factor 1 --if-not-exists --zookeeper localhost:2181
# $KAFKA_HOME/bin/kafka-topics.sh --create --topic users --partitions 1 --replication-factor 1 --if-not-exists --zookeeper localhost:2181

// Para conferir se topicos os topicos foram criados com sucesso
# $KAFKA_HOME/bin/kafka-topics.sh --zookeeper localhost:2181 --list
```

Apos isso pode-se utilizar o docker-compose.yml presente neste repositorio para iniciar os microservices e o MongoDB devidamente configurados.

Tambem usou-se o Consul para Service Discovery. Esta configurado dentro do docker-compose.yml e inicia junto com os outros servicos.
Apos inicio do container deve-se registrar os servicos no Consul com os seguintes comandos:

```
// Register services
> docker exec consul /bin/sh -c "echo '{\"service\": {\"name\": \"users\", \"tags\": [\"users\"], \"port\": 5001}}' >> /consul/config/users.json"
> docker exec consul /bin/sh -c "echo '{\"service\": {\"name\": \"servicedesk\", \"tags\": [\"servicedesk\"], \"port\": 5002}}' >> /consul/config/servicedesk.json"
> docker exec consul /bin/sh -c "echo '{\"service\": {\"name\": \"movies\", \"tags\": [\"movies\"], \"port\": 5000}}' >> /consul/config/movies.json"
// Aplicar as configuracoes
> docker exec consul consul reload
```
