from djoser import email


class ActivationEmail(email.ActivationEmail):
    template_name = "tools/activation_email.html"
