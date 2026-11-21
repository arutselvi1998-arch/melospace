# Current theme: TURA Shopping

> Superseded for the user/admin portals by [the document's embedded visual designs](DOCUMENT-DESIGN.md). TURA was the earlier user-requested direction; the latest correction follows Melo Space screen.docx instead. `document-design.css` is the final visual override.

The user's instruction to follow turashopping.com supersedes the earlier visually distinct plum/pastel direction in DESIGN-SYSTEM.md. Melo Space retains its name, content, routes, and interactions.

Inspected source: https://turashopping.com/styles-IJYECHEW.css and the site's public homepage.

- Poppins typography, with Arial and sans-serif fallbacks.
- Brand pink `#FF2E79`, darker pink `#E6005C`, and a diagonal pink gradient for primary actions.
- Pale pink `#FFE7F1` and `#FFF5F8` supporting surfaces.
- Page background `#FAFAFC`, white cards, charcoal `#1E1E1E`, and muted text `#6B7280`.
- Gold accent `#D4AF37`, subtle gray borders, and soft card shadows.
- 12px button/input corners, 18px cards, and 1120px content width.

The implementation adapts TURA's public design tokens rather than copying its storefront or assets. The admin sidebar uses white with pink active states. Existing non-pink experience art is recolored by CSS. Visible input boundaries retain a darker accessible color. Semantic status colors remain the existing darker Melo variants; bright decorative colors should not be assumed suitable for small text.

The bright gradient follows TURA's primary-button styling; the darker solid pink is used for smaller buttons and selected filter text to preserve readable contrast. Google Fonts supplies Poppins when online; the fallback works offline.
