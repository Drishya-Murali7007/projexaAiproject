import requests
from bs4 import BeautifulSoup
from text_processing import clean_text

def fetch_content(url):
    """Scrapes text from a URL and cleans it."""
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Get all paragraph text
        raw_paragraphs = [p.text for p in soup.find_all('p')]
        
        # Clean each paragraph
        cleaned_data = [clean_text(p) for p in raw_paragraphs if len(p) > 30]
        return cleaned_data
    except Exception as e:
        print(f"Error fetching data: {e}")
        return []