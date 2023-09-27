resource "azurerm_storage_account" "storage_account" {
  name                     = "${var.storage_container_name}${random_integer.ri.result}"
  resource_group_name      = azurerm_resource_group.resource_group.name
  location                 = azurerm_resource_group.resource_group.location
  account_tier             = var.storage_account_tier
  account_replication_type = var.storage_account_replication_type
}

resource "azurerm_storage_container" "storage_container" {
  name                  = "sc-${local.stack}"
  storage_account_name  = azurerm_storage_account.storage_account.name
  container_access_type = var.storage_container_access
}

resource "azurerm_redis_cache" "redis_cache" {
  name                = "redis-${local.stack}"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  capacity            = var.redis_capacity
  family              = var.redis_cache_family
  sku_name            = var.redis_cache_sku
  enable_non_ssl_port = false
  minimum_tls_version = var.redis_tls_version
  dynamic "redis_configuration" {
    for_each = var.redis_config
    content {
      enable_authentication = lookup(redis_config.value, "enable_authentication", "true")
      maxmemory_policy      = lookup(redis_config.value, "maxmemory_policy", "volatile-lru")
    }
  }
  redis_configuration {
  }
}

resource "azurerm_postgresql_flexible_server" "flexible_server" {
  name                   = "psqlflexibleserver-${local.stack}"
  resource_group_name    = azurerm_resource_group.resource_group.name
  location               = azurerm_resource_group.resource_group.location
  version                = var.postgres_version
  administrator_login    = var.postgres_admin_user
  administrator_password = var.postgres_admin_password
  storage_mb             = var.postgres_storage
  sku_name               = var.postgres_sku_name
  backup_retention_days  = var.postgres_backup_retention
  auto_grow_enabled      = var.postgres_storage_autogrow
  lifecycle {
    ignore_changes = [zone]
  }
}

resource "azurerm_postgresql_flexible_server_database" "flexible_server_database" {
  name      = var.postgres_db_name
  server_id = azurerm_postgresql_flexible_server.flexible_server.id
}
