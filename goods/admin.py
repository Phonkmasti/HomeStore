from calendar import c
from django.contrib import admin

# Register your models here.


from goods.models import Categories
from goods.models import Products


# admin.site.register(Categories)
# admin.site.register(Products)


@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}
    list_display = ['name']


@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name_en",)}
    list_display = ["name_ru", "quantity", "price", "discount"]
    list_editable = [
        "discount",
    ]
    search_fields = ["name_ru", "name_en", "description_ru", "description_en"]
    list_filter = ["discount", "quantity", "category"]
    fields = [
        "name_ru",
        "name_en",
        "description_ru",
        "description_en",
        "category",
        "slug",
        "image",
        "image_2",
        ("price", "discount"),
        "quantity",
    ]
