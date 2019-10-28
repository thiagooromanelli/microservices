# TCD - Services Architecture / API / Mobile Architecture

Repositorio dedicado ao trabalho de conclusao de disciplina.
Foi escolhido o modelo do Netflix para desenvolvimento dos microservices.
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

Os microservices de Movies e Users se comunicam entre si atraves do Kafka em 3 de suas APIs cuja explicacao de funcionamento esta no Swagger
- /users/liked/{login}/{movie_name}
- /users/toWatch/{login}/{movie_name}
- /users/watched/{login}/{movie_name}