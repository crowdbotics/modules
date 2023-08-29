from rest_framework.pagination import PageNumberPagination
from django.conf import settings
from rest_framework.response import Response


class CustomPageNumberPagination(PageNumberPagination):

    """
    This is the custom pagination class for responding FAQs
    on the basis of page-set and records.
    """

    page_size = 5
    page_query_param = "page"
    page_size_query_param = "records"
    question = settings.FAQ_PREFIX_QUESTION
    answer = settings.FAQ_PREFIX_ANSWER
    visual = settings.FAQ_VISUAL_EXPANDED

    def get_next_page_number(self):
        """
        Getting Next Page Number for traversal
        """

        if not self.page.has_next():
            return None
        return self.page.next_page_number()

    def get_previous_page_number(self):
        """
        Getting Previous Page Number for traversal
        """

        if not self.page.has_previous():
            return None
        return self.page.previous_page_number()

    def get_paginated_response(self, data):
        """
        Returns the response
        """

        return Response(
            {
                "prefix_question": self.question,
                "prefix_answer": self.answer,
                "isExpanded": self.visual,
                "next": self.get_next_page_number(),
                "previous": self.get_previous_page_number(),
                "count": self.page.paginator.count,
                "results": data,
            }
        )
