# Project Documentation: Social Media Posts Application

## Overview

This documentation provides an overview of the React-based social media posting application. The application allows users to create, read, update, and delete posts with images.

## Components

### 1. Post.jsx

Displays an individual post with title, description, image, and author information.

**Key features:**

- Card-based UI for post display
- Edit and delete functionality for post owners
- Image display with proper sizing and formatting
- Author attribution

**Usage:**

```jsx
<Post itm={postObject} userName={authorName} />
```

### 2. NavBar.jsx

Navigation bar displayed across all pages.

## Pages

### 1. Home.jsx

The main landing page that displays all posts and provides a floating action button to create new posts.

**Key features:**

- Displays posts in a responsive grid layout
- Floating action button ("+") for creating new posts
- Filters posts based on user permissions

### 2. AddPost.jsx

Form for creating new posts.

**Key features:**

- Form validation for title, description, and image URL
- Real-time image preview
- Error handling for form submission
- Responsive design

**Form fields:**

- Title: 5-100 characters
- Description: Multiline text with minimum length
- Image URL: Valid image URL with preview

### 3. editPost.jsx

Form for updating existing posts.

**Key features:**

- Pre-filled form with existing post data
- Form validation
- Permission checking (only author can edit)
- Real-time image preview

## Context

### UserContext.jsx

Manages user authentication and post data.

**Key features:**

- User login/logout functionality
- Post data storage and retrieval
- Functions to update posts after CRUD operations

## API Integration

The application uses Axios to communicate with a REST API:

**Endpoints:**

- `GET /posts`: Fetch all posts
- `GET /posts/:id`: Fetch a specific post
- `POST /posts`: Create a new post
- `PUT /posts/:id`: Update an existing post
- `DELETE /posts/:id`: Delete a post

## Form Handling

The application uses React Hook Form for form management:

**Key features:**

- Field validation with error messages
- Form submission handling
- Pre-filling forms with existing data
