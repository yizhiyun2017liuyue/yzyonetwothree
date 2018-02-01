from django.conf.urls import url
from . import views

app_name = 'uinfo'

urlpatterns = [
    url(r'^createNewQrcode$', views.createNewQrcode),
    url(r'^loginByUser$', views.loginByUser),
    url(r'^adminLogin$', views.adminLogin),
    url(r'^createUserByAdmin$', views.createUserByAdmin),
    url(r'^changepwd$', views.changepwd),
    url(r'^updateClientInfo$', views.updateClientInfo),
    url(r'^updateServerInfo$', views.updateServerInfo),
    url(r'^updateServerImg$', views.updateServerImg),
    url(r'^adminLoginer$', views.adminLoginer),
    url(r'^index$', views.index),
    url(r'^addNewRecord$', views.addNewRecord),
    url(r'^removeRecord$', views.removeRecord),
    url(r'^createRepeatqrcode$', views.createRepeatqrcode),
    url(r'^deleteGoodsOrShow$', views.deleteGoodsOrShow),
]
