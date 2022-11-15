from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('',views.IndexView.as_view(),name='index'),
    path('ofertas',views.OfertaView.as_view(),name='ofertas'),
    path('oferta/<int:oferta_id>',views.OfertaDetailView.as_view())
]