from django.db import models
from django.urls import reverse


class Categories(models.Model):
    name = models.CharField(
        max_length=150, 
        unique=True, 
        verbose_name='Name'
    )
    slug = models.SlugField(
        max_length=200, 
        unique=True, 
        blank=True, 
        null=True, 
        verbose_name='URL'
    )

    class Meta:
        db_table = 'category'
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Products(models.Model):
    name_en = models.CharField(
        max_length=150, 
        unique=True,
        default='',
        verbose_name='Engilsh Name'
    )
    name_ru = models.CharField(
        max_length=100,
        unique=True,
        default='',
        verbose_name='Russian Name'
    )
    description_en = models.TextField(
        blank=True, 
        null=True, 
        verbose_name='English Description'
    )
    description_ru = models.TextField(
        blank=True,
        null=True,
        verbose_name='Russian Description'
    )
    slug = models.SlugField(
        max_length=200, 
        unique=True, 
        blank=True, 
        null=True, 
        verbose_name='URL'
    )
    image = models.ImageField(
        upload_to='goods_images', 
        blank=True, 
        null=True, 
        verbose_name='Image',
    )
    image_2 = models.ImageField(
        upload_to='goods_images', 
        blank=True, 
        null=True, 
        verbose_name='Image',
    )
    price = models.DecimalField(
        default=0.00, 
        max_digits=7, 
        decimal_places=2, 
        verbose_name='Price'
    )
    discount = models.DecimalField(
        default=0.00, 
        max_digits=4, 
        decimal_places=2, 
        verbose_name='Discount %'
    )
    quantity = models.PositiveIntegerField(
        default=0, 
        verbose_name='Quantity'
    )
    category = models.ForeignKey(
        to=Categories, 
        on_delete=models.CASCADE, 
        verbose_name='Category'
    )

    class Meta:
        db_table = 'product'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ('id',)

    def __str__(self):
        return f'{self.name_en} (Qty: {self.quantity})'
    
    def get_absolute_url(self):
        return reverse('catalog:product', kwargs={'product_slug': self.slug})

    def display_id(self):
        return f'{self.id:05}'
    
    def sell_price(self):
        if self.discount:
            return round(self.price - self.price * self.discount / 100, 2)
        return self.price
