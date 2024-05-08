from django.urls import path
from . import views

app_name = "articles"
urlpatterns = [
    path("", views.ArticleListAPIView.as_view()),
    path("<int:article_id>/", views.ArticleDetailAPIView.as_view()),
    path("<int:article_id>/like/",views.ArticleLikeAPIView.as_view()),
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
    path( # 대댓글 조회하기
        "comments/<int:comment_id>/reply/", 
        views.CommentReplyAPIView.as_view(), 
        name="comment_reply"
    ),
    path( # 대댓글 삭제하기
        "comments/<int:parent_comment_id>/replies/<int:reply_id>/", 
        views.CommentReplyDetailAPIView.as_view(), 
        name="comment_reply_detail"
        ),
]