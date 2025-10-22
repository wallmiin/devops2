# Docker Setup for E-commerce Django-React Project

This project includes Docker configuration for both development and production environments.

## Files Created

- `Dockerfile.backend` - Dockerfile for Django backend
- `frontend/Dockerfile` - Dockerfile for React frontend
- `frontend/nginx.conf` - Nginx configuration for frontend
- `docker-compose.yml` - Production Docker Compose
- `docker-compose.dev.yml` - Development Docker Compose
- `.dockerignore` - Docker ignore file for backend
- `frontend/.dockerignore` - Docker ignore file for frontend

## Quick Start

### Production Environment

1. Build and run all services:
```bash
docker-compose up --build
```

2. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:5432

### Development Environment

1. Run development environment:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

2. Access the application:
- Frontend: http://localhost:3000 (with hot reload)
- Backend API: http://localhost:8000 (with Django dev server)
- Database: localhost:5432

## Services

### Backend (Django)
- **Port**: 8000
- **Database**: PostgreSQL
- **Features**: 
  - Automatic migrations
  - Static files collection
  - Gunicorn server (production) / Django dev server (development)

### Frontend (React)
- **Port**: 3000 (dev) / 80 (production)
- **Features**:
  - Hot reload in development
  - Nginx server in production
  - React Router support

### Database (PostgreSQL)
- **Port**: 5432
- **Database**: ecommerce_db
- **User**: postgres
- **Password**: postgres

### Redis (Optional)
- **Port**: 6379
- **Purpose**: Caching and session storage

## Environment Variables

The application uses the following environment variables:

- `DEBUG`: Set to 0 for production, 1 for development
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Django secret key (set in settings.py)

## Database Setup

The database will be automatically created and migrations will run on first startup.

## Static Files

Static files are automatically collected and served by the backend service.

## Media Files

Media files are mounted as volumes and persist between container restarts.

## Useful Commands

### Build and start services:
```bash
docker-compose up --build
```

### Run in background:
```bash
docker-compose up -d
```

### Stop services:
```bash
docker-compose down
```

### View logs:
```bash
docker-compose logs -f [service_name]
```

### Access backend shell:
```bash
docker-compose exec backend python manage.py shell
```

### Run Django commands:
```bash
docker-compose exec backend python manage.py [command]
```

### Rebuild specific service:
```bash
docker-compose build [service_name]
```

## Troubleshooting

1. **Port conflicts**: Make sure ports 3000, 8000, and 5432 are not in use
2. **Database connection**: Wait for the database to be ready before starting the backend
3. **Static files**: Run `docker-compose exec backend python manage.py collectstatic` if needed
4. **Permissions**: Ensure proper file permissions for media and static directories

## Production Considerations

1. Change default database credentials
2. Set proper SECRET_KEY
3. Configure proper ALLOWED_HOSTS
4. Use environment variables for sensitive data
5. Set up proper logging
6. Configure SSL/TLS certificates
7. Set up monitoring and health checks
