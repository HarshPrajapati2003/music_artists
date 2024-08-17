import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import time

# Import artist data dictionary
from artists_data import artists_data  # Ensure this file is in the same directory or adjust the path accordingly

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

def fetch_all_artists_data():
    artist_data = []
    total_artists = len(artists_data)  # Total number of artists in the dictionary
    fetched_count = 0  # Count of artists whose details were fetched
    
    for artist_name, country in artists_data.items():
        # print(f"Fetching details for artist '{artist_name}'...")
        artist_details = fetch_artist_data(artist_name)

        print(f"Total artists in dictionary: {total_artists}")
        print(f"Number of artists successfully fetched: {fetched_count}")
        
        if artist_details:
            artist_details['artist_country'] = country
            artist_data.append(artist_details)
            fetched_count += 1  # Increment count for each successfully fetched artist
        else:
            print(f"Artist '{artist_name}' not found.")
        
        time.sleep(1)  # Add a delay to prevent hitting rate limits
    
    return artist_data

print("Code is running")

# Fetch artist data
try:
    artist_data = fetch_all_artists_data()
    df_artists = pd.DataFrame(artist_data)
except Exception as e:
    print(f"Error in fetching artists data: {e}")

print("Code is partially completed")

# Export to Excel
try:
    df_artists.to_excel('newest_artists_data.xlsx', index=False)
    print("Data exported to Excel successfully.")
except Exception as e:
    print(f"Error in exporting to Excel: {e}")

print("Code is completed")
