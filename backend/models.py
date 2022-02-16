""" model set up"""
from sqlalchemy import Column, Integer, String, Text

from db import Base


class Contact(Base):
    """Contact model"""

    __tablename__ = "contacts"
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True, default="NULL")
    telephone = Column(String(255), nullable=True, default="NULL")
    email = Column(String(255), nullable=True, default="NULL")
    address = Column(Text, nullable=True, default="NULL")
    notes = Column(Text, nullable=True, default="NULL")

    def __repr__(self):
        return f"<Contact first_name={self.first_name}, last_name={self.last_name}, company={self.company}, tel={self.telephone}, email={self.email}, address={self.address}, notes={self.address}>"
