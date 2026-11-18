from django.contrib import admin
from django.http import HttpResponse
from django.urls import path


def home(request):
    return HttpResponse("Django + Celery + Redis + Postgres is running")


def health(request):
    return HttpResponse("OK", status=200)


urlpatterns = [
    path('', home),
    path('health', health),
    path('admin/', admin.site.urls),
]