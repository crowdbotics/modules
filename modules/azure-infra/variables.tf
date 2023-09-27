###defaults
variable "region" {
  description = "Azure infrastructure region"
  type        = string
  default     = "eastus"
}
variable "project_name" {
  description = "Name of azure project"
  type        = string
}

variable "location" {
  description = "Location short name "
  type        = string
  default     = "us"
}

## App variables

variable "service_plan_os_type" {
  description = "The O/S type for the App Services to be hosted in this plan"
  type        = string
  default     = "Linux"
}
variable "service_plan_sku_name" {
  description = "The SKU for the plan"
  type        = string
  default     = "B1"
}

variable "site_config" {
  description = "App site config block"
  type        = any
  default     = {}
}

#Storage variables

variable "storage_account_tier" {
  description = "Defines the Tier to use for this storage account"
  type        = string
  default     = "Standard"
}
variable "storage_account_replication_type" {
  description = "Defines the type of replication to use for this storage account"
  type        = string
  default     = "LRS"
}
variable "storage_container_name" {
  description = "Specifies the name of the storage account"
  type        = string
  default     = "content"
}
variable "storage_container_access" {
  description = "The Access Level configured for this Container"
  type        = string
  default     = "private"
}
## Redis variables

variable "redis_capacity" {
  description = "The size of the Redis cache to deploy"
  type        = string
  default     = "1"
}
variable "redis_cache_family" {
  description = "The SKU family/pricing group to use"
  type        = string
  default     = "C"
}
variable "redis_cache_sku" {
  description = "The SKU of Redis to use"
  type        = string
  default     = "Standard"
}
variable "redis_tls_version" {
  description = "The minimum TLS version"
  type        = string
  default     = "1.2"
}

variable "redis_config" {
  description = "Optional redis config parameters"
  type        = any
  default     = {}
}

## Postgres variables

variable "postgres_admin_user" {
  description = "The Administrator login for the PostgreSQL Flexible Server"
  type        = string
}

variable "postgres_admin_password" {
  description = "The Password associated with the administrator_login for the PostgreSQL Flexible Server"
  type        = string
}

variable "postgres_sku_name" {
  description = "Specifies the SKU Name for this PostgreSQL Server"
  type        = string
  default     = "GP_Standard_D2s_v3"
}
variable "postgres_version" {
  description = "Specifies the version of PostgreSQL to use"
  type        = string
  default     = "12"
}
variable "postgres_storage" {
  description = "Max storage allowed for a server"
  type        = string
  default     = "32768"
}
variable "postgres_backup_retention" {
  description = "Backup retention days for the server"
  type        = string
  default     = "7"
}
variable "postgres_storage_autogrow" {
  description = "Enable/Disable auto-growing of the storage"
  type        = bool
  default     = false
}
variable "postgres_db_name" {
  description = "The name which should be used for this Azure PostgreSQL Flexible Server Database"
  type        = string
  default     = "data"
}