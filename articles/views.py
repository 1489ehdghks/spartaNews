from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Article, ArticleLike, Comment
from .serializers import ArticleDetailSerializer, ArticleSerializer, CommentSerializer, ReplySerializer
from django.core import serializers
from django.db.models import Q

class ArticleListAPIView(ListAPIView) :
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Article.objects.all().order_by('-create_at')
    serializer_class = ArticleSerializer
    # return Response(serializers.data)
    def post(self, request) :
        serializers = ArticleSerializer(data = request.data)
        if serializers.is_valid(raise_exception = True) :
            serializers.save()
            return Response(serializers.data, status=201)

class ArticleDetailAPIView(APIView) :
    permission_classes = [IsAuthenticatedOrReadOnly]
    # 상세 조회
    def get(self, request, article_id) :
        article = get_object_or_404(Article, id = article_id)
        serializer = ArticleDetailSerializer(article)
        return Response(serializer.data)
    # 기사 수정
    def put(self, request, article_id) :
        article = get_object_or_404(Article, id = article_id)
        if article.user_id == request.user.id :
            serializer = ArticleDetailSerializer(article, data = request.data, partial = True)
            if serializer.is_valid(raise_exception=True) :
                serializer.save()
                return Response(serializer.data)
        return Response(status=401)
    # 기사 삭제 
    def delete(self, request, article_id) :
        article = get_object_or_404(Article, id = article_id)
        if article.user_id == request.user.id :
            article.delete()
            return Response("No Article", status=204)


class CommentListAPIView(APIView):
  # 댓글 조회하기
    def get(self, request, article_id):
        article = get_object_or_404(Article, pk=article_id)
        comments = article.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

  # 댓글 생성하기
    def post(self, request, article_id):
        article = get_object_or_404(Article, pk=article_id)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(article=article)
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentDetailAPIView(APIView):
  # 댓글 삭제하기
    def delete(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        comment.delete()
        data = {"id": f"{comment_id} is deleted."}
        return Response(data, status=status.HTTP_200_OK)

  # 댓글 수정하기
    def put(self, request, comment_id):
        comment = get_object_or_404(Comment, pk=comment_id)
        serializer = CommentSerializer(
            comment, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ArticleLikeAPIView(APIView) :
    permission_classes = [IsAuthenticated]
    def post(self, request, article_id) :
        article = get_object_or_404(Article, pk=article_id)
        article_like = ArticleLike.objects.filter(user=request.user, article=article)
        if not article_like.exists():
            like = ArticleLike(user=request.user, article=article)
            like.save()
            return Response("Like",status=201)
        else :
            return Response("Already Exist", status=400)

    def delete(self, request, article_id) :
        article = get_object_or_404(Article, pk=article_id)
        article_like = ArticleLike.objects.filter(user=request.user, article=article)
        if article_like.exists():
            article_like.delete()
            return Response("Unlike",status=204)
        else :
            return Response("Not exist", status=400)


class CommentReplyAPIView(APIView):
    # 대댓글 생성하기
    def post(self, request, comment_id):
        parent_comment = get_object_or_404(Comment, pk=comment_id)
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(article=parent_comment.article, parent_comment=parent_comment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class CommentReplyDetailAPIView(APIView):
  # 대댓글 조회하기
    def get(self, request, parent_comment_id, reply_id):
        parent_comment = get_object_or_404(Comment, pk=parent_comment_id)
        reply = get_object_or_404(parent_comment.replies.all(), pk=reply_id)
        serializer = ReplySerializer(reply)
        return Response(serializer.data)

    # 대댓글 삭제하기
    def delete(self, request, parent_comment_id, reply_id):
        parent_comment = get_object_or_404(Comment, pk=parent_comment_id)
        reply = get_object_or_404(parent_comment.replies.all(), pk=reply_id)
        reply.delete()
        return Response("re-comment delete ", status=status.HTTP_200_OK)
    
    # 대댓글 수정하기
    def put(self, request, parent_comment_id, reply_id):
        parent_comment = get_object_or_404(Comment, pk=parent_comment_id)
        reply = get_object_or_404(parent_comment.replies.all(), pk=reply_id)
        serializer = ReplySerializer(reply, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
