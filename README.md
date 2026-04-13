# CookingForClankers

## Major features

CfC has or will have:

- A homepage with centralized navigation (navbar, etc).
  - Highlighted Recipe(s) of the Day.
- Recipe search.
  - Advanced search by metadata
  - Dynamic recipe filtering and sorting
- A global recipe index.
- Individual recipe pages.
  - Cooking timer(s) as appropriate.
  - Shopping list generator (reuse PLP1 for local instance?)
  - Animations on recipe pages.
  - Customizable serving size (amounts adjusted).
  - Recipe sharing links
- Favorites page, locally stored.
- Fully static design (pretty sure we can't alter the webserver).

To get sample data, run the following command:

```bash
scp -r <user>@csc391-vm1.eng.franciscan.edu:/srv/csc391support/files/for-realsies ./data
```

## TODO

- Investigate backend capabilities. Some of the listed features would be trivial
  to implement given control over the backend, but I don't know how much we can
  do there.
- Add more features, we get derated by 20% for having a large team.

## Milestones

### Milestone 1 - Client Pitch

- [x] Project Wire-frame and first draft or mock draft
- [x] Tasks 0-2 completed
- [x] Tasks 2-4 in progress
- [x] By now, you must have a vision that includes design choices

### Milestone 2 - Supervisor Update

- [ ] By now, all the [Required Features](#required-features) must be functional
- [ ] [Tasks](#tasks) 0-7 completed
  - [x] [Task 2](#-task-2-setting-up-the-basic-html-structure)
  - [x] [Task 3](#-task-3-styling-the-site-with-css)
  - [x] [Task 4](#-task-4-recipe-details-page)
  - [x] [Task 5](#-task-5-improving-user-interface-with-animation)
  - [ ] [Task 6](#-task-6-adding-javascript-for-dynamic-recipe-listings)
  - [ ] [Task 7](#-task-7-search-functionality)
- [ ] Optional Features List
- [ ] Some optional features started

### Milestone 3 - UX/UI Report

- [ ] User Test Results & Improvement Plan
- [ ] Tasks 0-9 completed
- [ ] By now, at least 50% of your [optional functionality](#optional-features)
      choices must be completed and functional.

### Milestone 4 - Full Demo: Finals Week

- [ ] Full Deployment of Final Website
- [ ] All tasks completed
- [ ] Full functionality (Required and Optional Features) must be deployed

## Required Features

- [x] **Homepage**: Includes a welcome message and featured recipe. (10 Points)
      _DA_
- [x] **Recipe Cards**: Interactive recipe cards with thumbnails, descriptions,
      and like buttons. (15 Points) _JE_
- [ ] **Search Functionality**: Real-time search for recipes by name.(10 Points)
- [x] **Recipe Detail Pages**: Each page displays ingredients, instructions, and
      additional details for the corresponding recipe. (15 Points) _JE_
- [x] **Favorites Page**: A dedicated page for saved recipes using persistent
      local storage. (10 Points) _JE_
- [ ] **Visual Design** Appealing, functional, no seizure-induction elements.
      Consistent color schemes, typography, and smooth animations. Wayfinding
      elements throughout the website. (20 Points)

Total Points From Standard Requirements = 80

## Optional Features

## Tasks

### 🟢 Task 0: System Requirements & Schedule

**Goal**: Plan your work with the team

- [x] Pick a project mode.
  - _Mode C: cookbook subscription online archive_
- [x] Create a schedule for tasks and class presentations.
  - 2/26: [Milestone 1](#milestone-1---client-pitch)
    - 2/23: [Task 0](#-task-0-system-requirements--schedule)
    - 2/24: [Task 1](#-task-1-project-planning-and-wireframing)
    - 2/25: [Task 2](#-task-2-setting-up-the-basic-html-structure)
  - 4/2: [Milestone 2](#milestone-2---supervisor-update)
    - 3/19: [Task 3](#-task-3-styling-the-site-with-css)
    - 3/24: [Task 4](#-task-4-recipe-details-page)
    - 3/26: [Task 5](#-task-5-improving-user-interface-with-animation)
    - 3/31: [Task 6](#-task-6-adding-javascript-for-dynamic-recipe-listings)
    - 4/2: [Task 7](#-task-7-search-functionality)
  - 4/14: [Milestone 3](#milestone-3---uxui-report)
    - 4/7: [Task 8](#-task-8-optional-features-longer-task)
    - 4/9: [Task 9](#-task-9-usability-testing)
  - 5/1: [Milestone 4](#milestone-4---full-demo-finals-week)
    - 4/28: [Task 10](#-task-10-implement-final-fixes)
- [x] Pick one speaker for each presentation.
  - Presentation 1: Dominic Antony
  - Presentation 2: Jonah Ebent
  - Presentation 3: Adrian Johnson
  - Presentation 4: Dominic Antony
- [x] Finish filling out the team details on the google spreadsheet, including
      the mode chosen.

### 🟢 Task 1: Project Planning and Wireframing

**Goal**: Plan the site's structure and design.

- [x] Define website features (e.g., recipe listing, search functionality,
      recipe details).
  - A homepage with centralized navigation (navbar, etc).
  - Highlighted Recipe(s) of the Day.
  - Recipe search.
    - Advanced search by metadata
    - Dynamic recipe filtering and sorting
  - A global recipe index.
  - Individual recipe pages.
    - Cooking timer(s) as appropriate.
    - Shopping list generator (reuse PLP1 for local instance?)
    - Animations on recipe pages.
    - Customizable serving size (amounts adjusted).
    - Recipe sharing links
  - Favorites page, locally stored.
  - Dynamically fetch recipe JSONs, and convert them to HTML.

- [x] Create a sitemap showing the structure of the website.
- [x] Develop wireframes for each page, focusing on usability and layout.
- [x] Create a timeline of tasks, including any content development (see above)

### 🟢 Task 2: Setting Up the Basic HTML Structure

**Goal**: Build the foundational structure of the site.

- [x] Create an HTML file with sections for a homepage, recipe listings, and a
      recipe detail page.
  - [x] Homepage.
  - [x] Individual pages for recipes. (One sample done)
  - [x] Index page.
- [x] Add semantic tags for navigation, content, and footer.
- [x] Link placeholder content to reflect the wireframe design.

### 🟢 Task 3: Styling the Site with CSS

**Goal**: Style the site for a visually appealing inter face.

- [x] Use CSS to style the navigation bar, recipe cards, and overall layout.
- [x] Ensure responsive design by adding media queries for mobile devices.
  - _handled by Bootstrap_
- [x] Implement a color scheme and typography consistent with the wireframe.

### 🟢 Task 4: Recipe Details Page

**Goal**: Create individual examples of recipe pages with detailed information.

- [x] Link recipe cards to individual recipe detail pages. _JE_
- [x] Populate the detail page with data (e.g., ingredients, steps, and images). _JE_
- [x] Add a "Back to Homepage" button for navigation. _JE_

### 🟢 Task 5: Improving User Interface with Animation

**Goal**: Add smooth transitions and interactivity.

- [x] Use CSS animations for hover effects on buttons and recipe cards. _AJ_
- [x] Implement smooth scrolling for navigation. _AJ_
- [x] Add feedback animations for buttons (e.g., a "Favorite" button toggle). _AJ_

### 🟡 Task 6: Adding JavaScript for Dynamic Recipe Listings

**Goal**: Display recipe data dynamically using JavaScript.

- [x] Use a sample JSON file or JavaScript object to store recipe data.
- [ ] Write JavaScript to dynamically populate recipe cards on the homepage.
- [x] Implement a "Load More" button for paginated recipe listings.

### 🟡 Task 7: Search Functionality

**Goal**: Enable users to search for recipes.

- [x] Add a search bar to the website.
- [x] Write JavaScript to filter recipes based on user input.
- [ ] Highlight the search results and ensure usability.

### 🟡 Task 8: Optional Features (longer task)

**Goal**: Complete your Optional Features to identify weak points in your UI
tests.

- [x] Recipe sharing links
- [ ] Optional feature 2
- [ ] Optional feature 3
- [ ] Optional feature 4
- [ ] ...

### 🔴 Task 9: Usability Testing

**Goal**: Refine the website based on user feedback.

- [ ] Conduct UX tests with peers or target users.
- [ ] Collect feedback on navigation, features, and design.
- [ ] Implement changes to address usability issues.

### 🔴 Task 10: Implement Final Fixes

**Goal**: Implement the fixes/improvements identified in your UX/UI
Presentation.

- [ ] (List of your identified fixes/improvements.)

## Credits

Dominic Antony

- Main page structure and carousel
- Wireframes
- Sitemap
- Index page
- Search page
- Recipe sharing button

Jonah Ebent

- Logos (w/ Gemini)
- Recipe detail page
- Presentation updates
- Home page tweaks
- Project organization
- Favorites page & functionality
- Header/footer

Adrian Johnson

- Presentation 1
- animations for buttons and cards
- added event listener to make cards clickable.

SFE128 data set/old CSC391 dataset, for recipe image sources.

Gemini, for the logo.

Grok, for the main page blurbs and "testimonials".
