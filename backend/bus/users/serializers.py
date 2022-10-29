from rest_framework import serializers
from .models import Busno

class BusnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Busno
        fields = ('ad','busno','stopname')
