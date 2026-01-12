use axum::{
    extract::Request, 
    middleware::Next, 
    response::Response,
    http::{HeaderMap, StatusCode},
    Json,
};

use crate::utils::jwt::verify_token;
use crate::utils::response::ApiResponse;

type AuthError = (StatusCode, Json<ApiResponse<()>>);

pub async fn auth(
    headers: HeaderMap,
    mut req: Request, 
    next: Next
) -> Result<Response, AuthError> {
    let token = headers 
        .get(axum::http::header::AUTHORIZATION)
        .and_then(|v| v.to_str().ok())
        .and_then(|v| v.strip_prefix("Bearer "))
        .ok_or_else(|| {
            (
                StatusCode::UNAUTHORIZED,
                Json(ApiResponse::<()>::error("Token tidak ditemukan"))
            )
        })?;

    let claims = verify_token(token).map_err(|e| {
        println!("JWT verification error: {:?}", e);
        (
            StatusCode::UNAUTHORIZED,
            Json(ApiResponse::<()>::error("Token tidak valid"))
        )
    })?;

    req.extensions_mut().insert(claims);

    Ok(next.run(req).await)
}