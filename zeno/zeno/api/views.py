import os
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
        result = connection.execute("{query};".format(query=query.get('q_string')))

        json = {'results': [dict(row.items()) for row in result]}
        connection.close()

        return Response(data=json, status=status.HTTP_201_CREATED)
