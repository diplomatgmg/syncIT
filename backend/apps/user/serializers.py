from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        error_messages={
            "required": "Email обязателен",
            "invalid": "Введите корректный адрес электронной почты",
        }
    )

    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True,
        error_messages={
            "required": "Пароль обязателен",
            "min_length": "Пароль должен содержать минимум 8 символов",
        },
    )

    class Meta:
        model = User
        fields = ("email", "password")

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Пользователь с таким email уже существует"
            )
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
