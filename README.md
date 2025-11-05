## HomeStore

An online store built with Django. Includes product catalog, shopping cart, order system, and user account management. Educational project, but with fully working logic.

## Stack
- Python 3.11  
- Django 5.x  
- PostgreSQL
- HTML, CSS (Django templates)  

## Main Apps
- `goods` — product catalog

- `carts` — shopping cart

- `orders` — order handling

- `users` — registration, login, profile

- `main` — homepage and utility pages

## Installation & Run

```bash
git clone https://github.com/Phonkmasti/HomeStore.git
cd HomeStore
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Then open in browser:  
http://127.0.0.1:8000/

## Implemented

Auth system (register/login/logout)

Product catalog

Cart & checkout

Orders

User profile

Admin management
