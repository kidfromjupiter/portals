# Use the official Python image from the Docker Hub
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

RUN python manage.py migrate --settings=portalsDjango.settings.dev

EXPOSE 4001

CMD ["daphne", "portalsDjango.asgi:application", "-b", "0.0.0.0", "-p", "4001"]
