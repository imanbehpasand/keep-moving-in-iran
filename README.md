# Keep Moving in Iran

A browser-based survival game set in Iran during wartime, where a skateboarder must keep moving through a constantly changing field of missiles, Mullahs, and riot-control vehicles.

![Keep Moving in Iran](image%20%26%20video/poster-skater.png)

## About

I made Keep Moving in Iran during the 40-day US–Iran war.

The game takes the familiar structure of an endless survival game—similar to the Google Dinosaur game—and places it in a distinctly Iranian wartime environment.

The player controls a girl riding a skateboard. There is no destination and no way to stop. The only objective is to keep moving while recognizing and reacting to whatever appears in front of her.

The obstacles are deliberately drawn from the reality surrounding the game: missiles, Mullahs, and riot-control vehicles. Some must be jumped over, some require the player to duck, and one must actually be ridden.

What began as a small front-end game experiment became a way of turning a particular moment and its atmosphere into a simple interactive system: keep moving, react quickly, and find a way through.

## Gameplay

The game is built around a simple survival mechanic: the player continuously moves forward while obstacles approach from the opposite direction.

Different obstacles require different reactions:

- **Rocket** — ride it to continue moving forward.
- **Low-flying rocket** — sit down and lower your head.
- **Mullah** — jump over it.
- **Riot-control vehicle** — jump over it.
- **Mullah-Rocket** — sit down and lower your head.

The challenge comes from recognizing each obstacle and responding with the correct movement before it reaches the player.

## Gameplay Video

![](VIDEO-LINK)

## Live Demo

[Play Keep Moving in Iran](YOUR-LIVE-GAME-LINK)

> The live version is currently an older version of the game. The link will be updated when the latest version is deployed.

## Development

Keep Moving in Iran was built as a front-end game experiment using HTML, CSS, and JavaScript.

The project was developed without a game engine, using standard web technologies to handle the game environment, player movement, obstacle behavior, animation, and interaction.

The visual assets were created as SVG and PNG files and integrated directly into the game.

## Technical Challenges

### Player Movement

The player needs to remain responsive while the game continuously moves forward. Different keyboard actions produce different responses depending on the obstacle approaching the player.

### Obstacle Interaction

Each obstacle has its own required response. The game therefore combines different types of interaction rather than using a single jump-or-die mechanic.

### Collision Detection

The game continuously checks the relationship between the player and incoming obstacles to determine whether the player successfully avoids them or collides with them.

### Animation

Character and environmental movement are synchronized to create the feeling of a continuously moving game world.

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

![Keep Moving in Iran](image%20%26%20video/poster-skater-1.png)

![Keep Moving in Iran](image%20%26%20video/poster-skater-2.png)

![Skater character](image%20%26%20video/skater-character.png)

## Running the Game Locally

### 1. Download the repository

Clone the repository using Git:

```bash
git clone https://github.com/imanbehpasand/keep-moving-in-iran.git
