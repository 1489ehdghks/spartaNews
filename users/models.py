from django.contrib.auth.models import AbstractUser
from django.db import models


class Accounts(AbstractUser):
    email = models.EmailField(
        default='', max_length=100, null=False, blank=False, unique=True)
    username = models.CharField(
        default='', max_length=100, null=False, blank=False, unique=True)
    name = models.CharField(default='', max_length=100,
                            null=False, blank=False)


# 회원가입/ 로그인/ 로그아웃/ 회원정보수정/탈퇴/
# -프로필조회 이메일, 이름, 성별 -
# nickname을 username으로 수정
