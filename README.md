# Insta-Motions - Frontend

React + Vite Frontend For Insta-Motions. Lets You Upload Instagram Data And Visualize Sentiment Analysis Results Through Interactive Charts.

## How It Works

You Upload An Excel File, Hit Analyze, And The App Sends It To The Backend API. Once Results Come Back, You Get Profile-Level Insights (Stat Cards, Trend Lines, Scatter Plots) Followed By Per-Post Breakdowns With Bar Charts And Pie Charts.

## Setup

1. Install Dependencies:

```bash
npm install
```

2. Run The Dev Server:

```bash
npm run dev
```

App Starts At `http://localhost:5173`.

## Dependencies

| Package        | Version  |
| -------------- | -------- |
| react          | ^18.3.1  |
| react-dom      | ^18.3.1  |
| recharts       | ^2.13.3  |
| axios          | ^1.7.9   |
| react-dropzone | ^14.3.5  |
| react-icons    | ^5.4.0   |
| vite           | ^6.0.3   |

## Features

- Drag & Drop Excel File Upload
- Sentiment Analysis Of Captions And Comments
- Profile-Level Insights With Stat Cards
- Sentiment Trend Line Chart Over Time
- Engagement Vs Sentiment Scatter Plot
- Per-Post Bar Chart (Likes & Comments Count)
- Per-Post Pie Chart (Caption Sentiment Distribution)
- Per-Post Grouped Bar Chart (Comments Sentiment Breakdown)
- Notable Posts Highlighting (Most Positive, Most Negative, Most Engaged)
- Reusable Chart Components (BarChart, PieChart, LineChart, ScatterChart)

## Project Structure

```
Frontend/
├── src/
│   ├── Main.jsx                  — Entry Point
│   ├── App.jsx                   — Root Component
│   ├── Components/
│   │   ├── Header.jsx            — Instagram-Styled Header
│   │   ├── FileUpload.jsx        — Drag & Drop Excel Upload
│   │   ├── DataTable.jsx         — Post Data Preview Table
│   │   ├── PostAnalysis.jsx      — Per-Post Charts Layout
│   │   └── ProfileInsights.jsx   — Profile Stats & Insights
│   ├── Charts/
│   │   ├── BarChart.jsx          — Reusable Bar Chart
│   │   ├── PieChart.jsx          — Reusable Pie Chart
│   │   ├── LineChart.jsx         — Reusable Line Chart
│   │   └── ScatterChart.jsx      — Reusable Scatter Chart
│   ├── Routes/
│   │   └── Routes.js             — API Calls (Axios)
│   ├── Data/
│   │   └── StaticData.json       — All Static Text & Config
│   └── Styles/
│       ├── Index.css             — Global Styles
│       ├── App.css               — App Layout
│       ├── Header.css            — Header Styles
│       ├── FileUpload.css        — Upload Zone Styles
│       ├── DataTable.css         — Table Styles
│       ├── PostAnalysis.css      — Post Card Styles
│       └── ProfileInsights.css   — Insights & Stat Card Styles
├── index.html                    — HTML Entry
├── vite.config.js                — Vite Config
├── package.json                  — Dependencies
├── .env                          — Environment Config
├── .gitignore
└── README.md
```