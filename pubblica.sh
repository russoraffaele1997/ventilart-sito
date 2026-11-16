#!/bin/sh
# Prepara la cartella pubblico/ che Vercel mette online:
# il sito ufficiale (mockup/) alla radice del dominio, senza script e file di lavoro.
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

# SITO UFFICIALE (dal 16/11/2026): le pagine di mockup/ alla radice del dominio.
# (Il sito precedente, _proposte/, resta nel repository ma non va più online.)
cp mockup/*.html pubblico/
cp -r assets pubblico/assets
cp online/favicon.svg online/v.svg pubblico/
rm -f pubblico/assets/foto/FONTI.md
# percorsi assoluti: le pagine stanno alla radice, non più in /mockup/
sed -i 's#"\.\./assets/#"/assets/#g; s#href="index\.html\#\([^"]*\)"#href="/\#\1"#g; s#href="index\.html"#href="/"#g' pubblico/*.html
sed -i 's#<meta charset="utf-8">#<meta charset="utf-8">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">#' pubblico/*.html
cp pubblico/index.html pubblico/404.html
# motori di ricerca: robots.txt e mappa del sito
printf 'User-agent: *\nAllow: /\nSitemap: https://www.ventilart.it/sitemap.xml\n' > pubblico/robots.txt
{
  echo '<?xml version="1.0" encoding="UTF-8"?>'
  echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  for p in "" chi-siamo metodo contatti sistema-ceramico sistema-fibrocemento sistema-wpc sistema-alluminio-composito privacy cookie; do
    echo "  <url><loc>https://www.ventilart.it/$p</loc></url>"
  done
  echo '</urlset>'
} > pubblico/sitemap.xml
