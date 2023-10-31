from sqlalchemy import Column, TEXT, INTEGER , LargeBinary 
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Test(Base):
    __tablename__ = "image"

    id = Column(INTEGER, nullable=False, autoincrement=True, primary_key=True)
    result = Column(TEXT, nullable=False)
    img = Column(LargeBinary, nullable=False)

class User(Base):
  __tablename__ = "Users"

  id = Column(INTEGER, primary_key=True)
  username = Column(TEXT, unique=True, nullable=False)
  password = Column(TEXT, nullable=False)
  email = Column(TEXT, unique=True, nullable= False)


