# Erwin Roy Arellano – Portfolio

Personal portfolio built with Next.js 16 (App Router), Tailwind CSS v4 and Framer Motion. Content lives in `src/data`, sections in `src/components`.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the SMTP values
npm run dev                  # http://localhost:3000
```

## Contact form (SMTP)

`POST /api/contact` sends the form through Nodemailer. Required environment variables:

| Variable        | Purpose                                      | Example            |
| --------------- | -------------------------------------------- | ------------------ |
| `smtp_email`    | SMTP login (the sending mailbox)             | `me@gmail.com`     |
| `smtp_password` | SMTP password or app password                | `abcd efgh ijkl`   |
| `smtp_port`     | `587` for STARTTLS, `465` for implicit TLS   | `587`              |
| `send_to_email` | Inbox that receives the messages             | `me@gmail.com`     |
| `smtp_host`     | Optional, defaults to `smtp.gmail.com`       | `smtp.gmail.com`   |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for social preview images; optional on Vercel (falls back to the production URL) | `https://erwinarellano.dev` |

For Gmail, enable 2-Step Verification and create an App Password; normal account passwords are rejected.

## Deploy

**Vercel:** import the repository, add the variables above in Project Settings → Environment Variables, deploy. `vercel.json` pins the Singapore region.

**Docker (any host):**

```bash
docker build -t erar-portfolio .
docker run -p 3000:3000 --env-file .env.local erar-portfolio
```

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
