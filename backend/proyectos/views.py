from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Proyectos, ProyectoImagen
from .serializers import ProyectosSerializer
from django.conf import settings
from pathlib import Path
import uuid
from PIL import Image

# Create your views here.


def ProcesarImagen(imagen_file, carpeta='proyectos'):
    img = Image.open(imagen_file)
    if img.mode in ('RGBA', 'LA'):
        img = img.convert('RGB')
    max_width = 1280
    if img.width > max_width:
        ratio = max_width / img.width
        img = img.resize((max_width, int(img.height * ratio)), Image.LANCZOS)
    img_uuid = f"{uuid.uuid4()}.webp"
    img_path = Path(settings.MEDIA_ROOT) / carpeta / img_uuid
    img_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(img_path, format='WEBP', quality=80)
    return f"{carpeta}/{img_uuid}"


@api_view(['GET'])
def proyectos_list(request):
    proyectos = Proyectos.objects.all()
    serializer = ProyectosSerializer(proyectos, many=True)
    return Response({
        "status": True,
        "data": {"proyectos": serializer.data}
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def proyectos_create(request):
    imagenes = request.FILES.getlist('imagenes')  # lista de archivos

    if len(imagenes) > 3:
        return Response({"error": "Máximo 3 imágenes por proyecto"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ProyectosSerializer(data=request.data)
    if serializer.is_valid():
        proyecto = serializer.save()

        for i, image_file in enumerate(imagenes):
            try:
                ruta = ProcesarImagen(image_file)
                ProyectoImagen.objects.create(proyecto=proyecto, imagen=ruta, orden=i)
            except Exception as e:
                print(f"Error procesando imagen {i}: {e}")

        return Response({
            "status": True,
            "data": {"proyecto": ProyectosSerializer(proyecto, context={'request': request}).data}
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
def eliminar_proyeto(request, proyecto_id):
    try:
        proyecto = Proyectos.objects.get(id=proyecto_id)
    except Proyectos.DoesNotExist:
        return Response({"error": "proyecto no encontrado"}, status=status.HTTP_404_NOT_FOUND)
