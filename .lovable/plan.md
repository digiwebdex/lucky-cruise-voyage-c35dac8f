

## Move Seat Plan into Cruise Editor

The user wants to remove the standalone Seat Plan Manager page and instead manage seat plan images directly within each cruise's editor page -- matching the public cruise detail page layout where the seat plan appears below the itinerary/content tabs.

### Changes

**1. Add Seat Plan section to CruiseEditor.tsx**
- Add a new "Seat Plan" section after the Packages section (or after the tabs), matching the public page layout
- Show the current `seatPlanImage` with the existing `SeatPlanViewer` component for preview
- Add a delete button (trash icon overlay) to remove the current seat plan image
- Add an input field to paste a new seat plan image URL (same pattern as the image gallery editor)
- Import `Grid3X3` icon and `SeatPlanViewer` component

**2. Remove Seat Plan Manager admin page**
- Remove the `/admin/seat-plans` route from `App.tsx`
- Remove the "Seat Plans" link from `AdminLayout.tsx` sidebar
- The file `src/pages/admin/SeatPlanManager.tsx` can remain but won't be routed

### Technical Details

The seat plan section in CruiseEditor will use `form.seatPlanImage` field (already in the Cruise type). The UI pattern mirrors the existing image gallery editor: display current image with a hover-delete button, plus an input/button to add a new URL. The `SeatPlanViewer` component with its zoom functionality will be reused for preview.

