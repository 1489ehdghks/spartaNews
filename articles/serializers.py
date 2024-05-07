from rest_framework import serializers
from .models import Article, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
        read_only_fields = ("article",)

class ArticleDetailSerializer(serializers.ModelSerializer):
    like_count = serializers.IntegerField(read_only = True)
    comments = CommentSerializer(many = True, read_only = True)

    class Meta :
        model = Article
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['like_count'] = instance.like_count.count()
        return representation
