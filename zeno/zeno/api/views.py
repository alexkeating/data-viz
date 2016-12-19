import os
from mainsite.models import Dashboard, Query, Database
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
        query_dict = request.query_params.dict()
        json = {'results': self.run_query(query=query_dict.get('q_string'), request=request, database_id='')}
        return Response(data=json, status=status.HTTP_201_CREATED)

    def run_query(self, query, request, database_id):

        if not query:
            return [{}]

        if not database_id:
            name = request.data.get('database').get('databaseName')
            database = Database.objects.get(database_name=name)
            database_id = database.id

        database_string = self.create_database_string(database_id)
        engine = create_engine(database_string)
        connection = engine.connect()
        result = connection.execute("{query}".format(query=query))
        print "executed query"
        json = [dict(row.items()) for row in result]
        connection.close()

        return json

    def create_database_string(self, database_id):
        # dialect + driver: // username:password @ host:port / database
        database = Database.objects.get(id=database_id)
        database_string = '{dialect}://{username}:{password}@{host}:{port}/{name}'.format(
            dialect=database.database_type,
            username=database.database_username,
            password=database.database_password,
            host=database.database_host,
            port=database.database_port,
            name=database.database_name)

        return database_string



class DatabaseViewSet(APIView):

    def get(self, request, **kwargs):
        all_databases = Database.objects.all()
        json = {database.id: {'displayName': database.display_name, 'databaseType': database.database_type,
                              'databaseName': database.database_name, 'databaseHost': database.database_host,
                              'databasePort': database.database_port, 'databaseUsername': database.database_username,
                              'databasePassword': database.database_password}
                for database in all_databases}

        return Response(data=json, status=status.HTTP_200_OK)

    def post(self, request, **kwargs):
        database_dict = request.data['database']
        new_database = Database.objects.create(display_name=database_dict['display_name'],
                                               database_type=database_dict['database_type'],
                                               database_name=database_dict['database_name'],
                                               database_host=database_dict['database_host'],
                                               database_port=database_dict['database_port'],
                                               database_username=database_dict['database_username'],
                                               database_password=database_dict['database_password'])
        return Response(data={'id': new_database.id}, status=status.HTTP_201_CREATED)


class DashboardViewSet(APIView):
    """
    Queries your database
    """

    def get(self, request, **kwargs):
        queryset = Dashboard.objects.all()
        all_dashboards = {dashboard.id: {"name": dashboard.title} for dashboard in queryset}
        return Response(data=all_dashboards, status=status.HTTP_200_OK)

    def post(self, request, **kwargs):
        """
        This will take a dashboardId and create a new dashboard object
        :param request:
        :return:
        """

        dashboard_dict = request.data
        try:
            dashboard_dict['name']
        except KeyError:
            return Response(status=status.HTTP_206_PARTIAL_CONTENT)
        try:
            dashboard = Dashboard.objects.get(id=dashboard_dict['id'])
            dashboard.title = dashboard_dict['name']
            dashboard.save(update_fields=['title'])
        except Dashboard.DoesNotExist:
            dashboard = Dashboard.objects.create(id=dashboard_dict['id'], title=dashboard_dict['name'])

        return Response(data={'id': dashboard.id, 'name': dashboard.title}, status=status.HTTP_201_CREATED)


class QueryViewSet(RunQueryViewSet):
    """
    Queries your database
    """

    def get(self, request, **kwargs):
        # queryset = Query.objects.filter(dashboard=request)
        dashboard_id = kwargs.get('dashboard_id')
        query_id = kwargs.get('query_id')

        if not query_id:
            # this is for when I want to get all queries for a dashborad
            all_queries = Query.objects.filter(dashboard=dashboard_id)
            if not all_queries:
                response = {0: {}}
                return Response(data=response, status=status.HTTP_200_OK)
            response = {query.id: {'x': query.x_axis, 'y': query.y_axis, 'chart_type': query.chart_type,
                                   'querystring': query.querystring, 'dashboard': query.dashboard.id,
                                   'results': self.run_query(query=query.querystring, request=request,
                                                             database_id=query.database_id),
                                   'database_id': query.database_id}
                        for query in all_queries}
            return Response(data=response, status=status.HTTP_200_OK)

        query = Query.objects.get(id=query_id, dashboard=dashboard_id)

        response = {'query': {'id': query.id, 'x': query.x_axis, 'y': query.y_axis, 'chart_type': query.chart_type,
                              'querystring': query.querystring, 'dashboard': query.dashboard.id,
                              'database_id': query.database_id}}
        return Response(data=response, status=status.HTTP_200_OK)

    def post(self, request, **kwargs):
        """
        This will take a dashboardId and create a new dashboard object
        :param request:
        :return:
        """
        try:
            query_dict = request.data
            database_name = request.data.get('database').get('databaseName')
        except AttributeError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        query_id = kwargs.get('query_id')
        dashboard_id = kwargs.get('dashboard_id')
        try:
            dashboard = Dashboard.objects.get(id=dashboard_id)
            database = Database.objects.get(database_name=database_name)
        except Dashboard.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            query = Query.objects.get(id=query_id)
            query.x_axis = query_dict['x']
            query.y_axis = query_dict['y']
            query.chart_type = query_dict['chart_type']
            query.querystring = query_dict['querystring']
            query.dashboard = dashboard
            query.database = database
            query.save(update_fields=['x_axis', 'y_axis', 'chart_type','querystring', 'dashboard', 'database'])
        except Query.DoesNotExist:
            Query.objects.create(id=query_id, x_axis=query_dict['x'], y_axis=query_dict['y'],
                                 querystring=query_dict['querystring'], chart_type=query_dict['chart_type'],
                                 dashboard=dashboard, database=database)

        return Response(status=status.HTTP_201_CREATED)