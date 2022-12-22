# Controle a sua loja de veículos com essa aplicação, Motors Shop!

Projeto no qual você pode ter controle sobre um site de vendas de veículos, carros e motos,
onde como comprador você pode vizualizar e comentar os veículos disponíveis e como anunciante você pode
ter controle de seus produtos e também podendo editar e criar novos anúncios.
## Tecnologias Utilizadas

Neste projeto foram usados as seguintes tecnologias:
  - Node.JS
  - Nest.JS
  - Prisma
  - TypeScrypt
  - Swagger(documentação)
  - JWT
  - Bcrypt
  - PostgreSQL

## Ao clonar este repositório instale as dependências necessárias:
  #### Para instalar as denpendências use o comando:
    yarn install
  #### Logo ao instalar as dependências, *LEMBRE* de criar um .env e mudar as variáveis de ambiente! 
  ##### Troque o user, password e a database para as configurações do PostgreSQL na DATABASE_URL:

    DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"

  #### Depois disso rode o migrate com o comando:
    yarn prisma migrate dev
   ##### Após rodar este comando a API vai estar configurada e pronta para rodar com:
    yarn start:dev
# Para acessar a documentação, após iniciar o servidor, possui a rota:
Nesta rota acessando pelo localhost:****/api terá acesso a documentação da api!
```
/api
````  
