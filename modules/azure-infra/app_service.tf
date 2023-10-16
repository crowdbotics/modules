# Generate a random integer to create a globally unique name
resource "random_integer" "ri" {
  min = 10000
  max = 99999
}

# Create the Linux App Service Plan
resource "azurerm_service_plan" "app_service_plan" {
  name                = "asp-${local.stack}"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  os_type             = var.service_plan_os_type
  sku_name            = var.service_plan_sku_name
}

# Create the web app, pass in the App Service Plan ID
resource "azurerm_linux_web_app" "linux_web_app" {
  name                = "webapp-${local.stack}"
  location            = azurerm_resource_group.resource_group.location
  resource_group_name = azurerm_resource_group.resource_group.name
  service_plan_id     = azurerm_service_plan.app_service_plan.id
  https_only          = true
  dynamic "site_config" {
    for_each = [merge(local.default_site_config, var.site_config)]
    content {
      always_on           = lookup(site_config.value, "always_on", false)
      minimum_tls_version = lookup(site_config.value, "minimum_tls_version", "1.2")

      dynamic "application_stack" {
        for_each = flatten([lookup(site_config.value, "application_stack", [])])
        content {
          docker_registry_url = lookup(application_stack.value, "docker_registry_url", "https://mcr.microsoft.com")
          docker_image_name   = lookup(application_stack.value, "docker_image_name", "azuredocs/containerapps-helloworld:latest")
        }
      }
    }
  }
  lifecycle {
    ignore_changes = [app_settings, identity, sticky_settings]
  }
}