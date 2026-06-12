from fastapi import FastAPI

app = FastAPI(
    title="JMatch API"
)

@app.get("/")
def root():
    return {"message": "JMatch API is running"}