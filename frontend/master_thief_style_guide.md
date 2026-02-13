# Master Thief -- Tailwind Style Guide (Noir/Heist Edition)

## 1. Core Visual Themes

Your visual direction should evoke: - **Noir crime drama** -- deep shadows, harsh contrast, neon
accents - **High‑tech heist planning** -- HUD‑style UI elements, subtle grids & glows - **Payday /
bank robbery fantasy** -- blue‑tinted darkness, blueprint vibes

## Color Palette (Tailwind tokens)

Purpose Color

---

Background \`bg-\[#0B0F17\]\` Elevated surfaces \`bg-\[#111827\]\` HUD panels \`bg-\[#161B22\]
border border-\[#1F2937\]\` Text primary \`text-gray-200\` Text secondary \`text-gray-400\` Neon
Accent \`text-cyan-400\` Money \`text-amber-300\` Stealth Purple \`text-purple-400\`

## 2. UI Layout & Components

### Background

\`\`\` bg-gradient-to-b from-\[#0B0F17\] to-\[#0D121C\] \`\`\`

### HUD Navigation Bar

\`\`\` bg-\[#111827\]/60 backdrop-blur-sm border-b border-\[#1F2937\] \`\`\`

## 3. Dashboard Cards

\`\`\` bg-\[#161B22\] border border-\[#1F2937\] rounded-xl p-6 shadow-lg shadow-black/40
hover:shadow-cyan-500/10 hover:border-cyan-400/30 transition-all \`\`\`

## 4. UX Enhancements

- Highlight actionable buttons
- Slow pulse animations
- Hover elevation
- Cinematic noir vignette

## 5. Iconography

Use Heroicons or Lucide thin-line icons with purposeful color coding.
