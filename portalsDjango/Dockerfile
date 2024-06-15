# Use the official Python image from the Docker Hub
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

RUN python manage.py migrate

EXPOSE 4001

CMD ["daphne", "portalsDjango.asgi:application", "--host", "0.0.0.0", "--port", "4001"]
