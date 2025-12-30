import re
from django import forms


class CreateOrderForm(forms.Form):
    DELIVERY_CHOICES = (
        ('1', 'Delivery to Address'),
        ('0', 'Pickup in Store'),
    )

    PAYMENT_CHOICES = (
        ('0', 'Credit/Debit Card'),
        ('1', 'Cash/Card on Delivery'),
    )

    first_name = forms.CharField(
        label='First Name',
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Enter your first name',
            'class': 'form-control',
        })
    )

    last_name = forms.CharField(
        label='Last Name',
        max_length=100,
        widget=forms.TextInput(attrs={
            'placeholder': 'Enter your last name',
            'class': 'form-control',
        })
    )

    phone_number = forms.CharField(
        label='Phone Number',
        max_length=20,
        widget=forms.TextInput(attrs={
            'placeholder': '1234567890',
            'class': 'form-control',
        })
    )

    requires_delivery = forms.ChoiceField(
        label='Delivery Method',
        choices=DELIVERY_CHOICES,
        widget=forms.RadioSelect(),
    )

    delivery_address = forms.CharField(
        label='Delivery Address',
        required=False,
        widget=forms.Textarea(attrs={
            'placeholder': 'Street address, city, state',
            'rows': 3,
            'class': 'form-control',
        })
    )

    zip_code = forms.CharField(
        label='Zip Code',
        required=False,
        max_length=20,
        widget=forms.TextInput(attrs={
            'placeholder': '12345',
            'class': 'form-control',
        })
    )

    house_number = forms.CharField(
        label='House Number',
        required=False,
        max_length=50,
        widget=forms.TextInput(attrs={
            'placeholder': 'Apt 101, Suite A, etc.',
            'class': 'form-control',
        })
    )

    payment_on_get = forms.ChoiceField(
        label='Payment Method',
        choices=PAYMENT_CHOICES,
        widget=forms.RadioSelect(),
    )


    def clean_phone_number(self):
        data = self.cleaned_data['phone_number']

        if not data.isdigit():
            raise forms.ValidationError('Phone number must contain only digits')

        pattern = re.compile(r'^\d{10}$')
        if not pattern.match(data):
            raise forms.ValidationError('Phone number must be exactly 10 digits')

        return data

    def clean(self):
        cleaned_data = super().clean()
        requires_delivery = cleaned_data.get('requires_delivery')
        delivery_address = cleaned_data.get('delivery_address')
        zip_code = cleaned_data.get('zip_code')
        house_number = cleaned_data.get('house_number')

        if requires_delivery == '1':
            if not delivery_address:
                self.add_error('delivery_address', 'Delivery address is required')
            if not zip_code:
                self.add_error('zip_code', 'Zip code is required')
            if not house_number:
                self.add_error('house_number', 'House number is required')

        return cleaned_data