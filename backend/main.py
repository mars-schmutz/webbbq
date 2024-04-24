from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import hashlib


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

PASSWD = "c963ca56d7ee4d9ef16e856f2d47cb148acc9618d6c401eccb391bdea0dd8dd2"

updates: list[dict[str, str]] = []

def passwd_check(pwd):
    bytestr = pwd.encode("utf-8")
    hashed = hashlib.sha256(bytestr).hexdigest()
    return hashed

@app.post("/bbbq", status_code = 201)
async def update_status(message: dict) -> None:
    updates.append(message)

@app.get("/teacher")
async def update_teacher(req: Request) -> dict:
    header = "X-TotallySecure"
    if header not in req.headers or passwd_check(req.headers[header]) != PASSWD:
        raise HTTPException(status_code = 401, detail = "Unauthorized")
    return {
        "updates": updates
    }

@app.post("/reset", status_code = 200)
async def clear_updates(req: Request) -> None:
    header = "X-TotallySecure"
    if header not in req.headers or passwd_check(req.headers[header]) != PASSWD:
        raise HTTPException(status_code = 401, detail = "Unauthorized")
    updates.clear()
