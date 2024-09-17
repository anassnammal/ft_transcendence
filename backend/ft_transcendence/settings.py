"""
Django settings for ft_transcendence project.

Generated by 'django-admin startproject' using Django 5.0.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os  # new
from datetime import timedelta  # new
from .fetchSec import fetchSec

# fetch secrets from vault
get_secret, err = fetchSec('root')
if err:
    raise err


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_secret('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

SERVER_HOST = get_secret('SERVER_HOST')
ALLOWED_HOSTS = [SERVER_HOST, 'localhost', '127.0.0.1']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'rest_framework',
    'daphne',  # new
    'django.contrib.staticfiles',
    # newly added
    'authentication',
    'friends',
    'channels',
    'chat_app',
    'game',
    'rest_framework_simplejwt.token_blacklist',
    # 2FA
    'pyotp',
    'qrcode',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'ft_transcendence.middleware.RemoveTrailingSlashMiddleware',  # new
]

ROOT_URLCONF = 'ft_transcendence.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',

        'DIRS': [
            os.path.join(BASE_DIR, 'frontend'),
        ],
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

WSGI_APPLICATION = 'ft_transcendence.wsgi.application'
ASGI_APPLICATION = 'ft_transcendence.asgi.application'  # new

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": get_secret('POSTGRES_NAME'),
        "USER": get_secret('POSTGRES_USER'),
        "PASSWORD": get_secret('POSTGRES_PASSWORD'),
        "HOST": get_secret('POSTGRES_HOST'),
        "PORT": get_secret('POSTGRES_PORT'),

    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'authentication.auth_validator.NoSpacesValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        "OPTIONS": {
            "min_length": 3,
        },
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/
STATIC_URL = '/static/'


# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}

# authentication
AUTH_USER_MODEL = 'authentication.User'  # new

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'authentication.customJWTAuthentication.CustomJWTAuthentication',
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
}
# end of authentication


# Cors
INSTALLED_APPS += ['corsheaders']
MIDDLEWARE += ['corsheaders.middleware.CorsMiddleware']
CORS_ORIGIN_WHITELIST = [
    f'http://{SERVER_HOST}:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
]

CORS_ALLOW_CREDENTIALS = True
# CORS_ORIGIN_ALLOW_ALL = True

# for live reload in development
if DEBUG:
    INSTALLED_APPS += ['livereload']
    MIDDLEWARE += ['livereload.middleware.LiveReloadScript']

# image upload
# Actual directory user files go to
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# URL used to access the media
MEDIA_URL = '/'

SERVER_URL = f'https://{SERVER_HOST}'
print('======================================', SERVER_URL)
# oauth providers

OAUTH_PROVIDERS = {
    '42': {
        'base_url': 'https://api.intra.42.fr',
        'authorize_url': '/oauth/authorize',
        'token_url': '/oauth/token',
        'user_info_url': '/v2/me',
        'client_id': get_secret('OAUTH_42_CLIENT_ID'),
        'client_secret': get_secret('OAUTH_42_CLIENT_SECRET'),
        'redirect_uri': f'{SERVER_URL}/callback/42',
        'scope': 'public',
        'state': get_secret('OAUTH_42_STATE'),
    },
}

