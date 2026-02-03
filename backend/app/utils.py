import smtplib
import random
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_verification_token() -> str:
    """
    Generates a random 6-digit verification code.
    """
    return "".join(random.choices(string.digits, k=6))


def send_verification_email(email_to: str, code: str):
    """
    Sends a verification email using SMTP credentials from settings.
    """
    if not all([settings.SMTP_HOST, settings.SMTP_PORT, settings.SMTP_USER, settings.SMTP_PASSWORD, settings.EMAILS_FROM_EMAIL]):
        missing_configs = [
            name for name, value in {
                "SMTP_HOST": settings.SMTP_HOST,
                "SMTP_PORT": settings.SMTP_PORT,
                "SMTP_USER": settings.SMTP_USER,
                "SMTP_PASSWORD": settings.SMTP_PASSWORD,
                "EMAILS_FROM_EMAIL": settings.EMAILS_FROM_EMAIL
            }.items() if not value
        ]
        logger.error(
            f"SMTP credentials or host/port not fully configured. Missing: {', '.join(missing_configs)}. "
            "Please check your .env file or environment variables for SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, and EMAILS_FROM_EMAIL."
        )
        return

    msg = MIMEMultipart()
    msg["From"] = settings.EMAILS_FROM_EMAIL
    msg["To"] = email_to
    msg["Subject"] = f"Verify your {settings.PROJECT_NAME} account"

    body = f"""
    <html>
        <body>
            <h2>Welcome to {settings.PROJECT_NAME}!</h2>
            <p>Please use the following code to verify your account:</p>
            <h1 style="color: #4CAF50;">{code}</h1>
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>This email was sent from {settings.EMAILS_FROM_EMAIL}.</p>
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
    except smtplib.SMTPConnectError as e:
        logger.error(
            f"Failed to connect to SMTP server at {settings.SMTP_HOST}:{settings.SMTP_PORT}. "
            f"Please check if the host and port are correct and the server is reachable. Error: {e}"
        )
    except smtplib.SMTPAuthenticationError as e:
        logger.error(
            f"SMTP authentication failed for user {settings.SMTP_USER}. "
            f"Please check your SMTP_USER and SMTP_PASSWORD. Error: {e}"
        )
    except smtplib.SMTPServerDisconnected as e:
        logger.error(
            f"SMTP server unexpectedly disconnected. This might be due to incorrect SSL/TLS settings or server issues. Error: {e}"
        )
    except Exception as e:
        logger.error(f"An unexpected error occurred while sending email to {email_to}: {e}")
