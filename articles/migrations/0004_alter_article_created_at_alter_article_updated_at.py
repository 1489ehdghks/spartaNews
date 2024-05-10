# Generated by Django 4.2 on 2024-05-09 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0003_rename_create_at_article_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]