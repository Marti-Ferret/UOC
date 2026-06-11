-Login: mferretce
-Nom: Martí Ferret Cedó

Descripció:
En aquesta pràctica he desenvolupat una aplicació d'e-commerce amb Angular.

A l'exercici 1 he creat serveis per gestionar els articles i la sessió de l'usuari.
A l'exercici 2 he connectat l'aplicació amb una API REST usant HttpClient i he implementat un interceptor per afegir el token d'autenticació a les peticions.
A l'exercici 3 he creat una pipe personalitzada per mostrar una imatge per defecte quan un article no en té, i he usat la pipe currency per mostrar els preus.
A l'exercici 4 he configurat el routing de l'aplicació amb diverses rutes i un guard que impedeix accedir a pàgines sense estar autenticat.
A l'exercici 5 he aplicat lazy loading perquè els mòduls d'usuari i d'articles es carreguen només quan l'usuari hi navega.

Errors:
1. Vaig tenir un error en el localstorage, la solució va ser utilitzar isPlatformBrowser + PLATFORM_ID, aquesta solució la vaig trobar a internet.