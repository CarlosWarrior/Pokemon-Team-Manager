data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

data "aws_key_pair" "app_key_pair" {
  key_name = "${var.APP}"
}

data "template_file" "app_setup" {
  template    = "./setup.sh"
  vars = {
    app_system                  = "/home/ubuntu/App"
    app_repo                    = "${var.APP_REPO}"
    app_branch                  = "${var.APP_BRANCH}"
    app_certificate_content     = "${file(var.APP_CERTIFICATE_FILE)}"
    app_key_content             = "${file(var.APP_KEY_FILE)}"
    app_env                     = "${file(var.APP_ENV_FILE)}"
    git_key                     = "${file(var.GIT_KEY_FILE)}"
  }
}

resource "aws_instance" "app" {
  tags = {
    Name = "${var.APP} Instance"
  }
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  associate_public_ip_address = true
  key_name                    = data.aws_key_pair.app_key_pair.key_name
  subnet_id                   = aws_subnet.app_subnet.id
  vpc_security_group_ids      = [aws_security_group.app_sg.id]
  user_data                   = data.template_file.app_setup.rendered
}