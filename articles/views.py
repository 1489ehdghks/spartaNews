from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from .serializers import ArticleSerializer, ArticleDetailSerializer, CommentSerializer
from .models import Article, Comment


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
