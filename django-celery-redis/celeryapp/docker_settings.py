import os

ALLOWED_HOSTS = ['*']

REDIS_URL = os.environ.get('REDIS_URL', 'redis://redis:6379/0')
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'appdb'),
        'USER': os.environ.get('POSTGRES_USER', 'appuser'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', 'apppass'),
        'HOST': os.environ.get('POSTGRES_HOST', 'db'),
        'PORT': os.environ.get('POSTGRES_PORT', '5432'),
    }
}