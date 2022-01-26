Dodajemo novi model "companies" sa sledecim atributima:

- name - String
- logo - URL do slike
- slug - Ovu vrednost ne uzimate od usera, vec na osnovu imena "name" vi kreirajte slug
- createdAt
- updatedAt
  Relacije: one company has many profiles
  Rute:
  GET "/companies" - vraca najvise 20 companies
  POST "/companies" - novi unos
  GET "/companies/{id}" - vraca jedan company
  PUT "/companies/{id}" - update
  DELETE "/companies/{id}" - brisanje

I za postojeci "user" model dodajte novi atribut "role" koji moze imati sledece vrednosti
company-user
company-admin
superadmin
