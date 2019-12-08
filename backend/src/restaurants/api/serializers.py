# todo/serializers.py

from rest_framework import serializers
from ..models import Restaurant, User


class RegistrationSerializer(serializers.ModelSerializer):
    #This requests and creates user
    password = serializers.CharField(max_length=120,min_length=8,write_only=True)

    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password','token']

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name','address','phone', 'long', 'lat']

class UserSerializer(serializers.ModelSerializer):
    restaurant = RestaurantSerializer(read_only=True,many=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'restaurant']