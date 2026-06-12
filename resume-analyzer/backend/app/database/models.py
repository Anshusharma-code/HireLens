from sqlalchemy import Column, Integer, String, DateTime,Text
from sqlalchemy.sql import func

from app.database.db import Base
extracted_text = Column(Text)


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)

    filepath = Column(String, nullable=False)

    extracted_text = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )