from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "username",
            "email",
            "gender",
        ]

    def validate(self, attrs):
        attrs = super().validate(attrs)
        user_instance = self.instance

        if "email" in attrs:
            if get_user_model().objects.filter(email=attrs["email"]).exclude(pk=user_instance.pk).exists():
                raise serializers.ValidationError("Email already exists.")

        if "username" in attrs:
            if get_user_model().objects.filter(username=attrs["username"]).exclude(pk=user_instance.pk).exists():
                raise serializers.ValidationError("Username already exists.")

        return attrs
