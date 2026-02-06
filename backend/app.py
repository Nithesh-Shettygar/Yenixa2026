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

def get_next_registration_id(cursor):
    """
    Queries the database for the last inserted ID and increments it.
    Format: yenixa2026-XXX
    """
    # We look for the maximum registration_id to determine the next number
    cursor.execute("SELECT registration_id FROM registrations ORDER BY registration_id DESC LIMIT 1")
    result = cursor.fetchone()
    
    if result:
        last_id = result[0] # e.g., "yenixa2026-005"
        try:
            # Split by hyphen and convert the numeric part to an integer
            last_num = int(last_id.split('-')[1])
            next_num = last_num + 1
        except (IndexError, ValueError):
            next_num = 1
    else:
        # If the table is empty, start with 1
        next_num = 1
        
    # Return formatted string with leading zeros (e.g., yenixa2026-001)
    return f"yenixa2026-{str(next_num).zfill(3)}"

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    college = data.get('collegeName')
    reg_type = data.get('type')
    participants = data.get('participants', [])
    
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # OVERWRITE the frontend ID with a guaranteed unique Server-Generated ID
        reg_id = get_next_registration_id(cursor)
        
        # Handle championship logic based on registration type
        is_championship = 0
        if reg_type == 'group':
            selected_event_names = list(set([p.get('eventName', '') for p in participants if p.get('eventName', '') != "General Registration"]))
            
            # Note: Ensure strings match exactly what the frontend sends
            compulsory_events = ["The Eternal Ascendant", "Tech Tycoon"]
            has_compulsory = any(event in selected_event_names for event in compulsory_events)
            
            if len(selected_event_names) >= 9 and has_compulsory:
                is_championship = 1

        # Table 1: registrations
        cursor.execute("""
            INSERT INTO registrations (registration_id, college_name, registration_type, is_championship) 
            VALUES (%s, %s, %s, %s)
        """, (reg_id, college, reg_type, is_championship))

        # Table 2: participant_details
        student_data = []
        for p in participants:
            event_name = p.get('eventName')
            if not event_name and reg_type == 'individual':
                event_name = data.get('eventName', 'Individual Event')
            
            student_data.append((
                reg_id, 
                event_name if event_name else 'General Registration',
                p.get('name', ''), 
                p.get('email', ''), 
                p.get('phone', ''), 
                1 if p.get('isLead') == True else 0
            ))
        
        cursor.executemany("""
            INSERT INTO participant_details (registration_id, event_name, student_name, student_email, student_phone, is_team_lead) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """, student_data)

        conn.commit()
        
        # We return the NEW reg_id so the frontend can display the correct one to the user
        return jsonify({
            "message": "Registration successful!", 
            "registrationId": reg_id,
            "id": reg_id,
            "championship": bool(is_championship)
        }), 201
        
    except mysql.connector.Error as err:
        conn.rollback()
        print(f"Database error: {err}")
        return jsonify({"error": f"Database error: {err}"}), 500
        
    except Exception as e:
        conn.rollback()
        print(f"General error: {e}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500
        
    finally:
        cursor.close()
        conn.close()

@app.route('/check_db', methods=['GET'])
def check_database():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"tables": tables, "status": "Database connected"}), 200
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is running!"}), 200

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, port=5000)