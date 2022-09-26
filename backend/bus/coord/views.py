from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Coordserializer
from .models import Coords

# Create your views here.

@api_view(['GET','POST'])
def coord(request,pk):
    if request.method == "GET":
        coord = Coords.objects.filter(ide=pk)
        if coord.exists():
            serializer = Coordserializer(coord,many=True)
            return Response(serializer.data)
        return Response("Not found ")

    elif request.method == 'POST':
        t = request.data
        print(request.data)
        k = Coords.objects.filter(ide=t['ide'])
        if k.exists():
            k.update(lat=t['lat'])
            k.update(lon=t['lon'])
            return Response("ok")
        return Response("Not ok")



