# 🔐 DevSecOps CI/CD Security Pipeline

This project demonstrates a full DevSecOps pipeline integrating **SAST (CodeQL)**, **Dependency Scanning (npm audit)**, and **DAST (OWASP ZAP)** inside **GitHub Actions**.

The pipeline automatically:
- Detects code vulnerabilities using **CodeQL**.
- Runs dependency vulnerability checks on both a *vulnerable app* and a *secure app*.
- Performs dynamic penetration testing via **OWASP ZAP** on each running web service.
- Uploads detailed HTML & JSON scan reports as build artifacts.

---

## 🧩 Architecture

```text
             ┌────────────┐
             │  CodeQL    │──▶ SAST Report
             └────────────┘
                    │
                    ▼
          ┌─────────────────────┐
          │ npm audit (vuln/sec)│──▶ Dependency Vulnerabilities
          └─────────────────────┘
                    │
                    ▼
           ┌────────────────┐
           │ ZAP DAST Scans │──▶ HTML/JSON Reports
           └────────────────┘
                    │
                    ▼
          ✅ Security Gate Enforced
```
---

## 🧠 Security Pipeline Overview

The pipeline automatically runs on every `push` or `pull_request` event and executes three main security gates:

| Stage | Tool | Type | Description |
|--------|------|------|--------------|
| 🧩 Stage 1 | **CodeQL** | SAST | Scans JavaScript code for logical and injection vulnerabilities |
| 📦 Stage 2 | **npm audit** | Dependency | Flags outdated or vulnerable libraries |
| 🔍 Stage 3 | **OWASP ZAP** | DAST | Performs dynamic analysis against running apps (Juice Shop & Secure App) |

---

## ⚙️ CI/CD Flow Diagram

```text
 Developer Commit
        │
        ▼
 ┌─────────────┐
 │  GitHub CI  │
 └─────────────┘
        │
        ├──▶ CodeQL (SAST)
        │       ↓
        │   Alerts (SARIF)
        │
        ├──▶ npm audit (Vuln vs Secure)
        │       ↓
        │   Dependency report
        │
        ├──▶ OWASP ZAP (DAST)
        │       ↓
        │   HTML/JSON Reports
        │
        ▼
   Merge Blocked if High/Critical Vulns
```
## 📊 Results Dashboard
| App            | Tool      | Expected Result               | Artifact                                                   |
| -------------- | --------- | ----------------------------- | ---------------------------------------------------------- |
| **/vuln**      | npm audit | ❌ High/Critical vulns         | –                                                          |
| **/secure**    | npm audit | ✅ Pass                        | –                                                          |
| **Juice Shop** | OWASP ZAP | ❌ Multiple High/Medium alerts | [zap-report-juice-shop.html](./zap-report-juice-shop.html) |
| **Secure App** | OWASP ZAP | ✅ 0 High alerts               | [zap-report-secure.html](./zap-report-secure.html)         |

---

## 📸 Visual Results
🔴 Vulnerable App (Juice Shop)
<p align="center"> <img src="docs/zap-juice-report.png" width="700" alt="ZAP Juice Shop Report"> </p>
🟢 Secure App
<p align="center"> <img src="docs/zap-secure-report.png" width="700" alt="ZAP Secure Report"> </p>
