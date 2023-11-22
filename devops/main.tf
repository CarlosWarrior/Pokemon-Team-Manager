terraform {
  cloud {
    organization = "CarlosAlejandroGuerreroMartinez"

    workspaces {
      name = "PokemonTeamManager"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "${var.AWS_REGION}"
  access_key = "${var.AWS_ACCESS_KEY}"
  secret_key = "${var.AWS_ACCESS_SECRET}"
}