from django.db import models
from django.conf import settings

class Article(models.Model) :
    title = models.CharField(max_length=50)
    content = models.TextField()
    url = models.URLField()
    create_at = models.DateTimeField(auto_now_add=False)
    updated_at = models.DateTimeField(auto_now=False)
    user_id = models.ForeignKey(
        settings.AUTH_USER_MODEL(), 
        on_delete=models.CASCADE,
        related_name = 'articles')
    like_count = models.ManyToManyField(
        settings.AUTH_USER_MODEL(),
        related_name = 'like_articles',
        null = True
        )