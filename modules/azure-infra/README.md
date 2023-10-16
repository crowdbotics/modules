## Azure Infra (Terraform)

## Module description

Terraform module for vanilla stack deployment on azure.

## Features

[x] This module requires manual configurations.

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_azurerm"></a> [azurerm](#requirement\_azurerm) | =3.73.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_azurerm"></a> [azurerm](#provider\_azurerm) | =3.73.0 |
| <a name="provider_random"></a> [random](#provider\_random) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [azurerm_app_service_connection.blob](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/app_service_connection) | resource |
| [azurerm_app_service_connection.redis](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/app_service_connection) | resource |
| [azurerm_linux_web_app.webapp](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/linux_web_app) | resource |
| [azurerm_log_analytics_workspace.my_first_app](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/log_analytics_workspace) | resource |
| [azurerm_postgresql_server.example](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/postgresql_server) | resource |
| [azurerm_redis_cache.example](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/redis_cache) | resource |
| [azurerm_resource_group.my_first_app](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/resource_group) | resource |
| [azurerm_service_plan.appserviceplan](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/service_plan) | resource |
| [azurerm_storage_account.example](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/storage_account) | resource |
| [azurerm_storage_container.example](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/resources/storage_container) | resource |
| [random_integer.ri](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/integer) | resource |
| [azurerm_subscription.current](https://registry.terraform.io/providers/hashicorp/azurerm/3.73.0/docs/data-sources/subscription) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_location"></a> [location](#input\_location) | Location short name | `string` | `"us"` | no |
| <a name="input_postgres_backup_retention"></a> [postgres\_backup\_retention](#input\_postgres\_backup\_retention) | Backup retention days for the server | `string` | `"7"` | no |
| <a name="input_postgres_public_access"></a> [postgres\_public\_access](#input\_postgres\_public\_access) | Whether or not public network access is allowed for this server | `bool` | `false` | no |
| <a name="input_postgres_sku_name"></a> [postgres\_sku\_name](#input\_postgres\_sku\_name) | Specifies the SKU Name for this PostgreSQL Server | `string` | `"B_Gen5_1"` | no |
| <a name="input_postgres_storage"></a> [postgres\_storage](#input\_postgres\_storage) | Max storage allowed for a server | `string` | `"5120"` | no |
| <a name="input_postgres_storage_autogrow"></a> [postgres\_storage\_autogrow](#input\_postgres\_storage\_autogrow) | Enable/Disable auto-growing of the storage | `bool` | `false` | no |
| <a name="input_postgres_version"></a> [postgres\_version](#input\_postgres\_version) | Specifies the version of PostgreSQL to use | `string` | `"11"` | no |
| <a name="input_project_name"></a> [project\_name](#input\_project\_name) | Name of azure project | `string` | n/a | yes |
| <a name="input_redis_cache_family"></a> [redis\_cache\_family](#input\_redis\_cache\_family) | The SKU family/pricing group to use | `string` | `"C"` | no |
| <a name="input_redis_cache_sku"></a> [redis\_cache\_sku](#input\_redis\_cache\_sku) | The SKU of Redis to use | `string` | `"Standard"` | no |
| <a name="input_redis_capacity"></a> [redis\_capacity](#input\_redis\_capacity) | The size of the Redis cache to deploy | `string` | `"1"` | no |
| <a name="input_redis_config"></a> [redis\_config](#input\_redis\_config) | Optional redis config parameters | `any` | `{}` | no |
| <a name="input_redis_tls_version"></a> [redis\_tls\_version](#input\_redis\_tls\_version) | The minimum TLS version | `string` | `"1.2"` | no |
| <a name="input_region"></a> [region](#input\_region) | Azure infrastructure region | `string` | `"eastus"` | no |
| <a name="input_service_plan_os_type"></a> [service\_plan\_os\_type](#input\_service\_plan\_os\_type) | The O/S type for the App Services to be hosted in this plan | `string` | `"Linux"` | no |
| <a name="input_service_plan_sku_name"></a> [service\_plan\_sku\_name](#input\_service\_plan\_sku\_name) | The SKU for the plan | `string` | `"B1"` | no |
| <a name="input_site_config"></a> [site\_config](#input\_site\_config) | App site config block | `any` | `{}` | no |
| <a name="input_storage_account_replication_type"></a> [storage\_account\_replication\_type](#input\_storage\_account\_replication\_type) | Defines the type of replication to use for this storage account | `string` | `"LRS"` | no |
| <a name="input_storage_account_tier"></a> [storage\_account\_tier](#input\_storage\_account\_tier) | Defines the Tier to use for this storage account | `string` | `"Standard"` | no |
| <a name="input_storage_container_access"></a> [storage\_container\_access](#input\_storage\_container\_access) | The Access Level configured for this Container | `string` | `"private"` | no |
| <a name="input_storage_container_name"></a> [storage\_container\_name](#input\_storage\_container\_name) | Specifies the name of the storage account | `string` | `"content"` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_azurerm_container_app_url"></a> [azurerm\_container\_app\_url](#output\_azurerm\_container\_app\_url) | n/a |
