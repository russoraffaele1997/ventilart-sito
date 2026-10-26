#!/bin/sh
# Prepara la cartella pubblico/ che Vercel mette online:
# il sito nuovo (_proposte) alla radice del dominio, con la home come index.html,
# senza bozze, file di lavoro e note interne.
set -e
rm -rf pubblico
mkdir pubblico
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
