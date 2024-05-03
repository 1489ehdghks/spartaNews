from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Article, Comment
from .serializers import ArticleDetailSerializer, CommentSerializer
from django.core import serializers

class ArticleDetailAPIView(APIView) :
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request, article_id) :
        article = get_object_or_404(Article, id = article_id)
        serializer = ArticleDetailSerializer(article)
        return Response(serializer.data)
    def put(self, request, article_id) :
        article = get_object_or_404(Article, id = article_id)
        if article.user_id == request.user.id :
            serializer = ArticleDetailSerializer(article, data = request.data, partial = True)
            if serializer.is_valid(raise_exception=True) :
                serializer.save()
                return Response(serializer.data)
        return Response(status=401)
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
        serializer = CommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)