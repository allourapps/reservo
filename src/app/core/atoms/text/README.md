# Atom: Text

This atom should be used for every kind of text visualization since it covers nearly all default styles from the designer.

## Props

| Name | Default | Type | Description |
|------|---------|------|-------------|
| **children?** | | string &#124; any | |
| **bold?** | | boolean | |
| **thin?** | | boolean | Sets the fontWeight to 300 |
| **color?** | "default" | "default" &#124; "primary" &#124; "secondary" &#124; "warning" &#124; "alert" &#124; "success" &#124; string | You can use one of the predefined values or a custom color hash. |
| **soft?** | | boolean | Sets the color to a soft gray |
| **hard?** | | boolean | Sets the color to a hard black |
| **textTransform?** | | string | Shortcut to set the text-transform css value |
| **fontWeight?** | 400 | number | |
| **fontSize?** | 14 | number &#124; string | |
| **small?** | | boolean | Sets the fontSize to 12px |
| **large?** | | boolean | Sets the fontSize to 16px |
| **xlarge?** | | boolean | Sets the fontSize to 24px |
| **style?** | | Object | |
| **headline?** | | boolean | Sets the fontSize to 24px and the color to primary |
| **verticalSpacing?** | false | boolean &#124; number &#124; string | if it's true, the marginTop and -Bottom values will be 1rem. Otherwise you can set a custom margin as a number or a string. |



## Showcase


[[ Embed: "./demo.js" as "Texts" ]]
