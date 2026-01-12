use axum::{
    Router, middleware,
    routing::{delete, get, post, put},
};

// import handler user
use crate::handlers::user_handler::{destroy, index, show, store, update};

// import middleware auth
use crate::middlewares::auth_middleware::auth;

pub fn user_routes() -> Router {
    Router::new()
        // GET /api/users → list semua user
        .route("/api/users", get(index))
        // POST /api/users → tambah user
        .route("/api/users", post(store))
        .route("/api/users/{id}", get(show))
        .route("/api/users/{id}", put(update))
        .route("/api/users/{id}", delete(destroy))
        // Semua route di atas WAJIB login
        .layer(middleware::from_fn(auth))
}
