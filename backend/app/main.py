from fastapi import FastAPI

from app.routes import router


app = FastAPI(
    title="Data Quality API",
    version="0.1.0",
    description="API simples para auditoria, qualidade de dados e rastreabilidade de pipelines.",
)

app.include_router(router)
