from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Article
from .serializers import ArticleDetailSerializer

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