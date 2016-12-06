from __future__ import unicode_literals

from django.db import models


class Dashboard(models.Model):

    title = models.CharField(max_length=100, blank=True)


class Query(models.Model):
    CHART_CHOICES = ((0, 'Table'),
                     (1, 'Line'),
                     (2, 'Bar'))

    x_axis = models.CharField(max_length=100, blank=True)
    y_axis = models.CharField(max_length=100, blank=True)
    chart_type = models.IntegerField(choices=CHART_CHOICES, default=0)
    querystring = models.TextField(blank=True)
    dashboard = models.ForeignKey('Dashboard', blank=True, null=True, related_name='query_set')



