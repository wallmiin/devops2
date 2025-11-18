from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'your-secret-key-here'
DEBUG = int(os.environ.get("DEBUG", 0)) == 1

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'corsheaders',

    'base',  # app product/user
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'   # <- QUAN TRỌNG, LỖI CỦA EM LÀ THIẾU DÒNG NÀY

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# -----------------------
# DATABASE CONFIG
# -----------------------
if os.environ.get('EC2_PRODUCTION') == "1":
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'ecommerce-db-ops',
            'USER': 'postgres',
            'PASSWORD': 'nguyet1906',    # pass RDS
            'HOST': 'ecommerce-db-ops.corayycki8kr.us-east-1.rds.amazonaws.com',
            'PORT': '5432',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# -----------------------
# STATIC & MEDIA
# -----------------------
STATIC_URL = '/static/'
STATIC_ROOT = '/app/staticfiles'

MEDIA_URL = '/media/'
MEDIA_ROOT = '/app/media'


# -----------------------
# PASSWORD VALIDATION
# -----------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
]


# -----------------------
# INTERNATIONALIZATION
# -----------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# -----------------------
# CORS
# -----------------------
CORS_ALLOW_ALL_ORIGINS = True


# -----------------------
# DEFAULT PRIMARY KEY
# -----------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'