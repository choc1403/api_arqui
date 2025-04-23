from django.db import models

# Create your models here.
class Sensor(models.Model):
    date = models.DateField(verbose_name="Fecha de registro", auto_now=True)
    value = models.CharField(verbose_name="Valor", max_length=150, default='0')
    name = models.CharField(verbose_name="Sensor", max_length=150, default='0')

    class Meta:
        verbose_name = 'Sensor'
        verbose_name_plural = 'Sensores'