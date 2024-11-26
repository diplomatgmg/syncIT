from typing import Dict, Any

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    default_error_messages = {
        "no_active_account": "Пользователя с такими данными не существует",
        "user_not_active": "Необходимо активировать учетную запись",
    }

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        email = attrs.get("email")

        user = User.objects.filter(email=email, is_active=False).exists()

        if user:
            raise serializers.ValidationError(
                {"detail": self.default_error_messages["user_not_active"]}
            )

        return super().validate(attrs)
