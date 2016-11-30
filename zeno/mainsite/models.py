from __future__ import unicode_literals

from django.db import models


class Dashboard(models.Model):

    title = models.CharField(max_length=100, blank=True)


class Query(models.Model):

    x_axis = models.CharField(max_length=100, blank=True)
    y_axis = models.CharField(max_length=100, blank=True)
    querystring = models.TextField(blank=True)
    dashboard = models.ForeignKey('Dashboard', blank=True, null=True, related_name='query_set')

