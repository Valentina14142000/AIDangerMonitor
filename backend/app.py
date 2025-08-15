from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.routes.auth import router as auth_router
from app.routes.records import router as records_router
from app.routes.maps import router as maps_router
from app.routes.predict import router as predict_router
from app.routes.route_suggestion import router as route_router
from app.models.database import Base, engine
from dotenv import load_dotenv
from collections import defaultdict
import logging
import time
import os

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ---------------------- Rate Limiting Middleware ----------------------

class RateLimiterMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, max_requests=5, window=60):
        super().__init__(app)
        self.max_requests = max_requests
        self.window = window
        self.users_requests = defaultdict(list)

    async def dispatch(self, request: Request, call_next):
        user = request.headers.get("Authorization", "anonymous")
        now = time.time()
        self.users_requests[user] = [t for t in self.users_requests[user] if now - t < self.window]

        if len(self.users_requests[user]) >= self.max_requests:
            return JSONResponse(status_code=429, content={"detail": "Too Many Requests"})

        self.users_requests[user].append(now)
        return await call_next(request)

# ---------------------- FastAPI App Setup ----------------------

app = FastAPI(title="AI Danger Monitor")

# Set allowed origins from .env or fallback to localhost
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

# Add middlewares
app.add_middleware(RateLimiterMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB schema
logger.info("Creating DB schema...")
Base.metadata.create_all(bind=engine)

# Include Routers
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(records_router, prefix="/api", tags=["Crime Records"])
app.include_router(maps_router, prefix="/api", tags=["Maps"])
app.include_router(predict_router, prefix="/api", tags=["Prediction"])
app.include_router(route_router, prefix="/api", tags=["Route Suggestion"])

@app.get("/")
def root():
    return {"message": "Welcome to AIDangerMonitor API"}
