from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *
# Create your views here.

class IndexView(APIView):
    
    def get(self,request):
        context = {'mensaje':'servidor activo'}
        return Response(context)
    
class OfertaView(APIView):
    
    def get(self,request):
        dataOfertas = oferta_laboral.objects.all()
        serOfertas = OfertaSerializer(dataOfertas,many=True)
        return Response(serOfertas.data)
    
    def post(self,request):
        serOfertas = OfertaSerializer(data=request.data)
        serOfertas.is_valid(raise_exception=True)
        serOfertas.save()
        
        return Response(serOfertas.data)
    
class OfertaDetailView(APIView):
    
    def get(self,request,oferta_id):
        dataOfertas = oferta_laboral.objects.get(pk=oferta_id)
        serOfertas = OfertaSerializer(dataOfertas)
        return Response(serOfertas.data)
    
    def put(self,request,oferta_id):
        dataOfertas = oferta_laboral.objects.get(pk=oferta_id)
        serOfertas = OfertaSerializer(dataOfertas,data=request.data)
        serOfertas.is_valid(raise_exception=True)
        serOfertas.save()
        return Response(serOfertas.data)
    
    def delete(self,request,oferta_id):
        dataOfertas = oferta_laboral.objects.get(pk=oferta_id)
        serOfertas = OfertaSerializer(dataOfertas)
        dataOfertas.delete()
        return Response(serOfertas.data)
