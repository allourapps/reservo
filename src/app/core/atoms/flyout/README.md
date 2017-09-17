# Atom Flyout

## Props

| Name | Default | Type | Description |
|------|---------|------|-------------|
| **direction?** | | 'up' &#124; 'down' &#124; 'left' &#124; 'right' | The direction of the triangle. If undefined the triangle will not appear. |
| **triangleStyle?** | | Object | Override the inline styles of the triangle element. |
| **triangleProps?** | | Object | Override the properties of the triangle. |
| **offset?** | | &#123; top: number, left: number &#125; | An offset for the flyout. |
| **open?** | | boolean | If the flyout is open or not. |
| **anchorEl?** | | Object | The anchor element of the flyout. |
| **anchorOrigin?** | | Object | The origin of the flyout. |
| **targetOrigin?** | | Object | The origin of the target. |
| **canAutoPosition?** | | boolean | If it can auto position or not. |
| **children?** | | any | The children of the flyout. |
| **onRequestClose?** | | Function | The close function of the flyout. |

**It supports all Material ui Popover 'Props'** [Material UI Popover](http://www.material-ui.com/#/components/popover)

## Showcase

[[ Embed: "./demo.js" as "Flyout" title="Flyout" ]]
