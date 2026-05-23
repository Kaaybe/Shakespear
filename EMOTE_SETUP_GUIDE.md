# Dynamic Country Emote Carousel Setup Guide

This version makes the animation carousel **country-specific**.

When a user selects Kenya, the carousel reads Kenya's emotes from `script.js` and shows only Kenya's buttons. When the user selects another country, the carousel is rebuilt from that country's own emote setup.

## 1. Important project structure

```text
shakespearasmus-characters/
├── index.html
├── style.css
├── script.js
├── character.glb
└── models/
    └── kenya/
        └── emotes/
            ├── idle.glb
            ├── greeting.glb
            ├── thinking.glb
            ├── dramatic-speech.glb
            ├── bowing.glb
            ├── laughing.glb
            └── storytelling.glb
```

The Kenya emote files are placeholders. Replace them with your real animated `.glb` exports.

## 2. Where the dynamic carousel is controlled

Open `script.js`.

The carousel no longer uses one fixed global emote list for every country. It uses each selected country's own data.

Kenya currently has this setup:

```js
kenya: {
  flag: "🇰🇪",
  country: "Kenya",
  name: "Kiprono the Bard",
  ...

  modelSrc: "character.glb",
  emoteFolder: "models/kenya/emotes",
  emoteFiles: {
    idle: "idle.glb",
    greeting: "greeting.glb",
    thinking: "thinking.glb",
    speech: "dramatic-speech.glb",
    bowing: "bowing.glb",
    laughing: "laughing.glb",
    storytelling: "storytelling.glb"
  }
}
```

Only the emotes listed inside that country's `emoteFiles` object will appear in the carousel.

## 3. How to give every country different emotes

For each country, add its own `modelSrc`, `emoteFolder`, and `emoteFiles`.

Example for Japan:

```js
japan: {
  flag: "🇯🇵",
  country: "Japan",
  name: "Haruto the Noh Bard",
  ...

  modelSrc: "models/japan/emotes/idle.glb",
  emoteFolder: "models/japan/emotes",
  emoteFiles: {
    idle: "idle.glb",
    bowing: "bowing.glb",
    prayer: "prayer.glb",
    storytelling: "storytelling.glb"
  }
}
```

This means Japan will show only:

```text
Idle pose
Bowing
Prayer
Storytelling
```

It will not show Kenya's `laughing`, `greeting`, or `speech` emotes unless you add them to Japan's `emoteFiles`.

## 4. Where to place files for each country

Use one folder per country:

```text
models/japan/emotes/idle.glb
models/japan/emotes/bowing.glb
models/japan/emotes/prayer.glb
models/japan/emotes/storytelling.glb
```

Another example:

```text
models/south-africa/emotes/idle.glb
models/south-africa/emotes/dance.glb
models/south-africa/emotes/victory.glb
```

Then link them like this:

```js
southAfrica: {
  ...
  modelSrc: "models/south-africa/emotes/idle.glb",
  emoteFolder: "models/south-africa/emotes",
  emoteFiles: {
    idle: "idle.glb",
    dance: "dance.glb",
    victory: "victory.glb"
  }
}
```

South Africa's carousel will show only three emotes.

## 5. Custom labels for special emotes

The project has a master list called `emoteDefinitions` in `script.js`.

You can add reusable emotes there:

```js
const emoteDefinitions = {
  idle: { id: "idle", label: "Idle pose", className: "idle", animationName: "Idle", fileName: "idle.glb" },
  greeting: { id: "greeting", label: "Greeting", className: "greeting", animationName: "Greeting", fileName: "greeting.glb" },
  dance: { id: "dance", label: "Dance", className: "storytelling", animationName: "Dance", fileName: "dance.glb" }
};
```

Then any country can use:

```js
emoteFiles: {
  dance: "dance.glb"
}
```

## 6. Fully custom per-country emotes

If a country needs a unique label or file name, use an `emotes` array instead of `emoteFiles`.

Example:

```js
kenya: {
  ...
  modelSrc: "character.glb",
  emoteFolder: "models/kenya/emotes",
  emotes: [
    { id: "idle", label: "Calm warrior pose", fileName: "idle.glb" },
    { id: "jump", label: "Maasai jumping dance", className: "storytelling", animationName: "Jump", fileName: "maasai-jump.glb" },
    { id: "speech", label: "Elder speech", fileName: "dramatic-speech.glb" }
  ]
}
```

This gives you full control over the carousel labels.

## 7. The dynamic JavaScript functions

These functions now handle the country-specific carousel:

```js
getCountryEmotes(data)
buildEmoteCarousel(activeEmotes)
setEmote(0)
```

Whenever the country changes, the project does this:

```js
activeEmotes = getCountryEmotes(data);
buildEmoteCarousel(activeEmotes);
setEmote(0);
```

So the carousel is destroyed and rebuilt for the selected country.

## 8. How to run locally

Because browsers often block local 3D model loading when opening `index.html` directly, run a local server.

### Option A: VS Code Live Server

1. Open the `shakespearasmus-characters` folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

### Option B: Python local server

Open a terminal in the `shakespearasmus-characters` folder and run:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## 9. Notes for Tripo AI exports

- Export each animation as `.glb`.
- Keep filenames simple: lowercase letters, hyphens, no spaces.
- Keep each country's emote files inside that country's folder.
- Use the same character scale/origin for every emote so the model does not jump around.
- If an emote does not load, check the browser console. The most common cause is a wrong folder path or filename.
