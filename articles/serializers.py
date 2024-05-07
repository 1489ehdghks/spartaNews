from rest_framework import serializers
from .models import Article, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ("article",)

    # 댓글에 article 표시 없앰
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop("article")
        return ret

class ArticleDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many = True, read_only = True)
    # 댓글 수 표시 
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    like_count = serializers.IntegerField(read_only = True)

    class Meta :
        model = Article
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['like_count'] = instance.like_count.count()
        return representation

