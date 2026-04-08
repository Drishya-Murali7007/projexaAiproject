import chromadb
from sentence_transformers import SentenceTransformer
import google.generativeai as genai

# 1. Initialize BERT Model (all-MiniLM-L6-v2 is fast and efficient)
embed_model = SentenceTransformer('all-MiniLM-L6-v2')

# 2. Initialize Vector DB (ChromaDB)
# This acts as your "memory" for RAG
chroma_client = chromadb.Client()
collection = chroma_client.get_or_create_collection(name="study_material")

# 3. Setup Gemini
genai.configure(api_key="YOUR_GEMINI_API_KEY") # Replace with your real key
llm = genai.GenerativeModel('gemini-pro')

def add_to_memory(documents):
    """Converts text to BERT embeddings and stores them in ChromaDB."""
    # Convert list of text into a list of vector numbers
    embeddings = embed_model.encode(documents).tolist()
    ids = [f"id_{i}" for i in range(len(documents))]
    
    collection.add(
        documents=documents,
        embeddings=embeddings,
        ids=ids
    )

def ask_ai(question):
    """The RAG process: Retrieve from DB, then Generate with Gemini."""
    # Step 1: Turn question into a BERT vector
    query_vector = embed_model.encode([question]).tolist()
    
    # Step 2: Retrieve the most similar text from our database
    results = collection.query(query_embeddings=query_vector, n_results=2)
    context_text = " ".join(results['documents'][0])
    
    # Step 3: Augment the prompt and Generate
    prompt = f"""
    You are a helpful study assistant. Use the following context to answer the student's doubt.
    Context: {context_text}
    Student Question: {question}
    """
    
    response = llm.generate_content(prompt)
    return response.text