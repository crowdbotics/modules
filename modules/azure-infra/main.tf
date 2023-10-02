resource "azurerm_resource_group" "resource_group" {
  name     = "rg-${local.stack}"
  location = var.region

  tags = local.default_tags
}

resource "azurerm_log_analytics_workspace" "analytics_workspace" {
  name                = "log-${local.stack}"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name

  tags = local.default_tags
}