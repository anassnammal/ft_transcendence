# Generated by Django 4.1.7 on 2024-08-29 10:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0012_remove_user_registration_method_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='has_oauth_credentials',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='OAuthCredential',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('provider', models.CharField(max_length=50)),
                ('uid', models.CharField(max_length=255)),
                ('token', models.CharField(max_length=255)),
                ('expires_at', models.DateTimeField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='oauth_credentials', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
