Release v1.0.14

Fixed
- Fixed a bug where events ending at midnight would incorrectly render on the following day
- Fixed a bug where events would not render a full day even if the event ended on that day and spanned all 24 hours of that day
- Fixed a bug where the date span was being incorrectly calculated for dates ending at midnight

Release v1.0.13

Fixed
- Fixed a bug where events that span less than 1 day and occur over midnight would break the page when clicking on an event.

Release v1.0.12

Fixed
- Fixed a bug whereby events that spanned 2 calendar days but had less than 24 hours between them would incorrectly render
- Fixed a bug where an event that spans 1 day but finishes at midnight wouldn't render.
