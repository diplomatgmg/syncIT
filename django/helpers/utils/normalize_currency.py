def normalize_currency(currency: str) -> str:
    currency_symbols = {
        "AZN": "₼",  # Манаты
        "BYR": "Br",  # Белорусские рубли
        "EUR": "€",  # Евро
        "GEL": "₾",  # Грузинский лари
        "KGS": "сом",  # Кыргызский сом
        "KZT": "₸",  # Тенге
        "RUR": "₽",  # Рубли
        "UAH": "₴",  # Гривны
        "USD": "$",  # Доллары
        "UZS": "so'm",  # Узбекский сум
    }
    return currency_symbols.get(currency, currency)
