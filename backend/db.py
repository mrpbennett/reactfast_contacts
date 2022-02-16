""" database set up"""
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

engine = create_engine(
    "sqlite:///contacts.db",
    echo=True,
)

# declarative base class
Base = declarative_base()

Session = sessionmaker(bind=engine)
