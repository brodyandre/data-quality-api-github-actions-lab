from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str


class ReadyResponse(BaseModel):
    status: str
    database: str


class PipelineRunCreate(BaseModel):
    pipeline_name: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)
    records_processed: int = Field(default=0, ge=0)
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None


class PipelineRunResponse(PipelineRunCreate):
    id: int
    created_at: datetime


class QualityCheckCreate(BaseModel):
    pipeline_run_id: Optional[int] = None
    check_name: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)
    severity: str = Field(..., min_length=1)
    expected_value: Optional[str] = None
    actual_value: Optional[str] = None


class QualityCheckResponse(QualityCheckCreate):
    id: int
    created_at: datetime


class AuditLogResponse(BaseModel):
    id: int
    event_type: str
    message: str
    created_at: datetime


class QualitySummaryResponse(BaseModel):
    total_pipeline_runs: int
    successful_pipeline_runs: int
    failed_pipeline_runs: int
    total_quality_checks: int
    passed_quality_checks: int
    failed_quality_checks: int
    high_severity_checks: int
    total_audit_logs: int
