# Journey Narrative — section imagery

Templated images for the reading page (`src/pages/journey/[token].astro`) and
the print/PDF output. The same set is used for every reading; each file maps to
one section by its semantic name. Sections not listed have no image file
(The Road of Trials, The Gauntlet, Am I Made for This Moment?, Who I Am).

Two sections instead carry **generated** diagrams (no image file needed): The
Shape of My Energy renders a centers bodygraph, and The Village Journey renders
the three Gene Keys sequence diagrams.

Expected files (drop them here, exact names):

| File                      | Section                          |
|---------------------------|----------------------------------|
| `cover.png`               | Cover (under the title)          |
| `01-ordinary-world.png`   | I — The Ordinary World           |
| `02-call.png`             | The Call                         |
| `03-threshold.png`        | The Threshold                    |
| `04-descent.png`          | The Descent                      |
| `05-abyss.png`            | The Abyss                        |
| `06-helpers.png`          | The Helpers and Allies           |
| `08-spiritual-path.png`   | The Spiritual Path               |
| `09-core-wound.png`       | The Core Wound and the Vocation  |
| `10-elixir.png`           | The Elixir                       |
| `11-voice.png`            | The Voice                        |
| `12-return.png`           | The Return                       |
| `14-larger-story.png`     | The Larger Story                 |

The filename → section mapping lives in `SECTION_IMAGES` in
`src/pages/journey/[token].astro`. If you change a filename, change it there too.

## Source swaps

- **The Descent** now uses
  `dactylic_vintage_graphic_design_poster_flat_color_screen_prin_2a71ddf0-ba70-4caa-859e-772e64b82a56_0.png`
  (saved here as `04-descent.png`), replacing the earlier
  `mythology/romano-psyche-ants-a.jpg`. Note the extension changed from `.jpg`
  to `.png`.
