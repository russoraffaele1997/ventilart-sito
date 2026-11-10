#!/bin/sh
# Prepara la cartella pubblico/ che Vercel mette online:
# il sito nuovo (_proposte) alla radice del dominio, con la home come index.html,
# senza bozze, file di lavoro e note interne.
set -e
rm -rf pubblico
mkdir pubblico

# MODALITÀ MANUTENZIONE: se esiste il file MANUTENZIONE-ATTIVA, online va solo la pagina
# "Stiamo rinnovando il sito" (anche al posto di ogni altro indirizzo).
# Per rimettere online il sito completo basta cancellare il file MANUTENZIONE-ATTIVA.
if [ -f MANUTENZIONE-ATTIVA ]; then
  mkdir pubblico/assets
  cp -r assets/logo pubblico/assets/logo
  cp -r assets/firma pubblico/assets/firma   # logo delle firme email: deve restare online
  cp online/favicon.svg online/v.svg pubblico/
  cp manutenzione/index.html pubblico/index.html
  cp manutenzione/index.html pubblico/404.html
  exit 0
fi

cp -r _proposte/. pubblico/
cp -r assets pubblico/assets
cp online/favicon.svg online/v.svg pubblico/
mv pubblico/d-moderno.html pubblico/index.html
rm -f pubblico/_genera-pagine.js pubblico/blog/_genera.js
rm -f pubblico/a-galleria.html pubblico/b-studio.html pubblico/c-preventivo.html
rm -f pubblico/assets/foto/FONTI.md
# i link alla home puntano a "/" invece che a d-moderno.html
find pubblico -name '*.html' -exec sed -i 's#"\(\.\./\)\{0,1\}d-moderno\.html#"/#g' {} +
sed -i "s#BASE + 'd-moderno.html\#contatti'#'/\#contatti'#" pubblico/chat/chat.js
# le pagine del blog si aprono sia da /blog che da /blog/: i loro link relativi partono sempre da /blog/
sed -i 's#<head>#<head>\n<base href="/blog/">#' pubblico/blog/*.html
