from rest_framework import serializers
from .models import Article, Comment, ArticleLike

# 대댓글
class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ("article","user_id")

class CommentSerializer(serializers.ModelSerializer):
    # 대댓글 표시
    replies = ReplySerializer(many=True, read_only=True)
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ("article","user_id")

    # 댓글에 article 표시 없앰
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop("article")
        return ret

class ArticleSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Article
        fields = '__all__'
        read_only_fields = ("user_id",)

class ArticleDetailSerializer(ArticleSerializer):
    like_count = serializers.IntegerField(read_only = True)
    # 댓글 수 표시 
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    comments = CommentSerializer(many = True, read_only = True)
    # 대댓글 표시
    replies = ReplySerializer(many=True, read_only=True)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['like_count'] = ArticleLike.objects.filter(article_id=instance.id).count()
        return representation
