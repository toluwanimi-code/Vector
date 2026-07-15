# Vector

**Know where you stand. Know what's next.**

Vector is an AI career diagnostic tool for aspiring developers. It asks ten questions about your learning habits, project history, and real-world validation, then uses Google's Gemini API to return an honest, structured diagnosis of where you actually stand — not where you hope you stand.

Built for the [Hack Club Stardance](https://hackclub.com/) hackathon.

🔗 **Live:** [stardance-vector.netlify.app](https://stardance-vector.netlify.app)

---

## What it does

You answer a short assessment — mix of multiple-choice and short text questions — covering:

- How you spend your learning time
- Whether you've shipped projects without following a tutorial
- Whether anything you've built is public or has been used by someone else
- Whether you've applied for internships or freelance work

Vector classifies you into one of five stages — **Learning, Builder, Internship Ready, Market Validation, Founder Readiness** — and gives you an explanation, a reality check, and concrete next steps. The prompt is explicitly instructed not to flatter you: if your effort doesn't match your output, it says so.

## Stack

- HTML / CSS / vanilla JavaScript — no framework
- [Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`) for the diagnosis
- Netlify Functions — the Gemini call happens server-side so the API key never reaches the client
- Deployed on Netlify

## Project structure

```
.
├── index.html
├── main.css
├── script.js                    # question engine, state, results rendering
├── netlify.toml
└── netlify/
    └── functions/
        └── gemini.js             # server-side Gemini call
```

## Running it locally

You'll need the [Netlify CLI](https://docs.netlify.com/cli/get-started/) since the Gemini call goes through a Netlify Function, not a client-side key.

```bash
npm install -g netlify-cli
git clone https://github.com/toluwanimi-code/Vector.git
cd Vector
```

Create a `.env` file in the project root:

```
GEMINI_API_KEY=your_key_here
```

Then run:

```bash
netlify dev
```

This serves the site and runs the function locally so `/.netlify/functions/gemini` resolves.

## Notes on the build

- The API key is never exposed client-side — the frontend calls `/.netlify/functions/gemini`, and the function reads the key from an environment variable.
- The diagnosis prompt returns strict JSON, which the frontend parses and renders.

## License

MIT — see [LICENSE](./LICENSE).

## Author

Built by [Toluwanimi](https://github.com/toluwanimi-code) as part of a build-in-public journey toward a frontend internship.
