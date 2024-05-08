from django.contrib.auth.models import AbstractUser
from django.db import models


class Accounts(AbstractUser):
    email = models.EmailField(
        default='', max_length=100, null=False, blank=False, unique=True)
    username = models.CharField(
        default='', max_length=100, null=False, blank=False, unique=True)
    name = models.CharField(default='', max_length=100,
                            null=False, blank=False)
