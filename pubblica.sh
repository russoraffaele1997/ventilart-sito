#!/bin/sh
# Prepara la cartella pubblico/ che Vercel mette online:
# solo il sito nuovo (_proposte) e le foto, senza bozze, file di lavoro e note interne.
set -e
rm -rf pubblico
mkdir pubblico
cp -r _proposte assets pubblico/
cp online/favicon.svg online/v.svg pubblico/
rm -f pubblico/_proposte/_genera-pagine.js pubblico/_proposte/blog/_genera.js
rm -f pubblico/_proposte/a-galleria.html pubblico/_proposte/b-studio.html pubblico/_proposte/c-preventivo.html
rm -f pubblico/assets/foto/FONTI.md
