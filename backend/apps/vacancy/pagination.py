from rest_framework.pagination import PageNumberPagination


class UserVacancyPagination(PageNumberPagination):
    page_size = 7
