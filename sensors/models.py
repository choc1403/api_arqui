from django.db import models

# Signals
from django.db.models.signals import pre_save, post_save, pre_delete, post_delete

# Django
from django.dispatch import receiver

# Create your models here.
class Sensor(models.Model):
    date = models.DateField(verbose_name="Fecha de registro", auto_now=True)
    value = models.CharField(verbose_name="Valor", max_length=150, default='0')
    name = models.CharField(verbose_name="Sensor", max_length=150, default='0')

    class Meta:
        verbose_name = 'Sensor'
        verbose_name_plural = 'Sensores'

import requests

def send_telegram_message(message):
    bot_token = '7570355782:AAGl3kFUhFmR7EC0UQFxxScGHnhzDqjvTj0'
    chat_id = '1341613854'  
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'

    data = {
        'chat_id': chat_id,
        'text': message
    }

    response = requests.post(url, data=data)
    return response.json()

@receiver(post_save, sender=Sensor)
def send_alert(sender, instance, **kwargs):
    # Si el código del cliente está vacío o es una cadena vacía, genera uno nuevo
    if instance.value <= str(50):
        send_telegram_message('LOS VALORES ESTAN DEMASIADO BAJOS, CUIDADO')
