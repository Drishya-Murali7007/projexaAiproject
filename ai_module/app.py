from pyq_fetcher import fetch_content
from doubt_solver import add_to_memory, ask_ai

def main():
    # 1. Get Data (Replace with a real educational URL)
    print("Step 1: Fetching PYQs...")
    raw_data = ["Newton's First Law states an object remains at rest unless acted upon.", 
                "Newton's Second Law is F=ma.",
                "Newton's Third Law: Every action has an equal and opposite reaction."]
    
    # 2. Add to Knowledge Base
    print("Step 2: Creating BERT Embeddings & Saving to RAG DB...")
    add_to_memory(raw_data)
    
    # 3. Ask a Doubt
    query = "What happens if I push a wall according to Newton?"
    print(f"\nStudent: {query}")
    
    answer = ask_ai(query)
    print(f"\nAI Tutor: {answer}")

if __name__ == "__main__":
    main()