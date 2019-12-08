from django.contrib import admin
from .models import User,Restaurant

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    user_display = ('name','email','restaurants')

class RestaurantAdmin(admin.ModelAdmin):
    restaurant_display = ('name','address','phone')


admin.site.register(User, UserAdmin)
admin.site.register(Restaurant,RestaurantAdmin)