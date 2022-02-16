# The Front End

![React](https://img.shields.io/badge/react-35495e.svg?&style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-gray.svg?&style=for-the-badge&logo=tailwindcss&logoColor=06B6D4)
![Prettier](https://img.shields.io/badge/prettier-F7B93E.svg?&style=for-the-badge&logo=prettier&logoColor=white)

This is a React Front End to harness the FastAPI of the backend, and display its data. The front end also allows for user intereaction, enabling the user to create / delete and edit contact entries.

## Run Locally 💻

After cloning the whole repo to where ever you have chosen to do so. You will need to enter the directory of the front end like so:

```bash
> contact_fastapi/frontend
```

Install dependencies

```bash
> npm install
```

Once you're in the front end director run the following

```bash
> npm run start
```

This will load up the front end of this application, if you have loaded the front end before the back end you should just see an empty table.

**IF** you have loaded the backend first you should see the data from `contact_fastapi/backend/contacts.db` loaded up in the browser.
