import os
from flask import Flask, render_template
import redis

app = Flask(__name__)

# Connect to Redis (hostname comes from the environment, not hardcoded)
r = redis.Redis(
    host=os.environ.get("REDIS_HOST", "redis"),
    port=int(os.environ.get("REDIS_PORT", "6379")),
    db=0,
    decode_responses=True
)

COUNTER_KEY_NAME = "mycounter"

@app.route("/health")
def health():
    return "OK", 200

@app.route("/incr")
def incr():
    count = r.incrby(COUNTER_KEY_NAME, 1)
    return {"count": count}

@app.route("/reset")
def reset():
    r.delete(COUNTER_KEY_NAME)
    return {"count": 0}

@app.route("/")
def home():
    # Page-view counter: +1 on every visit to the home page
    count = r.incr(COUNTER_KEY_NAME)
    return render_template("homepage.html", count=count)