resource "azurerm_app_service_connection" "blob" {
  name               = "storageblob_connector_${random_integer.ri.result}"
  app_service_id     = azurerm_linux_web_app.linux_web_app.id
  target_resource_id = azurerm_storage_account.storage_account.id
  authentication {
    type = "systemAssignedIdentity"
  }
}

resource "azurerm_app_service_connection" "redis" {
  name               = "redis_connector_${random_integer.ri.result}"
  app_service_id     = azurerm_linux_web_app.linux_web_app.id
  target_resource_id = "${data.azurerm_subscription.current.id}/resourceGroups/${azurerm_resource_group.resource_group.name}/providers/Microsoft.Cache/Redis/${azurerm_redis_cache.redis_cache.name}/databases/0"
  authentication {
    type = "secret"
  }
}

resource "azurerm_app_service_connection" "postgres" {
  name = "postgres_connector_${random_integer.ri.result}"
  app_service_id = azurerm_linux_web_app.linux_web_app.id
  target_resource_id = azurerm_postgresql_flexible_server_database.flexible_server_database.id
  authentication {
    type = "systemAssignedIdentity"
  }
  lifecycle {
    ignore_changes = [secret_store]
  }
}