# Simple Image Gallery with Pagination

This is a simple image gallery application that allows users to browse through images, navigate using pagination, and search by name of galleries. 


**Features:**

*   Displays a collection of images from a JSON data source.
*   Provides pagination buttons (next/previous) for easy navigation.
*   Includes a dropdown menu for jumping directly to specific pages.
*   A search bar allows filtering galleries by name.

**Getting Started:**

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/andrenaP/my-gallery-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```
    
3.  **Add environment variables:**

    Create a `.env` file and fill it. Use `.env.example`
    ```bash
    REACT_APP_Folder="IMG"
    REACT_APP_JsonFolder="Test_output.json"
    ```

3.  **Run the application:**

    ```bash
    npm start
    ```

**Data Source:**

The image gallery fetches data from a `output.json` file in the project's `public` directory. You can update this file with your own image data.

You also need to provide your data in public folder.

**Generating Image Data (JSON):**

To populate the gallery, you'll need to provide image data in JSON format. 

You can easily generate this JSON from your folders with images using the provided `gallery.sh` script. Simply run script on your folders:

```bash
./gallery.sh
```

This script then generates a valid JSON file (`output.json`) that you can use with the application.

**Technical Details:**

*   **Framework:** React
*   **Styling:** React-bootstrap 
*   **Data Format:** JSON

**Contributing:**

Contributions are welcome! Please feel free to open an issue or submit a pull request if you have any suggestions or bug fixes.
