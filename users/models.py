from django.contrib.auth.models import AbstractUser
from django.db import models


class Accounts(AbstractUser):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    
    email = models.EmailField(
        default='', max_length=100, null=False, blank=False, unique=True)
    username = models.CharField(
        default='', max_length=100, null=False, blank=False, unique=True)
    name = models.CharField(default='', max_length=100,
                            null=False, blank=False)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
