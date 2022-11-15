from rest_framework import serializers
from .models import *
class OfertaSerializer(serializers.ModelSerializer):
    class Meta:
        model = oferta_laboral
        fields = ('id', 'titulo', 'empresa', 'perfil', 'nivel','pub_date')