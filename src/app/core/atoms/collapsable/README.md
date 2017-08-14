# Atom collapsable

Collapsable container, that collapses and expands upon props change open=[true|false].
Please keep in mind, that the direct children of the Collapsable atom should not have any margin or padding. If you still need some margin or padding, please wrap the children in another fb or div element.

## Properties

| Name | Default | Type | Description |
|------|---------|------|-------------|
| **open** |  | boolean | If the collapsable div is open |
| **withAnimation?** | true | boolean | Collapse with animation or not. |

(**Plus all other props from** [react-collapse](https://github.com/nkbt/react-collapse))

## Showcase

[[ Embed: "./demo.js" as "Collapsables" title="Collapsables" ]]
