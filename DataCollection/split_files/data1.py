import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import time
import os
import requests

# Import artist data dictionary
from sample_data import artists_data  # Ensure this file is in the same directory or adjust the path accordingly

# Authentication details
client_id = "8603ddc33bbc4a5eaa0aac5f0c60abfc"
client_secret = "92dbd169ab884ed5b9f86ab8f3778faf"

# Load proxy IPs from file
def load_proxies(file_path):
    with open(file_path, 'r') as file:
        proxies = [line.strip() for line in file.readlines()]
    return proxies

# Test proxies to check if they work
def test_proxy(proxy_ip):
    try:
        response = requests.get("https://api.spotify.com", proxies={"http": proxy_ip, "https": proxy_ip}, timeout=5)
        if response.status_code == 200:
            return True
    except Exception as e:
        print(f"Proxy {proxy_ip} failed: {e}")
    return False

# Initialize Spotify API with proxy
def initialize_spotify_with_proxy(proxy_ip):
    session = requests.Session()
    session.proxies = {"http": proxy_ip, "https": proxy_ip}
    auth_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(auth_manager=auth_manager, requests_session=session)
    return sp

# Search for an artist by name
def search_artist_by_name(query, sp):
    try:
        if not query or query.strip() == '':
            raise ValueError("Search query cannot be empty.")
        
        results = sp.search(q=f'artist:{query}', type='artist', limit=1)
        print(f"Search results for query '{query}'")
        
        # Return the first artist if found, else None
        if results['artists']['items']:
            return results['artists']['items'][0]
        return None
    except Exception as e:
        print(f"Error in search_artist_by_name: {e}")
        return None

# Get artist details
def get_artist_details(artist):
    return {
        'artist_name': artist['name'],
        'artist_genre': ', '.join(artist['genres']) if artist['genres'] else 'Unknown',
        'artist_img': artist['images'][0]['url'] if artist['images'] else None,
        'artist_id': artist['id']
    }

# Fetch data for a single artist
def fetch_artist_data(artist_name, sp):
    artist = search_artist_by_name(artist_name, sp)
    
    if artist:
        return get_artist_details(artist)
    return None

# Fetch data for all artists
def fetch_all_artists_data(filename, proxies):
    total_artists = len(artists_data)
    fetched_count = 0
    proxy_index = 0
    
    print(f"Total artists in dictionary: {total_artists}")
    
    # Create or clear the existing Excel file
    if os.path.exists(filename):
        os.remove(filename)
    
    # Initialize an empty DataFrame
    df_artists = pd.DataFrame(columns=['artist_name', 'artist_genre', 'artist_img', 'artist_id', 'artist_country'])
    
    for artist_name, country in artists_data.items():
        # Rotate to the next proxy
        while True:
            current_proxy = proxies[proxy_index]
            sp = initialize_spotify_with_proxy(current_proxy)
            proxy_index = (proxy_index + 1) % len(proxies)
            
            artist_details = fetch_artist_data(artist_name, sp)
            
            if artist_details:
                artist_details['artist_country'] = country
                # Convert to DataFrame and concatenate with existing DataFrame
                df_artist = pd.DataFrame([artist_details])
                df_artists = pd.concat([df_artists, df_artist], ignore_index=True)
                fetched_count += 1
                print(f"Number of artists successfully fetched: {fetched_count}")
                break
            else:
                print(f"Failed to fetch data using proxy {current_proxy}. Trying the next one...")

            # Prevent too many failed attempts
            if proxy_index == 0:
                print("All proxies failed. Stopping.")
                return
        
        # Write the current state of DataFrame to Excel
        df_artists.to_excel(filename, sheet_name='Artists', index=False)
        
        time.sleep(1)  # Add a delay to prevent hitting rate limits

    print(f"Number of artists successfully fetched: {fetched_count}")

# Load proxy IPs from file
proxies = load_proxies('split_files/proxy-ip-list.txt')

# Test proxies and keep only the working ones
working_proxies = [proxy for proxy in proxies if test_proxy(proxy)]

if not working_proxies:
    print("No working proxies found. Exiting.")
else:
    # Fetch artist data and save to Excel using working proxies
    try:
        fetch_all_artists_data('Proxy_artists_data1.xlsx', working_proxies)
    except Exception as e:
        print(f"Error in fetching artists data: {e}")

print("Code is completed")
