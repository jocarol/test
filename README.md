# Test technique Vue.js / Nuxt.js / Nest.js
## Setup Postgers & Docker:
Pull la derniere image de PostgreSQL sur serveur Alpine :
```docker pull postgres:alpine```

Run l'image téléchargée :
```docker run --name postrgres-0 -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:alpine```

Spawn un shell
```docker exec -it postrgres-0 bash```

Se connecter à l'instance PostgreSQl
```psql -d postgres -U postgres```

Y entrer les commandes suivantes :
```CREATE DATABASE test;```

```\c test;```

Puis :

  CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(500) NOT NULL,
  phone VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL
);

## Setup le front
Se rendre dans le dossier testVue et entrer 'yarn install' puis 'yarn dev'

## Setup le back
Se rendre dans le dossier srv et entrer 'yarn install' puis 'yarn run start:dev'

## Créer un user
Faire une requête à l'URL : http://localhost:8000/api/register avec en body (raw / json) les informations requises.
Exemple : 

{
    "name": "Admin",
    "email": "admin@charon.com",
    "password": "password",
    "phone": "654654654"
}

## Run
Se rendre à localhost:3000 et se logger avec le couple email:password que vous venez de créer 
