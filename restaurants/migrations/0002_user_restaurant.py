# Generated by Django 3.0 on 2019-12-05 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='restaurant',
            field=models.ManyToManyField(to='restaurants.Restaurant'),
        ),
    ]
