# Setting up a Empty Typescript backend project with express.

### install pnpm if not already installed:
- `npm install -g pnpm@latest` or follow the [guide.](https://pnpm.io/installation).

### initialize the git repo:
- `git init` - initialize a empty git repo.
- create the `.gitignore` file.
- In the `.gitignore` file add the following lines:

```.gitignore
dist
build
*/node_modules
*/.env
```
- create a `src` folder and create a file `index.ts` in it.
- `git add .` followed by `git commit -m "initial commit"` - adds the initial commit.

### Now lets add Typescript to the project
- `pnpm init` - creates the package.json file.
- `pnpm i` or `pnpm install` - installs the dependecies (currently none).
- `pnpm add -D typescript@latest` - adds typescript as dev dependency.
- `pnpm exec tsc --init` - creates the tsconfig.json file.
- Add the following configs to the tsconfig.json.
  - `"module": "NodeNext"`
  - find and uncomment `"rootDir": "./"` and set it to `"rootDir": "./src"`
  - similarly `"outDir": "./"` to `"outDir": "./dist"` and 
  - `"sourceMap": true`.

### Now lets add express
- `pnpm i express dotenv`
- `pnpm i -D @types/express @types/node`
- add the following lines of code in `src/index.ts` file
```typescript
import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is up at http://localhost:${PORT}`);
});
```
- this works just fine but everytime you make a change you manually rebuild and restart the server. so lets next add and configure `nodemon`. to rebuild and restart the server automatically on any change.

### add and configure nodemon:
- `pnpm i -D nodemon`
- in the `package.json` file add the following in the scripts section.
  - `"build": "tsc -b"`
  - `"start": "node ./dist/index.ts"`
  - `"dev": "nodemon src/index.ts"`
- run `pnpm dev` to run the dev server using nodemon.

### setting up local postgresql using docker
- `docker pull postgres@latest` 
```bash
docker run --name posgres-db-name \
  -d \
  -p 5432:5432 \
  -v postgres-volume-name:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=postgres-password \
  postgres
```
- or run `docker run --name postgres-db-name -d -p 5432:5432 -e POSTGRES_PASSWORD=<pg-password> -v pg-volume-name:/var/lib/postgresql/data/ postgres`
<br>
- you can connect to this instance using `psql` or `pgadmin` gui.
<br>
- first lets connect using the `psql` using the command:
- `docker exec -it pg-db-name psql -U postgres`
<br>
- to connect using the `pgadmin` gui docker image run the following commands
- `docker pull dpage/pgadmin4`
- follwed by `docker run --name pgadmin -d -p 5050:80 -e PGADMIN_DEFAULT_EMAIL=user@email.com -e PGADMIN_DEFAULT_PASSWORD=<your-password> dpage/pgadmin4`
or 
```bash
docker run --name pgadmin \
  -d \
  -p 5050:80 \
  -e PGADMIN_DEFAULT_EMAIL=user@email.com \
  -e PGADMIN_DEFAULT_PASSWORD=<your-password> \
  dpage/pgadmin4
```
- go to http://localhost:5050 on your browser and login with your pgadmin credentials just set above.
- to connect to the postgres instance click on `add server`
- give a name of your choice to the server
- in the conncetions tab in the hostname/address field put `host.docker.internal` so that it can access the pg-instance running in your machine which is outside the docker container of pgadmin.
- enter `username` as postgres and your postgres password and click `confirm` to connect. 

### now add prisma orm