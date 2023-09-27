output "azurerm_container_app_url" {
  value = azurerm_linux_web_app.linux_web_app.default_hostname
}