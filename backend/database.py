from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from models import Base

DB_URL = 'sqlite:///sql.db'

class engineconn:

    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle = 500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    def connection(self):
        conn = self.engine.connect()
        return conn
    
# engineconn 인스턴스 생성
engine_connection = engineconn()

# 테이블 생성
Base.metadata.create_all(engine_connection.engine)  # 테이블이 존재하지 않으면 생성
print("Database schema created successfully!")