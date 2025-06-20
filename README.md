# Park Voting System

A Python-based system for extracting and managing park information from HTML sources. This project processes park data and converts it into a structured JSON format for further use in a voting system.

## Features

- Extracts park information from HTML tables
- Processes park names, images, and descriptions
- Converts data to JSON format
- Handles UTF-8 encoding for proper text processing

## Prerequisites

- Python 3.x
- BeautifulSoup4
- lxml parser

## Installation

1. Clone the repository:
```bash
git clone https://github.com/navshift404/park-voting-system.git
cd park-voting-system
```

2. Install the required dependencies:
```bash
pip install beautifulsoup4 lxml
```

## Usage

1. Place your HTML file containing park information as `parks.html` in the project directory
2. Run the extraction script:
```bash
python extract_parks.py
```
3. The script will generate a `parks.json` file containing the processed park information

## Output Format

The generated JSON file contains an array of park objects with the following structure:
```json
[
  {
    "name": "Park Name",
    "image": "Image URL",
    "summary": "Park Description"
  }
]
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details. 