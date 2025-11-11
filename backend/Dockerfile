# Backend Dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install system deps if you need them
RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Flask typically listens on 5000
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=8000

CMD ["python", "app.py"]
