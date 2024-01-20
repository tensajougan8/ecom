# E-commerce API
Prequites 
- Mongo 
- Node v20
- Docker(optional)

## Doc
Use the swagger yaml file for endpoint testing, it contains all the requests to be sent to each endpoints. You can import it in Postman/Insomia or directly use the swagger extension in the vs code and run it.

## Running the app

```bash
# Mongo on docker
$ docker compose up

# Install dependcies
$ npm i

# Build project
$ npm run build

# Start server
$ npm run start
