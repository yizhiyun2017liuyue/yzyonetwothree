# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-05 11:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uinfo', '0002_auto_20171202_1458'),
    ]

    operations = [
        migrations.AddField(
            model_name='goods',
            name='icon',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
