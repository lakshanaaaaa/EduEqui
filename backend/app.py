from flask import Flask, request, send_file, jsonify
from gtts import gTTS
from io import BytesIO
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/tts', methods=['POST', 'OPTIONS'])
def text_to_speech():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = app.make_default_options_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        return response

    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        text = data.get('text', '')
        lang = data.get('lang', 'en').split('-')[0]  # Default to English, and strip country code if present
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        print(f"Generating speech for text: {text}")  # Debug log
            
        # Create gTTS object
        tts = gTTS(text=text, lang=lang, slow=False)
        
        # Save to bytes buffer
        audio_buffer = BytesIO()
        tts.write_to_fp(audio_buffer)
        audio_buffer.seek(0)
        
        # Create a response with the audio file
        response = send_file(
            audio_buffer,
            mimetype='audio/mpeg',
            as_attachment=False,
            download_name='speech.mp3'
        )
        
        # Set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        
        return response
        
    except Exception as e:
        print(f"Error in TTS: {str(e)}")  # Debug log
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, port=port, host='0.0.0.0')
