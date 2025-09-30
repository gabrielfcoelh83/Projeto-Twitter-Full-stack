from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class TweetCreate(BaseModel):
    text: str
    
class ListTweets(BaseModel):
    id: int
    text: str
    author_id: int

    class Config:
        orm_mode = True
        
class TweetUpdate(BaseModel):
    text: str