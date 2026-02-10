# Office Stretching Routine Web App

## Project Overview

This project implements a simple, single-page web application designed to encourage regular stretching breaks for office workers. It displays a random stretching exercise for 5 minutes, every 30 minutes, with a "break time" message in between. The application is built using modern web standards (HTML, CSS, JavaScript) and is intended for easy deployment to platforms like Cloudflare Pages.

## Design Principles

*   **Clean and Modern UI**: A minimalist design focusing on readability and ease of understanding.
*   **Responsiveness**: The layout will adapt to different screen sizes, from mobile phones to desktop monitors.
*   **Accessibility**: Basic accessibility considerations for text contrast and readability will be applied.
*   **Visual Cues**: Clear indication of the current exercise, remaining time, and transition states (e.g., break time).

## Features

*   **Random Stretch Display**: Selects one of 10 pre-defined office stretches randomly.
*   **Timed Display**: Each stretch is displayed for 5 minutes.
*   **Regular Intervals**: A new stretch is presented every 30 minutes.
*   **Break Time Indicator**: Between stretch sessions, a "break time" message is shown.
*   **Dynamic Updates**: The content and timer update automatically without page reloads.

## Current Implementation Plan (for current request)

### Objective

To create a functional web application that cycles through office stretching exercises at timed intervals, and prepare it for deployment.

### Steps

1.  **Create `blueprint.md`**: (Already in progress) Document the project and current plan.
2.  **Generate Stretching Exercises**: Define 10 office-friendly stretching exercises.
3.  **Modify `index.html`**:
    *   Add a main container for the application.
    *   Include elements to display the stretch name, description, and a countdown timer.
    *   Link `style.css` and `main.js`.
4.  **Create `style.css`**:
    *   Apply basic styling for a modern look (fonts, colors, spacing).
    *   Implement responsive design using media queries if necessary.
    *   Center content on the page for a clean presentation.
5.  **Create `main.js`**:
    *   Define an array of stretch objects (`name`, `description`).
    *   Implement `displayRandomStretch()` to update HTML with exercise details.
    *   Implement `updateTimerDisplay()` to format and show remaining time.
    *   Set up `setInterval` and `setTimeout` to manage the 30-minute cycle (5 min stretch, 25 min break).
    *   Handle initial load to immediately display the first stretch.
6.  **Git Commit**: Stage and commit all changes to the local Git repository.
7.  **Cloudflare Pages Deployment Instructions**: Provide instructions for the user to deploy the project to Cloudflare Pages.