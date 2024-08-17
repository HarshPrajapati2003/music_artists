import os
from artists_data import artists_data  # Assuming artists_data.py is in the same directory

# Step 1: Skip the first 100000 entries
skipped_data = list(artists_data.items())[100000:]

# Step 2: Define chunk size and split data into chunks of 5000
chunk_size = 5000
chunks = [skipped_data[i:i + chunk_size] for i in range(0, len(skipped_data), chunk_size)]

# Step 3: Create split_files directory if it doesn't exist
output_dir = 'split_files_remain'
os.makedirs(output_dir, exist_ok=True)

# Step 4: Save each chunk to a separate .py file
start_index = 22  # Starting index for file names
for idx, chunk in enumerate(chunks[:10], start=start_index):
    file_name = f'artists_data_chunk_{idx}.py'
    file_path = os.path.join(output_dir, file_name)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        # Write the dictionary in Python syntax
        f.write(f'artists_data_chunk_{idx} = {{\n')
        for key, value in chunk:
            f.write(f'    {repr(key)}: {repr(value)},\n')
        f.write('}\n')
    
    print(f'Saved {len(chunk)} records to {file_name}')

print('All chunks saved successfully.')
