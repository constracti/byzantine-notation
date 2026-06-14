# Glyphs

Glyphs were originally displayed loading the _Byzantina_ (BZ*) font package, designed by _Stefanos Souldatos_.
This collection was selected as it is compliant with existing byzantine music writing software (e.g. [MK](https://papline.gr)) and is consistent with [various other packages](https://mega.nz/#!uU0AWRiY!GsdhdJlOTJSPAoC4ocjEyja_9BJcJDOmUmRC7p5FEZc).

However, rendering of fonts isn't consistent across different browsers and operating systems.
Fonts appear with different ascent, descent, and total height values.
The problem persists even if other collections are used, like the [EZ package](https://stanthonysmonastery.org/pages/writing-with-byzantine-notation).

Glyphs are aligned correctly only when `align-items: baseline;` is selected on the container element.
Still, this setting does not expose the baseline offset from the top or the bottom of the block.
Therefore, position of the layers can not be determined.

Consequently, glyphs are extracted as SVG files, running the following FF script in the [FontForge](https://fontforge.org/) editor:

```
SelectAll()
UnlinkReference()
Export("/home/user/svg/%u.svg")
```

Syntax instructions can be found in the [documentation](https://fontforge.org/docs/scripting/scripting-alpha.html#Export) of the `export` function.

Vertical [viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/viewBox) values of the `svg` element of all resulting files are `position: 0` and `dimension: 2048`.
This configuration hides content above the glyph baseline when loaded on a browser.
A simple `sed` command is applied to replace the above values with `position: -4096` and `dimension: 6144`.

```bash
sed -i -E 's/ 0 ([[:digit:]]+) 2048/ -4096 \1 6144/g' *.svg
```

Now all glyphs can be displayed uniformally on every environment.
