from app.routes import health
from app.schemas import HealthResponse


def test_health_returns_ok() -> None:
    response = health()
    payload = response.model_dump() if hasattr(response, "model_dump") else response.dict()

    assert isinstance(response, HealthResponse)
    assert payload == {"status": "ok"}
