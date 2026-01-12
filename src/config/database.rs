use sqlx::mysql::{MySqlPool, MySqlPoolOptions};

pub async fn connect() -> MySqlPool {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must set");

    match MySqlPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await 
    {
        Ok(pool) => {
            println!("Database Connected Successfully!");
            pool
        }
        Err(err) => {
            eprintln!("Failed to Connect to Database: {err:?}");
            std::process::exit(1);
        }
    }
}