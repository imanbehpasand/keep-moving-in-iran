# Keep Moving in Iran

A browser-based survival game set in Iran during wartime, where a skateboarder must keep moving through a constantly changing field of missiles, Mullahs, and riot-control vehicles.

## About

I made *Keep Moving in Iran* during the 40-day US–Iran war.

The game takes the familiar structure of an endless survival game — similar to the Google Dinosaur game — and places it in a distinctly Iranian wartime environment.

The player controls a girl riding a skateboard. There is no destination and no way to stop. The only objective is to keep moving while recognizing and reacting to whatever appears in front of her.

The obstacles are deliberately drawn from the reality surrounding the game: missiles, Mullahs, and riot-control vehicles. Some must be jumped over, some require the player to duck, and one must actually be ridden.

What began as a small front-end game experiment became a way of turning a particular moment and its atmosphere into a simple interactive system: keep moving, react quickly, and find a way through.

## Gameplay

The game is built around a simple survival mechanic: the player continuously moves forward while obstacles approach from the opposite direction. Different obstacles require different reactions:

| Obstacle | Required Action |
|---|---|
| Rocket | Ride it to continue moving forward |
| Low-flying rocket | Sit down and lower your head |
| Mullah | Jump over it |
| Riot-control vehicle | Jump over it |
| Mullah-Rocket | Sit down and lower your head |

The challenge comes from recognizing each obstacle and responding with the correct movement before it reaches the player.

## Controls

| Key | Action |
|---|---|
| `Space` / `↑` | Jump |
| `↓` | Duck |

<!-- Update this table if your key bindings differ from the defaults above. -->

## Gameplay Video

<!-- Add a short clip or GIF here once available. A 5–10 second GIF loop
     embeds directly in this README and is the fastest way for a visitor
     to understand the game without leaving the page. -->

## Live Demo

**[Play Keep Moving in Iran](https://imanbehpasand.github.io/keep-moving-in-iran/)**

<!-- This link will only work once GitHub Pages is enabled for this repo:
     Settings → Pages → Deploy from branch → main → / (root). -->

## Development

*Keep Moving in Iran* was built as a front-end game experiment using HTML, CSS, and JavaScript. The project was developed without a game engine, using standard web technologies to handle the game environment, player movement, obstacle behavior, animation, and interaction.

The visual assets were created as SVG and PNG files and integrated directly into the game.

## Technical Challenges

**Player Movement**
The player needs to remain responsive while the game continuously moves forward. Different keyboard actions produce different responses depending on the obstacle approaching the player.

**Obstacle Interaction**
Each obstacle has its own required response. The game therefore combines different types of interaction rather than using a single jump-or-die mechanic.

**Collision Detection**
The game continuously checks the relationship between the player and incoming obstacles to determine whether the player successfully avoids them or collides with them.

**Animation**
Character and environmental movement are synchronized to create the feeling of a continuously moving game world.

## What I Learned

<!-- Draft based on what you told me — edit freely, this is a starting
     point in your voice, not a final version. -->

The biggest challenge was finding the best way to combine animation and code. Most developers don't have a separate background in animation — 2D or stop-motion — and having that background turned out to be a real advantage in building something that felt alive rather than mechanical.

But having the skills wasn't enough on its own. The harder part was system thinking: learning to structure the animation and the game logic so they could work together cleanly, instead of fighting each other. That process never really finishes — there's always a stronger way to build something, a faster way to get there, or a better result waiting on the other side of another iteration.

## Technologies

- HTML5
- CSS3
- JavaScript
- SVG
- PNG

## Features

- Endless survival gameplay
- Skateboarder character
- Keyboard-controlled movement
- Jump and duck mechanics
- Multiple obstacle types
- Obstacle-specific interactions
- Collision detection
- Character animation
- SVG-based visual assets
- Browser-based gameplay

## Screenshots

<!-- Add 2–3 screenshots here once available — one of normal gameplay,
     one mid-jump/duck, and one of the game-over screen works well. -->

## Running the Game Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/imanbehpasand/keep-moving-in-iran.git
   ```

2. **Move into the project folder**
   ```bash
   cd keep-moving-in-iran
   ```

3. **Open `index.html` in your browser**
   No build step or dependencies required — this is a pure HTML/CSS/JavaScript project. Double-clicking `index.html` works, but if you run into asset-loading issues, serving the folder with a simple local server (e.g. the VS Code "Live Server" extension) avoids browser file-access restrictions.

## License

<!-- Add a license if you want others to know what they can/can't do
     with this code — MIT is a common permissive default for personal
     projects if you're unsure which to pick. -->
