# The Back End

![FastAPI](https://img.shields.io/badge/fastapi-009688.svg?&style=for-the-badge&logo=fastapi&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-003B57.svg?&style=for-the-badge&logo=sqlite&logoColor=white)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg?style=for-the-badge)](https://github.com/psf/black)

An CRUD contact API built on Fast API with a SQLite database using SQLAlchemy.

## Run Locally 💻

Go to the project directory

```bash
> contact_fastapi/backend
```

Install dependencies

```bash
> pipenv install
```

Start the virtual enviroment

```bash
> pipenv shell
```

Create the databse

This will give you an sqlite database consisting of 10 enteries

```bash
> python create_db.py
```

Start the server

```bash
> uvicorn main:app --reload
```

This will start the server so you can test the API at `localhost:8000`

## Documentation 📚

Documentation will be located at `localhost:8000/redocs` once the server is up and running. But for when it's not here is a breif overview.

### CREATE :unicorn:

The `CREATE` endpoint will allow you to send JSON creating a new contact

```bash
localhost:8000/create-contact
```

Sending `JSON` in the message body like so below will create a new conact:

```json
{
  "first_name": "Frank",
  "last_name": "Flintstone",
  "company": "Slate Rock and Gravel Company",
  "tel": "210-555-1212",
  "email": "frank.flintstone@srgc.com",
  "address": "1 Yabba-Dabba-Doo, Bedrock, TX 12345"
}
```

### READ 🤓

There are two `READ` endpoints they are:

```bash
localhost:8000/all-contacts
```

This will return all the current contacts within the database

```bash
localhost:8000/get-contact/{contact_id}
```

This will return a contact by its `ID`

### UPDATE ⤴️

The `UPDATE` endpoint is similar to the create endpoint. This allows you to change contact information by `contact_id`

```bash
localhost:8000/update-contact/{contact_id}
```

```json
{
  "first_name": "Wilma",
  "last_name": "Flintstone",
  "company": "NULL",
  "tel": "210-555-6969",
  "email": "Wilma.flintstone@gmail.com",
  "address": "1 Yabba-Dabba-Doo, Bedrock, TX 12345"
}
```

### DELETE ❎

The `DELETE` endpoint allows you to delete a contact entry via it's ID

```bash
localhost:8000/delete-contact/{contact_id}
```

## Acknowledgements

- [Create A REST API with FastAPI, SQLAlchemy](https://youtu.be/2g1ZjA6zHRo)
