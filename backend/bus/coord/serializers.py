from rest_framework import serializers
from .models import Coords, Routes

class Coordserializer(serializers.ModelSerializer):
    class Meta:
        model = Coords
        fields = ('lat','lon','routeno')

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes
        fields = ('route','routeno','busstops')

class BusnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes
        fields = ('id','routeno')

class BusstopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes
        fields = ('id','busstops')

