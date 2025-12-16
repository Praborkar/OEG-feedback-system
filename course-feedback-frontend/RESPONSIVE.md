Responsive & UI improvements (Dec 2025)

- Added CSS variables and responsive typography in `src/index.css`.
- Refactored `FeedbackModal` to use CSS classes and responsive styles (`src/components/FeedbackModal.css`).
- Updated `CoursePage` and `AdminDashboard` for responsive layouts and mobile-friendly tables.
- Added global `.container`, improved `.btn` styles and subtle shadows and card spacing.

Testing checklist

- Open the app in dev server and test at widths: **360px (mobile)**, **768px (tablet)**, **1024px (desktop)**.
- Ensure feedback modal fits on small screens and primary action is full-width on mobile.
- Verify admin table has horizontal scrolling on small screens.
- Run Lighthouse mobile audit and fix accessibility or performance issues as needed.

How to run locally

- `npm install`
- `npm run dev`
