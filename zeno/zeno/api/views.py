import os
from mainsite.models import Dashboard
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sqlalchemy import create_engine


class RunQueryViewSet(APIView):
    """
    Queries your database
    """

    def post(self, request):
        """
        This will use the query params which are a database string and the the raw
        sql of the desired query
        :param request:
        :return:
        """
        query = request.query_params.dict()

        engine = create_engine(os.getenv('DATABASE_CONNECTION'))
        connection = engine.connect()
        result = connection.execute("{query}".format(query=query.get('q_string')))
        print "executed query"
        json = {'results': [dict(row.items()) for row in result]}
        connection.close()

        return Response(data=json, status=status.HTTP_201_CREATED)


class DashboardViewSet(APIView):
    """
    Queries your database
    """

    def get(self, request):
        queryset = Dashboard.objects.all()
        all_dashboards = {dashboard.id: {"name": dashboard.title} for dashboard in queryset}
        return Response(data=all_dashboards, status=status.HTTP_201_CREATED)

    def post(self, request):
        """
        This will take a dashboardId and create a new dashboard object
        :param request:
        :return:
        """

        dashboard_dict = request.data
        try:
            dashboard = Dashboard.objects.get(id=dashboard_dict['id'])
            dashboard.title =dashboard_dict['name']
            dashboard.save(update_fields=['title'])
        except Dashboard.DoesNotExist:
            Dashboard.objects.create(id=dashboard_dict['id'], title=dashboard_dict['name'])

        return Response(status=status.HTTP_201_CREATED)
