# Scheduling Platform Sample
### with React + TypeScript + Vite

A lightweight, full-stack application including client, server, and database to create a sample scheduling platform.

## To Run Client

1. Clone repository
2. Ensure Node, npm, and nvm are installed
3. From the project root, run `nvm use`
4. `cd` into `client` folder
5. Install packages with `npm i` (use `--no-bin-links` for wsl)
6. Run with `npm run dev` and visit http://127.0.0.1:5173/ to see the page.

## To Run Server

1. Clone repository
2. Ensure Node, npm, and nvm are installed
3. From the project root, run `nvm use`
4. `cd` into `server` folder
5. Install packages with `npm i` (use `--no-bin-links` for wsl)
6. Run with `npm run dev` and visit http://127.0.0.1:3000/ to see the page.

## To Run Database

1. TBD

## Technical Notes

- An `.nvmrc` file is included for quick engine matching before installation.
- Symlinks don't work on WSL, so yarn will complain - hence the decision to use npm.
- Created with Vite because `create-react-app` is deprecated as of 2023.
- Bootstrap CSS/JS and SCSS support added for quick styling.

## Needed Improvements
- tbd