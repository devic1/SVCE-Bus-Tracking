from rest_framework import serializers
from .models import Coords

class Coordserializer(serializers.ModelSerializer):
    class Meta:
        model = Coords
        fields = ('ide','lat','lon','busno')
