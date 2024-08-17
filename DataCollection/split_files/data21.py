import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import time
import os

# Import artist data dictionary
from artists_data_chunk_21 import artists_data  # Ensure this file is in the same directory or adjust the path accordingly

# Authentication
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="8603ddc33bbc4a5eaa0aac5f0c60abfc",
                                                           client_secret="92dbd169ab884ed5b9f86ab8f3778faf"))

def search_artist_by_name(query):
    try:
        if not query or query.strip() == '':
            raise ValueError("Search query cannot be empty.")
        
        results = sp.search(q=f'artist:{query}', type='artist', limit=1)
        print(f"Search results for query '{query}'")  # Print results for debugging
        
        # Return the first artist if found, else None
        if results['artists']['items']:
            return results['artists']['items'][0]
        return None
    except Exception as e:
        print(f"Error in search_artist_by_name: {e}")
        return None

def get_artist_details(artist):
    return {
        'artist_name': artist['name'],
        'artist_genre': ', '.join(artist['genres']) if artist['genres'] else 'Unknown',
        'artist_img': artist['images'][0]['url'] if artist['images'] else None,
        'artist_id': artist['id']
    }

def fetch_artist_data(artist_name):
    artist = search_artist_by_name(artist_name)
    
    if artist:
        return get_artist_details(artist)
    return None

def fetch_all_artists_data(filename):
    total_artists = len(artists_data)  # Total number of artists in the dictionary
    fetched_count = 0  # Count of artists whose details were fetched

    print(f"Total artists in dictionary: {total_artists}")
    
    # Create or clear the existing Excel file
    if os.path.exists(filename):
        os.remove(filename)
    
    # Initialize an empty DataFrame
    df_artists = pd.DataFrame(columns=['artist_name', 'artist_genre', 'artist_img', 'artist_id', 'artist_country'])
    
    for artist_name, country in artists_data.items():
        # print(f"Fetching details for artist '{artist_name}'...")
        artist_details = fetch_artist_data(artist_name)

        if artist_details:
            artist_details['artist_country'] = country
            # Convert to DataFrame and concatenate with existing DataFrame
            df_artist = pd.DataFrame([artist_details])
            df_artists = pd.concat([df_artists, df_artist], ignore_index=True)
            fetched_count += 1  # Increment count for each successfully fetched artist
            print(f"Number of artists successfully fetched: {fetched_count}")
        else:
            print(f"Artist '{artist_name}' not found.")
        
        # Write the current state of DataFrame to Excel
        df_artists.to_excel(filename, sheet_name='Artists', index=False)
        
        time.sleep(1)  # Add a delay to prevent hitting rate limits

    print(f"Number of artists successfully fetched: {fetched_count}")

print("Code is running")

# Fetch artist data and save to Excel
try:
    fetch_all_artists_data('N_artists_data21.xlsx')
except Exception as e:
    print(f"Error in fetching artists data: {e}")

print("Code is completed")
