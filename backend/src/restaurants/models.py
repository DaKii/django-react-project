from django.contrib.gis.db import models

# Create your models here.

class Restaurant(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    lat = models.FloatField()
    long = models.FloatField()

    def __str__(self):
        return self.name

class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    password = models.CharField(max_length=50)
    restaurant = models.ManyToManyField('Restaurant')

    def __str__(self):
        return self.username