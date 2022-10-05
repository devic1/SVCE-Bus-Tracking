from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Coordserializer, RouteSerializer
from .models import Coords, Routes

# Create your views here.


def Home(request):
    if request.user.is_authenticated:
        context = {}
        return render(request,"student.html",context)
    else:
        return HttpResponseRedirect(reverse('login'))

def Driver(request):
    if request.user.is_authenticated:
        context = {}
        return render(request,"driver.html",context)
    else:
        return HttpResponseRedirect(reverse('login'))


@api_view(['GET','POST','PUT'])
def coord(request,pk):
    if request.method == "GET":
        coord = Coords.objects.filter(id=pk)
        if coord.exists():
            serializer = Coordserializer(coord,many=True)
            return Response(serializer.data)
        return Response("Not found ")

    elif request.method == 'PUT' or request.method == 'POST':
        t = request.data
        print(request.data)
        k = Coords.objects.filter(id=pk)
        if k.exists():
            k.update(lat=t['lat'])
            k.update(lon=t['lon'])
            return Response("ok")
        return Response("Not ok")


@api_view(['GET'])
def route(request,pk):
    if request.method == "GET":
        route = Routes.objects.filter(id=pk)
        if route.exists():
            serializer = RouteSerializer(route,many=True)
            return Response(serializer.data)
        return Response("Not Found")
        

