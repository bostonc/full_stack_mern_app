# Scheduling Platform Sample
### with React + TypeScript + Vite

A lightweight, full-stack application including client, server, and database to create a sample scheduling platform.

## 1. To Run Database
Note: This will start a small MongoDB instance locally. If you would prefer to use a cloud instance, find your database's URI string and replace the one in the `.env` file.

1. [Install mongo](https://www.mongodb.com/docs/v7.0/administration/install-community/)
2. Start mongo with `sudo systemctl start mongod`
3. Verify mongo is running with `sudo systemctl status mongod`

## 2. To Run Server

1. Clone repository
2. Ensure Node, nodemon, npm, and nvm are installed
3. From the project root, run `nvm use`
4. `cd` into `server` folder
5. Install packages with `npm i` (use `--no-bin-links` for wsl)
6. Start Mongo with `sudo service mongod start` or your system equivalent
7. In a separate terminal, run with `npm run dev` and visit http://127.0.0.1:3000/test to verify.

## 3. To Run Client

3. From the project root, run `nvm use`
4. `cd` into `client` folder
5. Install packages with `npm i` (use `--no-bin-links` for wsl)
6. Run with `npm run dev` and visit http://127.0.0.1:5173/ to see the page.

### Technical Notes

- An `.nvmrc` file is included for quick engine matching before installation.
- Symlinks don't work on WSL, so yarn will complain - hence the decision to use npm.
- Created with Vite because `create-react-app` is deprecated as of 2023.
- Bootstrap CSS/JS and SCSS support added for quick styling.

### Needed Improvements
- tbd
