import uuid
from django.db import models

# Create your models here.

def proyectos_upload_to(instance, filename):
    ext = filename.split('.')[-1].lower()
    return f'proyectos/{uuid.uuid4()}.{ext}'

class Proyectos(models.Model):
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField()
    url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.titulo
    

class ProyectoImagen(models.Model):
    proyecto = models.ForeignKey(Proyectos, on_delete=models.CASCADE, related_name='imagenes')
    imagen = models.ImageField(upload_to=proyectos_upload_to)
    orden = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'Imagen del proyecto: {self.proyecto.titulo}'