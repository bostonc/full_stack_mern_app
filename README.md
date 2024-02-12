# Scheduling Platform Sample
### with React + TypeScript + Vite + MongoDB
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
- Sacrificed appearance for functionality in prototype. Minimal time spent on styling.
- Opted for editable table values rather than a separate editor for the sake of development speed.
- Did getSlots filtering by coach and date on client rather than db because of dev time constraints.

### Needed Improvements
- Add support for user sign-in and authentication.
- Containerize entire application for ease of deployment.
- Fix styling in general. Make everything more aesthetically appealing and intuitive.
- Add ability to sort schedule results by table header criteria.
- Infer end times from start time and duration to display in schedule table.
- Add lazy loading and pagination for schedule with large results
- Format dates to not be ugly ISO format
- Add useEffect hooks to automatically refetch slots when one is updated.
- Add a slot editor page that allows a clean, central place to adjust and save slot values
- Add ability for users to filter their schedules by selected date windows, coaches, and students.
- Include ability to filter db queries by coach and period (past/future), so that doesn't have to be done on the client. This will reduce the size of the package that needs to be sent from the server to the client.
- Add automated unit tests with jest
- Add confirmation dialogue warnings before important actions
- Add indexing to MongoDB for commonly searched fields
- Consolidate & elevate duplicated code, particularly scss classes and duplicated components
