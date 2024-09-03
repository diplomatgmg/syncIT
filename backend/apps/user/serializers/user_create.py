from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer as UserCreateSerializerDjoser
from rest_framework import serializers

User = get_user_model()


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
