variable "APP"{
    type = string
    default = "PokemonTeamManager"
}

variable "HOST"{
    type = string
    default = "pokemon.kewacagm.link"
}

variable "AWS_REGION"{
    type = string
}
variable "AWS_ACCESS_KEY"{
    type = string
    sensitive = false
}
variable "AWS_ACCESS_SECRET"{
    type = string
    sensitive = false
}

variable "APP_REPO"{
    type = string
}

variable "APP_BRANCH"{
    type = string
}
variable "GIT_KEY_FILE"{
    type = string
}
variable "APP_CERTIFICATE_FILE"{
    type = string
    sensitive = false
}
variable "APP_KEY_FILE"{
    type = string
    sensitive = false
}
variable "APP_ENV_FILE"{
    type = string
    sensitive = false
}