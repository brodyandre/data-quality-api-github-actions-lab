TRUNCATE TABLE quality_checks, pipeline_runs, audit_logs RESTART IDENTITY CASCADE;

INSERT INTO pipeline_runs (
    pipeline_name,
    status,
    records_processed,
    started_at,
    finished_at
)
VALUES
    (
        'daily_ingestion',
        'success',
        1250,
        CURRENT_TIMESTAMP - INTERVAL '10 minutes',
        CURRENT_TIMESTAMP - INTERVAL '5 minutes'
    ),
    (
        'customer_sync',
        'failed',
        320,
        CURRENT_TIMESTAMP - INTERVAL '20 minutes',
        CURRENT_TIMESTAMP - INTERVAL '18 minutes'
    );

INSERT INTO quality_checks (
    pipeline_run_id,
    check_name,
    status,
    severity,
    expected_value,
    actual_value
)
VALUES
    (1, 'null_rate_orders', 'passed', 'low', '0%', '0%'),
    (1, 'duplicate_keys', 'passed', 'medium', '0', '0'),
    (2, 'schema_match', 'failed', 'high', 'expected_columns=12', 'actual_columns=10');

INSERT INTO audit_logs (
    event_type,
    message
)
VALUES
    ('seed', 'Base inicial do laboratório carregada.'),
    ('pipeline_run_created', 'Execuções de pipeline de exemplo inseridas.'),
    ('quality_check_created', 'Validações de qualidade de exemplo inseridas.');
