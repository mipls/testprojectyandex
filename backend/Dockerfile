FROM python:3.11-slim

WORKDIR /app

# Устанавливаем зависимости
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь код
COPY backend/ .

# Собираем статику
RUN python manage.py collectstatic --noinput

# Запускаем сервер
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]