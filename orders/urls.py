from django.urls import path

import app
from orders import views


app_name = "orders"


urlpatterns = [
    path("create-order/", views.create_order, name="create_order"),
    path("payment/<int:order_id>/", views.payment_check, name='payment')
]
