locals {
  stack = "${var.project_name}-${random_integer.ri.result}"

  default_tags = {
    owner   = "Crowdbotics"
    project = local.stack
  }
  default_site_config = {
    always_on = "true"
  }
}
data "azurerm_subscription" "current" {}