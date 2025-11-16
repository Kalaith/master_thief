
# 🎨 Style Guide — Mafia Noir Heist Theme

## 🎭 Overall Tone
- **Atmosphere:** Sophisticated, shadowy, and dangerous. A mix of **noir intrigue** and **mafia power fantasy**.  
- **Narrative Voice:** Sharp, witty, and conspiratorial. Characters talk like insiders in a secret world.  
- **Influences:** *The Godfather, Goodfellas, Ocean’s Eleven, Mafia II*, and *Peaky Blinders*.  

---

## 🎨 Visual Art Direction

### Color Palette
- **Primary:** Deep blacks, smoky grays, and blood reds.  
- **Accents:** Gold (wealth, power), emerald green (money), royal purple (prestige).  
- **Mood Lighting:** Neon reflections and chiaroscuro (light/dark contrasts).  

### Character Design
- **Silhouettes:** Clean, distinct shapes—recognizable hats, coats, weapons, or props.  
- **Style:** A mix of **1930s–1960s mafia fashion** with **modern stylization**.  
  - Pinstripe suits, fedoras, trench coats, suspenders, cigars, leather gloves.  
  - Mixed with modern tactical gear and gadgets.  

### UI & HUD
- **Frames & Panels:** Brass or gold trim with subtle texture (like cigar box engravings).  
- **Fonts:**  
  - **Headers:** Elegant serif fonts.  
  - **Body/UI Text:** Clean sans-serif for readability.  
- **Icons:** Minimalist silhouettes (gun, mask, lockpick, diamond).  

---

## 🖼️ Mood & Environment

- **Heist Locations:** Speakeasies, smoky casinos, banks with marble floors, art museums, luxury trains, corporate towers.  
- **Backgrounds:** Low-saturation cityscapes, rain-slick streets, neon signs reflecting off wet pavement.  
- **Animation Style:** Smooth, cinematic transitions—like flipping dossiers or opening briefcases.  

---

## 🎭 Character Flavor

- **Common Tier:** Street-level crooks, getaway drivers, lookouts. Rough clothes, brass knuckles, cheap pistols.  
- **Uncommon Tier:** Rising mafiosos, hustlers, slick talkers. Better-dressed, unique quirks.  
- **Rare Tier:** Hitmen, con artists, cat burglars—sharp outfits, iconic props.  
- **Epic Tier:** Caporegimes, master strategists, enforcers. Distinct mafia flair with modern weapons.  
- **Legendary Tier:** Kingpins, masterminds, legendary thieves. Lavish clothing, gold accents, dramatic visual effects.  

---

## 🎶 Audio Direction
- **Music:** Swing jazz, smoky lounge piano, big band with modern beats.  
- **Ambient:** Clinking glasses, footsteps on marble, police sirens in the distance.  
- **Character Sounds:** Quirky catchphrases in mob slang or noir one-liners.  

---

## 💡 Key Engagement Hooks
- **Mafia Fantasy Fulfillment:** Run a syndicate, not just a gang.  
- **Luxury Aesthetic:** Gold, velvet, cigars, whiskey visuals.  
- **Stylized Violence:** PG-13 implied action, not gore.  

---

# 🎨 TailwindCSS Style Guide – Mafia Noir Palette

## ⚙️ Tailwind Config Extension
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        noir: {
          50:  '#f5f5f5',
          100: '#e5e5e5',
          200: '#c2c2c2',
          300: '#a3a3a3',
          400: '#737373',
          500: '#4a4a4a',
          600: '#2f2f2f',
          700: '#1f1f1f',
          800: '#141414',
          900: '#0a0a0a',
        },
        blood: {
          500: '#8b0000',
          600: '#600000',
          700: '#3b0000',
        },
        gold: {
          300: '#ffd166',
          400: '#e6b422',
          500: '#b8860b',
        },
        emerald: {
          400: '#50c878',
          500: '#046307',
        },
        royal: {
          400: '#9370db',
          500: '#663399',
        },
        rarity: {
          common: '#737373',
          uncommon: '#046307',
          rare: '#9370db',
          epic: '#8b0000',
          legendary: '#e6b422',
        },
      },
    },
  },
};
```

---

## 🖌️ Usage Examples

### Backgrounds
```html
<div class="bg-noir-900 text-gold-300 p-6">
  <h1 class="text-blood-500 font-serif text-3xl">Master Thief: Criminal Empire</h1>
  <p class="text-noir-200">Build your syndicate. Rule the streets.</p>
</div>
```

### Buttons
```html
<button class="bg-blood-500 hover:bg-blood-600 text-gold-300 px-4 py-2 rounded-lg shadow-lg">
  Start Heist
</button>

<button class="bg-gold-400 hover:bg-gold-500 text-noir-900 px-4 py-2 rounded-lg shadow-lg">
  Recruit Specialist
</button>
```

### Cards
```html
<div class="bg-noir-800 border-2 border-gold-500 rounded-xl p-4 shadow-xl">
  <h2 class="text-gold-300 font-bold text-xl">Velvet Vox</h2>
  <p class="text-noir-200">Legendary con artist with a voice that kills.</p>
</div>
```

### Rarity Labels
```html
<span class="text-rarity-common">Common</span>
<span class="text-rarity-uncommon">Uncommon</span>
<span class="text-rarity-rare">Rare</span>
<span class="text-rarity-epic">Epic</span>
<span class="text-rarity-legendary">Legendary</span>
```

### Summon Gradient
```html
<div class="bg-gradient-to-r from-rarity-common via-rarity-epic to-rarity-legendary p-6 rounded-lg">
  <p class="text-noir-900 font-bold text-center">Summoning...</p>
</div>
```

---

## 🎲 Tier Breakdown

- **Common (Gray/Smoky):** Gritty street-level thieves.  
- **Uncommon (Emerald Green):** Wealth-driven hustlers.  
- **Rare (Royal Purple):** Stylish, unique specialists.  
- **Epic (Blood Red):** Dangerous, dramatic, high-stakes.  
- **Legendary (Gold):** Icons of the underworld, crime lords.  
