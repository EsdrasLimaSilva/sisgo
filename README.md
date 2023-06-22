# Sisgo

## Objetivo

Fornecer uma plataforma completa mas simples de produção de conteúdo. É possível criar, editar, atualizar e excluir posts diretamente da seção de administrador do projeto.

## Principais tecnologias

-   Nextjs 13
-   Typescript
-   MongoDB

## Requisitos para rodar

-   É necessário possuir uma conta ativa e uma coleção ativa no mongo db Atlas;
-   É preciso possuir um banco de dados dentro do Atlas com duas coleções, uma para posts, e outra para administradores (usuários);

## Como rodar

Para rodar, adicione no Atlas em Security >> Network Access >> Add ip addresses seu endeço Ip na forma xxx.xxx.xxx.0/24. (substitua as letras x pelo seu IP);

clone este repositório, instale as dependências e siga os passos abaixo.

Para clonar basta utilizar o comando abaixo (método via ssh)

```
git clone git@github.com:EsdrasLimaSilva/sisgo.git
```

Para instalar as dependências:

```
npm install
```

Copie as informações do banco de dados e adicione as seguintes variáveis de ambient (.env.local)

-   MONGO_DB_USER
-   MONGO_DB_PASSWORD
-   MONGO_URI (não confundir URI com URL)

Como este projeto utiliza next-auth para autenticação, adicione as seguintes variáveis de ambiente:

-   NEXTAUTH_SECRET (você pode gerá-lo da forma que quiser)
-   NEXTAUTH_URL(para localhost na porta 3000)

Por fim basta rodar o seguinte comando e abrir o navegador em localhos:3000

```
npm run dev
```

## Observações

Você é livre para alterar o nome e a aparência deste projeto da forma que desejar.
