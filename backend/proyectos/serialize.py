from rest_framework import serializers
from .models import ProyectoImagen, Proyectos

class ProyectoImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProyectoImagen
        fields = ['id', 'imagen', 'orden']

class ProyectosSerializer(serializers.ModelSerializer):
    imagenes = ProyectoImagenSerializer(many=True, read_only=True)

    class Meta:
        model = Proyectos
        fields = ['id', 'titulo', 'descripcion', 'url', 'imagenes']