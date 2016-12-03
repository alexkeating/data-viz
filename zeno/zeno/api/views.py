import os
from mainsite.models import Dashboard, Query
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
            dashboard.title = dashboard_dict['name']
            dashboard.save(update_fields=['title'])
        except Dashboard.DoesNotExist:
            Dashboard.objects.create(id=dashboard_dict['id'], title=dashboard_dict['name'])

        return Response(status=status.HTTP_201_CREATED)


class QueryViewSet(APIView):
    """
    Queries your database
    """

    def get(self, request, **kwargs):
        # queryset = Query.objects.filter(dashboard=request)
        dashboard_id = kwargs.get('dashboard_id')
        query_id = kwargs.get('query_id')
        if not query_id:
            try:
                all_queries = Query.objects.get(dashboard=dashboard_id)
            except Query.DoesNotExist:
                response = {'queries': {}}
                return Response(data=response, status=status.HTTP_201_CREATED)
            response = {query.id: {'x': query.x, 'y': query.y, 'querystring': query.querystring,
                                   'dashboard': query.dashboard} for query in all_queries}
            return Response(data=response, status=status.HTTP_201_CREATED)

        query = Query.objects.get(id=query_id, dashboard=dashboard_id)

        response = {'query': {'id': query.id, 'x': query.x, 'y': query.y, 'querystring': query.querystring,
                              'dashboard': query.dashboard}}
        return Response(data=response, status=status.HTTP_201_CREATED)

    def post(self, request):
        """
        This will take a dashboardId and create a new dashboard object
        :param request:
        :return:
        """

        query_dict = request.data
        try:
            query = Dashboard.objects.get(id=query_dict['query_id'])
            query.x = query_dict['x']
            query.y = query_dict['y']
            query.querystring = query_dict['querystring']
            query.dashboard = query_dict['dashbaord_id']
            query.save(update_fields=['x', 'y', 'querystring', 'dashboard_id'])
        except Query.DoesNotExist:
            Dashboard.objects.create(x=query_dict['x'], y=query_dict['y'],
                                     querystring=query_dict['querystring'], dashboard=query_dict['dashboard'])

        return Response(status=status.HTTP_201_CREATED)