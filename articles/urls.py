from django.urls import path
from . import views

app_name = "articles"
urlpatterns = [
    path("<int:article_id>/", views.ArticleDetailAPIView.as_view()),
]
