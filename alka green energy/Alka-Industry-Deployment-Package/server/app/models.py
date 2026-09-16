from datetime import datetime
from app.database import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    phone = db.Column(db.String(20), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), default='USER', nullable=False) # 'ADMIN' or 'USER'
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    customer = db.relationship('Customer', backref='user', uselist=False, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True)
    company_name = db.Column(db.String(150), nullable=True)
    customer_type = db.Column(db.String(50), default='residential') # residential, commercial, industrial
    address = db.Column(db.Text, nullable=True)
    city = db.Column(db.String(100), default='Beed')
    state = db.Column(db.String(100), default='Maharashtra')
    postal_code = db.Column(db.String(20), default='431122')
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    projects = db.relationship('Project', backref='customer', cascade="all, delete-orphan")
    documents = db.relationship('Document', backref='customer', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'company_name': self.company_name,
            'customer_type': self.customer_type,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'postal_code': self.postal_code,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id', ondelete='CASCADE'), nullable=False, index=True)
    project_name = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(200), default='Beed, Maharashtra')
    project_type = db.Column(db.String(50), default='residential') # residential, commercial, industrial
    capacity = db.Column(db.String(50), nullable=False) # e.g. "5 kW"
    installation_date = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), default='ENQUIRY') 
    # Statuses: ENQUIRY, SITE_VISIT, QUOTATION, APPROVED, INSTALLATION_SCHEDULED, INSTALLATION_IN_PROGRESS, INSTALLED, COMPLETED

    total_project_cost = db.Column(db.Float, default=0.0)
    total_amount_paid = db.Column(db.Float, default=0.0)
    pending_amount = db.Column(db.Float, default=0.0)
    payment_status = db.Column(db.String(30), default='UNPAID') # UNPAID, PARTIALLY_PAID, PAID

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    payments = db.relationship('Payment', backref='project', cascade="all, delete-orphan")
    status_history = db.relationship('ProjectStatusHistory', backref='project', cascade="all, delete-orphan")
    images = db.relationship('ProjectImage', backref='project', cascade="all, delete-orphan")
    documents = db.relationship('Document', backref='project', cascade="all, delete-orphan")

    def recalculate_payment_totals(self):
        total_paid = sum(p.amount for p in self.payments)
        self.total_amount_paid = total_paid
        self.pending_amount = max(0.0, self.total_project_cost - total_paid)
        
        if total_paid <= 0:
            self.payment_status = 'UNPAID'
        elif total_paid >= self.total_project_cost and self.total_project_cost > 0:
            self.payment_status = 'PAID'
        else:
            self.payment_status = 'PARTIALLY_PAID'

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'project_name': self.project_name,
            'location': self.location,
            'project_type': self.project_type,
            'capacity': self.capacity,
            'installation_date': self.installation_date.isoformat() if self.installation_date else None,
            'description': self.description,
            'status': self.status,
            'total_project_cost': self.total_project_cost,
            'total_amount_paid': self.total_amount_paid,
            'pending_amount': self.pending_amount,
            'payment_status': self.payment_status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), nullable=False, index=True)
    amount = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    payment_method = db.Column(db.String(50), default='BANK_TRANSFER') # CASH, UPI, BANK_TRANSFER, CHEQUE, OTHER
    transaction_reference = db.Column(db.String(100), nullable=True)
    receipt_number = db.Column(db.String(100), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'amount': self.amount,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
            'payment_method': self.payment_method,
            'transaction_reference': self.transaction_reference,
            'receipt_number': self.receipt_number,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Enquiry(db.Model):
    __tablename__ = 'enquiries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    location = db.Column(db.String(150), nullable=True)
    customer_type = db.Column(db.String(50), default='residential')
    monthly_bill = db.Column(db.String(50), nullable=True)
    company_name = db.Column(db.String(150), nullable=True)
    industry_type = db.Column(db.String(100), nullable=True)
    power_requirement = db.Column(db.String(100), nullable=True)
    requirement = db.Column(db.Text, nullable=True)
    message = db.Column(db.Text, nullable=True)
    source = db.Column(db.String(50), default='Website Contact Form')
    status = db.Column(db.String(30), default='NEW') # NEW, CONTACTED, FOLLOW_UP, CONVERTED, CLOSED
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'email': self.email,
            'location': self.location,
            'customer_type': self.customer_type,
            'monthly_bill': self.monthly_bill,
            'company_name': self.company_name,
            'industry_type': self.industry_type,
            'power_requirement': self.power_requirement,
            'requirement': self.requirement,
            'message': self.message,
            'source': self.source,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class ProjectStatusHistory(db.Model):
    __tablename__ = 'project_status_history'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), nullable=False)
    previous_status = db.Column(db.String(50), nullable=True)
    new_status = db.Column(db.String(50), nullable=False)
    changed_by_user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'previous_status': self.previous_status,
            'new_status': self.new_status,
            'changed_by_user_id': self.changed_by_user_id,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Document(db.Model):
    __tablename__ = 'documents'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), nullable=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.id', ondelete='CASCADE'), nullable=False)
    file_name = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    file_type = db.Column(db.String(50), default='PDF')
    is_private = db.Column(db.Boolean, default=True) # Must require auth check
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'customer_id': self.customer_id,
            'file_name': self.file_name,
            'file_path': self.file_path,
            'file_type': self.file_type,
            'is_private': self.is_private,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }


class ProjectImage(db.Model):
    __tablename__ = 'project_images'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id', ondelete='CASCADE'), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    caption = db.Column(db.String(255), nullable=True)
    is_public = db.Column(db.Boolean, default=True)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'image_url': self.image_url,
            'caption': self.caption,
            'is_public': self.is_public,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }


class Gallery(db.Model):
    __tablename__ = 'gallery'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(50), default='residential')
    capacity = db.Column(db.String(50), default='N/A')
    location = db.Column(db.String(150), default='Beed')
    image_url = db.Column(db.String(500), nullable=False)
    caption = db.Column(db.Text, nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'capacity': self.capacity,
            'location': self.location,
            'image_url': self.image_url,
            'caption': self.caption,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class GovernmentScheme(db.Model):
    __tablename__ = 'government_schemes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    authority = db.Column(db.String(200), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    eligibility = db.Column(db.Text, nullable=True) # Stored as JSON / string
    benefits = db.Column(db.Text, nullable=True)
    required_documents = db.Column(db.Text, nullable=True)
    application_process = db.Column(db.Text, nullable=True)
    official_link = db.Column(db.String(300), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'authority': self.authority,
            'summary': self.summary,
            'eligibility': self.eligibility,
            'benefits': self.benefits,
            'required_documents': self.required_documents,
            'application_process': self.application_process,
            'official_link': self.official_link,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class ChatbotFAQ(db.Model):
    __tablename__ = 'chatbot_faqs'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), default='general')
    question = db.Column(db.String(300), nullable=False)
    answer = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'question': self.question,
            'answer': self.answer,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Consumer(db.Model):
    __tablename__ = 'solar_consumers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(20), nullable=False, index=True)
    address = db.Column(db.Text, nullable=True)
    consumer_number = db.Column(db.String(50), nullable=False, unique=True, index=True)
    discom_name = db.Column(db.String(100), default='MSEDCL')
    category = db.Column(db.String(50), default='Residential') # Residential, Commercial
    agent_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    created_by_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    inverter_capacity = db.Column(db.String(50), default='3kW')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    status = db.relationship('ConsumerStatus', backref='consumer', uselist=False, cascade="all, delete-orphan")
    documents = db.relationship('ConsumerDocument', backref='consumer', cascade="all, delete-orphan")
    assigned_agent = db.relationship('User', foreign_keys=[agent_id])
    created_by_user = db.relationship('User', foreign_keys=[created_by_id])

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phone': self.phone,
            'address': self.address,
            'consumer_number': self.consumer_number,
            'discom_name': self.discom_name,
            'category': self.category,
            'agent_id': self.agent_id,
            'agent_name': self.assigned_agent.name if self.assigned_agent else 'Unassigned',
            'created_by_id': self.created_by_id,
            'created_by_name': self.created_by_user.name if self.created_by_user else 'System',
            'inverter_capacity': self.inverter_capacity,
            'rts_status': self.status.rts_status if self.status else 'NOT_DONE',
            'national_portal_status': self.status.national_portal_status if self.status else 'NOT_DONE',
            'documents_count': len(self.documents) if self.documents else 0,
            'documents': [d.to_dict() for d in self.documents] if self.documents else [],
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class ConsumerStatus(db.Model):
    __tablename__ = 'consumer_statuses'

    id = db.Column(db.Integer, primary_key=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey('solar_consumers.id', ondelete='CASCADE'), nullable=False, unique=True)
    rts_status = db.Column(db.String(20), default='NOT_DONE') # DONE, NOT_DONE
    national_portal_status = db.Column(db.String(20), default='NOT_DONE') # DONE, NOT_DONE
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'consumer_id': self.consumer_id,
            'rts_status': self.rts_status,
            'national_portal_status': self.national_portal_status,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class ConsumerDocument(db.Model):
    __tablename__ = 'consumer_documents'

    id = db.Column(db.Integer, primary_key=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey('solar_consumers.id', ondelete='CASCADE'), nullable=False)
    document_type = db.Column(db.String(50), nullable=False) # aadhar_front, aadhar_back, panel_serial, inverter_serial, inverter_capacity, plant_photo
    file_url = db.Column(db.String(500), nullable=False)
    capacity_kw = db.Column(db.String(50), nullable=True)
    photo_count = db.Column(db.Integer, default=1)
    gps_lat = db.Column(db.Float, nullable=True)
    gps_long = db.Column(db.Float, nullable=True)
    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'consumer_id': self.consumer_id,
            'document_type': self.document_type,
            'file_url': self.file_url,
            'capacity_kw': self.capacity_kw,
            'photo_count': self.photo_count,
            'gps_lat': self.gps_lat,
            'gps_long': self.gps_long,
            'uploaded_at': self.uploaded_at.isoformat() if self.uploaded_at else None
        }


class AuditLog(db.Model):
    __tablename__ = 'audit_logs'

    id = db.Column(db.Integer, primary_key=True)
    consumer_id = db.Column(db.Integer, db.ForeignKey('solar_consumers.id', ondelete='CASCADE'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='SET NULL'), nullable=True)
    user_name = db.Column(db.String(100), nullable=True)
    action = db.Column(db.String(255), nullable=False)
    details = db.Column(db.Text, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'consumer_id': self.consumer_id,
            'user_id': self.user_id,
            'user_name': self.user_name,
            'action': self.action,
            'details': self.details,
            'timestamp': self.timestamp.isoformat() if self.timestamp else None
        }

