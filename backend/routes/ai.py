from flask import Blueprint, request, jsonify

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/ai/chat', methods=['POST'])
def ai_chat():
    data = request.get_json()
    message = data.get('message')

    return jsonify({
        "reply": f"AI Response to: {message}"
    })