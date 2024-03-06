from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import the CORS module
from flask_mail import Mail, Message


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/med_db'

app.config['MAIL_SERVER'] = 'smtp.mail.yahoo.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'dia.alexandru5@yahoo.com'  # Replace with your email credentials
app.config['MAIL_PASSWORD'] = 'paroladelaemail2024'     # Replace with your email credentials
app.config['MAIL_DEBUG'] = True
app.config['MAIL_SUPPRESS_SEND'] = False

mail = Mail(app)
db = SQLAlchemy(app)

@app.route('/submit-message', methods=['POST'])
def submit_message():
    data = request.json

    # Send email
    send_email(data['name'], data['email'], data['message'])

    return jsonify({'message': 'Data received successfully'})

def send_email(name, email, message):
    subject = 'New Message from Contact Form'
    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

    msg = Message(subject, recipients=['dia.alexandru5@yahoo.com'])
    msg.body = body

    try:
        mail.send(msg)
        print("Email sent successfully")
    except Exception as e:
        print(f"Error sending email: {e}")

class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    specialty = db.Column(db.String(50), nullable=False)
    img = db.Column(db.String(50), nullable=False)

class MedicalService(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    specialty_id = db.Column(db.Integer, db.ForeignKey('specialty.id'), nullable=False)
    specialty = db.relationship('Specialty', backref=db.backref('medical_services', lazy=True))

class Specialty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

@app.route('/doctors', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    result = [{'id': doctor.id, 'name': doctor.name, 'specialty': doctor.specialty , 'img': doctor.img} for doctor in doctors]
    return jsonify(result)

@app.route('/specialties/<int:specialty_id>', methods=['GET'])
def get_specialty_by_id(specialty_id):
    specialty = Specialty.query.get(specialty_id)
    if specialty is None:
        return jsonify({'error': 'Specialty not found'}), 404

    return jsonify({
        'id': specialty.id,
        'name': specialty.name
    })

@app.route('/services', methods=['GET'])
def get_medical_services():
    medical_services = MedicalService.query.all()
    result = [{'id': service.id, 'name': service.name, 'price': service.price, 'specialty_id': service.specialty_id}
     for service in medical_services]
    return jsonify(result)

@app.route('/specialties', methods=['GET'])
def get_specialties():
    specialties = Specialty.query.all()
    result = [{'id': specialty.id, 'name': specialty.name} for specialty in specialties]
    return jsonify(result)




if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True)

