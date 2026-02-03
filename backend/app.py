from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Allows your frontend to talk to this backend

# Database Configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'yenixa2026_db'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    reg_id = data.get('registrationId')
    college = data.get('collegeName')
    reg_type = data.get('type')
    participants = data.get('participants', [])

    # Championship Logic: Count only real events (exclude the General Registration entry if present)
    compulsory_events = ["The Eternal Ascendant", "Red Alert404"]
    selected_event_names = list(set([p['eventName'] for p in participants if p['eventName'] != "General Registration"]))
    
    has_compulsory = any(event in selected_event_names for event in compulsory_events)
    is_championship = 1 if (len(selected_event_names) >= 9 and has_compulsory) else 0

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # Table 1: registrations
        cursor.execute("INSERT INTO registrations (registration_id, college_name, registration_type, is_championship) VALUES (%s, %s, %s, %s)", 
                       (reg_id, college, reg_type, is_championship))

        # Table 2: participant_details
        student_data = []
        for p in participants:
            student_data.append((
                reg_id, 
                p['eventName'], 
                p['name'], 
                p['email'], 
                p['phone'], 
                1 if p.get('isLead') == True else 0 # Explicit check for boolean True
            ))
        
        cursor.executemany("INSERT INTO participant_details (registration_id, event_name, student_name, student_email, student_phone, is_team_lead) VALUES (%s, %s, %s, %s, %s, %s)", 
                           student_data)

        conn.commit()
        return jsonify({"message": "Success", "id": reg_id}), 201
    except mysql.connector.Error as err:
        conn.rollback()
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)