from django.db import models

# Create your models here.


class Goods(models.Model):
    goodsName = models.CharField(max_length=255, null=True)
    goodsImg = models.ImageField(upload_to='img', null=True)
    manageDepartment = models.CharField(max_length=255, null=True)
    useDepartment = models.CharField(max_length=255, null=True)
    manager = models.CharField(max_length=255, null=True)
    user = models.CharField(max_length=255, null=True)
    recorder = models.CharField(max_length=255, null=True)
    recordDate = models.BigIntegerField(null=True)
    size = models.CharField(max_length=255, null=True)
    color = models.CharField(max_length=255, null=True)
    modelNum = models.CharField(max_length=255, null=True)
    financeRecord = models.IntegerField(null=True)
    area = models.CharField(max_length=255, null=True)
    icon = models.CharField(max_length=255, null=True)


class Areaed(models.Model):
    areastr = models.CharField(max_length=255)
    areadate = models.BigIntegerField()
    goodsid = models.IntegerField()


class UserInfo(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)


class recordNum(models.Model):
    goodsId = models.IntegerField()
    recordId = models.IntegerField()
