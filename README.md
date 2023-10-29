# p5-Sokoban
A simple Sokoban game in p5.js: https://clocktown.github.io/p5-Sokoban/

Move with arrow keys, reset the level with ESC. The goal is to move both of the boxes (minecraft logs) onto the golden platforms.

There is no undo yet, and the game won't even tell you that you won - it is very minimalistic.

You can also load/edit levels in the typical Sokoban ASCII notation and change how many pixels a single cell in the game takes up.

See: http://sokobano.de/wiki/index.php?title=Level_format for the notation.

Currently, going out of bounds is not handled at all. Make sure your level has proper walls so that cannot happen. There is also no checks if the level is properly defined, i.e. if the number of goals match the number of boxes to move, that there is only one player, etc.
