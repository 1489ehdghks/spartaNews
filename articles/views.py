from django.shortcuts import render
from .serializers import ArticleSerializer, CommentSerializer


# 댓글 조회하기
class CommentListAPIView(APIView):
    def get(self, request, article_id):
        article = get_object_or_404(Article, pk=article_id)
        comments = article.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, article_id):
        pass
