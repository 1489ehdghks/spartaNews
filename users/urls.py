from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)
from . import views

app_name = "users"
urlpatterns = [
    path('signup/', views.UserAPIView.as_view(), name='accounts_signup'),
    path('login/', TokenObtainPairView.as_view(), name='accounts_login'),
    path('logout/', TokenBlacklistView.as_view(), name='accounts_logout'),
    path('delete/', views.UserAPIView.as_view(), name='accounts_delete'),
    path('<str:username>/', views.UserDetailAPIView.as_view(), name='profile'),
    path('<str:username>/password/',
        views.ChangePasswordAPIView.as_view(), name='accounts_password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

