# Generated by Django 4.1.7 on 2024-04-15 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0002_tournament_started'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='game_number',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
