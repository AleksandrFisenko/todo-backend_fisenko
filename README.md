## Installation

```bash
$ npm install
```

## Migration
```bash
$ set -a && source .env && set +a

$ npx sequelize-cli db:migrate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
