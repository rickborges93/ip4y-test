## Sobre o projeto

Sistema de gerenciamento de projetos e tarefas desenvolvido em Laravel.

Todo o sistema de autenticação, registro, login e recuperação de senha foi utilizado o breeze, um starter pack do Laravel.

Sobre o frontend foi utilizado o Inertia + React como bibliotecas e a estilização feita com tailwind, garantindo a responsividade.

Além disto, foram desenvolvidos todos os testes para cada rotas, seja ele unitário quanto e2e.


### Parte teórica

**1.** Explique a diferença entre Eloquent ORM e Query Builder no Laravel. Quais são os prós e contras de cada abordagem?

**R:** A principal vantagem do Eloquent é a velocidade do desenvolvimento, que reduz custo de projeto (tempo é dinheiro). A principal desvantagem é que qualquer ORM comparado a um query builder é a velocidade de processamento e o desenvolvedor ter menos controle do gerenciamento do banco de dados. Porém essa desvantagem não acontece na maioria dos casos, visto que não há queries tão complexas a ponto de precisar de uma otimização.

---

**2.** Como você garantiria a segurança de uma aplicação Laravel ao lidar com entradas de usuários e dados sensíveis? Liste pelo menos três práticas recomendadas e explique cada uma delas.

**R:** 
SQL Injection - Ao utilizar o Eloquent, automaticamente o Laravel lida com os dados que estão entrando no sistema e protege a aplicação de SQL Injection, mesmo utilizando o query builder.

Criptografia - Todas as senhas ficam salvas no banco de dados utilizando criptografia. O próprio Laravel tem uma biblioteca de Hash que garante essa criptografia com saltos, assim tornando irreversível.

Dados sensíveis - Utilizando as Models + Eloquent, garante-se que os dados sensíveis se tornem colunas escondidas, então independente da query esses dados nunca sairão do backend. Além de utilizar os Resources, que são técnicas de criar "alias" (apelidos) para os campos, escondendo os nomes das tabelas.

---

**3.** Qual é o papel dos Middlewares no Laravel e como eles se integram ao pipeline de requisição? Dê um exemplo prático de como você criaria e aplicaria um Middleware personalizado para verificar se o usuário está ativo antes de permitir o acesso a uma rota específica.

**R:** O middleware é uma função intermediária, que ocorre entre a requisição e a resposta dela, tendo um papel fundamental para lidar com tratativas comuns que ocorrem em todas as rotas, como por exemplo a garantir que o usuário esteja logado em sistema para poder ter um retorno final da requisição feita. Junto com o middleware "auth" que garante que o usuário esteja logado, faz-se um outro middleware chamado "activedUser" que garante após o middleware de auth pega o usuário logado, verifica na base de dados qual "status" ou uma flag booleana que pode se chamar "ativo" esteja validado e da continuidade na requisição, se não estoura um erro.

---

**4.** Descreva como o Laravel gerencia migrations e como isso é útil para o desenvolvimento de aplicações. Quais são as melhores práticas ao criar e aplicar migrations?

**R:** As migrations são criadas com dois métodos em uma classe de migração, up e down, onde up tem a função de criar/alterar tabelas, colunas e/ou índices, e atabela down tem a função de reverter o que a função up fez. Durante um desenvolvimento onde se é necessário fazer qualquer alteração/adição no banco de dados, torna-se necessário a criação de um migration, assim controlando o versionamento da sua base de dados, sabendo tudo o que foi feito na base de dados desde o início do projeto. Nunca se deve alterar uma migration, por exemplo caso tenha sido feito algo equivocado, uma nova migration deve ser criada para consertar esse equívoco, justamente para manter esse log. Único momento que se pode alterar uma migration é em ambiente de desenvolvimento com a condição de que ninguém esteja utilizando alguma coluna ou tabela que essa migration faz referência.

---

**5.** Qual é a diferença entre transações e savepoints no SQL Server? Como você usaria transações em um ambiente Laravel?

**R:** Transações são sequência de operações no banco de dados tratadas num único bloco, assim caso uma dessas operações falhe, pode-se reverter (rollback) todos os processos, garantindo que faça "tudo ou nada" dentro de um processo. O savepoint no SQL Server serve como um ponto de retorno caso alguma operação falhe, assim não cancelando todas as operações, mas sim operações selecionadas previamente, podendo continuar uma parte e falhar outras, desde que não afetem as regras de negócio.

O Laravel disponibiliza um método estático chamado beginTransaction() que inicia uma transação e os métodos estáticos commit() para caso de sucesso e rollback() para caso de fracasso em alguma das transações. Na lógica basta colocar o código dentro de um bloco try/catch e manter o commit() antes do retorno da função e o rollback no catch caso estoure algum erro. 

---

### Parte prática

##### Como deixar o projeto pronto para rodar

1. Clone este repositório

```
git clone https://github.com/rickborges93/ip4y-test.git
```

2. Acesse a pasta raiz do projeto.

```
cd ip4y-test
```

3. Instale as dependências do Laravel

```
composer update
```
ou
```
php composer.phar update
```

4. Instale as dependências do frontend (inertiajs + react)
```
npm i 
```

5. Copie e mude as configurações no arquivo .env
```
  cp .env.example .env
```

6. Após alterar os dados do projeto conectando no banco de dados, rode as migrations
```
php artisan migrate
```
7. Agora abra dois terminais e rode os comandos
7.1. Rode o backend
```php artisan serve```
7.2. Rode o frontend
```npm run dev```

8. Pronto, agora basta acessar a URL http://localhost:8000/ e testar todas as funcionalidades.

9. Caso queira rodar os testes, basta rodar o código em um terceiro terminal.
```
php artisan test
```
---
Aproveite :)

LinkedIn: [Henrique Borges](https://www.linkedin.com/in/henrique-samensari-borges-6aa553174/) 


