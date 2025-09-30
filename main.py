from fastapi import FastAPI, Depends, HTTPException, status, Security
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from database import SessionLocal, engine, Base
from models import User, Tweet
from schemas import UserCreate, UserLogin, TweetCreate, ListTweets, TweetUpdate
from jose import jwt, JWTError
from typing import List

from datetime import datetime, timedelta

# Esta linha vai criar o banco de dados e as tabelas
# caso eles ainda não existam.
Base.metadata.create_all(bind=engine)

app = FastAPI()

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")
SECRET_KEY = "sua_chave_secreta_aqui" # Mude isso por uma chave segura!
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_current_user(token: str = Security(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciais de autenticação inválidas.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise credentials_exception
        return user
    except JWTError:
        raise credentials_exception

@app.get("/")
def read_root():
    return {"Olá": "Mundo"}

@app.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Nome de usuário já existe."
        )

    hashed_password = pwd_context.hash(user.password)
    new_user = User(username=user.username, password=hashed_password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuário registrado com sucesso!"}

@app.post("/login")
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user_login.username).first()

    if not db_user or not verify_password(user_login.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos."
        )

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/tweets", status_code=status.HTTP_201_CREATED)
def create_tweet(tweet: TweetCreate, current_user: User = Security(get_current_user), db: Session = Depends(get_db)):
    db_tweet = Tweet(text=tweet.text, author_id=current_user.id)
    db.add(db_tweet)
    db.commit()
    db.refresh(db_tweet)
    return {"message": "Tweet enviado com sucesso!"}

@app.get("/tweets", response_model=List[ListTweets])
def list_tweets(db: Session = Depends(get_db)):
    all_tweets = db.query(Tweet).all()
    return all_tweets

@app.get("/tweets/{tweet_id}", response_model=ListTweets)
def get_tweet(tweet_id: int, db: Session = Depends(get_db)):
    db_tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
    if db_tweet is None:
        raise HTTPException(status_code=404, detail="Tweet não encontrado")
    return db_tweet

@app.put("/tweets/{tweet_id}")
def update_tweet(tweet_id: int, tweet_update: TweetUpdate, current_user: User = Security(get_current_user), db: Session = Depends(get_db)):
    db_tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
    if db_tweet is None:
        raise HTTPException(status_code=404, detail="Tweet não encontrado")
    
    if db_tweet.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Você não tem permissão para atualizar este tweet.")

    db_tweet.text = tweet_update.text
    db.commit()
    return {"message": "Tweet atualizado com sucesso!"}

@app.delete("/tweets/{tweet_id}", status_code=status.HTTP_200_OK)
def delete_tweet(tweet_id: int, current_user: User = Security(get_current_user), db: Session = Depends(get_db)):
    db_tweet = db.query(Tweet).filter(Tweet.id == tweet_id).first()
    if db_tweet is None:
        raise HTTPException(status_code=404, detail="Tweet não encontrado")

    if db_tweet.author_id != current_user.id:
        raise HTTPException(status_code=403, detail="Você não tem permissão para excluir este tweet.")

    db.delete(db_tweet)
    db.commit()
    return {"message": "Tweet excluído com sucesso!"}