from typing import Dict, Any

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from djoser.serializers import UserCreateSerializer as UserCreateSerializerDjoser

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


class UserCreateSerializer(UserCreateSerializerDjoser):
    email = serializers.EmailField(
        error_messages={
            "required": "Email обязателен",
            "invalid": "Введите корректный адрес электронной почты",
        }
    )

    password = serializers.CharField(
        min_length=8,
        max_length=128,
        error_messages={
            "required": "Пароль обязателен",
            "min_length": "Пароль должен содержать минимум 8 символов",
            "max_length": "Пароль должен содержать максимум 128 символов",
        },
        style={"input_type": "password"},
        write_only=True,
    )

    @staticmethod
    def validate_email(value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Пользователь с таким email уже существует"
            )
        return value

    class Meta:
        model = User
        fields = ("email", "password")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
