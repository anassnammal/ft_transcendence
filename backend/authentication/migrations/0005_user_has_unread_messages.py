# Generated by Django 4.1.7 on 2024-03-31 21:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_user_unread_messages'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='has_unread_messages',
            field=models.BooleanField(default=False),
        ),
    ]
