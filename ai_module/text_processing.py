import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# One-time download of NLTK resources
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

def clean_text(text):
    """Cleans raw text using NLTK: lowercasing, removing stops, and lemmatizing."""
    # Tokenization: 'Hello World' -> ['hello', 'world']
    tokens = word_tokenize(text.lower())
    
    # Remove Stopwords: 'the', 'is', 'a'
    stop_words = set(stopwords.words('english'))
    filtered = [w for w in tokens if w.isalnum() and w not in stop_words]
    
    # Lemmatization: 'running' -> 'run'
    lemmatizer = WordNetLemmatizer()
    cleaned = [lemmatizer.lemmatize(w) for w in filtered]
    
    return " ".join(cleaned)