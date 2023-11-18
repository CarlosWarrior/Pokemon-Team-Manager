data "aws_route53_zone" "app_host" {
  name = "${var.HOST}."
}
resource "aws_route53_record" "app_www" {
  zone_id = data.aws_route53_zone.app_host.zone_id
  name    = "www.${var.HOST}"
  type    = "A"
  ttl     = 300
  records = [aws_instance.app.public_ip]
}
resource "aws_route53_record" "app" {
  zone_id = data.aws_route53_zone.app_host.zone_id
  name    = var.HOST
  type    = "A"
  ttl     = 300
  records = [aws_instance.app.public_ip]
}

resource "aws_vpc" "app_vpc" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    tags = {
        Name = "${var.APP} VPC"
    }
}
resource "aws_security_group" "app_sg" {
    name   = "${var.APP} HTTP and SSH"
    vpc_id = aws_vpc.app_vpc.id

    ingress {
        from_port   = 443
        to_port     = 443
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 3000
        to_port     = 3000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = -1
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_internet_gateway" "app_gateway" {
    vpc_id = aws_vpc.app_vpc.id

    tags = {
        Name = "${var.APP} Internet Gateway"
    }
}
resource "aws_route_table" "app_route_table" {
    vpc_id = aws_vpc.app_vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.app_gateway.id
    }

    route {
        ipv6_cidr_block = "::/0"
        gateway_id = aws_internet_gateway.app_gateway.id
    }

    tags = {
        Name = "${var.APP} Route Table"
    }
}
resource "aws_route_table_association" "app_subnet_app_route_table" {
    subnet_id      = aws_subnet.app_subnet.id
    route_table_id = aws_route_table.app_route_table.id
}
resource "aws_subnet" "app_subnet" {
    vpc_id            = aws_vpc.app_vpc.id
    cidr_block        = "10.0.1.0/24"
    availability_zone = "${var.AWS_REGION}a"
    tags = {
        Name = "${var.APP} Subnet"
    }
}