# Развертывание проекта Silentium Education в продакшене с Podman

Этот документ описывает процесс развертывания full-stack приложения Silentium Education в продакшене с использованием Podman.

## Предварительные требования

- Linux система с установленным Podman (рекомендуется Podman 4.0+)
- Docker Compose plugin для Podman (или podman-compose)
- Git для клонирования репозитория
- Минимум 2GB RAM и 10GB дискового пространства

## Установка Podman

### На Ubuntu/Debian:
```bash
sudo apt update
sudo apt install podman docker-compose-plugin
```

### На CentOS/RHEL/Fedora:
```bash
sudo dnf install podman podman-docker docker-compose
```

### На Arch Linux:
```bash
sudo pacman -S podman docker-compose
```

## Шаги развертывания

### 1. Клонирование репозитория

```bash
git clone https://github.com/silentium-lab/silentium-education.git
cd silentium-education
```

### 2. Настройка переменных окружения

Скопируйте пример файла переменных окружения и настройте его:

```bash
cp .env.example .env
```

Отредактируйте `.env` файл с вашими настройками:

```bash
# MongoDB Configuration
MONGO_ROOT_USERNAME=your_admin_username
MONGO_ROOT_PASSWORD=your_secure_password
MONGO_DATABASE=silentium

# Application Ports
BACKEND_PORT=4000
FRONTEND_PORT=80
```

**Важно:** Используйте сильные пароли для MongoDB!

### 3. Сборка и запуск контейнеров

Для продакшен развертывания используйте `docker-compose.prod.yaml`:

```bash
# Сборка образов
podman-compose -f docker-compose.prod.yaml build

# Запуск сервисов
podman-compose -f docker-compose.prod.yaml up -d
```

Или с Docker Compose plugin:

```bash
docker compose -f docker-compose.prod.yaml build
docker compose -f docker-compose.prod.yaml up -d
```

### 4. Проверка развертывания

Проверьте статус контейнеров:

```bash
podman-compose -f docker-compose.prod.yaml ps
```

Или:

```bash
docker compose -f docker-compose.prod.yaml ps
```

Проверьте логи:

```bash
podman-compose -f docker-compose.prod.yaml logs -f
```

### 5. Проверка доступности приложения

- Frontend: http://your-server-ip
- Backend API: http://your-server-ip:4000
- Health check: http://your-server-ip:4000/health

## Управление развертыванием

### Остановка сервисов

```bash
podman-compose -f docker-compose.prod.yaml down
```

### Перезапуск сервисов

```bash
podman-compose -f docker-compose.prod.yaml restart
```

### Просмотр логов

```bash
# Все сервисы
podman-compose -f docker-compose.prod.yaml logs -f

# Конкретный сервис
podman-compose -f docker-compose.prod.yaml logs -f backend
```

### Обновление приложения

```bash
# Остановить сервисы
podman-compose -f docker-compose.prod.yaml down

# Получить обновления
git pull

# Пересобрать образы
podman-compose -f docker-compose.prod.yaml build --no-cache

# Запустить
podman-compose -f docker-compose.prod.yaml up -d
```

## Конфигурация

### Переменные окружения

| Переменная | Описание | Значение по умолчанию |
|------------|----------|----------------------|
| MONGO_ROOT_USERNAME | Имя пользователя MongoDB | admin |
| MONGO_ROOT_PASSWORD | Пароль пользователя MongoDB | password |
| MONGO_DATABASE | Имя базы данных | silentium |
| BACKEND_PORT | Порт бэкенда | 4000 |
| FRONTEND_PORT | Порт фронтенда | 80 |

### Порты

- **Frontend (Nginx)**: 80 (HTTP)
- **Backend (Node.js)**: 4000 (HTTP)
- **MongoDB**: Не экспортируется наружу для безопасности

### Volumes

- `mongodb_data`: Хранит данные MongoDB

## Безопасность

- MongoDB не экспортирует порт наружу
- Backend и Frontend работают под non-root пользователями
- Используйте сильные пароли для MongoDB
- Регулярно обновляйте образы контейнеров

## Мониторинг

### Health Checks

- Backend имеет встроенный health check endpoint `/health`
- Контейнеры автоматически перезапускаются при сбоях

### Ресурсы

Проверьте использование ресурсов:

```bash
podman stats
```

## Troubleshooting

### Проблемы с портами

Если порты заняты, измените их в `.env` файле:

```bash
BACKEND_PORT=4001
FRONTEND_PORT=8080
```

### Проблемы с MongoDB

Проверьте логи MongoDB:

```bash
podman-compose -f docker-compose.prod.yaml logs mongodb
```

### Очистка

Для полной очистки:

```bash
# Остановить и удалить контейнеры
podman-compose -f docker-compose.prod.yaml down -v

# Удалить образы
podman rmi silentium-backend-prod silentium-frontend-prod
```

## Производительность

Для оптимизации производительности:

1. Увеличьте ресурсы контейнеров при необходимости
2. Настройте nginx для статических файлов
3. Рассмотрите использование external MongoDB для высокой нагрузки
4. Внедрите reverse proxy (nginx, traefik) для SSL и балансировки

## Поддержка

При проблемах проверьте:
- Логи контейнеров
- Статус health checks
- Использование ресурсов
- Конфигурацию переменных окружения
