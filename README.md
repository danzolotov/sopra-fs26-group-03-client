# Platemate
## Introduction:
The ultimate companion for modern home cooks and shared households:
- Manage your pantry stock in real-time
- Generate shared shopping lists automatically
- Coordinate meal plans with your group
- Reduce food waste and save money

## Technologies
- Next.js
- React
- TypeScript
- TailwindCSS
- Ant Design
- ESLint
- Prettier

## High-level components
How are they correlated? Reference the main class, file, or function in the README text
with a link.

### [Dashboard-Shell](https://github.com/klitvinova/sopra-fs26-group-03-client/blob/main/app/components/dashboard-shell.tsx)
This compoment is used on almost all pages to render a dashboard on the left side and let the user change between different pages. This component is like a NavigationBar for our website. Compontent with the Dashboard Shell contain this component and reference their name & number to highlight the current option.

### [Pantry Page](https://github.com/klitvinova/sopra-fs26-group-03-client/blob/main/app/pantry/page.tsx)
This page is an important part to our website. It saves which item a user currently has and let's them add new ones. Highlights are: 
- Users can add items based on a picture of a real shopping list. This functions uses the Google Vision API.
- Items that a user marks as bought in the shopping list are moved automatically into his pantry
- Adding a new item fetches ingredients from the backend to suggest autocomplete options. The server offers some common options (e.g. Tomato) and if a user enters a new ingredient it's saved and will be suggested next time.

### [Dashboard Page](https://github.com/klitvinova/sopra-fs26-group-03-client/blob/main/app/dashboard/page.tsx)
This page shows an overview to the user and uses multiple endpoints for this. It shows today's menu and your shopping list. This page is the landing page for new users.

### Required Group ([Page](https://github.com/klitvinova/sopra-fs26-group-03-client/blob/main/app/components/group-required.tsx) & [Hook](https://github.com/klitvinova/sopra-fs26-group-03-client/blob/main/app/hooks/useGroupMembership.ts))
New users can't use most of our website. To inform the user every pages shows a [group required page](https://github.com/klitvinova/sopra-fs26-group-03-client/blob/main/app/components/group-required.tsx), if a user is not part of a group. To check this, pages use the [groupMembership Hook](https://github.com/klitvinova/sopra-fs26-group-03-client/blob/main/app/hooks/useGroupMembership.ts).

### [Meal Plan Page](https://github.com/klitvinova/sopra-fs26-group-03-client/blob/main/app/meal-plan/page.tsx)
This page allows user to plan meals based on predefined recipes. The user sees what's already inside his pantry and can choose (**Feature TODO**) if he still want's to add them to his shopping list. The user can then see his planned meal in the calendar view, or today's meal(s) on the dashboard page.

## Launch & Deployment
have to take to get started with your application. What commands are required to build and
run your project locally? How can they run the tests? Do you have external dependencies
or a database that needs to be running? How can they do releases?
npm install
next build

## Illustrations: In your client repository, briefly describe and illustrate the main user flow(s) of your interface. How does it work (without going into too much detail)? Feel free to
include a few screenshots of your application.
**TODO**


## Roadmap
- Event Group Management to temporarily add members to a group to organize a event with them. E.g. You could invite people over and plan a BBQ with this app.
- Cost Calculating for shopping lists for users to plan their budget. This should calculate based on common prices, but let users set their own.
- Let users add own recipes and save them to shop for them in the future.
- Let users scan barcodes to add ingredients to their pantry.

## Authors and acknowledgment.
Marc Honegger & Karina Litvinova

We also want to thank our former teammates: Dan Zolotov, Ceyda B. Dag & Kishore Sivapathasundaram

## License: Say how your project is licensed (see License guide3).
MIT License

Copyright (c) 2026 Marc Honegger & Karina Litvinova
