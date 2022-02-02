Malo cemo se sada pozabaviti autentifikacijom.
Dakle imamo JWToken koji do sada nismo koristili, pa cemo to da malo promenimo.
Prvo cemo da izmenimo nas "/register". Register ce sada da pravi novog usera + profile + company. Znaci za svakog usera cemo kreirati i ova dva modela koja su vezana za tog usera. To takodje znaci da za register nam treba vise podataka od samog usera, nego sto je to bio do sada slucaj.

Hmm... Neka bude one to many. Jedan user moze imati vise kompanija.
Ova kompanija sto kreiramo kad se registruje je neka default kompanija za tog usera. Znaci on ne mora da unese company name/logo jer cemo to da ostavimo kao opciono. Ako ne unese podatke za kompaniju, mi cemo je svakako kreirati. Neki default logo za kompaniju i ime kompanije ce biti: "{Username}'s company". A user ce svakako kasnije moci da menja podatke ili da kreira nove kompanije

JWT cemo slati u headeru kao:
Authorization: Bearer {JWT}

I samo user koji je vlasnik profila/kompanije moze da vrsi izmene. Znaci sve osim GET req mora biti provereno

To cemo raditi pomocu strategija i passport.js bibl

Imacemo zasad dve strategije: local i jwt

Local koristimo za "/login" i to je klasicno username/email i password

JWT strategija nam je potrebna za ostale rute

passport.authenticate("jwt", { session: false }), i
passport.authenticate("local", { session: false }),

Od paketa dodajemo:
passport
passport-jwt
passport-local
