from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from starlette.requests import Request
import os

app = FastAPI()

# CORS: 允许前端访问
origins = [
    "http://localhost:3000",  # Vite 默认端口
    "http://localhost:4040",  # Auth0 示例端口
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "ok"}

# Auth0 配置
AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
AUTH0_AUDIENCE = os.getenv("AUTH0_AUDIENCE")
ALGORITHMS = ["RS256"]

http_bearer = HTTPBearer()

def get_public_key():
    # 获取 Auth0 公钥（只需缓存一次）
    from urllib.request import urlopen
    import json
    jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    with urlopen(jwks_url) as response:
        jwks = json.loads(response.read())
    return jwks

JWKS = None

def verify_jwt(token: str):
    global JWKS
    if JWKS is None:
        JWKS = get_public_key()
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    for key in JWKS["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
    if not rsa_key:
        raise HTTPException(status_code=401, detail="Invalid header: no matching JWK")
    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=AUTH0_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Invalid token")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(http_bearer)):
    token = credentials.credentials
    return verify_jwt(token)

@app.get("/api/protected")
def protected(user=Depends(get_current_user)):
    return {"msg": "This is a protected API", "user": user}

# TODO: 数据库连接、更多业务 API
