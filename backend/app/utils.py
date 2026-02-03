import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from src.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def send_verification_email(email_to: str, code: str):
    """
    Sends a verification email using SMTP credentials from settings.
    """
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.warning("SMTP credentials not set. Skipping email sending.")
        return

    msg = MIMEMultipart()
    msg["From"] = settings.EMAILS_FROM_EMAIL
    msg["To"] = email_to
    msg["Subject"] = "Verify your account"

    body = f"""
    <html>
        <body>
            <h2>Welcome to {settings.PROJECT_NAME}!</h2>
            <p>Please use the following code to verify your account:</p>
            <h1 style="color: #4CAF50;">{code}</h1>
            <p>If you did not sign up for this account, please ignore this email.</p>
        </body>
    </html>
    """
    msg.attach(MIMEText(body, "html"))

    try:
        server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.EMAILS_FROM_EMAIL, email_to, msg.as_string())
        server.quit()
        logger.info(f"Verification email sent to {email_to}")
    except Exception as e:
        logger.error(f"Failed to send email to {email_to}: {e}")
