# Threat Model (STRIDE)
Scope: /vuln, /secure, GitHub Actions. DAST targets: Juice Shop (fail), secure app (pass).

Top risks & mitigations:
1) Secrets exposure in CI → repo/ORG secrets, least privilege.
2) Supply chain risk → lock versions; audit; later: SBOM.
3) DAST false positives → gate only on High (`-l High`).
4) Web misconfig → Helmet, cookie flags, HSTS.
5) PR from forks → minimal permissions; avoid `pull_request_target`.
