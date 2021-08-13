# Test technique Vue.js / Nuxt.js / Nest.js
## Setup Postgers & Docker:
Pull la derniere image de PostgreSQL sur serveur Alpine :
```docker pull postgres:alpine```

Run l'image téléchargée :
```docker run --name postrgres-0 -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres:alpine```

Spawn un shell
```docker exec -it postrgres-0 bash```

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

```INSERT INTO users VALUES ('Admin', 'admin@charon.com', '07.86.66.44.12', '$2b$12$xGFoK6.B8RL4AzZNF0.z3O.FvSjYMkSfsNjXxH8BgchRFv/OF9vLy');```

## Setup le front
Se rendre dans le dossier testVue et entrer 'yarn install' puis 'yarn run start:dev'

## Setup le back
Se rendre dans le dossier srv et entrer 'yarn install' puis 'yarn run start:dev'


## Run
Se rendre à localhost:3000/
Renseigner le couple admin:password
