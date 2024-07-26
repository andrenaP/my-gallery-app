#!/bin/bash

# open json file with { } and create output string
output="{ "

# Iterate through each folder in the current directory
for dir in *; do
  # Check if it's a directory
  if [ -d "$dir" ]; then
    # Initialize an empty string to store image paths
    images=""

    # Iterate through each file inside the directory
    for file in "$dir"/*; do
      # Check if it's an image (you can customize this based on your image extensions)
      if [[ "$file" =~ \.(jpg|jpeg|png)$ ]]; then
        # Append the image path to the string, separated by commas
        images="$images\"$(basename "${file}")\", "
      fi
    done

    # Remove the trailing comma from the images string
    images="${images%, }"

    # Add folder and its image array to output string
    output="$output \"$dir\": [ $images ]," 
  fi
done

# Remove trailing comma from output string and add closing brace
output="${output%,}}"

echo "$output" > output.json