# Atom triangle

The component simply displays a triangle based around some properties. It hides the necessary CSS properties to achieve the result.

## Properties

| Name | Default | Type | Description |
|------|---------|------|-------------|
| direction | | 'up' &#124; 'down' &#124; 'left' &#124; 'right' &#124; 'up-left' &#124; 'up-right' &#124; 'down-left' &#124; 'down-right' | The direction the triangle is pointing to. |
| height | | number | The height of the triangle |
| width | | number | The width of the triangle |
| color | 'inherit' | string | The filling color of the triangle. The default is the default value of the browser. |
| tag | 'span' | 'div' &#124; 'span' | The used HTML tag. Dependening on the situation it is necessary to change to the tag name to div. Especially due to global styles and side effects of other styles. |
| ratio | 2.0 | number | The ratio for the calculated width of the triangle. |

## Showcase

[[ Embed: "./demo.js" as "Triangles" title="The possible directions of the triangle" ]]
