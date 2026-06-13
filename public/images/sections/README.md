# Journey Narrative — section imagery

Templated images for the reading page (`src/pages/journey/[token].astro`) and
the print/PDF output. The same set is used for every reading; each file maps to
one section by its semantic name. Sections not listed render text-only
(The Shape of My Energy, The Road of Trials, The Gauntlet, Am I Made for This
Moment?, The Village Journey, Who I Am).

Expected files (drop them here, exact names):

| File                      | Section                          |
|---------------------------|----------------------------------|
| `cover.png`               | Cover (under the title)          |
| `01-ordinary-world.png`   | I — The Ordinary World           |
| `02-call.png`             | The Call                         |
| `03-threshold.png`        | The Threshold                    |
| `04-descent.jpg`          | The Descent                      |
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
