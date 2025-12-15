from goods.models import Products
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank

def q_search(query):
    
    if query.isdigit() and len(query) <= 5:
        
        return Products.objects.filter(id=int(query))
    
    vector = SearchVector("slug", "name_en", "description_en",  "name_ru", "description_ru")
    query = SearchQuery(query)

    result = Products.objects.annotate(rank=SearchRank(vector, query)).filter(rank__gt=0).order_by("-rank")
    

    return result
    # keywords = [word for word in query.split() if len(word) > 2 ]

    # q_objects = Q()
    
    # for token in keywords:

    #     q_objects |= Q(description__icontains=token)
        
    #     q_objects |= Q(name__icontains=token)


    # return Products.objects.filter(q_objects)