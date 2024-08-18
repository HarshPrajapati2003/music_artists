# Music Artists Search Platform

This project is a comprehensive platform that allows users to search for music artists by name. The search functionality is enhanced with real-time auto-suggestions, handling common typos, misspellings and abbreviations.

## 🎯 Objective
The objective of this project was to compile a dataset of at least 100,000 music artists and develop a search backend and frontend interface that allows users to search for artists with auto-suggestions for highly matching names.

## 🚀 Project Links
- **Live Demo:** [https://music-artists-rust.vercel.app/](https://music-artists-rust.vercel.app/)

## 💻 Technologies and Resources Used

| **Category**         | **Technologies/Resources Used**                    |
|----------------------|----------------------------------------------------|
| **Frontend**         | React.js, Tailwind CSS                             |
| **Backend**          | Node.js, Express.js                                |
| **Database**         | Initially MongoDB, later switched to Typesense     |
| **Data Filtering**   | Pandas, Python                                     |

## 🎨 Features
- **Search Functionality:** Users can search for artists by typing their names. The search interface provides real-time auto-suggestions.
- **Responsive Design:** The frontend is designed using Tailwind CSS and is fully responsive across different devices.
- **Data Accuracy:** The platform ensures that the artist data is accurate and free of duplicates.
- **Performance Optimization:** Implemented skeleton loaders and debouncing (using lodash library) to prevent unnecessary network calls and enhance user experience.

## 📊 Data Collection
The data was sourced by scraping the Spotify API, ensuring a diverse and comprehensive dataset of over 100,000 music artists. The data includes artist names, genres, profile pictures and locations.

## 🔍 Search Examples

### Example Mistypes and Suggestions:
1. **Misspellings:**
   - Typing "Tailor Swift" should suggest "Taylor Swift."
   - Typing "Ed Sheeren" should suggest "Ed Sheeran."

2. **Typos:**
   - Typing "Beyonse" should suggest "Beyoncé."
   - Typing "Bruno Marsk" should suggest "Bruno Mars."

3. **Partial Names:**
   - Typing "The Week" should suggest "The Weeknd."
   - Typing "Adele Adk" should suggest "Adele Adkins."

4. **Phonetic Mistakes:**
   - Typing "Cold Play" should suggest "Coldplay."
   - Typing "Ariana Grandi" should suggest "Ariana Grande."

5. **Abbreviations and Short Forms:**
   - Typing "MJ" should suggest "Michael Jackson."
   - Typing "JT" should suggest "Justin Timberlake."

## 📸 Screenshots

  <img src="https://github.com/user-attachments/assets/1d0b7c34-60dc-48c2-afe0-a3c7866a2234" alt="Auto-suggestions Example" width="230">
  <img src="https://github.com/user-attachments/assets/e9df4319-25b6-48a6-ae0f-b7764e0e6aae" alt="Auto-suggestions Example" width="230">
  <img src="https://github.com/user-attachments/assets/dba8942f-4c11-4a20-9b2f-60abce515da2" alt="Auto-suggestions Example" width="230">
  <img src="https://github.com/user-attachments/assets/6c7629cf-7e1c-455f-90bc-1f1a532f3c6e" alt="Auto-suggestions Example" width="230">
  
  <img src="https://github.com/user-attachments/assets/d35ac95b-5776-4e36-9da0-66021c126cf2" alt="Auto-suggestions Example" width="230">
  <img src="https://github.com/user-attachments/assets/5dc26f2a-ce17-4ce5-aac5-569fcfcd4600" alt="Auto-suggestions Example" width="230">
  <img src="https://github.com/user-attachments/assets/659549a4-2318-4040-9be3-d162ea5cfc89" alt="Auto-suggestions Example" width="230">
  <img src="https://github.com/user-attachments/assets/3e1b1ba7-a60d-4d19-8f0e-bbd6acc83bd0" alt="Auto-suggestions Example" width="230">

