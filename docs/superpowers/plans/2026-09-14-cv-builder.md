# CV Builder Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Ship `/cv` wizard (create + upload) with PDF download and send-to-Hakamo.

**Architecture:** Client wizard in visual-kit; `jspdf` for PDF; fetch to Strapi `/api/candidatos` (JSON + optional file via FormData/API route).

**Tech Stack:** Next.js 16, React 19, jspdf, existing visual-kit styles, Strapi candidatos.

## Global Constraints
- Light/paper theme only on `/cv`
- Nav label: `Postúlate aquí`
- Flow C: Enviar a Hakamo primero, luego ofrecer Descargar PDF
- Match EmpleoForm graceful fallback if Strapi down

---

### Task 1: Nav label + deps
- [ ] Set `cvLabel` to `Postúlate aquí`
- [ ] `npm install jspdf`

### Task 2: Types + PDF helper
- [ ] `lib/cv/types.ts` — CvData, Experience, Education
- [ ] `lib/cv/generate-pdf.ts` — build Blob from CvData

### Task 3: Submit helper
- [ ] `lib/cv/submit-candidato.ts` — JSON + FormData upload paths

### Task 4: UI components
- [ ] `cv-builder.tsx` — multi-step wizard + review actions
- [ ] `cv-upload.tsx` — contact + file
- [ ] Wire into `cv-landing.tsx` replacing placeholder

### Task 5: Verify
- [ ] Lint clean; smoke-test flows mentally / build
