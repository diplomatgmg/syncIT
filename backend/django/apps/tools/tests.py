from django.test import SimpleTestCase
from rest_framework import status


class RobotsTxtTests(SimpleTestCase):
    def test_get(self):
        response = self.client.get("/robots.txt")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response["content-type"], "text/plain")
