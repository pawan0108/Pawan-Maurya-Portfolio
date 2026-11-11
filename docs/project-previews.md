# Project preview provenance

Captured 11 November 2026 from public homepages using local Chrome and Playwright. These are new captures, not restored legacy portfolio assets. No authenticated pages, forms, consent buttons, payments, or wallet operations were exercised.

| Asset under `src/assets/images/projects/` | Requested/final destination                       | Result                                       | Size          |
| ----------------------------------------- | ------------------------------------------------- | -------------------------------------------- | ------------- |
| `om-sanskaram.jpg`                        | HTTP URL redirected to `https://omsanskaram.com/` | HTTP 200; public puja/service/store homepage | 138,258 bytes |
| `codetrex-redesign.jpg`                   | `https://codetrex.in/`                            | HTTP 200; current public company homepage    | 134,961 bytes |
| `yashvi-infosys.jpg`                      | `https://yashviinfosys.in/`                       | HTTP 200; public IT services homepage        | 80,027 bytes  |

The table describes the original 1280×800 JPEG captures (quality 80, total 353,246 bytes). Phase 09 replaces their runtime copies with content-preserving WebP encodes at quality 82 in 640×400, 800×500, and 1280×800 sizes. `srcset`/`sizes` selects a suitable variant, with descriptive alt, matching aspect ratio, intrinsic dimensions, lazy loading, and async decoding. The three 800px files total 122,194 bytes; the 640px set totals 94,114 bytes. Source capture candidates remain in ignored `preview-captures.local/`; original JPEGs are not shipped. Vite emits hashed assets; do not edit `dist/` or reference generated filenames in data.

The first Yashvi capture occurred before its entrance reveal finished and was rejected after visual inspection. The promoted version waits for visible heading opacity. No screenshot was synthesized, composited, or retouched. The Codetrex cookie banner remains part of the public capture; no consent was granted to remove it.

Captions distinguish ongoing Om Sanskaram development, the current Codetrex website (not established as the final redesign), and Yashvi's independent client work. Client-site claims visible inside screenshots are not Pawan's personal statistics or endorsements. Ownership and implementation contributions remain user-reported.

## Updating captures

Run `node scripts/capture-project-previews.mjs` with network access and locally installed Chrome. Optionally pass project IDs to refresh specific candidates. Candidates and a capture report are written to ignored `preview-captures.local/`. Inspect candidates before copying them into `src/assets/images/projects/` and updating preview metadata.

After capturing and inspecting JPEG candidates, run `node scripts/optimize-project-previews.mjs` to generate the three WebP sizes into `src/assets/images/projects/`. The encoder uses local Chrome canvas on local image bytes; no remote requests or content alterations. Preview metadata references those variants. Inspect the outputs and run the production tests after asset changes.

The capture script is read-only toward remote websites. A successful HTTP response or screenshot is not proof of full application functionality. Keep project-specific stacks empty until confirmed. Omit absent code links. The text-led fallback in `ProjectPreview` supports deliberately missing previews; content validation catches missing referenced files before release.
