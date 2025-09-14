FROM --platform=linux/amd64 python:3.12-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY . .

EXPOSE 8000

# Run the FastAPI app with Uvicorn
CMD ["uvicorn", "server.app:app", "--host", "0.0.0.0", "--port", "8000"]
