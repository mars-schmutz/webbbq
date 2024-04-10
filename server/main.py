from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

updates: list[dict[str, str]] = []

@app.post("/bbbq", status_code = 201)
async def update_status(message: dict) -> None:
    updates.append(message)

@app.get("/teacher")
async def update_teacher() -> dict:
    return {
        "updates": updates
    }
