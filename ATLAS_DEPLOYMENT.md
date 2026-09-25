# Atlas Terminal deployment

Dockerfile.railway builds this fork's actual Go backend and React frontend.
Mount a persistent volume at /app/data. The SQLite database and generated
encryption/signing keys persist together. No exchange or AI provider credentials
are included. No public domain is needed.

The health route checks the backend instead of returning static success.
If either nginx or the backend exits, the container exits for Railway recovery.
Upstream licenses and original application capabilities are retained.

Native AI/trading workflows still require owner configuration and verification.
Kraken execution belongs to Freqtrade; this fork does not claim a NOFX Kraken
connector. Atlas currently authorizes paper trading only.
