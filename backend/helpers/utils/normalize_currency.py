def normalize_currency(currency: str) -> str:
    match currency:
        case "AZN":  # Манаты
            return "₼"
        case "BYR":  # Белорусские рубли
            return "Br"
        case "EUR":  # Евро
            return "€"
        case "GEL":  # Грузинский лари
            return "₾"
        case "KGS":  # Кыргызский сом
            return "сом"
        case "KZT":  # Тенге
            return "₸"
        case "RUR":  # Рубли
            return "₽"
        case "UAH":  # Гривны
            return "₴"
        case "USD":  # Доллары
            return "$"
        case "UZS":  # Узбекский сум
            return "so'm"
        case _:
            return currency
