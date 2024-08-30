from django.test import TestCase

from helpers.utils.clear_html import clear_html


class ClearHtmlTestCase(TestCase):
    def test_basic_html(self):
        input_text = "<p>Hello, World!</p>"
        expected_output = "Hello, World!"
        self.assertEqual(clear_html(input_text), expected_output)

    def test_multiple_tags(self):
        input_text = "<div><h1>Title</h1><p>Some text &quot;with quotes&quot;</p></div>"
        expected_output = "TitleSome text with quotes"
        self.assertEqual(clear_html(input_text), expected_output)

    def test_no_html(self):
        input_text = "Just some plain text."
        expected_output = "Just some plain text."
        self.assertEqual(clear_html(input_text), expected_output)

    def test_only_html(self):
        input_text = "<a href='#'>Link</a>"
        expected_output = "Link"
        self.assertEqual(clear_html(input_text), expected_output)

    def test_special_characters(self):
        input_text = "Text with &quot;special&quot; characters."
        expected_output = "Text with special characters."
        self.assertEqual(clear_html(input_text), expected_output)

    def test_empty_string(self):
        input_text = ""
        expected_output = ""
        self.assertEqual(clear_html(input_text), expected_output)
