from fastapi import FastAPI
from routes.auth import router as auth_router

app = FastAPI(
    title="JMatch API"
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

@app.get("/")
def root():
    return {
        "message": "JMatch API is running"
    }