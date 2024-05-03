from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer


class UserAPIView(APIView):
    def post(self, request):
        data = request.data
        email = data.get("email")
        username = data.get("username")

        if not email or not username:
            return Response({"error": "email or username is required"}, status=400)

        if get_user_model().objects.filter(email=email).exists():
            return Response({"error": "email exists"}, status=400)

        if get_user_model().objects.filter(username=username).exists():
            return Response({"error": "username exists"}, status=400)

        user = get_user_model().objects.create_user(
            username=username,
            email=email,
            password=data.get("password"),
        )
        return Response(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            status=201,
        )

    def delete(self, request):
        password = request.data.get("password")
        if not password:
            return Response({"error": "password is required"}, status=400)

        if not request.user.check_password(password):
            return Response({"error": "password is incorrect"}, status=400)

        request.user.delete()
        return Response(status=204)


class UserDetailAPIView(APIView):
    def get(self, request, username):
        user = get_object_or_404(get_user_model(), username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request, username):

        user = get_object_or_404(get_user_model(), username=username)

        if request.user != user:
            return Response({"error": "permission denied"}, status=403)

        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class ChangePasswordAPIView(APIView):
    def put(self, request):
        user = request.user
        password = request.data.get("password")
        if not password:
            return Response({"error": "password is required"}, status=400)

        if len(password) < 8:
            return Response(
                {"error": "password must be at least 8 characters"}, status=400
            )

        user.set_password(password)
        user.save()
        return Response(status=204)
