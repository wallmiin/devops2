# Database configuration
from pathlib import Path
import os
BASE_DIR = Path(__file__).resolve().parent.parents
if os.environ.get('EC2_PRODUCTION'):   # when running on EC2
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'ecommerce-db-ops',
            'USER': 'postgres',
            'PASSWORD': 'nguyet1906',
            'HOST': 'ecommerce-db-ops.corayycki8kr.us-east-1.rds.amazonaws.com',
            'PORT': '5432',
        }
    }
else:
    # Development - SQLite
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
