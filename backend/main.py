"""API for contact database"""
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models
from db import SessionLocal

app = FastAPI()

# allows cross-origin requests from React
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Contact(BaseModel):
    """Contact model"""

    id: Optional[int] = None
    first_name: str
    last_name: str
    company: Optional[str] = None
    telephone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        """Pydantic config"""

        orm_mode = True


def get_db():
    """creates seperate sessions for each request"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/all-contacts", response_model=List[Contact], status_code=status.HTTP_200_OK)
def get_all_contacts(db: Session = Depends(get_db)):
    """READ: Get all contacts"""
    return db.query(models.Contact).all()


@app.get(
    "/get-contact/{contact_id}", response_model=Contact, status_code=status.HTTP_200_OK
)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    """READ: Get a contact by id"""
    return db.query(models.Contact).filter(models.Contact.id == contact_id).first()


@app.post(
    "/create-contact", response_model=Contact, status_code=status.HTTP_201_CREATED
)
def create_contact(contact: Contact, db: Session = Depends(get_db)):
    """CREATE: Create a new contact"""

    db_contact = (
        db.query(models.Contact)
        .filter(
            models.Contact.first_name == contact.first_name
            and models.Contact.last_name == contact.last_name
            and models.Contact.company == contact.company
            and models.Contact.telephone == contact.telephone
            and models.Contact.email == contact.email
            and models.Contact.address == contact.address
            and models.Contact.notes == contact.notes
        )
        .first()
    )

    if db_contact is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="🤨 Contact already exists"
        )

    new_contact = models.Contact(
        first_name=contact.first_name,
        last_name=contact.last_name,
        company=contact.company,
        telephone=contact.telephone,
        email=contact.email,
        address=contact.address,
        notes=contact.notes,
    )

    db.add(new_contact)
    db.commit()

    return new_contact


@app.patch(
    "/update-contact/{contact_id}",
    response_model=Contact,
    status_code=status.HTTP_200_OK,
)
def update_contact(contact_id: int, contact: Contact, db: Session = Depends(get_db)):
    """UPDATE: Update a contact"""
    contact_to_update = (
        db.query(models.Contact).filter(models.Contact.id == contact_id).first()
    )

    contact_to_update.first_name = contact.first_name
    contact_to_update.last_name = contact.last_name
    contact_to_update.company = contact.company
    contact_to_update.telephone = contact.telephone
    contact_to_update.email = contact.email
    contact_to_update.address = contact.address
    contact_to_update.notes = contact.notes

    db.commit()

    return contact_to_update


@app.delete("/delete-contact/{contact_id}")
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    """DELETE: Delete a contact"""
    contact_to_delete = (
        db.query(models.Contact).filter(models.Contact.id == contact_id).first()
    )

    if contact_to_delete is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="✋ Contact does not exsist"
        )

    db.delete(contact_to_delete)
    db.commit()

    return {"message": "👌 Contact deleted"}
