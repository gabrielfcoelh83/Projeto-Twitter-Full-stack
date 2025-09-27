from sqlalchemy import create_engine 

from sqlalchemy.orm import sessionmaker, declarative_base 
SQLALCHEMY_DATABASE_URL = "sqlite:///./twitter.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def create_tables():
    Base.metadata.create_all(bind=engine)

# "esqueleto" de conexão.
# O `engine` vai gerenciar a conexão real com o banco de dados.
# O `SessionLocal` vai ser o que a gente usa para falar com o banco de dados.
# E o `Base` é a base para as nossas classes de modelos.