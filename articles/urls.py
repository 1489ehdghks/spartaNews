from django.urls import path
from . import views

urlpatterns = [
    path(
        "<int:article_id>/comments/", # 댓글조회하기
        views.CommentListAPIView.as_view(),
        name="comment_list",
    ),
    path(
        "comments/<int:comment_id>/", # 댓글삭제하기
        views.CommentDetailAPIView.as_view(),
        name="comment_detail",
    ),
]