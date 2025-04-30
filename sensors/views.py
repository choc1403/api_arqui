# API
from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.utils.timezone import datetime
from datetime import datetime
from rest_framework.request import Request

# MODELOS
from .models import Sensor

# SERIALIZAERS
from .serializers import SensorSerializers

from django.shortcuts import render, redirect, get_object_or_404

class SensorViewSet(viewsets.ModelViewSet):
    serializer_class = SensorSerializers
    queryset = Sensor.objects.all().order_by('-id')


def inicio(request):
    template_name = 'index.html'
    context = {

    }
    return render(request, template_name, context)

